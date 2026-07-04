"use client";

import { ResourceManager } from "@/components/admin/resource-manager";

export default function AdminNewsletterPage() {
  return (
    <ResourceManager
      title="Newsletter Subscribers"
      resource="newsletter"
      titleKey="email"
      query="status=ALL"
      fields={[
        { name: "email", label: "Email" },
        { name: "isActive", label: "Active", type: "checkbox" },
      ]}
    />
  );
}
