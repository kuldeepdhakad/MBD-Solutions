import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/site";

export type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  /** Use title as-is (no layout title template). */
  absoluteTitle?: boolean;
  image?: string | null;
  type?: "website" | "article";
  noIndex?: boolean;
  keywords?: string[];
};

export type BreadcrumbItem = {
  name: string;
  path: string;
};

export type ServiceJsonLdInput = {
  name: string;
  description: string;
  path: string;
  image?: string | null;
};

export type ArticleJsonLdInput = {
  title: string;
  description: string;
  path: string;
  image?: string | null;
  datePublished?: string | Date | null;
  dateModified?: string | Date | null;
  authorName?: string | null;
};

function resolveImage(image?: string | null) {
  if (!image) return absoluteUrl(siteConfig.ogImage);
  if (image.startsWith("http://") || image.startsWith("https://")) return image;
  return absoluteUrl(image);
}

function toIso(value?: string | Date | null) {
  if (!value) return undefined;
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return undefined;
  return date.toISOString();
}

/** Per-page metadata: title, description, canonical, Open Graph, Twitter. */
export function createPageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
  image,
  type = "website",
  noIndex = false,
  keywords,
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const ogImage = resolveImage(image);
  const pageTitle = absoluteTitle
    ? { absolute: title }
    : title;

  return {
    title: pageTitle,
    description,
    keywords: keywords ?? [...siteConfig.keywords],
    authors: [
      { name: siteConfig.founder, url: absoluteUrl("/founder") },
      { name: siteConfig.legalName, url: siteConfig.url },
    ],
    creator: siteConfig.legalName,
    publisher: siteConfig.legalName,
    robots: noIndex
      ? { index: false, follow: true }
      : {
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
      canonical: url,
      languages: {
        "en-IN": url,
        en: url,
      },
    },
    openGraph: {
      type,
      locale: siteConfig.locale,
      url,
      siteName: siteConfig.title,
      title,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
      creator: siteConfig.twitterHandle,
      site: siteConfig.twitterHandle,
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.legalName,
    alternateName: [siteConfig.name, siteConfig.brand],
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/assets/logos/mbd-logo-full.png"),
      width: 512,
      height: 512,
    },
    image: absoluteUrl(siteConfig.ogImage),
    description: siteConfig.description,
    foundingDate: "2023",
    founder: {
      "@type": "Person",
      name: siteConfig.founder,
      url: absoluteUrl("/founder"),
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: `+91-${siteConfig.phone}`,
        contactType: "customer service",
        email: siteConfig.email,
        areaServed: "IN",
        availableLanguage: ["English", "Hindi"],
      },
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
    },
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    knowsAbout: siteConfig.industry.split(", ").concat([...siteConfig.keywords]),
    sameAs: [siteConfig.url],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.title,
    alternateName: [siteConfig.name, siteConfig.brand, siteConfig.legalName],
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: "en-IN",
    publisher: {
      "@id": `${siteConfig.url}/#organization`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteConfig.url}/#localbusiness`,
    name: siteConfig.legalName,
    alternateName: siteConfig.name,
    url: siteConfig.url,
    image: absoluteUrl(siteConfig.ogImage),
    logo: absoluteUrl("/assets/logos/mbd-logo-icon.png"),
    description: siteConfig.description,
    telephone: `+91-${siteConfig.phone}`,
    email: siteConfig.email,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      addressCountry: "IN",
    },
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "09:00",
      closes: "20:00",
    },
    sameAs: [siteConfig.url],
    parentOrganization: {
      "@id": `${siteConfig.url}/#organization`,
    },
  };
}

export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function serviceJsonLd({
  name,
  description,
  path,
  image,
}: ServiceJsonLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: absoluteUrl(path),
    image: image ? resolveImage(image) : undefined,
    provider: {
      "@type": "Organization",
      name: siteConfig.legalName,
      alternateName: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    serviceType: name,
  };
}

export function articleJsonLd({
  title,
  description,
  path,
  image,
  datePublished,
  dateModified,
  authorName,
}: ArticleJsonLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: absoluteUrl(path),
    image: image ? resolveImage(image) : absoluteUrl(siteConfig.ogImage),
    datePublished: toIso(datePublished),
    dateModified: toIso(dateModified) || toIso(datePublished),
    author: {
      "@type": "Person",
      name: authorName || siteConfig.founder,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.legalName,
      alternateName: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/assets/logos/mbd-logo-full.png"),
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(path),
    },
  };
}
