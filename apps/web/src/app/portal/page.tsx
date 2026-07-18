"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { authedFetch, clearAuth, fetchCurrentUser } from "@/lib/auth";

export default function PortalPage() {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCurrentUser().then((user) => {
      if (!user) {
        router.replace("/portal/login");
        return;
      }
      authedFetch("/portal/dashboard")
        .then(setData)
        .catch((e) => setError(e.message));
    });
  }, [router]);

  if (error) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-28">
        <p className="text-danger">{error}</p>
        <Button
          className="mt-4"
          onClick={async () => {
            await clearAuth();
            router.push("/portal/login");
          }}
        >
          Login again
        </Button>
      </div>
    );
  }

  if (!data) {
    return <div className="px-5 py-28 text-center text-muted">Loading client portal...</div>;
  }

  return (
    <section className="py-28">
      <div className="mx-auto max-w-container space-y-8 px-5 md:px-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold">Client Portal</h1>
            <p className="mt-1 text-muted">Projects, invoices, files and support in one place.</p>
          </div>
          <div className="flex gap-3">
            <Button asChild variant="outline"><Link href="/">Website</Link></Button>
            <Button
              variant="danger"
              onClick={async () => {
                await clearAuth();
                router.push("/portal/login");
              }}
            >
              Logout
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardContent className="p-6">
              <h2 className="font-semibold">Projects</h2>
              <div className="mt-4 space-y-3">
                {(data.projects || []).length === 0 && (
                  <p className="text-sm text-muted">No projects assigned yet. Contact support to get started.</p>
                )}
                {(data.projects || []).map((project: any) => (
                  <div key={project.id} className="rounded-xl border border-border p-4">
                    <p className="font-medium">{project.title}</p>
                    <p className="mt-1 text-sm text-muted">{project.description}</p>
                    <p className="mt-2 text-xs text-accent">Status: {project.status} · Progress: {project.progress}%</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="font-semibold">Invoices</h2>
                {(data.invoices || []).length === 0 ? (
                  <p className="mt-3 text-sm text-muted">No invoices yet.</p>
                ) : (
                  <div className="mt-3 space-y-2">
                    {data.invoices.map((invoice: any) => (
                      <div key={invoice.id} className="text-sm">
                        {invoice.number} · ₹{invoice.amount} · {invoice.status}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h2 className="font-semibold">Support Tickets</h2>
                {(data.tickets || []).length === 0 ? (
                  <p className="mt-3 text-sm text-muted">No open tickets.</p>
                ) : (
                  <div className="mt-3 space-y-2">
                    {data.tickets.map((ticket: any) => (
                      <div key={ticket.id} className="text-sm">
                        {ticket.subject} · {ticket.status}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
