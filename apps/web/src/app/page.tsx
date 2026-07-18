import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
  CheckCircle2,
  ShieldCheck,
  Clock3,
  BadgeCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Section, SectionHeader } from "@/components/ui/section";
import { CTABand } from "@/components/shared/cta";
import { DynamicIcon } from "@/components/shared/icon";
import { ContentImage } from "@/components/shared/content-image";
import { HeroGlobeClient } from "@/components/home/hero-globe";
import { AnimatedStats } from "@/components/home/animated-stats";
import { TrustedBySection } from "@/components/home/trusted-by-section";
import { ServiceCardPremium } from "@/components/home/service-card-premium";
import { Skeleton } from "@/components/ui/skeleton";
import { JsonLd } from "@/components/seo/json-ld";
import { getHomeData, siteConfig, whatsappLink } from "@/lib/api";
import { resolveProductDemoUrl } from "@/lib/demos";
import {
  BUSINESS_STRENGTHS,
  DEFAULT_STATS,
  HERO_COPY,
  dedupeStats,
  resolveTrustedClients,
} from "@/lib/home-content";
import { ProductCard } from "@/components/shared/product-card";
import { brandImages, getIndustryImage } from "@/lib/images";
import { BlogCard } from "@/components/shared/blog-card";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

const TechnologyStackSection = dynamic(
  () =>
    import("@/components/home/technology-stack-section").then(
      (m) => m.TechnologyStackSection,
    ),
  {
    loading: () => (
      <div className="py-16 md:py-20">
        <div className="mx-auto max-w-container px-5 md:px-8">
          <Skeleton className="mx-auto mb-10 h-8 w-48" />
          <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <Skeleton key={i} className="h-16 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    ),
  },
);

const PortfolioShowcase = dynamic(
  () =>
    import("@/components/home/portfolio-showcase").then((m) => m.PortfolioShowcase),
  {
    loading: () => (
      <div className="grid gap-6 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-64 rounded-2xl" />
        ))}
      </div>
    ),
  },
);

const TestimonialsShowcase = dynamic(
  () =>
    import("@/components/home/testimonials-showcase").then(
      (m) => m.TestimonialsShowcase,
    ),
  {
    loading: () => (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-48 rounded-2xl" />
        ))}
      </div>
    ),
  },
);

export const metadata: Metadata = createPageMetadata({
  title: siteConfig.title,
  description: siteConfig.description,
  path: "/",
  absoluteTitle: true,
});

async function loadHome() {
  try {
    return await getHomeData();
  } catch {
    return null;
  }
}

const trustBadges = [
  { icon: ShieldCheck, label: "Secure delivery" },
  { icon: Clock3, label: "On-time projects" },
  { icon: BadgeCheck, label: "Production-ready code" },
];

export default async function HomePage() {
  const data: any = await loadHome();
  const hero = data?.sections?.find((s: any) => s.key === "hero");
  const stats = dedupeStats(
    (data?.stats?.length ? data.stats : DEFAULT_STATS).map((s: any, index: number) => ({
      id: s.id ?? `stat-${index}`,
      label: s.label,
      value: s.value,
      suffix: s.suffix ?? undefined,
    })),
  );

  const trustedClients = resolveTrustedClients(data?.clients || []);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([{ name: "Home", path: "/" }])}
      />
      <section
        id="hero"
        className="relative overflow-hidden border-b border-border pt-24 pb-12 md:pt-28 md:pb-14"
        aria-labelledby="home-hero-heading"
      >
        <div className="hero-grid pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-accent/[0.06] blur-3xl" />
        <div className="pointer-events-none absolute -right-16 bottom-0 h-56 w-56 rounded-full bg-primary/[0.04] blur-3xl" />

        <div className="relative mx-auto grid max-w-container items-center gap-8 px-5 md:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
          <div className="animate-fade-up">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium tracking-wide text-accent shadow-soft">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {siteConfig.legalName}
            </p>
            <h1
              id="home-hero-heading"
              className="max-w-xl text-display font-semibold tracking-tight text-foreground"
            >
              {hero?.title || HERO_COPY.title}
            </h1>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-muted md:text-lg md:leading-relaxed">
              {hero?.subtitle || HERO_COPY.subtitle}
            </p>

            <div className="mt-6 flex flex-wrap gap-1.5 sm:gap-2">
              {BUSINESS_STRENGTHS.map((label) => (
                <span
                  key={label}
                  className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-border bg-surface px-2.5 py-1 text-[11px] font-medium text-secondary shadow-soft sm:px-3 sm:text-xs"
                >
                  <CheckCircle2 className="h-3 w-3 shrink-0 text-accent" />
                  {label}
                </span>
              ))}
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" variant="accent">
                <Link href="/contact">Get Free Consultation</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                  WhatsApp Demo
                </a>
              </Button>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              {trustBadges.map((badge, index) => (
                <div
                  key={`trust-${index}`}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-muted"
                >
                  <badge.icon className="h-3.5 w-3.5 text-accent" />
                  {badge.label}
                </div>
              ))}
            </div>
          </div>

          <div className="relative animate-fade-up [animation-delay:120ms]">
            <div className="absolute inset-8 rounded-full bg-accent/[0.07] blur-2xl" />
            <div className="relative rounded-[2rem] border border-border bg-surface/70 p-4 shadow-card backdrop-blur-sm">
              <HeroGlobeClient />
              <div className="mt-2 flex items-center justify-center gap-2 pb-1 text-xs text-muted">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-success" />
                Serving clients across India
              </div>
            </div>
          </div>
        </div>

        <div className="relative mx-auto mt-10 max-w-container px-5 md:px-8">
          <AnimatedStats stats={stats} />
        </div>
      </section>

      <TrustedBySection clients={trustedClients} />

      <Section id="services">
        <SectionHeader
          eyebrow="Services"
          title="What We Build"
          description="Transparent pricing. No hidden charges. Custom solutions available on request."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {(data?.services || []).map((service: any, index: number) => (
            <ServiceCardPremium
              key={service.id}
              id={service.id}
              title={service.title}
              shortDesc={service.shortDesc}
              slug={service.slug}
              icon={service.icon}
              startingPrice={service.startingPrice}
              bannerImage={service.bannerImage}
              index={index}
            />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button asChild variant="outline">
            <Link href="/services">View All Services</Link>
          </Button>
        </div>
      </Section>

      <TechnologyStackSection technologies={data?.technologies} />

      <Section id="products" className="bg-panel">
        <SectionHeader
          eyebrow="Products"
          title="Featured Products"
          description="Production-ready platforms for healthcare, fitness, restaurants and enterprise operations."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {(data?.products || []).map((product: any) => (
            <ProductCard
              key={product.id}
              product={product}
              demoUrl={resolveProductDemoUrl(product)}
            />
          ))}
        </div>
      </Section>

      <Section id="portfolio">
        <SectionHeader
          eyebrow="Portfolio"
          title="Featured Projects"
          description="Real outcomes for clinics, gyms, restaurants and contractors."
        />
        <PortfolioShowcase projects={data?.projects || []} />
      </Section>

      <Section className="bg-panel">
        <SectionHeader
          title="Industries We Serve"
          description="Tailored digital solutions for every business category."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {(data?.industries || []).map((industry: any) => (
            <Link
              key={industry.id}
              href={`/industries/${industry.slug}`}
              className="group block overflow-hidden rounded-2xl border border-border bg-surface shadow-soft transition hover:border-accent/25 hover:shadow-card"
            >
              <div className="relative h-28 overflow-hidden sm:h-32">
                <ContentImage
                  src={getIndustryImage(industry.slug, industry.image)}
                  alt={industry.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent" />
                <div className="absolute bottom-3 left-3 flex h-8 w-8 items-center justify-center rounded-lg border border-white/20 bg-white/15 text-white backdrop-blur-md">
                  <DynamicIcon name={industry.icon} className="h-4 w-4" />
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm font-semibold text-primary">{industry.name}</p>
                {industry.description && (
                  <p className="mt-1 line-clamp-2 text-xs text-muted">{industry.description}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader
          title="Our Development Process"
          description="A clear path from discovery to delivery."
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {(data?.processSteps || []).map((step: any, index: number) => (
            <div
              key={step.id}
              className="rounded-2xl border border-border bg-surface p-6 shadow-soft"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-background text-sm font-semibold text-accent">
                {index + 1}
              </div>
              <h3 className="text-lg font-semibold text-primary">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="testimonials" className="bg-panel">
        <SectionHeader
          title="What Our Clients Say"
          description="Trusted by 50+ businesses across India."
        />
        <TestimonialsShowcase items={data?.testimonials || []} />
      </Section>

      <Section>
        <SectionHeader
          title="Latest Insights"
          description="Tips and guides to grow your business digitally."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {(data?.blogs || []).map((blog: any) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </Section>

      <Section className="bg-panel">
        <SectionHeader title="Frequently Asked Questions" />
        <div className="mx-auto max-w-3xl space-y-3">
          {(data?.faqs || []).map((faq: any) => (
            <details
              key={faq.id}
              className="group rounded-2xl border border-border bg-background px-5 py-4 shadow-soft"
            >
              <summary className="cursor-pointer list-none font-medium text-primary marker:content-none">
                <div className="flex items-center justify-between gap-4">
                  <span>{faq.question}</span>
                  <span className="text-muted transition group-open:rotate-45">+</span>
                </div>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted">{faq.answer}</p>
            </details>
          ))}
        </div>
      </Section>

      <Section id="about">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-sm font-medium text-accent">Why MBD Solutions</p>
            <h2 className="text-heading font-semibold tracking-tight text-foreground">
              Software That Fits How You Work
            </h2>
            <p className="mt-4 leading-relaxed text-muted">
              MBD Solutions was established to help businesses grow digitally through websites,
              software, mobile apps, AI solutions and digital marketing services. Founded in honour
              of Mon Bai Dhakad.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Affordable, transparent pricing",
                "Professional development standards",
                "Fast delivery without compromise",
                "WhatsApp-first customer workflows",
                "24×7 support after delivery",
              ].map((item, index) => (
                <li key={`why-${index}`} className="flex items-start gap-2 text-sm text-secondary">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="relative mt-8 hidden h-48 overflow-hidden rounded-2xl border border-border shadow-soft sm:block">
              <ContentImage src={brandImages.aboutOffice} alt="MBD Solutions office" fill />
            </div>
          </div>
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="space-y-4 p-8">
              <h3 className="text-2xl font-semibold text-primary-foreground">Ready to start?</h3>
              <p className="text-primary-foreground/70">
                Share your requirement and get a free quote, timeline and live demo from{" "}
                {siteConfig.founder}.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild variant="accent">
                  <Link href="/contact">Free Consultation</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
                >
                  <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                    WhatsApp
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>

      <CTABand />
    </>
  );
}
