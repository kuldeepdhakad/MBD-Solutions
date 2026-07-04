"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { authedFetch, uploadMedia } from "@/lib/auth";

export default function AdminMediaPage() {
  const [items, setItems] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  const load = async () => {
    try {
      const res = await authedFetch("/media?status=ALL&limit=100");
      setItems(res.data || []);
    } catch (e: any) {
      setError(e.message);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      await uploadMedia(file);
      await load();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const onDelete = async (id: string) => {
    if (!confirm("Delete this media item?")) return;
    await authedFetch(`/media/${id}`, { method: "DELETE" });
    await load();
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Media Library</h1>
          <p className="mt-1 text-sm text-muted">
            Upload images via Cloudinary (or local fallback).
          </p>
        </div>
        <label className="inline-flex cursor-pointer">
          <input type="file" accept="image/*" className="hidden" onChange={onUpload} />
          <span className="inline-flex h-11 items-center rounded-xl bg-primary px-5 text-sm font-medium text-white">
            {uploading ? "Uploading..." : "Upload Image"}
          </span>
        </label>
      </div>
      {error && <p className="text-sm text-danger">{error}</p>}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((item) => (
          <Card key={item.id}>
            <CardContent className="p-4">
              {item.url?.startsWith("data:") || item.url?.startsWith("http") ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.url}
                  alt={item.alt || item.filename}
                  className="mb-3 aspect-video w-full rounded-xl object-cover"
                />
              ) : (
                <div className="mb-3 flex aspect-video items-center justify-center rounded-xl bg-background text-xs text-muted">
                  No preview
                </div>
              )}
              <p className="truncate text-sm font-medium">{item.filename}</p>
              <p className="mt-1 truncate text-xs text-muted">{item.url}</p>
              <div className="mt-3 flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => navigator.clipboard.writeText(item.url)}
                >
                  Copy URL
                </Button>
                <Button size="sm" variant="danger" onClick={() => onDelete(item.id)}>
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
