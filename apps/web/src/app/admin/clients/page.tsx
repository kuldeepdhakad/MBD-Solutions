"use client";

import { ResourceManager } from "@/components/admin/resource-manager";

export default function AdminClientsPage() {
  return (
    <ResourceManager
      title="Clients"
      resource="clients"
      titleKey="name"
      query=""
      fields={[
        { name: "name", label: "Name" },
        { name: "industry", label: "Industry" },
        { name: "website", label: "Website" },
        { name: "logo", label: "Logo", type: "image" },
        { name: "isFeatured", label: "Featured", type: "checkbox" },
        { name: "sortOrder", label: "Sort Order", type: "number" },
      ]}
    />
  );
}
