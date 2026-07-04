"use client";

import { ResourceManager } from "@/components/admin/resource-manager";

export default function AdminTestimonialsPage() {
  return (
    <ResourceManager
      title="Testimonials"
      resource="testimonials"
      titleKey="name"
      fields={[
        { name: "name", label: "Name" },
        { name: "role", label: "Role" },
        { name: "company", label: "Company" },
        { name: "content", label: "Content", type: "textarea" },
        { name: "rating", label: "Rating", type: "number" },
        { name: "status", label: "Status", type: "select", options: ["DRAFT", "PUBLISHED", "ARCHIVED"] },
        { name: "isFeatured", label: "Featured", type: "checkbox" },
        { name: "sortOrder", label: "Sort Order", type: "number" },
      ]}
    />
  );
}
