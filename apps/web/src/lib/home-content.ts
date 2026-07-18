/** Homepage copy and fallback content — keeps messaging consistent across sections. */

import { localImages, resolveImageUrl } from "@/lib/images";

export const HERO_COPY = {
  title: "Custom Software Built Around Your Business",
  subtitle:
    "We design and build websites, mobile apps, ERP systems and marketing tools for clinics, gyms, restaurants and growing companies across India.",
} as const;

export const BUSINESS_STRENGTHS = [
  "Business Websites",
  "Mobile Applications",
  "ERP Software",
  "AI Automation",
  "Cloud Solutions",
  "Digital Marketing",
] as const;

export const DEFAULT_STATS = [
  { id: "stat-projects", label: "Projects Delivered", value: "100", suffix: "+" },
  { id: "stat-clients", label: "Happy Clients", value: "50", suffix: "+" },
  { id: "stat-satisfaction", label: "Client Satisfaction", value: "99", suffix: "%" },
  { id: "stat-support", label: "Support", value: "24", suffix: "×7" },
] as const;

export type TrustedClientCard = {
  id: string;
  name: string;
  industry: string;
  description: string;
  image: string;
  icon: string;
};

const unsplash = (id: string, w = 400) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

/** Enriched client profiles for the Trusted By section (merged with API data by name). */
export const TRUSTED_CLIENT_PROFILES: Record<
  string,
  Omit<TrustedClientCard, "id" | "name">
> = {
  "City Care Clinic": {
    industry: "Hospital & Healthcare",
    description: "Clinic website and patient appointment system for a multi-doctor practice in Bhopal.",
    image: unsplash("1576091160399-112ba8d25d1d"),
    icon: "HeartPulse",
  },
  "PowerFit Gym": {
    industry: "Gym & Fitness",
    description: "Membership management, attendance tracking and trainer profiles for a growing fitness centre.",
    image: unsplash("1534438327276-14e5300c3a48"),
    icon: "Dumbbell",
  },
  "Spice Route Kitchen": {
    industry: "Restaurant",
    description: "Online ordering, digital menu and table reservations for a busy restaurant brand.",
    image: unsplash("1517248135467-4c7edcad34c4"),
    icon: "UtensilsCrossed",
  },
  "Yadav Contractors": {
    industry: "Construction & Labour",
    description: "Workforce registration, attendance and payroll for a contractor managing 200+ workers.",
    image: unsplash("1504307651254-35680f356dfd"),
    icon: "HardHat",
  },
  "Mehta Enterprises": {
    industry: "Retail & Business",
    description: "Business website and CRM setup that brought consistent online leads within the first month.",
    image: localImages.businessEnterprise,
    icon: "Store",
  },
  "Singh Startups": {
    industry: "School & Education",
    description: "School administration portal with fee management and parent communication workflows.",
    image: localImages.educationStartup,
    icon: "GraduationCap",
  },
};

export const FALLBACK_TRUSTED_CLIENTS: TrustedClientCard[] = [
  {
    id: "fallback-hospital",
    name: "City Care Clinic",
    industry: "Hospital & Healthcare",
    description: "Clinic website and patient appointment system for a multi-doctor practice.",
    image: unsplash("1576091160399-112ba8d25d1d"),
    icon: "HeartPulse",
  },
  {
    id: "fallback-restaurant",
    name: "Spice Route Kitchen",
    industry: "Restaurant",
    description: "Online ordering, digital menu and table reservations for a busy restaurant brand.",
    image: unsplash("1517248135467-4c7edcad34c4"),
    icon: "UtensilsCrossed",
  },
  {
    id: "fallback-gym",
    name: "PowerFit Gym",
    industry: "Gym & Fitness",
    description: "Membership management, attendance tracking and trainer profiles for a fitness centre.",
    image: unsplash("1534438327276-14e5300c3a48"),
    icon: "Dumbbell",
  },
  {
    id: "fallback-construction",
    name: "Yadav Contractors",
    industry: "Construction & Labour",
    description: "Workforce registration, attendance and payroll for a contractor managing 200+ workers.",
    image: unsplash("1504307651254-35680f356dfd"),
    icon: "HardHat",
  },
  {
    id: "fallback-school",
    name: "Green Valley School",
    industry: "School & Education",
    description: "School ERP with fee management, attendance and parent communication portal.",
    image: localImages.schoolErp,
    icon: "GraduationCap",
  },
  {
    id: "fallback-retail",
    name: "Mehta Retail",
    industry: "Retail",
    description: "E-commerce website and inventory system for a regional retail business.",
    image: localImages.businessEnterprise,
    icon: "Store",
  },
];

export function dedupeStats(
  stats: { id?: string; label: string; value: string; suffix?: string }[],
) {
  const seen = new Set<string>();
  const preferred = ["Projects Delivered", "Happy Clients", "Client Satisfaction", "Support"];
  const ordered = [
    ...preferred
      .map((label) => stats.find((s) => s.label === label))
      .filter(Boolean) as typeof stats,
    ...stats.filter((s) => !preferred.includes(s.label)),
  ];

  return ordered
    .filter((stat) => {
      const key = stat.label.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, 4);
}

export function resolveTrustedClients(
  clients: { id: string; name: string; industry?: string | null; logo?: string | null }[],
): TrustedClientCard[] {
  if (!clients.length) return FALLBACK_TRUSTED_CLIENTS;

  const seen = new Set<string>();
  const unique = clients.filter((client) => {
    const key = client.name.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return unique.map((client) => {
    const profile = TRUSTED_CLIENT_PROFILES[client.name];
    return {
      id: client.id,
      name: client.name,
      industry: client.industry || profile?.industry || "Business",
      description:
        profile?.description ||
        `Digital solutions delivered for ${client.name} in the ${client.industry || "business"} sector.`,
      image: resolveImageUrl(
        client.logo,
        profile?.image || unsplash("1460925895917-afdab827c52f"),
      ),
      icon: profile?.icon || "Building2",
    };
  });
}
