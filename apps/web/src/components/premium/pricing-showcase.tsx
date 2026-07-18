"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Plan = {
  id: string;
  name: string;
  description?: string;
  price: string;
  period?: string;
  features?: string[];
  isPopular?: boolean;
  ctaText?: string;
};

export function PricingShowcase({ plans }: { plans: Plan[] }) {
  if (!plans.length) return null;

  return (
    <div className="grid gap-6 lg:grid-cols-3 lg:items-start">
      {plans.map((plan, index) => (
        <motion.div
          key={plan.id}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.08 }}
          className={cn(
            "relative overflow-hidden rounded-3xl border p-8 transition-all",
            plan.isPopular
              ? "border-accent bg-gradient-to-b from-accent/10 to-surface shadow-glow ring-2 ring-accent/20 lg:-mt-2"
              : "border-border bg-surface/80 backdrop-blur-sm hover:-translate-y-0.5 hover:shadow-card",
          )}
        >
          {plan.isPopular && (
            <span className="absolute right-4 top-4 rounded-full bg-accent px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
              Popular
            </span>
          )}
          <h2 className="text-xl font-bold text-primary">{plan.name}</h2>
          {plan.description && (
            <p className="mt-2 text-sm text-muted">{plan.description}</p>
          )}
          <div className="mt-6">
            <span className="text-4xl font-bold tracking-tight text-primary">{plan.price}</span>
            {plan.period && (
              <span className="ml-1 text-sm text-muted">/{plan.period}</span>
            )}
          </div>
          <ul className="mt-8 space-y-3 border-t border-border/60 pt-8">
            {(plan.features || []).map((feature, i) => (
              <li key={`${plan.id}-${i}`} className="flex gap-2 text-sm text-secondary">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-success" />
                {feature}
              </li>
            ))}
          </ul>
          <Button
            asChild
            className="mt-8 w-full"
            variant={plan.isPopular ? "accent" : "outline"}
            size="lg"
          >
            <Link href="/contact" prefetch>
              {plan.ctaText || "Get Started"}
            </Link>
          </Button>
        </motion.div>
      ))}
    </div>
  );
}
