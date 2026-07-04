"use client";

import dynamic from "next/dynamic";

const HeroGlobe = dynamic(
  () => import("@/components/home/globe").then((m) => m.HeroGlobe),
  {
    ssr: false,
    loading: () => (
      <div className="mx-auto h-[240px] w-full max-w-[280px] animate-pulse rounded-full bg-background md:h-[280px] md:max-w-[320px] lg:h-[300px]" />
    ),
  },
);

export function HeroGlobeClient() {
  return <HeroGlobe />;
}
