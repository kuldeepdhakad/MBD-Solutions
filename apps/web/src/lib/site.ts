const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://monbaidhakad.in";

export const siteConfig = {
  /** Short brand / alternate name */
  name: "MBD Solutions",
  /** Primary brand */
  brand: "Mon Bai Dhakad Solutions",
  /** Legal organization name (JSON-LD Organization.name) */
  legalName: "Mon Bai Dhakad Solutions Pvt. Ltd.",
  /** Primary document title & Open Graph site name */
  title: "Mon Bai Dhakad Solutions Pvt. Ltd. (MBD Solutions)",
  description:
    "Mon Bai Dhakad Solutions Pvt. Ltd. (MBD Solutions) is an Indian software company providing Web Development, Mobile App Development, Artificial Intelligence, Blockchain, Cloud Computing, UI/UX Design, Digital Transformation and Enterprise Software Solutions.",
  keywords: [
    "Mon Bai Dhakad",
    "Mon Bai Dhakad Solutions",
    "Mon Bai Dhakad Solutions Pvt Ltd",
    "MBD",
    "MBD Solutions",
    "Software Company India",
    "Web Development Company",
    "AI Company",
    "Next.js Development",
    "Blockchain Development",
    "Cloud Services",
    "Mobile App Development",
    "IT Company India",
  ],
  url: siteUrl,
  domain: "monbaidhakad.in",
  ogImage: "/assets/logos/mbd-logo-full.png",
  locale: "en_IN",
  language: "en",
  country: "India",
  founder: "Kuldeep Dhakad",
  phone: process.env.NEXT_PUBLIC_COMPANY_PHONE || "6263478403",
  email:
    process.env.NEXT_PUBLIC_COMPANY_EMAIL || "kuldeepdhakad153@gmail.com",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || "916263478403",
  twitterHandle: "@mbdsolutions",
  industry:
    "Software Development, AI, Web Development, Mobile App Development, Cloud Computing, Blockchain, UI/UX Design, IT Consulting",
} as const;

export function whatsappLink(message?: string) {
  const text = message
    ? `?text=${encodeURIComponent(message)}`
    : "";
  return `https://wa.me/${siteConfig.whatsapp}${text}`;
}

export function absoluteUrl(path = "/") {
  if (!path || path === "/") return siteConfig.url;
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}
