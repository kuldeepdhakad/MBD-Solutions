"use client";

import { GsapReveal } from "@/components/premium/gsap-reveal";
import { cn } from "@/lib/utils";

export function PremiumSection({
  children,
  className,
  delay = 0,
  direction = "up",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "scale";
}) {
  return (
    <GsapReveal delay={delay} direction={direction} className={cn(className)}>
      {children}
    </GsapReveal>
  );
}
