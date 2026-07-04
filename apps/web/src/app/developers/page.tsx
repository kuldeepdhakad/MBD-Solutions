import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import Link from "next/link";
import { PageHero } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = createPageMetadata({
  title: "Developer Portal",
  description:
    "API keys, SDKs, webhooks and integration guides from Mon Bai Dhakad Solutions Pvt. Ltd. (MBD Solutions).",
  path: "/developers",
});

export default function DevelopersPage() {
  return (
    <>
      <PageHero eyebrow="Developers" title="Developer Portal" description="Build on top of MBD Solutions APIs with secure authentication, webhooks and documented endpoints." />
      <section className="py-16 md:py-20">
        <div className="mx-auto grid max-w-container gap-6 px-5 md:grid-cols-3 md:px-8">
          {[
            { title: "Authentication", body: "JWT access tokens and refresh tokens with role-based access control." },
            { title: "API Keys", body: "Issue project-scoped keys for client integrations and automation." },
            { title: "Webhooks", body: "Receive events for contacts, applications, orders and project updates." },
            { title: "SDKs", body: "TypeScript-friendly patterns for Next.js and NestJS consumers." },
            { title: "Rate Limits", body: "Protective throttling with predictable response headers." },
            { title: "Sandbox", body: "Test integrations safely before production rollout." },
          ].map((item) => (
            <Card key={item.title}>
              <CardContent className="p-6">
                <h2 className="font-semibold">{item.title}</h2>
                <p className="mt-2 text-sm text-muted">{item.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mx-auto mt-10 max-w-container px-5 md:px-8">
          <Button asChild variant="accent"><Link href="/api-docs">Open API Documentation</Link></Button>
        </div>
      </section>
    </>
  );
}
