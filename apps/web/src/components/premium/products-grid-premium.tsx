"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { DynamicIcon } from "@/components/shared/icon";
import { DemoLink } from "@/components/premium/demo-link";
import { resolveProductDemoUrl } from "@/lib/demos";

type Product = {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  icon: string;
  isFeatured?: boolean;
  liveDemoUrl?: string | null;
};

function resolveDemo(product: Product) {
  return resolveProductDemoUrl(product);
}

export function ProductsGridPremium({ products }: { products: Product[] }) {
  const featured = products.filter((p) => p.isFeatured);
  const rest = products.filter((p) => !p.isFeatured);

  return (
    <div className="space-y-10">
      <div className="grid gap-5 lg:grid-cols-12">
        {featured.slice(0, 1).map((product) => {
          const demo = resolveDemo(product);
          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-3xl border border-border bg-primary p-8 text-primary-foreground shadow-elevated lg:col-span-7 lg:p-10"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(37,99,235,0.2),transparent_60%)]" />
              <div className="relative">
                <DynamicIcon name={product.icon} className="h-8 w-8 text-accent" />
                <h2 className="mt-4 text-3xl font-bold">{product.name}</h2>
                <p className="mt-2 text-primary-foreground/70">{product.tagline}</p>
                <div className="mt-6 flex gap-3">
                  <Link
                    href={`/products/${product.slug}`}
                    prefetch
                    className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-medium text-white"
                  >
                    View Product <ArrowUpRight className="h-4 w-4" />
                  </Link>
                  {demo && (
                    <DemoLink
                      href={demo}
                      label="Live Preview"
                      variant="outline"
                      className="border-white/20 bg-white/5 text-primary-foreground hover:bg-white/10"
                    />
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}

        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-5">
          {featured.slice(1, 3).map((product, i) => {
            const demo = resolveDemo(product);
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="glass rounded-2xl p-5 hover:shadow-glow transition-shadow"
              >
                <DynamicIcon name={product.icon} className="h-5 w-5 text-accent" />
                <h3 className="mt-3 font-semibold text-primary">{product.name}</h3>
                <p className="mt-1 text-xs text-muted line-clamp-2">{product.tagline}</p>
                <div className="mt-4 flex gap-2">
                  <Link href={`/products/${product.slug}`} prefetch className="text-xs font-medium text-accent">
                    Details →
                  </Link>
                  {demo && <DemoLink href={demo} label="Demo" size="sm" />}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((product, index) => {
          const demo = resolveDemo(product);
          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.03 }}
              className="group rounded-2xl border border-border bg-surface/50 p-6 backdrop-blur-sm transition hover:border-accent/20 hover:shadow-card"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <DynamicIcon name={product.icon} className="h-5 w-5" />
                </div>
                {demo && (
                  <span className="text-[10px] font-bold uppercase tracking-wider text-success">Live</span>
                )}
              </div>
              <h3 className="mt-4 font-semibold text-primary">{product.name}</h3>
              <p className="mt-1 text-sm text-muted">{product.tagline}</p>
              <div className="mt-5 flex gap-2">
                <Link
                  href={`/products/${product.slug}`}
                  prefetch
                  className="flex-1 rounded-lg border border-border py-2 text-center text-sm font-medium transition hover:bg-background"
                >
                  View
                </Link>
                {demo && <DemoLink href={demo} className="flex-1" />}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
