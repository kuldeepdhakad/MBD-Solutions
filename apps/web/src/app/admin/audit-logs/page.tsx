"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { authedFetch } from "@/lib/auth";

export default function AdminAuditLogsPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    authedFetch("/audit-logs?status=ALL&limit=100")
      .then((res) => setLogs(res.data || []))
      .catch((e) => setError(e.message));
  }, []);

  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Audit Logs</h1>
        <p className="mt-1 text-sm text-muted">Track admin actions across the platform.</p>
      </div>
      <Card>
        <CardContent className="divide-y divide-border p-0">
          {logs.length === 0 && (
            <p className="p-6 text-sm text-muted">No audit logs yet.</p>
          )}
          {logs.map((log) => (
            <div key={log.id} className="flex flex-col gap-1 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-medium text-primary">
                  {log.action} · {log.entity}
                </p>
                <p className="text-sm text-muted">
                  {log.user?.name || "System"} · {log.entityId || "—"}
                </p>
              </div>
              <p className="text-xs text-muted">
                {new Date(log.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
