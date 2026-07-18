"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Bot,
  Blocks,
  CheckCircle2,
  Cloud,
  Link2,
  ShieldCheck,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { HeroMacbookDashboard } from "@/components/home/hero-macbook-dashboard";

type FloatingCard = {
  label: string;
  icon: LucideIcon;
  x: string;
  y: string;
  delay: number;
  lineTo: { x: number; y: number };
};

const FLOATING_CARDS: FloatingCard[] = [
  {
    label: "AI Automation",
    icon: Bot,
    x: "-2%",
    y: "14%",
    delay: 0,
    lineTo: { x: 28, y: 28 },
  },
  {
    label: "Blockchain Secured",
    icon: Link2,
    x: "84%",
    y: "12%",
    delay: 0.35,
    lineTo: { x: 74, y: 26 },
  },
  {
    label: "Enterprise ERP",
    icon: Blocks,
    x: "-4%",
    y: "46%",
    delay: 0.7,
    lineTo: { x: 26, y: 50 },
  },
  {
    label: "Cloud Infrastructure",
    icon: Cloud,
    x: "86%",
    y: "44%",
    delay: 1.05,
    lineTo: { x: 76, y: 52 },
  },
  {
    label: "ISO Secure",
    icon: ShieldCheck,
    x: "2%",
    y: "78%",
    delay: 1.4,
    lineTo: { x: 32, y: 74 },
  },
  {
    label: "99.9% Uptime",
    icon: Zap,
    x: "78%",
    y: "76%",
    delay: 1.75,
    lineTo: { x: 72, y: 76 },
  },
];

function ConnectionLines() {
  const center = { x: 50, y: 46 };

  return (
    <svg
      className="pointer-events-none absolute inset-0 z-[5] h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="heroLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#2563EB" stopOpacity={0} />
          <stop offset="50%" stopColor="#60A5FA" stopOpacity={0.75} />
          <stop offset="100%" stopColor="#2563EB" stopOpacity={0} />
        </linearGradient>
        <filter id="heroLineGlow">
          <feGaussianBlur stdDeviation="0.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {FLOATING_CARDS.map((card, i) => (
        <g key={card.label}>
          <line
            x1={center.x}
            y1={center.y}
            x2={card.lineTo.x}
            y2={card.lineTo.y}
            stroke="url(#heroLineGrad)"
            strokeWidth={0.18}
            filter="url(#heroLineGlow)"
            className="hero-connection-line"
            style={{ animationDelay: `${i * 0.35}s` }}
          />
          <circle
            cx={card.lineTo.x}
            cy={card.lineTo.y}
            r={0.4}
            fill="#3B82F6"
            opacity={0.6}
            className="hero-connection-dot"
            style={{ animationDelay: `${i * 0.35}s` }}
          />
        </g>
      ))}
    </svg>
  );
}

function FloatingCardItem({
  label,
  icon: Icon,
  x,
  y,
  delay,
}: Omit<FloatingCard, "lineTo">) {
  return (
    <motion.div
      className="hero-float-card absolute z-20 hidden md:block"
      style={{ left: x, top: y }}
      initial={{ opacity: 0, scale: 0.88, y: 14 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.65, delay: 0.35 + delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.05, y: -5 }}
    >
      <div
        className="hero-float-card-inner flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.06] px-3.5 py-2.5 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-2xl transition-shadow duration-300 hover:border-[#3B82F6]/35 hover:shadow-[0_12px_40px_-8px_rgba(37,99,235,0.35)]"
        style={{ animationDelay: `${delay}s` }}
      >
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#2563EB]/30 to-[#1D4ED8]/20 text-[#60A5FA] ring-1 ring-[#3B82F6]/20">
          <Icon className="h-4 w-4" strokeWidth={2} />
        </span>
        <span className="whitespace-nowrap text-[12px] font-semibold text-white/90">
          {label}
        </span>
        <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#34D399]" strokeWidth={2.5} />
      </div>
    </motion.div>
  );
}

function MacBookPro() {
  return (
    <div className="hero-laptop relative mx-auto w-full max-w-[640px] xl:max-w-[720px]">
      <div className="hero-laptop-screen relative mx-auto w-[94%] rounded-t-[14px] border border-[#3A3A3E] bg-gradient-to-b from-[#4A4A4E] via-[#2E2E32] to-[#1C1C1E] p-[2.5%] pb-[1.8%] shadow-[0_32px_80px_-16px_rgba(0,0,0,0.65),0_0_0_1px_rgba(255,255,255,0.04)_inset]">
        <div className="absolute left-1/2 top-[1.2%] z-10 flex -translate-x-1/2 items-center">
          <div className="h-[4px] w-[4px] rounded-full bg-[#1A1A1C] ring-1 ring-[#3A3A3E]" />
        </div>

        <div className="overflow-hidden rounded-[6px] border border-black/60 bg-black shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]">
          <div className="relative aspect-[16/10] w-full">
            <HeroMacbookDashboard />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.06] via-transparent to-transparent"
              aria-hidden="true"
            />
            <div
              className="hero-screen-shimmer pointer-events-none absolute inset-0"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>

      <div className="relative mx-auto h-[5px] w-[98%] rounded-b-sm bg-gradient-to-b from-[#3A3A3E] to-[#1A1A1C]" />

      <div className="relative mx-auto w-full rounded-b-[18px] bg-gradient-to-b from-[#343438] via-[#252528] to-[#141416] px-[3.5%] pb-[2.5%] pt-[1.8%] shadow-[0_40px_100px_-24px_rgba(0,0,0,0.7)]">
        <div className="mx-auto mt-[1.5%] h-[12%] min-h-[10px] w-[26%] rounded-lg border border-white/[0.05] bg-[#1A1A1E]/90" />
        <div className="mt-[2%] flex justify-center gap-[3px] px-[10%] opacity-[0.18]">
          {Array.from({ length: 14 }).map((_, i) => (
            <div key={i} className="h-[3px] flex-1 rounded-[2px] bg-white/40" />
          ))}
        </div>
      </div>

      <div
        className="pointer-events-none absolute -bottom-6 left-1/2 h-10 w-[75%] -translate-x-1/2 rounded-full bg-[#2563EB]/20 blur-3xl"
        aria-hidden="true"
      />
    </div>
  );
}

export function HeroMacbookShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 55, damping: 22 });
  const springY = useSpring(mouseY, { stiffness: 55, damping: 22 });
  const parallaxX = useTransform(springX, [-0.5, 0.5], [-16, 16]);
  const parallaxY = useTransform(springY, [-0.5, 0.5], [-12, 12]);
  const tiltX = useTransform(springY, [-0.5, 0.5], [5, -5]);
  const tiltY = useTransform(springX, [-0.5, 0.5], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-[320px] sm:min-h-[380px] lg:min-h-[480px]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[75%] w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2563EB]/[0.15] blur-[90px]"
        aria-hidden="true"
      />
      <div
        className="hero-glow-pulse pointer-events-none absolute left-1/2 top-1/2 h-[55%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#3B82F6]/[0.1] blur-[70px]"
        aria-hidden="true"
      />

      <ConnectionLines />

      {FLOATING_CARDS.map((card) => (
        <FloatingCardItem key={card.label} {...card} />
      ))}

      <motion.div
        className="relative z-10 mx-auto w-full max-w-[640px] xl:max-w-[720px]"
        style={{
          x: parallaxX,
          y: parallaxY,
          rotateX: tiltX,
          rotateY: tiltY,
          transformPerspective: 1600,
        }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
      >
        <MacBookPro />
      </motion.div>

      <div className="mt-6 flex flex-wrap justify-center gap-2 md:hidden">
        {FLOATING_CARDS.map((card) => (
          <div
            key={card.label}
            className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-[10px] font-semibold text-white/85 backdrop-blur-xl"
          >
            <card.icon className="h-3 w-3 text-[#60A5FA]" strokeWidth={2} />
            {card.label}
          </div>
        ))}
      </div>
    </div>
  );
}
