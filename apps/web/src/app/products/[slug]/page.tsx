import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CheckCircle2,
  Code2,
  ExternalLink,
  Layers,
  MessageSquare,
  Server,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CTABand } from "@/components/shared/cta";
import { DynamicIcon } from "@/components/shared/icon";
import { JsonLd } from "@/components/seo/json-ld";
import { DetailBanner } from "@/components/shared/detail-banner";
import { getOne, siteConfig, whatsappLink } from "@/lib/api";
import { resolveProductDemoUrl } from "@/lib/demos";
import { getProductImage } from "@/lib/images";
import {
  breadcrumbJsonLd,
  createPageMetadata,
  serviceJsonLd,
} from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  try {
    const product = await getOne("products", slug);
    const title = product.metaTitle || product.name;
    const description =
      product.metaDesc ||
      product.tagline ||
      `${product.name} by Mon Bai Dhakad Solutions Pvt. Ltd. (MBD Solutions).`;
    return createPageMetadata({
      title,
      description,
      path: `/products/${slug}`,
      image: product.coverImage || product.image,
    });
  } catch {
    return createPageMetadata({
      title: "Product",
      description:
        "Software products by Mon Bai Dhakad Solutions Pvt. Ltd. (MBD Solutions).",
      path: `/products/${slug}`,
      noIndex: true,
    });
  }
}

export default async function ProductDetailPage({ params }: Props) {
  let product: any;
  try {
    product = await getOne("products", (await params).slug);
  } catch {
    notFound();
  }

  const features = Array.isArray(product.features) ? product.features : [];
  const screenshots = Array.isArray(product.screenshots) ? product.screenshots : [];
  const gallery = Array.isArray(product.gallery) ? product.gallery : [];
  const techStack = Array.isArray(product.techStack) ? product.techStack : [];
  const pricing = Array.isArray(product.pricing) ? product.pricing : [];
  const faqs = Array.isArray(product.faqs) ? product.faqs : [];
  const demoUrl = resolveProductDemoUrl(product);

  const detailSections = [
    { title: "Architecture", body: product.architecture, icon: Layers },
    { title: "Database", body: product.databaseInfo, icon: Server },
    { title: "API", body: product.apiInfo, icon: Code2 },
    { title: "Admin Panel", body: product.adminPanel, icon: Layers },
    { title: "Mobile App", body: product.mobileApp, icon: MessageSquare },
    { title: "Documentation", body: product.documentation, icon: Code2 },
  ].filter((s) => s.body);

  const softwareJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: product.name,
    description: product.overview,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: `${siteConfig.url}/products/${product.slug}`,
    provider: {
      "@type": "Organization",
      name: siteConfig.legalName,
      alternateName: siteConfig.name,
      url: siteConfig.url,
    },
    offers: pricing[0]
      ? {
          "@type": "Offer",
          price: String(pricing[0].price || pricing[0].amount || "").replace(/[^\d.]/g, "") || "0",
          priceCurrency: "INR",
        }
      : undefined,
  };

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Products", path: "/products" },
            { name: product.name, path: `/products/${product.slug}` },
          ]),
          serviceJsonLd({
            name: product.name,
            description: product.overview || product.tagline || product.name,
            path: `/products/${product.slug}`,
            image: product.coverImage || product.image,
          }),
          softwareJsonLd,
        ]}
      />

      <section
        className="relative overflow-hidden border-b border-border pt-28 pb-14 md:pt-32 md:pb-16"
        aria-labelledby="product-heading"
      >
        <div className="hero-grid pointer-events-none absolute inset-0 opacity-70" />
        <div className="relative mx-auto max-w-container px-5 md:px-8">
          <DetailBanner
            src={getProductImage(product.slug, product.bannerImage)}
            alt={product.name}
            priority
          />
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white shadow-soft">
            <DynamicIcon name={product.icon} className="h-7 w-7" />
          </div>
          <p className="mb-3 text-sm font-medium text-accent">Product</p>
          <h1
            id="product-heading"
            className="max-w-3xl text-4xl font-semibold tracking-tight text-primary md:text-5xl"
          >
            {product.name}
          </h1>
          <p className="mt-3 text-lg font-medium text-accent">{product.tagline}</p>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{product.overview}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {demoUrl && (
              <Button asChild variant="accent">
                <a href={demoUrl} target="_blank" rel="noopener noreferrer">
                  Live Demo <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            )}
            <Button asChild>
              <Link href="/contact">Contact Sales</Link>
            </Button>
            <Button asChild variant="outline">
              <a
                href={whatsappLink(`Hello MBD Solutions, I want ${product.name}.`)}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-16">
        <div className="mx-auto max-w-container space-y-14 px-5 md:px-8">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-primary">Overview</h2>
            <p className="mt-4 max-w-3xl leading-relaxed text-muted">{product.description}</p>
          </div>

          {features.length > 0 && (
            <div>
              <h2 className="mb-6 text-2xl font-semibold tracking-tight text-primary">Features</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {features.map((feature: any, i: number) => (
                  <div
                    key={i}
                    className="flex gap-3 rounded-2xl border border-border bg-surface p-5 shadow-soft"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                    <div>
                      <p className="font-medium text-primary">
                        {typeof feature === "string" ? feature : feature.title || feature.name}
                      </p>
                      {typeof feature === "object" && feature.description && (
                        <p className="mt-1 text-sm text-muted">{feature.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {screenshots.length > 0 && (
            <div>
              <h2 className="mb-6 text-2xl font-semibold tracking-tight text-primary">Screenshots</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {screenshots.map((shot: any, i: number) => (
                  <div
                    key={i}
                    className="overflow-hidden rounded-2xl border border-border bg-surface shadow-soft"
                  >
                    {typeof shot === "string" || shot.url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={typeof shot === "string" ? shot : shot.url}
                        alt={typeof shot === "object" ? shot.alt || product.name : product.name}
                        className="aspect-video w-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex aspect-video items-center justify-center bg-background text-sm text-muted">
                        {shot.title || `Screenshot ${i + 1}`}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {gallery.length > 0 && (
            <div>
              <h2 className="mb-6 text-2xl font-semibold tracking-tight text-primary">Gallery</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {gallery.map((item: any, i: number) => (
                  <div
                    key={i}
                    className="overflow-hidden rounded-2xl border border-border bg-surface shadow-soft"
                  >
                    {typeof item === "string" || item.url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={typeof item === "string" ? item : item.url}
                        alt={typeof item === "object" ? item.alt || product.name : product.name}
                        className="aspect-square w-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex aspect-square items-center justify-center bg-background p-4 text-center text-sm text-muted">
                        {item.title || `Gallery ${i + 1}`}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {techStack.length > 0 && (
            <div>
              <h2 className="mb-6 text-2xl font-semibold tracking-tight text-primary">
                Technology Stack
              </h2>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech: string, index: number) => (
                  <span
                    key={`${product.id}-tech-${index}`}
                    className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-secondary shadow-soft"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {detailSections.length > 0 && (
            <div className="grid gap-5 md:grid-cols-2">
              {detailSections.map((section, index) => (
                <Card key={`${product.id}-section-${index}`}>
                  <CardContent className="p-6">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-background text-accent">
                      <section.icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-semibold text-primary">{section.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{section.body}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {pricing.length > 0 && (
            <div>
              <h2 className="mb-6 text-2xl font-semibold tracking-tight text-primary">Pricing</h2>
              <div className="grid gap-5 md:grid-cols-3">
                {pricing.map((plan: any, i: number) => (
                  <Card
                    key={`${product.id}-plan-${i}`}
                    className={plan.popular || plan.isPopular ? "shadow-glow ring-1 ring-accent/20" : ""}
                  >
                    <CardContent className="p-6">
                      <p className="text-sm font-medium text-accent">
                        {plan.name || plan.tier || `Plan ${i + 1}`}
                      </p>
                      <p className="mt-2 text-3xl font-semibold text-primary">
                        {plan.price || plan.amount}
                      </p>
                      {plan.period && <p className="text-sm text-muted">{plan.period}</p>}
                      {plan.description && (
                        <p className="mt-3 text-sm text-muted">{plan.description}</p>
                      )}
                      {Array.isArray(plan.features) && (
                        <ul className="mt-4 space-y-2">
                          {plan.features.map((f: string, fi: number) => (
                            <li key={`${product.id}-plan-${i}-f-${fi}`} className="flex gap-2 text-sm text-secondary">
                              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                              {f}
                            </li>
                          ))}
                        </ul>
                      )}
                      <Button asChild className="mt-6 w-full" variant={plan.popular ? "accent" : "default"}>
                        <Link href="/contact">Contact Sales</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {faqs.length > 0 && (
            <div>
              <h2 className="mb-6 text-2xl font-semibold tracking-tight text-primary">FAQ</h2>
              <div className="mx-auto max-w-3xl space-y-3">
                {faqs.map((faq: any, i: number) => (
                  <details
                    key={i}
                    className="group rounded-2xl border border-border bg-surface px-5 py-4 shadow-soft"
                  >
                    <summary className="cursor-pointer list-none font-medium text-primary">
                      {faq.question || faq.q}
                    </summary>
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      {faq.answer || faq.a}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          )}

          <Card className="bg-primary text-primary-foreground">
            <CardContent className="flex flex-col items-start justify-between gap-6 p-8 md:flex-row md:items-center">
              <div>
                <h3 className="text-2xl font-semibold text-primary-foreground">
                  Ready to deploy {product.name}?
                </h3>
                <p className="mt-2 text-primary-foreground/70">
                  Get a live demo, pricing and implementation timeline from our team.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                {demoUrl && (
                  <Button asChild variant="accent">
                    <a href={demoUrl} target="_blank" rel="noopener noreferrer">
                      Live Demo
                    </a>
                  </Button>
                )}
                <Button
                  asChild
                  variant="outline"
                  className="border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
                >
                  <Link href="/contact">Contact Sales</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <CTABand />
    </>
  );
}
