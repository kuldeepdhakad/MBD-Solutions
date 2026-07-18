import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import Link from "next/link";
import { PageHero } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { CTABand } from "@/components/shared/cta";
import { ContentImage } from "@/components/shared/content-image";
import { DynamicIcon } from "@/components/shared/icon";
import { getList } from "@/lib/api";
import { getIndustryImage } from "@/lib/images";

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
        <div className="mx-auto grid max-w-container gap-6 px-5 sm:grid-cols-2 md:px-8 lg:grid-cols-3 xl:grid-cols-4">
          {industries.map((industry) => (
            <Link key={industry.id} href={`/industries/${industry.slug}`} className="group block h-full">
              <Card className="h-full overflow-hidden transition-shadow hover:shadow-card">
                <div className="relative h-32 overflow-hidden sm:h-36">
                  <ContentImage
                    src={getIndustryImage(industry.slug, industry.image)}
                    alt={industry.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent" />
                  <div className="absolute bottom-3 left-3 flex h-9 w-9 items-center justify-center rounded-lg border border-white/20 bg-white/15 text-white backdrop-blur-md">
                    <DynamicIcon name={industry.icon} className="h-4 w-4" />
                  </div>
                </div>
                <CardContent className="p-5">
                  <h2 className="font-semibold">{industry.name}</h2>
                  <p className="mt-2 line-clamp-3 text-sm text-muted">{industry.description}</p>
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
