import type { Metadata } from "next";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CTABand } from "@/components/shared/cta";
import { ContentImage } from "@/components/shared/content-image";
import { JsonLd } from "@/components/seo/json-ld";
import { getList } from "@/lib/api";
import { brandImages } from "@/lib/images";
import { cn } from "@/lib/utils";

export const metadata: Metadata = createPageMetadata({
  title: "Pricing",
  description:
    "Clear software development packages for startups and growing businesses from Mon Bai Dhakad Solutions Pvt. Ltd. (MBD Solutions). Custom quotes available.",
  path: "/pricing",
});

export default async function PricingPage() {
  let plans: any[] = [];
  try {
    const res = await getList("pricing", { limit: "20" });
    plans = res.data || [];
  } catch {
    plans = [];
  }

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Pricing", path: "/pricing" },
        ])}
      />
      <PageHero
        eyebrow="Pricing"
        title="Simple, Transparent Pricing"
        description="Choose a package that fits your stage. Every project includes professional delivery and support."
      />
      <section className="border-b border-border bg-panel py-10 md:py-12">
        <div className="mx-auto max-w-container px-5 md:px-8">
          <div className="relative h-44 overflow-hidden rounded-2xl border border-border shadow-soft sm:h-52 md:h-60">
            <ContentImage
              src={brandImages.pricingIllustration}
              alt="Professional software pricing"
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/70 to-primary/20" />
            <div className="absolute inset-0 flex items-center px-6 sm:px-10">
              <p className="max-w-lg text-sm font-medium text-primary-foreground sm:text-base">
                Clear packages for startups and growing businesses. Custom quotes available for enterprise needs.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 md:py-20">
        <div className="mx-auto grid max-w-container gap-6 px-5 sm:grid-cols-2 md:px-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={cn(
                "h-full",
                plan.isPopular && "border-accent shadow-card ring-1 ring-accent/20",
              )}
            >
              <CardContent className="flex h-full flex-col p-6 sm:p-8">
                {plan.isPopular && (
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-accent">
                    Most Popular
                  </p>
                )}
                <h2 className="text-xl font-semibold">{plan.name}</h2>
                <p className="mt-2 text-sm text-muted">{plan.description}</p>
                <p className="mt-6 text-3xl font-semibold tracking-tight text-primary sm:text-4xl">
                  {plan.price}
                </p>
                {plan.period && <p className="mt-1 text-sm text-muted">{plan.period}</p>}
                <ul className="mt-6 flex-1 space-y-3">
                  {(plan.features || []).map((feature: string, index: number) => (
                    <li key={`${plan.id}-feature-${index}`} className="flex gap-2 text-sm text-secondary">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild className="mt-8 w-full" variant={plan.isPopular ? "accent" : "default"}>
                  <Link href="/contact">{plan.ctaText || "Get Started"}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <CTABand />
    </>
  );
}
