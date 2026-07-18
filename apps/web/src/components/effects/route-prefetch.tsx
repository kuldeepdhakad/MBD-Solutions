"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const PREFETCH_ROUTES = [
  "/",
  "/services",
  "/products",
  "/solutions",
  "/portfolio",
  "/pricing",
  "/about",
  "/blog",
  "/contact",
  "/testimonials",
  "/technologies",
  "/industries",
];

export function RoutePrefetch() {
  const router = useRouter();

  useEffect(() => {
    PREFETCH_ROUTES.forEach((route) => router.prefetch(route));

    const onHover = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement).closest("a[href]");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("http") || href.startsWith("#") || href.startsWith("tel:") || href.startsWith("mailto:")) {
        return;
      }
      router.prefetch(href);
    };

    document.addEventListener("mouseover", onHover, { passive: true });
    return () => document.removeEventListener("mouseover", onHover);
  }, [router]);

  return null;
}
