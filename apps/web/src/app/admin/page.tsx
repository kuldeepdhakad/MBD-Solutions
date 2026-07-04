"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { authedFetch } from "@/lib/auth";

export default function AdminDashboardPage() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    authedFetch("/analytics")
      .then(setData)
      .catch((e) => setError(e.message));
  }, []);

  if (error) return <p className="text-danger">{error}</p>;
  if (!data) return <p className="text-muted">Loading dashboard...</p>;

  const c = data.counts || {};
  const stats = [
    { label: "Unread Contacts", value: c.unreadContacts },
    { label: "Total Contacts", value: c.contacts },
    { label: "Applications", value: c.applications },
    { label: "Blogs", value: c.blogs },
    { label: "Products", value: c.products },
    { label: "Projects", value: c.projects },
    { label: "Services", value: c.services },
    { label: "Open Jobs", value: c.jobs },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-primary">Dashboard</h1>
        <p className="mt-1 text-sm text-muted">Overview of platform activity and content.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-5">
              <p className="text-sm text-muted">{stat.label}</p>
              <p className="mt-2 text-3xl font-semibold text-primary">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardContent className="p-6">
            <h2 className="font-semibold">Recent Contacts</h2>
            <div className="mt-4 space-y-3">
              {(data.recentContacts || []).map((item: any) => (
                <div key={item.id} className="rounded-xl border border-border p-3">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted">{item.phone} · {item.businessType}</p>
                  <p className="mt-1 line-clamp-2 text-sm text-secondary">{item.requirement}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h2 className="font-semibold">Recent Applications</h2>
            <div className="mt-4 space-y-3">
              {(data.recentApplications || []).map((item: any) => (
                <div key={item.id} className="rounded-xl border border-border p-3">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted">{item.job?.title} · {item.status}</p>
                  <p className="text-sm text-secondary">{item.email}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
