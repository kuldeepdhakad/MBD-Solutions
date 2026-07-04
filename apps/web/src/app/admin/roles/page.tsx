"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { authedFetch } from "@/lib/auth";

export default function AdminRolesPage() {
  const [roles, setRoles] = useState<any[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    authedFetch("/roles?status=ALL")
      .then((res) => setRoles(res.data || []))
      .catch((e) => setError(e.message));
  }, []);

  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Roles & Permissions</h1>
        <p className="mt-1 text-sm text-muted">
          Role-based access control for Admin, Editor and User roles.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {roles.map((role) => (
          <Card key={role.id}>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-primary">{role.name}</h2>
              <p className="mt-1 text-sm text-muted">{role.description}</p>
              <p className="mt-4 text-xs font-medium uppercase tracking-wide text-muted">
                Permissions ({role.permissions?.length || 0})
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {(role.permissions || []).map((p: any) => (
                  <span
                    key={p.id}
                    className="rounded-full bg-background px-2.5 py-1 text-xs text-secondary"
                  >
                    {p.name}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
