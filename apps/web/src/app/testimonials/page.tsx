import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/section";
import { TestimonialsGrid } from "@/components/home/testimonials-grid";
import { TestimonialsShowcase } from "@/components/home/testimonials-showcase";
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
      <PageHero
        eyebrow="Social Proof"
        title="Client Testimonials"
        description="Trusted by clinics, gyms, restaurants and businesses across India."
      />
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-container px-5 md:px-8">
          <TestimonialsShowcase items={items} />
        </div>
      </section>
      <section className="border-t border-border bg-panel py-16 md:py-20">
        <div className="mx-auto max-w-container px-5 md:px-8">
          <h2 className="mb-8 text-center text-2xl font-semibold text-primary">More Client Reviews</h2>
          <TestimonialsGrid items={items} />
        </div>
      </section>
      <CTABand />
    </>
  );
}
