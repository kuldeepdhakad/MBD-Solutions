import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { CTABand } from "@/components/shared/cta";
import { DynamicIcon } from "@/components/shared/icon";
import { getList } from "@/lib/api";

export const metadata: Metadata = createPageMetadata({
  title: "Solutions",
  description:
    "Digital transformation, industry platforms, enterprise software and growth marketing by Mon Bai Dhakad Solutions Pvt. Ltd. (MBD Solutions).",
  path: "/solutions",
});

export default async function SolutionsPage() {
  let solutions: any[] = [];
  try {
    const res = await getList("solutions", { limit: "20" });
    solutions = res.data || [];
  } catch {}

  return (
    <>
      <PageHero eyebrow="Solutions" title="Business Solutions" description="From digital transformation to industry platforms and enterprise software." />
      <section className="py-16 md:py-20">
        <div className="mx-auto grid max-w-container gap-6 px-5 md:grid-cols-2 md:px-8">
          {solutions.map((solution) => (
            <Card key={solution.id}>
              <CardContent className="p-8">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-surface text-accent">
                  <DynamicIcon name={solution.icon} className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-semibold">{solution.title}</h2>
                <p className="mt-3 text-muted">{solution.description}</p>
                <ul className="mt-4 space-y-2 text-sm text-secondary">
                  {(solution.features || []).map((f: string, index: number) => (
                    <li key={`${solution.id}-feature-${index}`}>• {f}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <CTABand />
    </>
  );
}
