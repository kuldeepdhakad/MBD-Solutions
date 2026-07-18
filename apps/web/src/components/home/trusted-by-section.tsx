"use client";

import { motion } from "framer-motion";
import { ContentImage } from "@/components/shared/content-image";
import { DynamicIcon } from "@/components/shared/icon";
import type { TrustedClientCard } from "@/lib/home-content";

export function TrustedBySection({ clients }: { clients: TrustedClientCard[] }) {
  if (!clients.length) return null;

  return (
    <section className="border-y border-border bg-panel py-12 md:py-16">
      <div className="mx-auto max-w-container px-5 md:px-8">
        <p className="mb-8 text-center text-xs font-medium uppercase tracking-[0.18em] text-muted">
          Trusted by growing businesses
        </p>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {clients.map((client, index) => (
            <motion.article
              key={client.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ y: -4 }}
              className="group overflow-hidden rounded-2xl border border-border bg-surface shadow-soft transition-shadow duration-300 hover:border-accent/25 hover:shadow-card"
            >
              <div className="relative h-28 overflow-hidden">
                <ContentImage
                  src={client.image}
                  alt={client.name}
                  fill
                  className="transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent" />
                <div className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/15 text-white backdrop-blur-md">
                  <DynamicIcon name={client.icon} className="h-5 w-5" />
                </div>
              </div>
              <div className="p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
                  {client.industry}
                </p>
                <h3 className="mt-1 text-base font-semibold text-primary">{client.name}</h3>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
                  {client.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
