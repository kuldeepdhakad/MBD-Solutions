"use client";

import { ResourceManager } from "@/components/admin/resource-manager";

export default function AdminCategoriesPage() {
  return (
    <ResourceManager
      title="Blog Categories"
      resource="categories"
      titleKey="name"
      query="status=ALL"
      fields={[
        { name: "name", label: "Name" },
        { name: "slug", label: "Slug" },
      ]}
    />
  );
}
