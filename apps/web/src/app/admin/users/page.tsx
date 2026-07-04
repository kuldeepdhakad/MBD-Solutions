"use client";

import { ResourceManager } from "@/components/admin/resource-manager";

export default function AdminUsersPage() {
  return (
    <ResourceManager
      title="Users"
      resource="users"
      titleKey="name"
      query="status=ALL"
      fields={[
        { name: "name", label: "Name" },
        { name: "email", label: "Email" },
        { name: "phone", label: "Phone" },
        { name: "password", label: "Password (set on create/update)" },
        { name: "roleId", label: "Role ID" },
        { name: "isActive", label: "Active", type: "checkbox" },
      ]}
    />
  );
}
