"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

const LenisScroll = dynamic(
  () => import("@/components/effects/lenis-scroll").then((m) => m.LenisScroll),
  { ssr: false },
);

export function SmoothScroll({ children }: { children: ReactNode }) {
  const [useLenis, setUseLenis] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    setUseLenis(!prefersReduced && isFinePointer);
  }, []);

  if (!useLenis) return <>{children}</>;

  return <LenisScroll>{children}</LenisScroll>;
}
