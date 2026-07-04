import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import Link from "next/link";
import { PageHero } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = createPageMetadata({
  title: "Resources",
  description:
    "Guides, documentation and tools from Mon Bai Dhakad Solutions Pvt. Ltd. (MBD Solutions).",
  path: "/resources",
});

export default function ResourcesPage() {
  const resources = [
    { href: "/blog", title: "Blog", description: "Business and technology insights." },
    { href: "/docs", title: "Documentation", description: "Developer and product docs." },
    { href: "/faqs", title: "FAQs", description: "Common questions answered." },
    { href: "/downloads", title: "Downloads", description: "Collections and assets." },
    { href: "/case-studies", title: "Case Studies", description: "Project outcomes and results." },
    { href: "/support", title: "Support", description: "Get help from our team." },
  ];

  return (
    <>
      <PageHero eyebrow="Resources" title="Resource Center" description="Guides, documentation and tools to help you plan and launch digital products." />
      <section className="py-16 md:py-20">
        <div className="mx-auto grid max-w-container gap-6 px-5 md:grid-cols-3 md:px-8">
          {resources.map((item) => (
            <Link key={item.href} href={item.href}>
              <Card className="h-full">
                <CardContent className="p-8">
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <p className="mt-2 text-sm text-muted">{item.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
