"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Linkedin, MessageCircle, Twitter } from "lucide-react";
import { Logo } from "@/components/layout/logo";
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
    title: "Services",
    links: [
      { href: "/services", label: "All Services" },
      { href: "/products", label: "Products" },
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

const socialLinks = [
  { href: `https://linkedin.com/company/${siteConfig.domain}`, label: "LinkedIn", icon: Linkedin },
  { href: `https://twitter.com/${siteConfig.twitterHandle.replace("@", "")}`, label: "Twitter", icon: Twitter },
  { href: whatsappLink(), label: "WhatsApp", icon: MessageCircle },
];

export function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin") || pathname.startsWith("/portal")) {
    return null;
  }

  return (
    <footer
      className="relative overflow-hidden border-t border-border bg-primary text-primary-foreground"
      role="contentinfo"
      aria-label={`${siteConfig.legalName} footer`}
    >
      <div className="pointer-events-none absolute -right-32 top-0 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
      <div className="relative mx-auto max-w-container px-5 py-16 md:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <Logo variant="footer" size="lg" showText />
            <p className="mt-3 text-sm text-primary-foreground/60">{siteConfig.legalName}</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-primary-foreground/70">
              Complete digital solutions for every business — websites, software,
              apps, AI and marketing.
            </p>
            <div className="mt-6 space-y-2 text-sm text-primary-foreground/80">
              <p className="font-medium text-primary-foreground">{siteConfig.founder}</p>
              <a
                href={`tel:+91${siteConfig.phone}`}
                className="block transition hover:text-accent"
                aria-label={`Call ${siteConfig.phone}`}
              >
                Mobile: {siteConfig.phone}
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="block transition hover:text-accent"
                aria-label={`Email ${siteConfig.email}`}
              >
                {siteConfig.email}
              </a>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="block transition hover:text-accent"
                aria-label="WhatsApp Support"
              >
                WhatsApp Support
              </a>
            </div>
            <div className="mt-6 flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-primary-foreground/15 bg-primary-foreground/5 text-primary-foreground/70 transition hover:border-accent/40 hover:bg-accent/10 hover:text-accent"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
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
                      className="link-hover text-sm text-primary-foreground/70 transition-colors duration-200 hover:text-accent"
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
