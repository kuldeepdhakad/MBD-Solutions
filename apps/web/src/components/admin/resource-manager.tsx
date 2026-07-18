"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input, Label, Textarea } from "@/components/ui/input";
import { authedFetch, uploadMedia } from "@/lib/auth";

type Field = {
  name: string;
  label: string;
  type?: "text" | "textarea" | "number" | "select" | "json" | "checkbox" | "password" | "image";
  options?: string[];
};

export function ResourceManager({
  title,
  resource,
  fields,
  titleKey = "title",
  query = "status=ALL",
}: {
  title: string;
  resource: string;
  fields: Field[];
  titleKey?: string;
  query?: string;
}) {
  const [items, setItems] = useState<any[]>([]);
  const [form, setForm] = useState<Record<string, any>>({});
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadingField, setUploadingField] = useState<string | null>(null);

  const onImageUpload = async (fieldName: string, file: File) => {
    setUploadingField(fieldName);
    setError("");
    try {
      const result = await uploadMedia(file);
      const url = result?.url;
      if (!url) throw new Error("Upload succeeded but no URL returned");
      setForm((f) => ({ ...f, [fieldName]: url }));
    } catch (e: any) {
      setError(e.message || "Image upload failed");
    } finally {
      setUploadingField(null);
    }
  };

  const load = async () => {
    try {
      const data = await authedFetch(`/${resource}?${query}&limit=100`);
      setItems(data.data || data || []);
    } catch (e: any) {
      setError(e.message);
    }
  };

  useEffect(() => {
    load();
  }, [resource]);

  const reset = () => {
    setForm({});
    setEditingId(null);
  };

  const onEdit = (item: any) => {
    const next: Record<string, any> = {};
    fields.forEach((field) => {
      if (field.type === "password") {
        next[field.name] = "";
        return;
      }
      const value = item[field.name];
      next[field.name] =
        field.type === "json" ? JSON.stringify(value ?? [], null, 2) : value ?? "";
    });
    setForm(next);
    setEditingId(item.id);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const payload: Record<string, any> = {};
      fields.forEach((field) => {
        let value = form[field.name];
        if (field.type === "json") {
          try {
            value = JSON.parse(value || "[]");
          } catch {
            throw new Error(`${field.label} must be valid JSON`);
          }
        }
        if (field.type === "checkbox") value = Boolean(value);
        if (field.type === "number") value = Number(value);
        if (field.type === "password" && !value) return;
        payload[field.name] = value;
      });

      if (editingId) {
        await authedFetch(`/${resource}/${editingId}`, {
          method: "PATCH",
          body: JSON.stringify(payload),
        });
      } else {
        await authedFetch(`/${resource}`, {
          method: "POST",
          body: JSON.stringify(payload),
        });
      }
      reset();
      await load();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async (id: string) => {
    if (!confirm("Delete this item?")) return;
    await authedFetch(`/${resource}/${id}`, { method: "DELETE" });
    await load();
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">{title}</h1>
        <p className="mt-1 text-sm text-muted">Create, update and publish content dynamically.</p>
      </div>

      <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardContent className="p-6">
            <h2 className="mb-4 font-semibold">{editingId ? "Edit item" : "Create item"}</h2>
            <form onSubmit={onSubmit} className="space-y-4">
              {fields.map((field) => (
                <div key={field.name}>
                  <Label htmlFor={field.name}>{field.label}</Label>
                  {field.type === "textarea" || field.type === "json" ? (
                    <Textarea
                      id={field.name}
                      value={form[field.name] ?? ""}
                      onChange={(e) => setForm((f) => ({ ...f, [field.name]: e.target.value }))}
                      className={field.type === "json" ? "font-mono text-xs" : ""}
                    />
                  ) : field.type === "select" ? (
                    <select
                      id={field.name}
                      className="flex h-11 w-full rounded-xl border border-border bg-surface px-4 text-sm"
                      value={form[field.name] ?? ""}
                      onChange={(e) => setForm((f) => ({ ...f, [field.name]: e.target.value }))}
                    >
                      <option value="">Select</option>
                      {(field.options || []).map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : field.type === "checkbox" ? (
                    <input
                      id={field.name}
                      type="checkbox"
                      checked={Boolean(form[field.name])}
                      onChange={(e) => setForm((f) => ({ ...f, [field.name]: e.target.checked }))}
                      className="mt-2 h-4 w-4"
                    />
                  ) : field.type === "image" ? (
                    <div className="space-y-2">
                      <Input
                        id={field.name}
                        type="url"
                        placeholder="Image URL or upload below"
                        value={form[field.name] ?? ""}
                        onChange={(e) => setForm((f) => ({ ...f, [field.name]: e.target.value }))}
                      />
                      <div className="flex flex-wrap items-center gap-3">
                        <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-border bg-panel px-3 py-2 text-xs font-medium text-foreground transition hover:border-accent/40">
                          <input
                            type="file"
                            accept="image/*"
                            className="sr-only"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) void onImageUpload(field.name, file);
                              e.target.value = "";
                            }}
                          />
                          {uploadingField === field.name ? "Uploading..." : "Upload image"}
                        </label>
                        {form[field.name] && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={form[field.name]}
                            alt="Preview"
                            className="h-12 w-12 rounded-lg border border-border object-cover"
                          />
                        )}
                      </div>
                    </div>
                  ) : (
                    <Input
                      id={field.name}
                      type={field.type === "password" ? "password" : field.type || "text"}
                      autoComplete={field.type === "password" ? "new-password" : undefined}
                      placeholder={field.type === "password" ? "••••••••" : undefined}
                      value={form[field.name] ?? ""}
                      onChange={(e) => setForm((f) => ({ ...f, [field.name]: e.target.value }))}
                    />
                  )}
                </div>
              ))}
              {error && <p className="text-sm text-danger">{error}</p>}
              <div className="flex gap-3">
                <Button type="submit" disabled={loading}>
                  {loading ? "Saving..." : editingId ? "Update" : "Create"}
                </Button>
                {editingId && (
                  <Button type="button" variant="outline" onClick={reset}>
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="mb-4 font-semibold">Existing ({items.length})</h2>
            <div className="max-h-[70vh] space-y-3 overflow-auto">
              {items.map((item) => (
                <div key={item.id} className="rounded-xl border border-border p-4">
                  <p className="font-medium">{item[titleKey] || item.name || item.question}</p>
                  <p className="mt-1 text-xs text-muted">
                    {item.slug || item.email || item.phone || item.status || item.id}
                  </p>
                  <div className="mt-3 flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => onEdit(item)}>
                      Edit
                    </Button>
                    <Button size="sm" variant="danger" onClick={() => onDelete(item.id)}>
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
