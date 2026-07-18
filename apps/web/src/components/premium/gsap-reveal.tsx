"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

type GsapRevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "scale";
};

export function GsapReveal({
  children,
  className,
  delay = 0,
  direction = "up",
}: GsapRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const from: gsap.TweenVars = { opacity: 0, duration: 0.7, delay, ease: "power3.out" };
    if (direction === "up") from.y = 40;
    if (direction === "down") from.y = -40;
    if (direction === "left") from.x = 40;
    if (direction === "right") from.x = -40;
    if (direction === "scale") from.scale = 0.95;

    const tween = gsap.from(el, {
      ...from,
      scrollTrigger: {
        trigger: el,
        start: "top 88%",
        toggleActions: "play none none none",
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [delay, direction]);

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
