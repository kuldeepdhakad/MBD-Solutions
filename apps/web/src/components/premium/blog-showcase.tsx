"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { formatDate } from "@/lib/utils";

type Blog = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  publishedAt?: string | Date | null;
  category?: { name: string } | null;
  author?: { name: string } | null;
};

export function BlogShowcase({ blogs }: { blogs: Blog[] }) {
  if (!blogs.length) return null;

  const [featured, ...rest] = blogs;

  return (
    <div className="space-y-10">
      {featured && (
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="group relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary to-secondary p-8 text-primary-foreground md:p-12"
        >
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
          <div className="relative max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">
              {featured.category?.name || "Featured"}
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              {featured.title}
            </h2>
            <p className="mt-4 text-primary-foreground/70">{featured.excerpt}</p>
            <div className="mt-4 flex items-center gap-2 text-sm text-primary-foreground/50">
              <Calendar className="h-4 w-4" />
              {featured.publishedAt ? formatDate(featured.publishedAt) : ""}
              {featured.author?.name ? ` · ${featured.author.name}` : ""}
            </div>
            <Link
              href={`/blog/${featured.slug}`}
              prefetch
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
            >
              Read Article <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.article>
      )}

      <div className="grid gap-5 md:grid-cols-2">
        {rest.map((blog, index) => (
          <motion.article
            key={blog.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.04 }}
          >
            <Link
              href={`/blog/${blog.slug}`}
              prefetch
              className="group block h-full rounded-2xl border border-border bg-surface/50 p-6 transition hover:border-accent/25 hover:shadow-glow"
            >
              <span className="text-xs font-medium uppercase tracking-wide text-accent">
                {blog.category?.name || "Insight"}
              </span>
              <h3 className="mt-2 text-lg font-semibold text-primary group-hover:text-accent transition-colors">
                {blog.title}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm text-muted">{blog.excerpt}</p>
              <p className="mt-4 text-xs text-muted">
                {blog.publishedAt ? formatDate(blog.publishedAt) : ""}
              </p>
            </Link>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
