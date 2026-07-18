"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Blocks,
  Brain,
  Cloud,
  Globe2,
  Layout,
  Link2,
  Megaphone,
  Smartphone,
  type LucideIcon,
} from "lucide-react";

const EnterpriseGlobe = dynamic(
  () => import("@/components/home/enterprise-globe").then((m) => m.EnterpriseGlobe),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center">
        <div className="h-[340px] w-[340px] animate-pulse rounded-full border border-[#E5E7EB] bg-[#F8FAFC]" />
      </div>
    ),
  },
);

const SERVICES: { label: string; icon: LucideIcon }[] = [
  { label: "AI Solutions", icon: Brain },
  { label: "Web Development", icon: Globe2 },
  { label: "Mobile Apps", icon: Smartphone },
  { label: "Cloud Solutions", icon: Cloud },
  { label: "ERP Systems", icon: Blocks },
  { label: "Blockchain", icon: Link2 },
  { label: "UI/UX Design", icon: Layout },
  { label: "Digital Marketing", icon: Megaphone },
];

const ORBIT_RADIUS = 238;
const CENTER = 280;

function ConnectionLines() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 560 560"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="heroGlobeGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#2563EB" stopOpacity={0.12} />
          <stop offset="100%" stopColor="#2563EB" stopOpacity={0} />
        </radialGradient>
      </defs>
      <circle cx={CENTER} cy={CENTER} r={ORBIT_RADIUS} fill="url(#heroGlobeGlow)" />
      <circle
        cx={CENTER}
        cy={CENTER}
        r={ORBIT_RADIUS}
        fill="none"
        stroke="#2563EB"
        strokeOpacity={0.1}
        strokeWidth={1}
        strokeDasharray="4 8"
      />
      {SERVICES.map((_, i) => {
        const angle = ((360 / SERVICES.length) * i - 90) * (Math.PI / 180);
        const x2 = CENTER + Math.cos(angle) * ORBIT_RADIUS;
        const y2 = CENTER + Math.sin(angle) * ORBIT_RADIUS;
        return (
          <line
            key={i}
            x1={CENTER}
            y1={CENTER}
            x2={x2}
            y2={y2}
            stroke="#2563EB"
            strokeOpacity={0.12}
            strokeWidth={1}
          />
        );
      })}
    </svg>
  );
}

function OrbitCard({
  label,
  icon: Icon,
  index,
}: {
  label: string;
  icon: LucideIcon;
  index: number;
}) {
  const angle = (360 / SERVICES.length) * index;
  return (
    <div
      className="hero-orbit-item absolute left-1/2 top-1/2"
      style={{ "--orbit-angle": `${angle}deg` } as React.CSSProperties}
    >
      <div
        className="hero-orbit-card flex -translate-x-1/2 -translate-y-1/2 items-center gap-2.5 rounded-xl border border-white/80 bg-white/85 px-3 py-2 shadow-[0_4px_20px_-6px_rgba(8,18,36,0.12),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-xl"
        style={{ animationDelay: `${index * 0.35}s` }}
      >
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#F8FAFC] text-[#2563EB]">
          <Icon className="h-3.5 w-3.5" strokeWidth={2} />
        </span>
        <span className="whitespace-nowrap text-[11px] font-semibold text-[#081224]">
          {label}
        </span>
      </div>
    </div>
  );
}

function AmbientParticles() {
  const dots = [
    { left: "12%", top: "20%", delay: 0, size: 3 },
    { left: "88%", top: "15%", delay: 1.4, size: 2 },
    { left: "90%", top: "72%", delay: 0.7, size: 3 },
    { left: "8%", top: "68%", delay: 2, size: 2 },
    { left: "50%", top: "6%", delay: 1, size: 2 },
    { left: "54%", top: "92%", delay: 1.8, size: 3 },
    { left: "30%", top: "10%", delay: 2.5, size: 2 },
    { left: "70%", top: "88%", delay: 0.5, size: 2 },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl" aria-hidden="true">
      {dots.map((dot, i) => (
        <span
          key={i}
          className="hero-ecosystem-particle absolute rounded-full bg-[#2563EB]/35"
          style={{
            left: dot.left,
            top: dot.top,
            width: dot.size,
            height: dot.size,
            animationDelay: `${dot.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

export function HeroEcosystem() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoadGlobe, setShouldLoadGlobe] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 70, damping: 22 });
  const springY = useSpring(mouseY, { stiffness: 70, damping: 22 });
  const parallaxX = useTransform(springX, [-0.5, 0.5], [-10, 10]);
  const parallaxY = useTransform(springY, [-0.5, 0.5], [-8, 8]);
  const tiltX = useTransform(springY, [-0.5, 0.5], [2, -2]);
  const tiltY = useTransform(springX, [-0.5, 0.5], [-2, 2]);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setShouldLoadGlobe(true);
      return;
    }

    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadGlobe(true);
          observer.disconnect();
        }
      },
      { rootMargin: "80px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <div ref={containerRef} className="relative w-full" onMouseMove={handleMouseMove}>
      <div className="hero-glass-panel relative overflow-hidden rounded-3xl border border-[#E5E7EB]/70 p-5 shadow-[0_16px_48px_-16px_rgba(8,18,36,0.1)] sm:p-7">
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/90 via-white/60 to-[#F8FAFC]/80"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-[#2563EB]/[0.06] blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-[#3B82F6]/[0.05] blur-3xl"
          aria-hidden="true"
        />

        <AmbientParticles />

        <motion.div
          className="relative mx-auto h-[min(560px,78vw)] w-[min(560px,78vw)] max-w-[560px]"
          style={{
            x: parallaxX,
            y: parallaxY,
            rotateX: tiltX,
            rotateY: tiltY,
            transformPerspective: 1200,
          }}
        >
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[58%] w-[58%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2563EB]/[0.14] blur-[56px]"
            aria-hidden="true"
          />

          <ConnectionLines />

          <div className="absolute inset-[12%] z-[1]">
            {shouldLoadGlobe ? <EnterpriseGlobe /> : null}
          </div>

          <div className="hero-orbit-ring pointer-events-none absolute inset-0">
            {SERVICES.map((service, i) => (
              <OrbitCard key={service.label} label={service.label} icon={service.icon} index={i} />
            ))}
          </div>
        </motion.div>

        <div className="relative mt-4 flex items-center justify-center gap-2 rounded-xl border border-[#E5E7EB]/60 bg-white/70 px-4 py-2.5 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22C55E] opacity-40" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#22C55E]" />
          </span>
          <span className="text-xs font-medium text-[#64748B] sm:text-[13px]">
            Serving Businesses Across India &amp; Global Markets
          </span>
        </div>
      </div>
    </div>
  );
}
