import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import Link from "next/link";
import { PageHero } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { CTABand } from "@/components/shared/cta";
import { DynamicIcon } from "@/components/shared/icon";
import { getList } from "@/lib/api";

export const metadata: Metadata = createPageMetadata({
  title: "Industries",
  description:
    "Digital solutions for healthcare, fitness, restaurants, education, real estate and more by Mon Bai Dhakad Solutions Pvt. Ltd. (MBD Solutions).",
  path: "/industries",
});

export default async function IndustriesPage() {
  let industries: any[] = [];
  try {
    const res = await getList("industries", { limit: "50" });
    industries = res.data || [];
  } catch {}

  return (
    <>
      <PageHero eyebrow="Industries" title="Industries We Serve" description="Tailored digital solutions for every business category." />
      <section className="py-16 md:py-20">
        <div className="mx-auto grid max-w-container gap-6 px-5 md:grid-cols-2 md:px-8 lg:grid-cols-4">
          {industries.map((industry) => (
            <Link key={industry.id} href={`/industries/${industry.slug}`}>
              <Card className="h-full">
                <CardContent className="p-6">
                  <DynamicIcon name={industry.icon} className="mb-4 h-6 w-6 text-accent" />
                  <h2 className="font-semibold">{industry.name}</h2>
                  <p className="mt-2 text-sm text-muted">{industry.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
      <CTABand />
    </>
  );
}
