import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CTABand } from "@/components/shared/cta";
import { DynamicIcon } from "@/components/shared/icon";
import { JsonLd } from "@/components/seo/json-ld";
import { getOne, whatsappLink } from "@/lib/api";
import {
  breadcrumbJsonLd,
  createPageMetadata,
  serviceJsonLd,
} from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  try {
    const service = await getOne("services", slug);
    const title = service.metaTitle || service.title;
    const description =
      service.metaDesc ||
      service.shortDesc ||
      `${service.title} by Mon Bai Dhakad Solutions Pvt. Ltd. (MBD Solutions).`;
    return createPageMetadata({
      title,
      description,
      path: `/services/${slug}`,
    });
  } catch {
    return createPageMetadata({
      title: "Service",
      description:
        "Software and digital services by Mon Bai Dhakad Solutions Pvt. Ltd. (MBD Solutions).",
      path: `/services/${slug}`,
      noIndex: true,
    });
  }
}

export default async function ServiceDetailPage({ params }: Props) {
  let service: any;
  try {
    service = await getOne("services", (await params).slug);
  } catch {
    notFound();
  }

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: service.title, path: `/services/${service.slug}` },
          ]),
          serviceJsonLd({
            name: service.title,
            description: service.shortDesc || service.description || service.title,
            path: `/services/${service.slug}`,
            image: service.image,
          }),
        ]}
      />
      <section
        className="border-b border-border bg-surface/60 pt-28 pb-16 md:pt-36"
        aria-labelledby="service-heading"
      >
        <div className="mx-auto max-w-container px-5 md:px-8">
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-surface text-accent shadow-soft">
            <DynamicIcon name={service.icon} className="h-7 w-7" />
          </div>
          <h1
            id="service-heading"
            className="max-w-3xl text-4xl font-semibold tracking-tight text-primary md:text-5xl"
          >
            {service.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted">{service.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="accent">
              <Link href="/contact">Get a Quote</Link>
            </Button>
            <Button asChild variant="whatsapp">
              <a
                href={whatsappLink(`Hello MBD Solutions, I am interested in ${service.title}.`)}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp Quote
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto grid max-w-container gap-8 px-5 md:px-8 lg:grid-cols-2">
          <Card>
            <CardContent className="p-8">
              <h2 className="text-xl font-semibold">Features</h2>
              <ul className="mt-4 space-y-3">
                {(service.features || []).map((item: string, index: number) => (
                  <li key={`${service.id}-feature-${index}`} className="flex gap-2 text-sm text-secondary">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-8">
              <h2 className="text-xl font-semibold">Benefits</h2>
              <ul className="mt-4 space-y-3">
                {(service.benefits || []).map((item: string, index: number) => (
                  <li key={`${service.id}-benefit-${index}`} className="flex gap-2 text-sm text-secondary">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-8">
              <h2 className="text-xl font-semibold">Process</h2>
              <ol className="mt-4 space-y-3">
                {(service.process || []).map((item: string, i: number) => (
                  <li key={`${service.id}-process-${i}`} className="flex gap-3 text-sm text-secondary">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-surface text-xs font-semibold text-accent">
                      {i + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-8">
              <h2 className="text-xl font-semibold">Technology Stack</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {(service.techStack || []).map((tech: string, index: number) => (
                  <span key={`${service.id}-tech-${index}`} className="rounded-full bg-background px-3 py-1 text-sm text-secondary">
                    {tech}
                  </span>
                ))}
              </div>
              {service.timeline && (
                <p className="mt-6 text-sm text-muted">
                  <span className="font-medium text-primary">Timeline:</span> {service.timeline}
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mx-auto mt-10 max-w-container px-5 md:px-8">
          <Card>
            <CardContent className="p-8">
              <h2 className="text-xl font-semibold">Pricing</h2>
              <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {(service.pricing || []).map((plan: any, index: number) => (
                  <div key={`${service.id}-plan-${plan.name || index}`} className="rounded-xl border border-border bg-background p-4">
                    <p className="text-sm text-muted">{plan.name}</p>
                    <p className="mt-1 text-xl font-semibold text-primary">{plan.price}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      <CTABand title={`Start your ${service.title} project`} />
    </>
  );
}
