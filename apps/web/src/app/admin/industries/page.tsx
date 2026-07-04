"use client";

import { ResourceManager } from "@/components/admin/resource-manager";

export default function AdminIndustriesPage() {
  return (
    <ResourceManager
      title="Industries"
      resource="industries"
      titleKey="name"
      fields={[
        { name: "name", label: "Name" },
        { name: "slug", label: "Slug" },
        { name: "description", label: "Description", type: "textarea" },
        { name: "icon", label: "Icon" },
        { name: "image", label: "Image URL" },
        { name: "solutions", label: "Solutions (JSON)", type: "json" },
        { name: "status", label: "Status", type: "select", options: ["DRAFT", "PUBLISHED", "ARCHIVED"] },
        { name: "isFeatured", label: "Featured", type: "checkbox" },
        { name: "sortOrder", label: "Sort Order", type: "number" },
      ]}
    />
  );
}
