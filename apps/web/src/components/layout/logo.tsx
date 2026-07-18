"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";

type LogoProps = {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg" | "xl" | "nav";
  variant?: "default" | "footer" | "icon";
};

const sizes = {
  sm: { width: 36, height: 36 },
  md: { width: 44, height: 44 },
  lg: { width: 52, height: 52 },
  xl: { width: 72, height: 72 },
  nav: { width: 48, height: 48 },
};

const logoSrc = {
  default: "/assets/logos/mbd-logo-primary.png",
  footer: "/assets/logos/mbd-logo-light-bg.png",
  icon: "/assets/logos/mbd-logo-icon.png",
};

export function Logo({
  className,
  showText = false,
  size = "md",
  variant = "default",
}: LogoProps) {
  const dimensions = sizes[size];
  const src = variant === "footer" ? logoSrc.footer : variant === "icon" ? logoSrc.icon : logoSrc.default;

  return (
    <Link
      href="/"
      className={cn("group flex shrink-0 items-center gap-2.5 sm:gap-3", className)}
      aria-label={`${siteConfig.name} — Home`}
    >
      <span className="relative flex shrink-0 items-center justify-center transition-transform duration-300 group-hover:scale-[1.02]">
        <Image
          src={src}
          alt={`${siteConfig.name} logo`}
          width={dimensions.width}
          height={dimensions.height}
          className="h-auto w-auto max-h-full object-contain"
          style={{ maxWidth: dimensions.width, maxHeight: dimensions.height }}
          priority
        />
      </span>
      {showText && variant !== "icon" && (
        <span className="hidden leading-tight sm:block">
          <span
            className={cn(
              "block text-sm font-bold tracking-tight md:text-base",
              variant === "footer" ? "text-primary-foreground" : "text-primary",
            )}
          >
            MBD
          </span>
          <span
            className={cn(
              "block text-[10px] font-medium uppercase tracking-[0.2em] md:text-xs",
              variant === "footer" ? "text-primary-foreground/70" : "text-accent",
            )}
          >
            Solutions
          </span>
        </span>
      )}
    </Link>
  );
}
