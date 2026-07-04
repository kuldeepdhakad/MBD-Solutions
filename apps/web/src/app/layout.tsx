import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FloatingActions } from "@/components/layout/floating-actions";
import { Providers } from "@/components/providers";
import { JsonLd } from "@/components/seo/json-ld";
import {
  localBusinessJsonLd,
  organizationJsonLd,
  websiteJsonLd,
} from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1220" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [
    { name: siteConfig.founder, url: `${siteConfig.url}/founder` },
    { name: siteConfig.legalName, url: siteConfig.url },
  ],
  creator: siteConfig.legalName,
  publisher: siteConfig.legalName,
  applicationName: siteConfig.name,
  category: "technology",
  classification: "Software Development Company",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: siteConfig.url,
    languages: {
      "en-IN": siteConfig.url,
      en: siteConfig.url,
    },
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.title,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: siteConfig.twitterHandle,
    site: siteConfig.twitterHandle,
  },
  icons: {
    icon: [
      { url: "/assets/logos/favicon.svg", type: "image/svg+xml" },
      { url: "/assets/logos/mbd-logo-favicon.png", type: "image/png" },
    ],
    shortcut: ["/assets/logos/mbd-logo-favicon.png"],
    apple: [{ url: "/assets/logos/mbd-logo-icon.png" }],
  },
  manifest: "/manifest.webmanifest",
  verification: {
    // Add Google Search Console verification token via env when available
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
  },
  other: {
    "geo.region": "IN",
    "geo.placename": "India",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans text-foreground`}>
        <JsonLd
          data={[
            organizationJsonLd(),
            websiteJsonLd(),
            localBusinessJsonLd(),
          ]}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Skip to main content
        </a>
        <Providers>
          <Header />
          <main id="main-content" className="min-h-screen" role="main">
            {children}
          </main>
          <Footer />
          <FloatingActions />
        </Providers>
      </body>
    </html>
  );
}
