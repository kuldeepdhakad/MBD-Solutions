"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { authedFetch } from "@/lib/auth";

export default function AdminAnalyticsPage() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    authedFetch("/analytics")
      .then(setData)
      .catch((e) => setError(e.message));
  }, []);

  if (error) return <p className="text-danger">{error}</p>;
  if (!data) return <p className="text-muted">Loading analytics...</p>;

  const c = data.counts || {};
  const cards = [
    { label: "Contacts", value: c.contacts },
    { label: "Unread Messages", value: c.unreadContacts },
    { label: "Job Applications", value: c.applications },
    { label: "Pending Applications", value: c.pendingApplications },
    { label: "Published Blogs", value: c.blogs },
    { label: "Services", value: c.services },
    { label: "Products", value: c.products },
    { label: "Projects", value: c.projects },
    { label: "Open Jobs", value: c.jobs },
    { label: "Newsletter Subscribers", value: c.newsletter },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Analytics</h1>
        <p className="mt-1 text-sm text-muted">Platform activity and content metrics.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {cards.map((card) => (
          <Card key={card.label}>
            <CardContent className="p-5">
              <p className="text-sm text-muted">{card.label}</p>
              <p className="mt-2 text-3xl font-semibold text-primary">{card.value ?? 0}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
