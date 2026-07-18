"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const PremiumGlobe = dynamic(
  () => import("@/components/home/premium-globe").then((m) => m.PremiumGlobe),
  {
    ssr: false,
    loading: () => <GlobePlaceholder />,
  },
);

function GlobePlaceholder() {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      <div className="absolute left-1/2 top-1/2 h-[60%] w-[60%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2563EB]/10 blur-2xl" />
      <div className="absolute left-1/2 top-1/2 h-[40%] w-[40%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#BFDBFE] bg-gradient-to-br from-[#EFF6FF] to-[#DBEAFE]/60" />
    </div>
  );
}

export function PremiumGlobeClient() {
  const ref = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    const isSmall = window.innerWidth < 768;
    if (prefersReduced || (isCoarse && isSmall)) return;

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const idle = (window as Window & { requestIdleCallback?: (cb: () => void) => number })
          .requestIdleCallback;
        if (idle) idle(() => setShouldLoad(true));
        else setTimeout(() => setShouldLoad(true), 400);
      },
      { rootMargin: "120px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="h-full w-full">
      {shouldLoad ? <PremiumGlobe /> : <GlobePlaceholder />}
    </div>
  );
}
