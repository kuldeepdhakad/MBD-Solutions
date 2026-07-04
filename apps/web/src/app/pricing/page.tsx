import type { Metadata } from "next";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CTABand } from "@/components/shared/cta";
import { JsonLd } from "@/components/seo/json-ld";
import { getList } from "@/lib/api";
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
      <section className="py-16 md:py-20">
        <div className="mx-auto grid max-w-container gap-6 px-5 md:grid-cols-3 md:px-8">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={cn(plan.isPopular && "border-accent shadow-card ring-1 ring-accent/20")}
            >
              <CardContent className="p-8">
                {plan.isPopular && (
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-accent">
                    Most Popular
                  </p>
                )}
                <h2 className="text-xl font-semibold">{plan.name}</h2>
                <p className="mt-2 text-sm text-muted">{plan.description}</p>
                <p className="mt-6 text-4xl font-semibold tracking-tight text-primary">
                  {plan.price}
                </p>
                {plan.period && <p className="mt-1 text-sm text-muted">{plan.period}</p>}
                <ul className="mt-6 space-y-3">
                  {(plan.features || []).map((feature: string, index: number) => (
                    <li key={`${plan.id}-feature-${index}`} className="flex gap-2 text-sm text-secondary">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                      {feature}
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
