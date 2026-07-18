import type { Metadata } from "next";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/section";
import { PortfolioShowcase } from "@/components/home/portfolio-showcase";
import { CTABand } from "@/components/shared/cta";
import { JsonLd } from "@/components/seo/json-ld";
import { getList } from "@/lib/api";

export const metadata: Metadata = createPageMetadata({
  title: "Portfolio",
  description:
    "Explore delivered projects and live demos across healthcare, fitness, restaurants and enterprise software by Mon Bai Dhakad Solutions Pvt. Ltd. (MBD Solutions).",
  path: "/portfolio",
});

export default async function PortfolioPage() {
  let projects: any[] = [];
  try {
    const res = await getList("projects", { limit: "50" });
    projects = res.data || [];
  } catch {
    projects = [];
  }

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Portfolio", path: "/portfolio" },
        ])}
      />
      <PageHero
        eyebrow="Portfolio"
        title="Selected Work"
        description="Real projects delivered for clinics, gyms, restaurants, contractors and growing businesses."
      />
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-container px-5 md:px-8">
          <PortfolioShowcase projects={projects} />
        </div>
      </section>
      <CTABand />
    </>
  );
}
