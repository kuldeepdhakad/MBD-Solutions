"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { authedFetch } from "@/lib/auth";

export default function AdminContactsPage() {
  const [items, setItems] = useState<any[]>([]);

  const load = async () => {
    const data = await authedFetch("/contacts");
    setItems(data.data || []);
  };

  useEffect(() => {
    load().catch(console.error);
  }, []);

  const markRead = async (id: string) => {
    await authedFetch(`/contacts/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ isRead: true }),
    });
    await load();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Contact Messages</h1>
        <p className="mt-1 text-sm text-muted">Leads submitted from the website contact form.</p>
      </div>
      <div className="space-y-3">
        {items.map((item) => (
          <Card key={item.id}>
            <CardContent className="p-5">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-muted">
                    {item.phone}
                    {item.email ? ` · ${item.email}` : ""}
                    {item.businessType ? ` · ${item.businessType}` : ""}
                  </p>
                  <p className="mt-2 text-sm text-secondary">{item.requirement}</p>
                  {item.budget && <p className="mt-1 text-xs text-muted">Budget: {item.budget}</p>}
                </div>
                <div className="flex items-center gap-2">
                  <span className={`rounded-full px-2.5 py-1 text-xs ${item.isRead ? "bg-surface text-muted" : "bg-accent/10 text-accent"}`}>
                    {item.isRead ? "Read" : "Unread"}
                  </span>
                  {!item.isRead && (
                    <Button size="sm" variant="outline" onClick={() => markRead(item.id)}>
                      Mark Read
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
