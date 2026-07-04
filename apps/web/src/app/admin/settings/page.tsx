"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input, Label, Textarea } from "@/components/ui/input";
import { authedFetch } from "@/lib/auth";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<any[]>([]);
  const [founder, setFounder] = useState<any>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    Promise.all([
      authedFetch("/settings?status=ALL"),
      authedFetch("/founder"),
    ]).then(([settingsRes, founderRes]) => {
      setSettings(settingsRes.data || settingsRes || []);
      setFounder(founderRes);
    });
  }, []);

  const saveSetting = async (item: any) => {
    await authedFetch(`/settings/${item.id}`, {
      method: "PATCH",
      body: JSON.stringify({ value: JSON.parse(item._valueText) }),
    });
    setMessage("Settings saved");
  };

  const saveFounder = async () => {
    await authedFetch("/founder", {
      method: "PATCH",
      body: JSON.stringify({
        name: founder.name,
        title: founder.title,
        biography: founder.biography,
        email: founder.email,
        phone: founder.phone,
        linkedinUrl: founder.linkedinUrl,
        githubUrl: founder.githubUrl,
      }),
    });
    setMessage("Founder profile saved");
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Website Settings</h1>
        <p className="mt-1 text-sm text-muted">Manage company settings and founder information.</p>
      </div>
      {message && <p className="text-sm text-success">{message}</p>}

      <Card>
        <CardContent className="space-y-4 p-6">
          <h2 className="font-semibold">Founder Information</h2>
          {founder && (
            <>
              <div><Label>Name</Label><Input value={founder.name || ""} onChange={(e) => setFounder({ ...founder, name: e.target.value })} /></div>
              <div><Label>Title</Label><Input value={founder.title || ""} onChange={(e) => setFounder({ ...founder, title: e.target.value })} /></div>
              <div><Label>Biography</Label><Textarea value={founder.biography || ""} onChange={(e) => setFounder({ ...founder, biography: e.target.value })} /></div>
              <div><Label>Email</Label><Input value={founder.email || ""} onChange={(e) => setFounder({ ...founder, email: e.target.value })} /></div>
              <div><Label>Phone</Label><Input value={founder.phone || ""} onChange={(e) => setFounder({ ...founder, phone: e.target.value })} /></div>
              <div><Label>LinkedIn</Label><Input value={founder.linkedinUrl || ""} onChange={(e) => setFounder({ ...founder, linkedinUrl: e.target.value })} /></div>
              <div><Label>GitHub</Label><Input value={founder.githubUrl || ""} onChange={(e) => setFounder({ ...founder, githubUrl: e.target.value })} /></div>
              <Button onClick={saveFounder}>Save Founder</Button>
            </>
          )}
        </CardContent>
      </Card>

      <div className="space-y-4">
        {settings.map((item) => {
          const text = item._valueText ?? JSON.stringify(item.value, null, 2);
          return (
            <Card key={item.id}>
              <CardContent className="space-y-3 p-6">
                <h2 className="font-semibold">{item.key}</h2>
                <Textarea
                  className="font-mono text-xs"
                  value={text}
                  onChange={(e) =>
                    setSettings((prev) =>
                      prev.map((s) => (s.id === item.id ? { ...s, _valueText: e.target.value } : s)),
                    )
                  }
                />
                <Button
                  onClick={() =>
                    saveSetting({ ...item, _valueText: item._valueText ?? JSON.stringify(item.value, null, 2) })
                  }
                >
                  Save {item.key}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
