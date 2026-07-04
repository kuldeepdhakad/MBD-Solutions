import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import { Star } from "lucide-react";
import { PageHero } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { CTABand } from "@/components/shared/cta";
import { getList } from "@/lib/api";

export const metadata: Metadata = createPageMetadata({
  title: "Testimonials",
  description:
    "What clients say about Mon Bai Dhakad Solutions Pvt. Ltd. (MBD Solutions) and our software delivery.",
  path: "/testimonials",
});

export default async function TestimonialsPage() {
  let items: any[] = [];
  try {
    const res = await getList("testimonials", { limit: "50" });
    items = res.data || [];
  } catch {}

  return (
    <>
      <PageHero eyebrow="Social Proof" title="Client Testimonials" description="Trusted by clinics, gyms, restaurants and businesses across India." />
      <section className="py-16 md:py-20">
        <div className="mx-auto grid max-w-container gap-6 px-5 md:grid-cols-2 md:px-8 lg:grid-cols-3">
          {items.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-6">
                <div className="mb-3 flex gap-1 text-warning">
                  {Array.from({ length: item.rating || 5 }).map((_, i) => (
                    <Star key={`${item.id}-star-${i}`} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-secondary">&ldquo;{item.content}&rdquo;</p>
                <div className="mt-5">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-muted">{item.role}{item.company ? `, ${item.company}` : ""}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <CTABand />
    </>
  );
}
