import type { MetadataRoute } from "next";
import { getSitemapEntries } from "@/lib/api";
import { siteConfig } from "@/lib/site";

const staticRoutes: {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}[] = [
  { path: "", changeFrequency: "daily", priority: 1 },
  { path: "/services", changeFrequency: "weekly", priority: 0.9 },
  { path: "/products", changeFrequency: "weekly", priority: 0.9 },
  { path: "/solutions", changeFrequency: "weekly", priority: 0.8 },
  { path: "/portfolio", changeFrequency: "weekly", priority: 0.8 },
  { path: "/case-studies", changeFrequency: "weekly", priority: 0.7 },
  { path: "/industries", changeFrequency: "weekly", priority: 0.8 },
  { path: "/technologies", changeFrequency: "monthly", priority: 0.7 },
  { path: "/pricing", changeFrequency: "weekly", priority: 0.8 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/founder", changeFrequency: "monthly", priority: 0.7 },
  { path: "/leadership", changeFrequency: "monthly", priority: 0.6 },
  { path: "/team", changeFrequency: "monthly", priority: 0.6 },
  { path: "/careers", changeFrequency: "weekly", priority: 0.7 },
  { path: "/internship", changeFrequency: "weekly", priority: 0.6 },
  { path: "/blog", changeFrequency: "daily", priority: 0.8 },
  { path: "/testimonials", changeFrequency: "monthly", priority: 0.6 },
  { path: "/faqs", changeFrequency: "monthly", priority: 0.6 },
  { path: "/docs", changeFrequency: "monthly", priority: 0.5 },
  { path: "/developers", changeFrequency: "monthly", priority: 0.5 },
  { path: "/api-docs", changeFrequency: "monthly", priority: 0.5 },
  { path: "/downloads", changeFrequency: "monthly", priority: 0.4 },
  { path: "/resources", changeFrequency: "monthly", priority: 0.6 },
  { path: "/clients", changeFrequency: "monthly", priority: 0.6 },
  { path: "/support", changeFrequency: "monthly", priority: 0.6 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.9 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
  { path: "/cookies", changeFrequency: "yearly", priority: 0.3 },
  { path: "/search", changeFrequency: "monthly", priority: 0.4 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${siteConfig.url}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  try {
    const dynamic = await getSitemapEntries();
    return [
      ...staticEntries,
      ...dynamic.services.map((s) => ({
        url: `${siteConfig.url}/services/${s.slug}`,
        lastModified: s.updatedAt ? new Date(s.updatedAt) : now,
        changeFrequency: "weekly" as const,
        priority: 0.8,
      })),
      ...dynamic.products.map((p) => ({
        url: `${siteConfig.url}/products/${p.slug}`,
        lastModified: p.updatedAt ? new Date(p.updatedAt) : now,
        changeFrequency: "weekly" as const,
        priority: 0.8,
      })),
      ...dynamic.projects.map((p) => ({
        url: `${siteConfig.url}/portfolio/${p.slug}`,
        lastModified: p.updatedAt ? new Date(p.updatedAt) : now,
        changeFrequency: "weekly" as const,
        priority: 0.7,
      })),
      ...dynamic.blogs.map((b) => ({
        url: `${siteConfig.url}/blog/${b.slug}`,
        lastModified: b.updatedAt ? new Date(b.updatedAt) : now,
        changeFrequency: "weekly" as const,
        priority: 0.6,
      })),
      ...dynamic.industries.map((i) => ({
        url: `${siteConfig.url}/industries/${i.slug}`,
        lastModified: i.updatedAt ? new Date(i.updatedAt) : now,
        changeFrequency: "monthly" as const,
        priority: 0.6,
      })),
      ...dynamic.jobs.map((j) => ({
        url: `${siteConfig.url}/careers/${j.slug}`,
        lastModified: j.updatedAt ? new Date(j.updatedAt) : now,
        changeFrequency: "weekly" as const,
        priority: 0.5,
      })),
    ];
  } catch {
    return staticEntries;
  }
}
