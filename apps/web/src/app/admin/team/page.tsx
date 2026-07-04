"use client";

import { ResourceManager } from "@/components/admin/resource-manager";

export default function AdminTeamPage() {
  return (
    <ResourceManager
      title="Team Members"
      resource="team"
      titleKey="name"
      fields={[
        { name: "name", label: "Name" },
        { name: "role", label: "Role" },
        { name: "bio", label: "Bio", type: "textarea" },
        { name: "experience", label: "Experience" },
        { name: "skills", label: "Skills (JSON)", type: "json" },
        { name: "email", label: "Email" },
        { name: "linkedinUrl", label: "LinkedIn" },
        { name: "githubUrl", label: "GitHub" },
        { name: "isLeadership", label: "Leadership", type: "checkbox" },
        { name: "status", label: "Status", type: "select", options: ["DRAFT", "PUBLISHED", "ARCHIVED"] },
        { name: "sortOrder", label: "Sort Order", type: "number" },
      ]}
    />
  );
}
