import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/api";

export const metadata: Metadata = createPageMetadata({
  title: "Downloads",
  description:
    "Postman collections and integration assets from Mon Bai Dhakad Solutions Pvt. Ltd. (MBD Solutions).",
  path: "/downloads",
});

export default function DownloadsPage() {
  return (
    <>
      <PageHero eyebrow="Resources" title="Downloads" description="Request Postman collections, architecture samples and onboarding kits." />
      <section className="py-16 md:py-20">
        <div className="mx-auto grid max-w-container gap-6 px-5 md:grid-cols-3 md:px-8">
          {[
            { title: "Postman Collection", body: "Ready-to-import API collection for authentication, content and admin routes." },
            { title: "Integration Checklist", body: "Implementation checklist for product rollout and staff training." },
            { title: "Brand Assets", body: "Logo usage and brand guidelines for partner and client materials." },
          ].map((item) => (
            <Card key={item.title}>
              <CardContent className="p-8">
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p className="mt-3 text-sm text-muted">{item.body}</p>
                <Button asChild className="mt-6" variant="outline">
                  <a href={`mailto:${siteConfig.email}?subject=${encodeURIComponent(item.title + " Request")}`}>
                    Request Access
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
