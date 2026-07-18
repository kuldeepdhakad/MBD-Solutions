import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/section";
import { TechnologyStackSection } from "@/components/home/technology-stack-section";
import { CTABand } from "@/components/shared/cta";
import { getList } from "@/lib/api";

export const metadata: Metadata = createPageMetadata({
  title: "Technologies",
  description:
    "Frontend, backend, databases, cloud, monitoring and security technologies used by Mon Bai Dhakad Solutions Pvt. Ltd. (MBD Solutions).",
  path: "/technologies",
});

export default async function TechnologiesPage() {
  let technologies: any[] = [];
  try {
    const res = await getList("technologies", { limit: "100" });
    technologies = res.data || [];
  } catch {
    technologies = [];
  }

  return (
    <>
      <PageHero
        eyebrow="Engineering"
        title="Technology Stack"
        description="Modern, scalable technologies powering every MBD Solutions product and client delivery."
      />
      <TechnologyStackSection technologies={technologies} />
      <CTABand />
    </>
  );
}
