"use client";

import { motion } from "framer-motion";
import {
  Building2,
  GraduationCap,
  HeartPulse,
  Landmark,
  Factory,
  Home,
  Banknote,
  UtensilsCrossed,
  ShoppingBag,
  Stethoscope,
} from "lucide-react";

const industries = [
  { name: "Hospital", icon: Stethoscope },
  { name: "School", icon: GraduationCap },
  { name: "Manufacturing", icon: Factory },
  { name: "Real Estate", icon: Home },
  { name: "Finance", icon: Banknote },
  { name: "Restaurant", icon: UtensilsCrossed },
  { name: "Retail", icon: ShoppingBag },
  { name: "Healthcare", icon: HeartPulse },
  { name: "Education", icon: Building2 },
  { name: "Government", icon: Landmark },
];

export function HeroTrustStrip() {
  return (
    <section className="relative border-b border-border/60 bg-white/50 py-10 backdrop-blur-sm md:py-12">
      <div className="mx-auto max-w-container px-5 md:px-8">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted"
        >
          Trusted by Businesses Across Industries
        </motion.p>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5 lg:gap-5">
          {industries.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="trust-logo-card group flex flex-col items-center gap-3 rounded-2xl border border-border/70 bg-white/80 px-4 py-5 shadow-soft transition-all duration-300"
            >
              <item.icon
                className="h-8 w-8 text-[#081224]/40 transition-colors duration-300 group-hover:text-accent"
                strokeWidth={1.5}
              />
              <span className="text-xs font-medium text-[#081224]/50 transition-colors duration-300 group-hover:text-accent">
                {item.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
