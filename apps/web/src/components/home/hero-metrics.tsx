"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Award, Briefcase, Building2, Users, type LucideIcon } from "lucide-react";

const statIcons: Record<string, LucideIcon> = {
  "Projects Delivered": Briefcase,
  "Happy Clients": Users,
  "Industries Served": Building2,
  "Client Satisfaction": Award,
};

function useInView(ref: React.RefObject<HTMLElement | null>) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
  return inView;
}

function AnimatedValue({
  value,
  suffix = "",
  active,
}: {
  value: string;
  suffix?: string;
  active: boolean;
}) {
  const numeric = parseInt(value.replace(/\D/g, ""), 10);
  const isNumeric = !Number.isNaN(numeric) && /^\d+$/.test(value);
  const [display, setDisplay] = useState(isNumeric ? 0 : value);

  useEffect(() => {
    if (!active || !isNumeric) {
      setDisplay(isNumeric ? (active ? numeric : 0) : value);
      return;
    }
    const duration = 1200;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(numeric * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, isNumeric, numeric, value]);

  return (
    <span className="stat-number">
      {display}
      {suffix}
    </span>
  );
}

type HeroMetricsProps = {
  stats: { id?: string; label: string; value: string; suffix?: string }[];
};

export function HeroMetrics({ stats }: HeroMetricsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const active = useInView(ref);

  return (
    <div ref={ref} className="grid w-full grid-cols-2 gap-3 xl:grid-cols-4 xl:gap-4">
      {stats.slice(0, 4).map((stat, index) => {
        const Icon = statIcons[stat.label] ?? Briefcase;
        return (
          <motion.div
            key={stat.id ?? stat.label}
            initial={{ opacity: 0, y: 12 }}
            animate={active ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.45, delay: index * 0.07 }}
            whileHover={{ y: -4 }}
            className="hero-metric-card group rounded-2xl border border-[#E5E7EB] bg-white/90 p-4 shadow-card backdrop-blur-sm transition-shadow duration-300 hover:shadow-elevated"
          >
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-[#F8FAFC] text-[#2563EB] transition-colors group-hover:bg-[#2563EB]/10">
              <Icon className="h-4 w-4" strokeWidth={2} />
            </div>
            <p className="text-2xl font-bold tracking-tight text-[#081224]">
              <AnimatedValue
                value={stat.value}
                suffix={stat.suffix ?? ""}
                active={active}
              />
            </p>
            <p className="mt-1 text-xs font-medium leading-snug text-[#0F172A]/60">
              {stat.label}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}
