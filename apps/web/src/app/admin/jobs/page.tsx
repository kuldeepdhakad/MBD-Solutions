"use client";

import { ResourceManager } from "@/components/admin/resource-manager";

export default function AdminJobsPage() {
  return (
    <ResourceManager
      title="Jobs"
      resource="jobs"
      query="status=ALL"
      fields={[
        { name: "title", label: "Title" },
        { name: "slug", label: "Slug" },
        { name: "department", label: "Department" },
        { name: "location", label: "Location" },
        { name: "type", label: "Type", type: "select", options: ["FULL_TIME", "PART_TIME", "CONTRACT", "INTERNSHIP", "REMOTE"] },
        { name: "description", label: "Description", type: "textarea" },
        { name: "requirements", label: "Requirements (JSON)", type: "json" },
        { name: "responsibilities", label: "Responsibilities (JSON)", type: "json" },
        { name: "benefits", label: "Benefits (JSON)", type: "json" },
        { name: "salaryRange", label: "Salary Range" },
        { name: "isActive", label: "Active", type: "checkbox" },
        { name: "isInternship", label: "Internship", type: "checkbox" },
      ]}
    />
  );
}
