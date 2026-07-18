"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ContentImage } from "@/components/shared/content-image";
import { DynamicIcon } from "@/components/shared/icon";
import { DemoLink } from "@/components/premium/demo-link";
import { Button } from "@/components/ui/button";
import { getServiceDemoUrl } from "@/lib/demos";
import { getServiceImage } from "@/lib/images";
import { cn } from "@/lib/utils";

type ServiceCardProps = {
  id: string;
  title: string;
  shortDesc: string;
  slug: string;
  icon: string;
  startingPrice: string;
  bannerImage?: string | null;
  index?: number;
};

export function ServiceCardPremium({
  title,
  shortDesc,
  slug,
  icon,
  startingPrice,
  bannerImage,
  index = 0,
}: ServiceCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const imageSrc = getServiceImage(slug, bannerImage);
  const demoUrl = getServiceDemoUrl(slug);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [4, -4]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-4, 4]), { stiffness: 300, damping: 30 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
    setHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleLeave}
        style={{ rotateX, rotateY, transformPerspective: 1000 }}
        className={cn(
          "group relative overflow-hidden rounded-2xl border border-border bg-surface shadow-card transition-shadow duration-500",
          "hover:border-accent/30 hover:shadow-glow",
        )}
      >
        <Link
          href={`/services/${slug}`}
          prefetch
          className="absolute inset-0 z-0"
          aria-label={`View ${title}`}
        />
          <div className="relative h-44 overflow-hidden">
            <ContentImage
              src={imageSrc}
              alt={title}
              fill
              className="transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
            <div className="absolute bottom-4 left-4 flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white backdrop-blur-md">
              <DynamicIcon name={icon} className="h-5 w-5" />
            </div>
          </div>

          <div
            className={cn(
              "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500",
              hovered && "opacity-100",
            )}
            style={{
              background:
                "radial-gradient(600px circle at 50% 0%, color-mix(in srgb, var(--accent) 10%, transparent), transparent 50%)",
            }}
          />

          <div className="relative z-10 p-6">
            <h3 className="text-lg font-semibold tracking-tight text-primary transition-colors group-hover:text-accent">
              {title}
            </h3>
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">{shortDesc}</p>

            <div className="mt-5 flex flex-col gap-3 border-t border-border/60 pt-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-medium text-primary">
                From <span className="text-accent">{startingPrice}</span>
              </p>
              <div className="relative z-20 flex w-full flex-col gap-2 min-[480px]:flex-row min-[480px]:flex-wrap sm:w-auto sm:justify-end">
                <Button variant="outline" size="sm" className="h-9 w-full sm:w-auto" asChild>
                  <Link href={`/services/${slug}`}>
                    Learn More <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </Button>
                {demoUrl && (
                  <DemoLink
                    href={demoUrl}
                    variant="accent"
                    size="sm"
                    label="Live Demo"
                    className="h-9 w-full sm:w-auto"
                  />
                )}
              </div>
            </div>
          </div>
        </motion.div>
    </motion.div>
  );
}
