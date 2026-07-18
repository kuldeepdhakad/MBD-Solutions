"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { resolveProductDemoUrl } from "@/lib/demos";
import { DynamicIcon } from "@/components/shared/icon";

type Product = {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  icon: string;
  liveDemoUrl?: string | null;
};

export function ProductsShowcase({ products }: { products: Product[] }) {
  if (!products.length) return null;

  const [featured, ...rest] = products;

  const resolveDemo = (product: Product) => resolveProductDemoUrl(product);

  return (
    <div className="space-y-5">
      {featured && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="group relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary via-primary to-secondary p-8 text-primary-foreground shadow-elevated md:p-10"
        >
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-white/5 blur-2xl" />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur-sm">
                <Play className="h-3 w-3" /> Featured Product
              </span>
              <div className="mt-5 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
                  <DynamicIcon name={featured.icon} className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold tracking-tight md:text-3xl">{featured.name}</h3>
                  <p className="mt-1 text-primary-foreground/70">{featured.tagline}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="accent" size="lg">
                <Link href={`/products/${featured.slug}`}>
                  View Product <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
              {resolveDemo(featured) && (
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white/20 bg-white/5 text-primary-foreground hover:bg-white/10"
                >
                  <a href={resolveDemo(featured)!} target="_blank" rel="noopener noreferrer">
                    Live Demo <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {rest.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="group glass relative overflow-hidden rounded-2xl p-6 transition-all hover:shadow-glow"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <DynamicIcon name={product.icon} className="h-5 w-5" />
              </div>
              {resolveDemo(product) && (
                <span className="rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-success">
                  Live
                </span>
              )}
            </div>
            <h3 className="mt-4 text-lg font-semibold text-primary">{product.name}</h3>
            <p className="mt-1.5 text-sm text-muted line-clamp-2">{product.tagline}</p>
            <div className="mt-5 flex gap-2">
              <Button asChild size="sm" variant="outline" className="flex-1">
                <Link href={`/products/${product.slug}`}>Details</Link>
              </Button>
              {resolveDemo(product) && (
                <Button asChild size="sm" variant="accent">
                  <a href={resolveDemo(product)!} target="_blank" rel="noopener noreferrer">
                    Demo
                  </a>
                </Button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
