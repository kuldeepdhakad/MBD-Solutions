"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, Phone, Search, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/layout/logo";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";

const nav = [
  { href: "/services", label: "Services" },
  { href: "/products", label: "Products" },
  { href: "/solutions", label: "Solutions" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-foreground transition duration-200 hover:bg-panel hover:text-accent"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {mounted ? (
        isDark ? (
          <Sun className="h-4 w-4 shrink-0" strokeWidth={2} />
        ) : (
          <Moon className="h-4 w-4 shrink-0" strokeWidth={2} />
        )
      ) : (
        <span className="h-4 w-4" aria-hidden="true" />
      )}
    </button>
  );
}

export function Header() {
  const pathname = usePathname();
  const { resolvedTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const isDark = mounted && resolvedTheme === "dark";

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (pathname.startsWith("/admin") || pathname.startsWith("/portal")) {
    return null;
  }

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || isDark
          ? "border-b border-border bg-surface/90 shadow-soft backdrop-blur-xl"
          : "border-b border-transparent bg-background/80 backdrop-blur-sm",
      )}
    >
      <div className="mx-auto flex h-16 max-w-container min-w-0 items-center justify-between gap-2 px-4 sm:gap-3 sm:px-5 md:h-[72px] md:px-8">
        <Logo size="nav" showText className="min-w-0 shrink" />

        <nav
          className="hidden min-w-0 items-center gap-0.5 lg:flex"
          aria-label="Primary"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              prefetch
              className="nav-underline rounded-lg px-2 py-2 text-sm font-medium text-muted transition duration-200 hover:text-primary lg:px-2.5 xl:px-3"
              data-active={isActive(item.href)}
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <Link
            href="/search"
            prefetch
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-foreground transition duration-200 hover:bg-panel hover:text-accent"
            aria-label="Search"
          >
            <Search className="h-4 w-4" />
          </Link>
          <ThemeToggle />
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <a
              href={`tel:+91${siteConfig.phone}`}
              aria-label={`Call ${siteConfig.name} at ${siteConfig.phone}`}
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call Now
            </a>
          </Button>
          <button
            className="inline-flex rounded-lg p-2 text-primary lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              aria-label="Close menu"
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              className="fixed inset-y-0 right-0 z-50 flex w-[min(100%,20rem)] flex-col border-l border-border bg-surface/98 shadow-elevated backdrop-blur-xl lg:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 380, damping: 34 }}
            >
              <div className="flex h-16 items-center justify-between border-b border-border px-5">
                <span className="text-sm font-semibold text-primary">Menu</span>
                <button
                  type="button"
                  className="rounded-lg p-2 text-primary"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-4">
                {nav.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * index }}
                  >
                    <Link
                      href={item.href}
                      prefetch
                      className={cn(
                        "block rounded-xl px-4 py-3 text-sm font-medium transition",
                        isActive(item.href)
                          ? "bg-background text-primary"
                          : "text-muted hover:bg-background hover:text-primary",
                      )}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="border-t border-border p-4">
                <Button asChild className="w-full">
                  <Link href="/contact">Free Consultation</Link>
                </Button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
