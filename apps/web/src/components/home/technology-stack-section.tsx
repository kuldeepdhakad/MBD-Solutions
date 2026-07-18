"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { TECH_STACK, resolveTechIcon } from "@/lib/tech-icons";

type TechnologyStackSectionProps = {
  technologies?: { id?: string; name: string; slug?: string }[];
};

export function TechnologyStackSection({ technologies }: TechnologyStackSectionProps) {
  const items =
    technologies && technologies.length > 0
      ? technologies.map((t) => ({
          id: t.id ?? t.name,
          name: t.name,
          icon: resolveTechIcon(t.name, t.slug),
        }))
      : TECH_STACK.map((t) => ({ id: t.slug, name: t.name, icon: t.icon }));

  return (
    <section className="relative overflow-hidden border-y border-border bg-panel py-16 md:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(30,115,255,0.08),transparent)]" />

      <div className="relative mx-auto max-w-container px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-12 max-w-2xl text-center"
        >
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-accent">
            Engineering Excellence
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-primary md:text-4xl">
            Our Technology Stack
          </h2>
          <p className="mt-4 text-muted">
            Modern, battle-tested technologies powering enterprise-grade digital products.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 lg:gap-4">
          {items.map((tech, index) => (
            <motion.div
              key={tech.id}
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: (index % 12) * 0.03 }}
              whileHover={{ scale: 1.04, y: -4 }}
              className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-surface p-4 shadow-soft transition-shadow duration-300 hover:border-accent/25 hover:shadow-glow md:p-5"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/5 transition-colors group-hover:bg-accent/10">
                <Image
                  src={tech.icon}
                  alt=""
                  width={32}
                  height={32}
                  className="h-8 w-8 object-contain opacity-80 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                  unoptimized
                />
              </div>
              <span className="text-center text-xs font-semibold text-secondary transition-colors group-hover:text-accent">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
