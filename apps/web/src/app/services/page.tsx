import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/section";
import { ServicesGrid } from "@/components/home/services-grid";
import { Button } from "@/components/ui/button";
import { CTABand } from "@/components/shared/cta";
import { JsonLd } from "@/components/seo/json-ld";
import { getList } from "@/lib/api";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Services",
  description:
    "Web Development, Mobile App Development, AI, Blockchain, Cloud Computing, UI/UX Design and IT Consulting by Mon Bai Dhakad Solutions Pvt. Ltd. (MBD Solutions).",
  path: "/services",
});

export default async function ServicesPage() {
  let services: any[] = [];
  try {
    const res = await getList("services", { limit: "50" });
    services = res.data || [];
  } catch {
    services = [];
  }

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />
      <PageHero
        eyebrow="Services"
        title="Our Services"
        description="Transparent pricing for websites, software, mobile apps, AI and digital marketing. No hidden charges."
      />
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-container px-5 md:px-8">
          <ServicesGrid services={services} />
          <div className="mt-10 text-center">
            <Button asChild variant="outline">
              <Link href="/contact">Request Custom Quote</Link>
            </Button>
          </div>
        </div>
      </section>
      <CTABand />
    </>
  );
}
