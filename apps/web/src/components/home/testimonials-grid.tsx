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

export function TestimonialsGrid({ items }: { items: Testimonial[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => (
        <motion.article
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.05 }}
          whileHover={{ y: -4 }}
          className="rounded-2xl border border-border bg-surface p-6 shadow-soft transition-shadow hover:shadow-glow"
        >
          <div className="mb-4 flex gap-1 text-warning">
            {Array.from({ length: item.rating || 5 }).map((_, i) => (
              <Star key={`${item.id}-star-${i}`} className="h-4 w-4 fill-current" />
            ))}
          </div>
          <p className="text-sm leading-relaxed text-secondary">&ldquo;{item.content}&rdquo;</p>
          <footer className="mt-6 flex items-center gap-3 border-t border-border/60 pt-5">
            <div className="relative h-11 w-11 overflow-hidden rounded-full border border-accent/20">
              <ContentImage
                src={getAvatarImage(item.name, item.avatar)}
                alt={item.name}
                fill
                className="rounded-full"
              />
            </div>
            <div>
              <p className="font-semibold text-primary">{item.name}</p>
              <p className="text-xs text-muted">
                {item.role}
                {item.company ? `, ${item.company}` : ""}
              </p>
            </div>
          </footer>
        </motion.article>
      ))}
    </div>
  );
}
