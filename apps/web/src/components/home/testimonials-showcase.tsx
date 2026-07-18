"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { ContentImage } from "@/components/shared/content-image";
import { getAvatarImage } from "@/lib/images";

type Testimonial = {
  id: string;
  name: string;
  role: string;
  company?: string | null;
  content: string;
  rating?: number | null;
  avatar?: string | null;
};

export function TestimonialsShowcase({ items }: { items: Testimonial[] }) {
  if (!items.length) return null;

  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => (
        <motion.article
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, delay: index * 0.05 }}
          whileHover={{ y: -4 }}
          className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-6 shadow-soft transition-shadow duration-300 hover:border-accent/25 hover:shadow-card md:p-7"
        >
          <div className="mb-4 flex gap-0.5 text-warning">
            {Array.from({ length: item.rating || 5 }).map((_, i) => (
              <Star key={`${item.id}-star-${i}`} className="h-4 w-4 fill-current" />
            ))}
          </div>
          <blockquote className="flex-1 text-sm leading-relaxed text-secondary md:text-[15px]">
            &ldquo;{item.content}&rdquo;
          </blockquote>
          <footer className="mt-6 flex items-center gap-3 border-t border-border/60 pt-5">
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-accent/20 shadow-soft">
              <ContentImage
                src={getAvatarImage(item.name, item.avatar)}
                alt={item.name}
                fill
                className="rounded-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <cite className="not-italic text-sm font-semibold text-primary">{item.name}</cite>
              <p className="truncate text-xs text-muted">{item.role}</p>
              {item.company && (
                <p className="truncate text-xs font-medium text-accent/80">{item.company}</p>
              )}
            </div>
          </footer>
        </motion.article>
      ))}
    </div>
  );
}
