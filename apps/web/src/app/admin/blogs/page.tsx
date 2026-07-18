"use client";

import { ResourceManager } from "@/components/admin/resource-manager";

export default function AdminBlogsPage() {
  return (
    <ResourceManager
      title="Blogs"
      resource="blogs"
      fields={[
        { name: "title", label: "Title" },
        { name: "slug", label: "Slug" },
        { name: "excerpt", label: "Excerpt", type: "textarea" },
        { name: "content", label: "Content", type: "textarea" },
        { name: "coverImage", label: "Cover Image", type: "image" },
        { name: "status", label: "Status", type: "select", options: ["DRAFT", "PUBLISHED", "ARCHIVED"] },
        { name: "metaTitle", label: "Meta Title" },
        { name: "metaDesc", label: "Meta Description", type: "textarea" },
      ]}
    />
  );
}
