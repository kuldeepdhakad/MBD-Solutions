"use client";

import { ResourceManager } from "@/components/admin/resource-manager";

export default function AdminProjectsPage() {
  return (
    <ResourceManager
      title="Projects"
      resource="projects"
      fields={[
        { name: "title", label: "Title" },
        { name: "slug", label: "Slug" },
        { name: "clientName", label: "Client Name" },
        { name: "overview", label: "Overview", type: "textarea" },
        { name: "problem", label: "Problem", type: "textarea" },
        { name: "solution", label: "Solution", type: "textarea" },
        { name: "features", label: "Features (JSON)", type: "json" },
        { name: "gallery", label: "Gallery (JSON)", type: "json" },
        { name: "screenshots", label: "Screenshots (JSON)", type: "json" },
        { name: "techStack", label: "Tech Stack (JSON)", type: "json" },
        { name: "timeline", label: "Timeline" },
        { name: "results", label: "Results (JSON)", type: "json" },
        { name: "clientReview", label: "Client Review", type: "textarea" },
        { name: "liveDemoUrl", label: "Live Demo URL" },
        { name: "githubUrl", label: "GitHub URL" },
        { name: "status", label: "Status", type: "select", options: ["DRAFT", "PUBLISHED", "ARCHIVED"] },
        { name: "isFeatured", label: "Featured", type: "checkbox" },
        { name: "sortOrder", label: "Sort Order", type: "number" },
      ]}
    />
  );
}
