"use client";

import { ResourceManager } from "@/components/admin/resource-manager";

export default function AdminHomepagePage() {
  return (
    <ResourceManager
      title="Homepage Sections"
      resource="homepage"
      titleKey="title"
      query="status=ALL"
      fields={[
        { name: "key", label: "Section Key" },
        { name: "title", label: "Title" },
        { name: "subtitle", label: "Subtitle", type: "textarea" },
        { name: "content", label: "Content (JSON)", type: "json" },
        { name: "isVisible", label: "Visible", type: "checkbox" },
        { name: "sortOrder", label: "Sort Order", type: "number" },
      ]}
    />
  );
}
