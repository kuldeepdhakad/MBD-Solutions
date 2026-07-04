"use client";

import { ResourceManager } from "@/components/admin/resource-manager";

export default function AdminProductsPage() {
  return (
    <ResourceManager
      title="Products"
      resource="products"
      titleKey="name"
      fields={[
        { name: "name", label: "Name" },
        { name: "slug", label: "Slug" },
        { name: "tagline", label: "Tagline" },
        { name: "overview", label: "Overview", type: "textarea" },
        { name: "description", label: "Description", type: "textarea" },
        { name: "icon", label: "Icon" },
        { name: "liveDemoUrl", label: "Live Demo URL" },
        { name: "features", label: "Features (JSON)", type: "json" },
        { name: "screenshots", label: "Screenshots (JSON)", type: "json" },
        { name: "gallery", label: "Gallery (JSON)", type: "json" },
        { name: "techStack", label: "Tech Stack (JSON)", type: "json" },
        { name: "architecture", label: "Architecture", type: "textarea" },
        { name: "databaseInfo", label: "Database", type: "textarea" },
        { name: "apiInfo", label: "API", type: "textarea" },
        { name: "adminPanel", label: "Admin Panel", type: "textarea" },
        { name: "mobileApp", label: "Mobile App", type: "textarea" },
        { name: "documentation", label: "Documentation", type: "textarea" },
        { name: "pricing", label: "Pricing (JSON)", type: "json" },
        { name: "faqs", label: "FAQs (JSON)", type: "json" },
        { name: "status", label: "Status", type: "select", options: ["DRAFT", "PUBLISHED", "ARCHIVED"] },
        { name: "isFeatured", label: "Featured", type: "checkbox" },
        { name: "sortOrder", label: "Sort Order", type: "number" },
      ]}
    />
  );
}
