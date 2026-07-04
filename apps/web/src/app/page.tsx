import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Star,
  Clock3,
  BadgeCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Section, SectionHeader } from "@/components/ui/section";
import { CTABand } from "@/components/shared/cta";
import { DynamicIcon } from "@/components/shared/icon";
import { HeroGlobeClient } from "@/components/home/hero-globe";
import { AnimatedStats } from "@/components/home/animated-stats";
import { JsonLd } from "@/components/seo/json-ld";
import { getHomeData, siteConfig, whatsappLink } from "@/lib/api";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

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
  const stats = (
    data?.stats?.length
      ? data.stats
      : [
          { id: "fallback-1", label: "Projects Delivered", value: "100", suffix: "+" },
          { id: "fallback-2", label: "Happy Clients", value: "50", suffix: "+" },
          { id: "fallback-3", label: "Support", value: "24", suffix: "×7" },
          { id: "fallback-4", label: "Client Satisfaction", value: "99", suffix: "%" },
        ]
  ).map((s: any, index: number) => ({
    id: s.id ?? `stat-${index}`,
    label: s.label,
    value: s.value,
    suffix: s.suffix ?? undefined,
  }));

  const techBadges =
    (data?.technologies?.length ?? 0) > 0
      ? data!.technologies.map((t: any) => ({ id: t.id, name: t.name }))
      : [
          { id: "t1", name: "Next.js" },
          { id: "t2", name: "React" },
          { id: "t3", name: "Node.js" },
          { id: "t4", name: "PostgreSQL" },
          { id: "t5", name: "AI" },
          { id: "t6", name: "Cloud" },
        ];

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([{ name: "Home", path: "/" }])}
      />
      <section
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
              className="max-w-xl text-[2rem] font-semibold tracking-tight text-primary sm:text-4xl md:text-[2.75rem] md:leading-[1.12]"
            >
              {hero?.title || "Complete Digital Solutions for Every Business"}
            </h1>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-muted md:text-lg">
              {hero?.subtitle ||
                "Websites, mobile apps, ERP systems, AI solutions & digital marketing — professional quality at prices that work for you."}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {techBadges.slice(0, 6).map((tech: { id: string; name: string }, index: number) => (
                <span
                  key={tech.id ?? `${tech.name}-${index}`}
                  className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-secondary shadow-soft"
                >
                  {tech.name}
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

      {(data?.clients?.length ?? 0) > 0 && (
        <Section className="py-10 md:py-12">
          <p className="mb-5 text-center text-xs font-medium uppercase tracking-[0.18em] text-muted">
            Trusted by growing businesses
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {data.clients.map((client: any) => (
              <div
                key={client.id}
                className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-secondary shadow-soft"
              >
                {client.name}
              </div>
            ))}
          </div>
        </Section>
      )}

      <Section>
        <SectionHeader
          eyebrow="Services"
          title="What We Build"
          description="Transparent pricing. No hidden charges. Custom solutions available on request."
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {(data?.services || []).map((service: any) => (
            <Card key={service.id} className="group">
              <CardHeader>
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-background text-accent">
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
                  Learn more{" "}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button asChild variant="outline">
            <Link href="/services">View All Services</Link>
          </Button>
        </div>
      </Section>

      <Section className="bg-panel">
        <SectionHeader
          eyebrow="Products"
          title="Featured Products"
          description="Production-ready platforms for healthcare, fitness, restaurants and enterprise operations."
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {(data?.products || []).map((product: any) => (
            <Card key={product.id} className="overflow-hidden">
              <CardHeader>
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <DynamicIcon name={product.icon} className="h-5 w-5" />
                </div>
                <CardTitle>{product.name}</CardTitle>
                <CardDescription>{product.tagline}</CardDescription>
              </CardHeader>
              <CardContent className="flex gap-3">
                <Button asChild size="sm">
                  <Link href={`/products/${product.slug}`}>View Product</Link>
                </Button>
                {product.liveDemoUrl && (
                  <Button asChild size="sm" variant="outline">
                    <a href={product.liveDemoUrl} target="_blank" rel="noopener noreferrer">
                      Live Demo
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Portfolio"
          title="Featured Projects"
          description="Real outcomes for clinics, gyms, restaurants and contractors."
        />
        <div className="grid gap-5 md:grid-cols-2">
          {(data?.projects || []).map((project: any) => (
            <Card key={project.id}>
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.overview}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex flex-wrap gap-2">
                  {(project.techStack || []).slice(0, 4).map((tech: string, index: number) => (
                    <span
                      key={`${project.id}-tech-${index}`}
                      className="rounded-full bg-background px-3 py-1 text-xs font-medium text-secondary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/portfolio/${project.slug}`}
                  className="inline-flex items-center gap-1 text-sm font-medium text-accent"
                >
                  View case study <ArrowRight className="h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="bg-panel">
        <SectionHeader
          title="Industries We Serve"
          description="Tailored digital solutions for every business category."
        />
        <div className="flex flex-wrap justify-center gap-3">
          {(data?.industries || []).map((industry: any) => (
            <Link
              key={industry.id}
              href={`/industries/${industry.slug}`}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2.5 text-sm font-medium text-secondary shadow-soft transition hover:border-accent/30 hover:text-primary"
            >
              <DynamicIcon name={industry.icon} className="h-4 w-4 text-accent" />
              {industry.name}
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

      <Section className="bg-panel">
        <SectionHeader
          title="What Our Clients Say"
          description="Trusted by 50+ businesses across India."
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {(data?.testimonials || []).map((item: any) => (
            <Card key={item.id}>
              <CardContent className="pt-6">
                <div className="mb-3 flex gap-1 text-warning">
                  {Array.from({ length: item.rating || 5 }).map((_, i) => (
                    <Star key={`${item.id}-star-${i}`} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-secondary">
                  &ldquo;{item.content}&rdquo;
                </p>
                <div className="mt-5">
                  <p className="font-semibold text-primary">{item.name}</p>
                  <p className="text-sm text-muted">
                    {item.role}
                    {item.company ? `, ${item.company}` : ""}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader
          title="Latest Insights"
          description="Tips and guides to grow your business digitally."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {(data?.blogs || []).map((blog: any) => (
            <Card key={blog.id}>
              <CardHeader>
                <p className="text-xs font-medium uppercase tracking-wide text-accent">
                  {blog.category?.name || "Insight"}
                </p>
                <CardTitle className="text-xl">{blog.title}</CardTitle>
                <CardDescription>{blog.excerpt}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-xs text-muted">
                  {blog.publishedAt ? formatDate(blog.publishedAt) : ""}
                </p>
                <Link href={`/blog/${blog.slug}`} className="text-sm font-medium text-accent">
                  Read article →
                </Link>
              </CardContent>
            </Card>
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

      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-sm font-medium text-accent">Why MBD Solutions</p>
            <h2 className="text-3xl font-semibold tracking-tight text-primary md:text-4xl">
              Built to Help Businesses Grow Digitally
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
