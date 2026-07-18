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

const CommandCenterGlobe = dynamic(
  () => import("@/components/home/command-center-globe").then((m) => m.CommandCenterGlobe),
  {
    ssr: false,
    loading: () => <GlobeSkeleton />,
  },
);

const serviceCards: { icon: LucideIcon; title: string }[] = [
  { icon: Globe2, title: "Web Development" },
  { icon: Smartphone, title: "Mobile Apps" },
  { icon: Cloud, title: "Cloud" },
  { icon: Brain, title: "AI" },
  { icon: Blocks, title: "ERP" },
  { icon: Link2, title: "Blockchain" },
  { icon: Layout, title: "UI/UX" },
  { icon: Megaphone, title: "Digital Marketing" },
];

function GlobeSkeleton() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-64 w-64 animate-pulse rounded-full border border-[#E5E7EB] bg-[#F8FAFC]" />
    </div>
  );
}

function FloatingParticles() {
  const particles = Array.from({ length: 16 }, (_, i) => ({
    id: i,
    left: `${10 + ((i * 19) % 80)}%`,
    top: `${8 + ((i * 23) % 84)}%`,
    size: 2 + (i % 2),
    delay: (i % 6) * 0.5,
    duration: 5 + (i % 4),
  }));

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
      {particles.map((p) => (
        <span
          key={p.id}
          className="command-particle absolute rounded-full bg-[#2563EB]/30"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

function OrbitCard({
  icon: Icon,
  title,
  index,
  total,
}: {
  icon: LucideIcon;
  title: string;
  index: number;
  total: number;
}) {
  const angle = (360 / total) * index;
  return (
    <div
      className="command-orbit-item absolute left-1/2 top-1/2"
      style={{ "--orbit-angle": `${angle}deg` } as React.CSSProperties}
    >
      <div className="command-orbit-card flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-xl border border-[#E5E7EB] bg-white/95 px-3 py-2 shadow-soft backdrop-blur-md">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#F8FAFC] text-[#2563EB]">
          <Icon className="h-3.5 w-3.5" strokeWidth={2} />
        </span>
        <span className="whitespace-nowrap text-[11px] font-semibold text-[#081224]">
          {title}
        </span>
      </div>
    </div>
  );
}

export function DigitalCommandCenter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoadGlobe, setShouldLoadGlobe] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 22 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 22 });
  const parallaxX = useTransform(springX, [-0.5, 0.5], [-12, 12]);
  const parallaxY = useTransform(springY, [-0.5, 0.5], [-10, 10]);

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
      { rootMargin: "60px" },
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
    <div
      ref={containerRef}
      className="relative w-full"
      onMouseMove={handleMouseMove}
    >
      <div className="relative overflow-hidden rounded-3xl border border-[#E5E7EB] bg-white/80 p-6 shadow-card backdrop-blur-xl md:p-8">
        <FloatingParticles />

        <motion.div
          className="relative mx-auto aspect-square w-full max-w-[520px]"
          style={{ x: parallaxX, y: parallaxY }}
        >
          <div
            className="pointer-events-none absolute inset-[18%] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(37, 99, 235, 0.14) 0%, rgba(37, 99, 235, 0.04) 45%, transparent 70%)",
            }}
          />

          <div className="absolute inset-[22%] z-[1]">
            {shouldLoadGlobe ? <CommandCenterGlobe /> : <GlobeSkeleton />}
          </div>

          <div className="command-orbit-ring pointer-events-none absolute inset-0">
            {serviceCards.map((card, i) => (
              <OrbitCard
                key={card.title}
                icon={card.icon}
                title={card.title}
                index={i}
                total={serviceCards.length}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
