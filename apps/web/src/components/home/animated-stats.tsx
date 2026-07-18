"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Award,
  Briefcase,
  Headphones,
  Users,
  type LucideIcon,
} from "lucide-react";

const statIcons: Record<string, LucideIcon> = {
  "Projects Delivered": Briefcase,
  "Happy Clients": Users,
  "Client Satisfaction": Award,
  Support: Headphones,
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
      { threshold: 0.3 },
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

export function AnimatedStats({
  stats,
}: {
  stats: { id?: string; label: string; value: string; suffix?: string }[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const active = useInView(ref);

  return (
    <div ref={ref} className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
      {stats.map((stat, index) => {
        const Icon = statIcons[stat.label] ?? Briefcase;
        return (
          <motion.div
            key={stat.id ?? `${stat.label}-${index}`}
            initial={{ opacity: 0, y: 12 }}
            animate={active ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.45, delay: index * 0.07 }}
            whileHover={{ y: -4 }}
            className="group rounded-2xl border border-border bg-surface p-5 text-center shadow-soft transition-shadow duration-300 hover:border-accent/25 hover:shadow-card md:p-6"
          >
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-accent/8 text-accent transition-colors group-hover:bg-accent/12">
              <Icon className="h-4 w-4" strokeWidth={2} />
            </div>
            <p className="text-2xl font-semibold tracking-tight text-primary md:text-3xl">
              <AnimatedValue
                value={stat.value}
                suffix={stat.suffix || ""}
                active={active}
              />
            </p>
            <p className="mt-1.5 text-xs font-medium text-muted md:text-sm">{stat.label}</p>
          </motion.div>
        );
      })}
    </div>
  );
}
