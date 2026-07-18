"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { DynamicIcon } from "@/components/shared/icon";

type Solution = {
  id: string;
  title: string;
  description: string;
  icon: string;
  features?: string[];
};

export function SolutionsShowcase({ solutions }: { solutions: Solution[] }) {
  if (!solutions.length) return null;

  return (
    <div className="space-y-8">
      {solutions.map((solution, index) => (
        <motion.article
          key={solution.id}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: index * 0.06 }}
          className={`grid items-center gap-8 rounded-3xl border border-border p-8 md:p-10 lg:grid-cols-2 ${
            index % 2 === 1 ? "bg-panel/50" : "bg-surface/40"
          } backdrop-blur-sm`}
        >
          <div className={index % 2 === 1 ? "lg:order-2" : ""}>
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent shadow-soft">
              <DynamicIcon name={solution.icon} className="h-7 w-7" />
            </div>
            <h2 className="mt-5 text-2xl font-bold tracking-tight text-primary md:text-3xl">
              {solution.title}
            </h2>
            <p className="mt-3 leading-relaxed text-muted">{solution.description}</p>
            <Link
              href="/contact"
              prefetch
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent transition hover:gap-3"
            >
              Discuss this solution <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <ul className={`space-y-3 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
            {(solution.features || []).map((feature, i) => (
              <li
                key={`${solution.id}-f-${i}`}
                className="flex items-start gap-3 rounded-xl border border-border/60 bg-background/50 px-4 py-3 text-sm text-secondary"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                {feature}
              </li>
            ))}
          </ul>
        </motion.article>
      ))}
    </div>
  );
}
