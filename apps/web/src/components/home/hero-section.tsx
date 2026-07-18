"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Clock, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PremiumGlobeClient } from "@/components/home/premium-globe-client";
import { BUSINESS_STRENGTHS, HERO_COPY } from "@/lib/home-content";
import { siteConfig, whatsappLink } from "@/lib/site";

const TRUST_ITEMS = [
  { label: "Secure delivery", icon: Shield },
  { label: "On-time projects", icon: Clock },
  { label: "Production-ready code", icon: Check },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function HeroSection() {
  return (
    <section
      className="relative flex min-h-[100svh] flex-col bg-[#F8FAFC] pt-[72px] lg:h-[100svh] lg:overflow-hidden"
      aria-labelledby="home-hero-heading"
    >
      {/* Background grid */}
      <div className="hero-grid-subtle pointer-events-none absolute inset-0 opacity-80" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-[#F1F5F9]/80"
        aria-hidden="true"
      />

      <div className="relative mx-auto flex w-full max-w-[1440px] flex-col px-5 py-4 sm:px-8 sm:py-5 md:px-10 lg:h-full lg:px-16 lg:py-6 xl:px-20">
        <div className="grid gap-6 lg:h-full lg:min-h-0 lg:grid-cols-2 lg:items-stretch lg:gap-10 xl:gap-14">
          {/* Left — content */}
          <div className="flex min-h-0 min-w-0 flex-col justify-center overflow-y-auto lg:h-full lg:overflow-visible lg:pr-2">
            <motion.div custom={0} initial="hidden" animate="visible" variants={fadeUp}>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-3.5 py-1.5 text-[13px] font-medium text-[#475569] shadow-[0_1px_2px_rgba(8,18,36,0.04)] sm:px-4 sm:py-2">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#2563EB]" aria-hidden="true" />
                {siteConfig.legalName}
              </span>
            </motion.div>

            <motion.h1
              id="home-hero-heading"
              custom={1}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="mt-5 text-[clamp(1.875rem,4.5vw,3.25rem)] font-extrabold leading-[1.1] tracking-[-0.03em] text-[#0b1736] sm:mt-6"
            >
              {HERO_COPY.title}
            </motion.h1>

            <motion.p
              custom={2}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="mt-4 max-w-[540px] text-[15px] leading-relaxed text-[#64748B] sm:mt-5 sm:text-base sm:leading-[1.7]"
            >
              {HERO_COPY.subtitle}
            </motion.p>

            <motion.div
              custom={3}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="mt-5 flex flex-wrap gap-2 sm:mt-6"
            >
              {BUSINESS_STRENGTHS.map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#E5E7EB] bg-white px-3 py-1 text-xs font-medium text-[#475569] shadow-[0_1px_2px_rgba(8,18,36,0.03)] sm:text-[13px]"
                >
                  <Check className="h-3 w-3 shrink-0 text-[#0a6bff]" strokeWidth={2.5} aria-hidden="true" />
                  {badge}
                </span>
              ))}
            </motion.div>

            <motion.div
              custom={4}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:items-center"
            >
              <Button
                asChild
                variant="accent"
                size="lg"
                className="h-12 w-full rounded-xl bg-[#0a6bff] px-7 text-[15px] font-semibold text-white shadow-[0_4px_14px_-2px_rgba(10,107,255,0.35)] hover:bg-[#0959d9] sm:w-auto"
              >
                <Link href="/contact">Get Free Consultation</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-12 w-full rounded-xl border-[#E5E7EB] bg-white px-7 text-[15px] font-semibold text-[#0b1736] hover:bg-[#F8FAFC] sm:w-auto"
              >
                <a href={whatsappLink("Hi, I'd like a WhatsApp demo.")} target="_blank" rel="noopener noreferrer">
                  WhatsApp Demo
                </a>
              </Button>
            </motion.div>

            <motion.div
              custom={5}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 sm:gap-y-3"
            >
              {TRUST_ITEMS.map(({ label, icon: Icon }) => (
                <div key={label} className="flex items-center gap-2">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-[#BFDBFE] bg-[#EFF6FF]">
                    <Icon className="h-3.5 w-3.5 text-[#0a6bff]" strokeWidth={2} />
                  </span>
                  <span className="text-sm font-medium text-[#64748B]">{label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — globe card (matches left column height on desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="flex min-h-0 min-w-0 items-stretch lg:h-full lg:min-h-0"
          >
            <div className="flex h-full w-full max-w-[520px] flex-col rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-[0_8px_30px_-8px_rgba(8,18,36,0.08)] sm:rounded-3xl sm:p-5 md:p-6 lg:ml-auto">
              <div className="relative flex min-h-[220px] flex-1 items-center justify-center sm:min-h-[260px] lg:min-h-0">
                <div className="relative h-full w-full max-h-full max-w-full aspect-square">
                  <PremiumGlobeClient />
                </div>
              </div>
              <div className="mt-3 flex shrink-0 items-center justify-center gap-2 sm:mt-4">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22C55E] opacity-40" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#22C55E]" />
                </span>
                <span className="text-sm font-medium text-[#64748B]">Serving clients across India</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
