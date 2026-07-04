"use client";

import { ResourceManager } from "@/components/admin/resource-manager";

export default function AdminSeoPage() {
  return (
    <ResourceManager
      title="SEO Settings"
      resource="seo"
      titleKey="title"
      query="status=ALL"
      fields={[
        { name: "pagePath", label: "Page Path" },
        { name: "title", label: "Meta Title" },
        { name: "description", label: "Meta Description", type: "textarea" },
        { name: "keywords", label: "Keywords" },
        { name: "ogImage", label: "OG Image URL" },
        { name: "canonical", label: "Canonical URL" },
        { name: "noIndex", label: "No Index", type: "checkbox" },
        { name: "schemaJson", label: "Schema JSON", type: "json" },
      ]}
    />
  );
}
