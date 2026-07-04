import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/ui/section";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CTABand } from "@/components/shared/cta";
import { DynamicIcon } from "@/components/shared/icon";
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
      <section className="py-16 md:py-20">
        <div className="mx-auto grid max-w-container gap-6 px-5 md:grid-cols-2 md:px-8 lg:grid-cols-3">
          {services.map((service) => (
            <Card key={service.id} className="group">
              <CardHeader>
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-surface text-accent">
                  <DynamicIcon name={service.icon} className="h-5 w-5" />
                </div>
                <CardTitle>{service.title}</CardTitle>
                <CardDescription>{service.shortDesc}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-medium text-primary">
                  Starting at {service.startingPrice}
                </p>
                <Link
                  href={`/services/${service.slug}`}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent"
                >
                  View details
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <CTABand />
    </>
  );
}
