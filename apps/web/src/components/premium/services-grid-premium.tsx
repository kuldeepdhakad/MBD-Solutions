"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { DynamicIcon } from "@/components/shared/icon";
import { DemoLink } from "@/components/premium/demo-link";
import { getServiceDemoUrl } from "@/lib/demos";

type Service = {
  id: string;
  title: string;
  slug: string;
  shortDesc: string;
  icon: string;
  startingPrice: string;
  isFeatured?: boolean;
};

export function ServicesGridPremium({ services }: { services: Service[] }) {
  const featured = services.filter((s) => s.isFeatured);
  const rest = services.filter((s) => !s.isFeatured);

  return (
    <div className="space-y-12">
      {featured.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2">
          {featured.slice(0, 2).map((service, index) => (
            <motion.article
              key={service.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="group relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary via-primary to-secondary p-8 text-primary-foreground shadow-elevated md:p-10"
            >
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent/20 blur-3xl" />
              <div className="relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
                  <DynamicIcon name={service.icon} className="h-6 w-6 text-white" />
                </div>
                <h2 className="mt-5 text-2xl font-bold tracking-tight">{service.title}</h2>
                <p className="mt-2 text-primary-foreground/70">{service.shortDesc}</p>
                <p className="mt-4 text-sm font-medium">
                  From <span className="text-accent">{service.startingPrice}</span>
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href={`/services/${service.slug}`}
                    prefetch
                    className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-medium text-white shadow-glow transition hover:opacity-90"
                  >
                    View Details <ArrowRight className="h-4 w-4" />
                  </Link>
                  {getServiceDemoUrl(service.slug) && (
                    <DemoLink
                      href={getServiceDemoUrl(service.slug)!}
                      label="View Demo"
                      variant="outline"
                      className="border-white/20 bg-white/5 text-primary-foreground hover:bg-white/10"
                    />
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {[...featured.slice(2), ...rest].map((service, index) => {
          const demoUrl = getServiceDemoUrl(service.slug);
          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.04 }}
              className="glass group relative overflow-hidden rounded-2xl p-6 transition-all hover:border-accent/25 hover:shadow-glow"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent transition-transform group-hover:scale-110">
                  <DynamicIcon name={service.icon} className="h-5 w-5" />
                </div>
                {demoUrl && (
                  <span className="rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-success">
                    Demo
                  </span>
                )}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-primary group-hover:text-accent transition-colors">
                {service.title}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm text-muted">{service.shortDesc}</p>
              <p className="mt-4 text-sm font-medium text-primary">
                From <span className="text-accent">{service.startingPrice}</span>
              </p>
              <div className="mt-5 flex gap-2 border-t border-border/60 pt-4">
                <Link
                  href={`/services/${service.slug}`}
                  prefetch
                  className="flex-1 rounded-lg border border-border py-2 text-center text-sm font-medium text-primary transition hover:bg-background"
                >
                  Details
                </Link>
                {demoUrl && <DemoLink href={demoUrl} label="Demo" className="flex-1" />}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
