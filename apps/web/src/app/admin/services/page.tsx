"use client";

import { ResourceManager } from "@/components/admin/resource-manager";

export default function AdminServicesPage() {
  return (
    <ResourceManager
      title="Services"
      resource="services"
      titleKey="title"
      fields={[
        { name: "title", label: "Title" },
        { name: "slug", label: "Slug" },
        { name: "shortDesc", label: "Short Description", type: "textarea" },
        { name: "description", label: "Description", type: "textarea" },
        { name: "icon", label: "Icon" },
        { name: "startingPrice", label: "Starting Price" },
        { name: "timeline", label: "Timeline" },
        { name: "features", label: "Features (JSON array)", type: "json" },
        { name: "benefits", label: "Benefits (JSON array)", type: "json" },
        { name: "process", label: "Process (JSON array)", type: "json" },
        { name: "techStack", label: "Tech Stack (JSON array)", type: "json" },
        { name: "pricing", label: "Pricing (JSON array)", type: "json" },
        { name: "status", label: "Status", type: "select", options: ["DRAFT", "PUBLISHED", "ARCHIVED"] },
        { name: "isFeatured", label: "Featured", type: "checkbox" },
        { name: "sortOrder", label: "Sort Order", type: "number" },
      ]}
    />
  );
}
