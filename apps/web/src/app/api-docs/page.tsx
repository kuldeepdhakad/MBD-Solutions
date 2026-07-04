import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = createPageMetadata({
  title: "API Documentation",
  description:
    "REST API reference for the Mon Bai Dhakad Solutions Pvt. Ltd. (MBD Solutions) platform.",
  path: "/api-docs",
});

const endpoints = [
  { method: "POST", path: "/api/auth/login", desc: "Authenticate admin or client users" },
  { method: "POST", path: "/api/auth/refresh", desc: "Refresh access tokens" },
  { method: "GET", path: "/api/public/home", desc: "Homepage aggregate payload" },
  { method: "GET", path: "/api/services", desc: "List published services" },
  { method: "GET", path: "/api/products/:slug", desc: "Product detail by slug" },
  { method: "GET", path: "/api/projects", desc: "Portfolio projects" },
  { method: "GET", path: "/api/blogs", desc: "Published blog posts" },
  { method: "POST", path: "/api/contacts", desc: "Submit consultation request" },
  { method: "POST", path: "/api/applications", desc: "Submit job application" },
  { method: "GET", path: "/api/search?q=", desc: "Global content search" },
  { method: "GET", path: "/api/analytics/dashboard", desc: "Admin analytics (auth)" },
  { method: "POST", path: "/api/media/upload", desc: "Upload media to Cloudinary (auth)" },
];

export default function ApiDocsPage() {
  return (
    <>
      <PageHero eyebrow="API" title="REST API Documentation" description="Base URL: /api — JSON responses, JWT authentication, RBAC protected admin routes." />
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-container space-y-4 px-5 md:px-8">
          <Card>
            <CardContent className="p-8">
              <h2 className="text-xl font-semibold">Authentication</h2>
              <p className="mt-3 text-sm text-muted">
                Send <code className="rounded bg-surface px-1.5 py-0.5">Authorization: Bearer &lt;accessToken&gt;</code> on protected routes.
                Use refresh tokens to renew sessions without re-login.
              </p>
            </CardContent>
          </Card>
          {endpoints.map((endpoint) => (
            <Card key={endpoint.path}>
              <CardContent className="flex flex-col gap-2 p-5 md:flex-row md:items-center md:gap-6">
                <span className="inline-flex w-fit rounded-md bg-surface px-2 py-1 text-xs font-semibold text-accent">
                  {endpoint.method}
                </span>
                <code className="text-sm font-medium text-primary">{endpoint.path}</code>
                <span className="text-sm text-muted md:ml-auto">{endpoint.desc}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
