"use client";

import { motion } from "framer-motion";

type PageHeroPremiumProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  children?: React.ReactNode;
};

export function PageHeroPremium({
  eyebrow,
  title,
  description,
  align = "left",
  children,
}: PageHeroPremiumProps) {
  return (
    <section className="relative overflow-hidden border-b border-border pt-28 pb-16 md:pt-32 md:pb-20">
      <div className="hero-grid pointer-events-none absolute inset-0" />
      <div className="noise-overlay pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-accent/[0.06] blur-[100px]" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-56 w-56 rounded-full bg-primary/[0.04] blur-[80px]" />

      <div
        className={`relative mx-auto max-w-container px-5 md:px-8 ${
          align === "center" ? "text-center" : ""
        }`}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={align === "center" ? "mx-auto max-w-3xl" : "max-w-3xl"}
        >
          {eyebrow && (
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-border/80 bg-surface/70 px-4 py-1.5 text-xs font-medium tracking-wide text-accent shadow-soft backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {eyebrow}
            </p>
          )}
          <h1 className="text-display font-bold tracking-tight text-foreground">
            {title}
          </h1>
          {description && (
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
              {description}
            </p>
          )}
          {children && <div className="mt-8">{children}</div>}
        </motion.div>
      </div>
    </section>
  );
}
