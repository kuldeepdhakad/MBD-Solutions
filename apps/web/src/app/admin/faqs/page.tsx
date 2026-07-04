"use client";

import { ResourceManager } from "@/components/admin/resource-manager";

export default function AdminFaqsPage() {
  return (
    <ResourceManager
      title="FAQs"
      resource="faqs"
      titleKey="question"
      fields={[
        { name: "question", label: "Question" },
        { name: "answer", label: "Answer", type: "textarea" },
        { name: "category", label: "Category" },
        { name: "status", label: "Status", type: "select", options: ["DRAFT", "PUBLISHED", "ARCHIVED"] },
        { name: "sortOrder", label: "Sort Order", type: "number" },
      ]}
    />
  );
}
