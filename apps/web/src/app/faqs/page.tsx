import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/section";
import { CTABand } from "@/components/shared/cta";
import { getList } from "@/lib/api";

export const metadata: Metadata = createPageMetadata({
  title: "FAQs",
  description:
    "Answers about pricing, delivery timelines, support and custom software development from Mon Bai Dhakad Solutions Pvt. Ltd. (MBD Solutions).",
  path: "/faqs",
});

export default async function FaqsPage() {
  let faqs: any[] = [];
  try {
    const res = await getList("faqs", { limit: "50" });
    faqs = res.data || [];
  } catch {}

  return (
    <>
      <PageHero eyebrow="Support" title="Frequently Asked Questions" description="Quick answers to common questions." />
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-3xl space-y-3 px-5 md:px-8">
          {faqs.map((faq) => (
            <details key={faq.id} className="group rounded-2xl border border-border bg-surface px-5 py-4 shadow-soft">
              <summary className="cursor-pointer list-none font-medium text-primary">
                <div className="flex items-center justify-between gap-4">
                  <span>{faq.question}</span>
                  <span className="text-muted transition group-open:rotate-45">+</span>
                </div>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
      <CTABand />
    </>
  );
}
