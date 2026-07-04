import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import Link from "next/link";
import { PageHero } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = createPageMetadata({
  title: "Documentation",
  description:
    "Developer documentation for products and APIs from Mon Bai Dhakad Solutions Pvt. Ltd. (MBD Solutions).",
  path: "/docs",
});

const docs = [
  { href: "/api-docs", title: "REST API", description: "Authentication, endpoints, pagination and error handling." },
  { href: "/developers", title: "Developer Portal", description: "API keys, SDKs, webhooks and integration guides." },
  { href: "/downloads", title: "Downloads", description: "Postman collections and integration assets." },
  { href: "/resources", title: "Resources", description: "Guides, checklists and implementation playbooks." },
];

export default function DocsPage() {
  return (
    <>
      <PageHero eyebrow="Documentation" title="Developer Docs" description="Everything you need to integrate and extend MBD Solutions platforms." />
      <section className="py-16 md:py-20">
        <div className="mx-auto grid max-w-container gap-6 px-5 md:grid-cols-2 md:px-8">
          {docs.map((doc) => (
            <Link key={doc.href} href={doc.href}>
              <Card className="h-full">
                <CardContent className="p-8">
                  <h2 className="text-xl font-semibold">{doc.title}</h2>
                  <p className="mt-3 text-muted">{doc.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
