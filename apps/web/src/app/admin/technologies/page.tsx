"use client";

import { ResourceManager } from "@/components/admin/resource-manager";

export default function AdminTechnologiesPage() {
  return (
    <ResourceManager
      title="Technologies"
      resource="technologies"
      titleKey="name"
      fields={[
        { name: "name", label: "Name" },
        { name: "slug", label: "Slug" },
        { name: "category", label: "Category" },
        { name: "description", label: "Description", type: "textarea" },
        { name: "icon", label: "Icon" },
        { name: "websiteUrl", label: "Website URL" },
        { name: "status", label: "Status", type: "select", options: ["DRAFT", "PUBLISHED", "ARCHIVED"] },
        { name: "isFeatured", label: "Featured", type: "checkbox" },
        { name: "sortOrder", label: "Sort Order", type: "number" },
      ]}
    />
  );
}
