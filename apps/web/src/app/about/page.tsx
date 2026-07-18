import type { Metadata } from "next";
import { PageHero } from "@/components/ui/section";
import { AboutShowcase } from "@/components/premium/about-showcase";
import { CTABand } from "@/components/shared/cta";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "About Us",
  description:
    "Learn about Mon Bai Dhakad Solutions Pvt. Ltd. (MBD Solutions), our mission, vision and journey helping businesses grow digitally across India.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <PageHero
        eyebrow="About"
        title="Built to Help Businesses Grow Digitally"
        description="MBD Solutions (Mon Bai Dhakad Solutions) delivers websites, software, mobile apps, AI solutions and digital marketing for businesses across India."
      />
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-container px-5 md:px-8">
          <AboutShowcase />
        </div>
      </section>
      <CTABand />
    </>
  );
}
