"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { authedFetch } from "@/lib/auth";

const statuses = ["PENDING", "REVIEWING", "SHORTLISTED", "REJECTED", "HIRED"];

export default function AdminApplicationsPage() {
  const [items, setItems] = useState<any[]>([]);

  const load = async () => {
    const data = await authedFetch("/applications");
    setItems(data.data || []);
  };

  useEffect(() => {
    load().catch(console.error);
  }, []);

  const updateStatus = async (id: string, status: string) => {
    await authedFetch(`/applications/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
    await load();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Job Applications</h1>
        <p className="mt-1 text-sm text-muted">Track and update candidate application status.</p>
      </div>
      <div className="space-y-3">
        {items.map((item) => (
          <Card key={item.id}>
            <CardContent className="p-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-muted">
                    {item.job?.title} · {item.email} · {item.phone}
                  </p>
                  {item.coverLetter && (
                    <p className="mt-2 line-clamp-2 text-sm text-secondary">{item.coverLetter}</p>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {statuses.map((status) => (
                    <Button
                      key={status}
                      size="sm"
                      variant={item.status === status ? "accent" : "outline"}
                      onClick={() => updateStatus(item.id, status)}
                    >
                      {status}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
