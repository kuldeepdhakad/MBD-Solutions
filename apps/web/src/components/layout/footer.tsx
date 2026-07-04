"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig, whatsappLink } from "@/lib/api";

const columns = [
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/founder", label: "Founder" },
      { href: "/team", label: "Our Team" },
      { href: "/leadership", label: "Leadership" },
      { href: "/careers", label: "Careers" },
      { href: "/clients", label: "Clients" },
    ],
  },
  {
    title: "Products",
    links: [
      { href: "/products", label: "All Products" },
      { href: "/services", label: "Services" },
      { href: "/solutions", label: "Solutions" },
      { href: "/portfolio", label: "Portfolio" },
      { href: "/case-studies", label: "Case Studies" },
      { href: "/pricing", label: "Pricing" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/blog", label: "Blog" },
      { href: "/docs", label: "Documentation" },
      { href: "/developers", label: "Developer Portal" },
      { href: "/api-docs", label: "API Documentation" },
      { href: "/resources", label: "Resources" },
      { href: "/faqs", label: "FAQs" },
    ],
  },
  {
    title: "Support",
    links: [
      { href: "/support", label: "Support" },
      { href: "/contact", label: "Contact" },
      { href: "/downloads", label: "Downloads" },
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms & Conditions" },
      { href: "/cookies", label: "Cookie Policy" },
    ],
  },
];

export function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin") || pathname.startsWith("/portal")) {
    return null;
  }

  return (
    <footer
      className="border-t border-border bg-primary text-primary-foreground"
      role="contentinfo"
      aria-label={`${siteConfig.legalName} footer`}
    >
      <div className="mx-auto max-w-container px-5 py-16 md:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5" aria-label={siteConfig.name}>
              <span
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-foreground text-sm font-bold text-primary"
                aria-hidden="true"
              >
                MBD
              </span>
              <span className="font-semibold text-primary-foreground">Solutions</span>
            </div>
            <p className="mt-2 text-sm text-primary-foreground/60">{siteConfig.legalName}</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-primary-foreground/70">
              Complete digital solutions for every business — websites, software,
              apps, AI and marketing.
            </p>
            <div className="mt-6 space-y-2 text-sm text-primary-foreground/80">
              <p className="font-medium text-primary-foreground">{siteConfig.founder}</p>
              <a
                href={`tel:+91${siteConfig.phone}`}
                className="block hover:opacity-100"
                aria-label={`Call ${siteConfig.phone}`}
              >
                Mobile: {siteConfig.phone}
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="block hover:opacity-100"
                aria-label={`Email ${siteConfig.email}`}
              >
                {siteConfig.email}
              </a>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:opacity-100"
                aria-label="WhatsApp Support"
              >
                WhatsApp Support
              </a>
            </div>
          </div>

          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <p className="text-sm font-semibold text-primary-foreground">{column.title}</p>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={`${column.title}-${link.href}`}>
                    <Link
                      href={link.href}
                      className="text-sm text-primary-foreground/65 transition hover:text-primary-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-primary-foreground/10 pt-8 text-sm text-primary-foreground/50 md:flex-row md:items-center md:justify-between">
          <p>Copyright © {new Date().getFullYear()} MBD Solutions. All Rights Reserved.</p>
          <p>Powered by Mon Bai Dhakad</p>
        </div>
      </div>
    </footer>
  );
}
