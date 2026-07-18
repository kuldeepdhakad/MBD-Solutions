/** Demo URL mapping for services, products and projects */

const PRODUCT_DEMO_SLUGS: Record<string, string> = {
  "doctorcare-pro": "doctor-care-pro",
  "fitzone-gym": "fitzone-gym",
  "foodhub-restaurant": "foodhub-restaurant",
  "hospital-management-system": "hospital-management-system",
  "school-erp": "school-erp",
  hrms: "hrms",
  crm: "crm",
  "inventory-management": "inventory-management",
  "blockchain-platform": "blockchain-platform",
  "ai-chatbot": "ai-chatbot",
  "custom-erp": "custom-erp",
  "custom-software": "custom-software",
};

const SERVICE_DEMO_SLUGS: Record<string, string> = {
  "website-development": "website-development",
  "healthcare-solutions": "healthcare-solutions",
  "gym-management": "gym-management",
  "restaurant-solutions": "restaurant-solutions",
  "mobile-app-development": "mobile-app-development",
  "software-erp-development": "software-erp-development",
  "ai-solutions": "ai-solutions",
  "digital-marketing": "digital-marketing",
  "cloud-devops": "cloud-devops",
  "labour-management": "labour-management",
};

const PROJECT_DEMO_SLUGS: Record<string, string> = {
  "doctorcare-pro-platform": "doctor-care-pro",
  "fitzone-gym-management": "fitzone-gym",
  "foodhub-restaurant-platform": "foodhub-restaurant",
  "labour-erp-contractors": "labour-management",
};

export function getServiceDemoUrl(slug: string): string | null {
  const demoSlug = SERVICE_DEMO_SLUGS[slug];
  if (!demoSlug) return null;
  return `/demos/${demoSlug}/index.html`;
}

export function getProductDemoUrl(slug: string): string | null {
  const demoSlug = PRODUCT_DEMO_SLUGS[slug];
  if (!demoSlug) return null;
  return `/demos/${demoSlug}/index.html`;
}

export function getProjectDemoUrl(slug: string): string | null {
  const demoSlug = PROJECT_DEMO_SLUGS[slug];
  if (!demoSlug) return null;
  return `/demos/${demoSlug}/index.html`;
}

export function resolveProductDemoUrl(product: {
  slug: string;
  liveDemoUrl?: string | null;
}): string | null {
  return product.liveDemoUrl || getProductDemoUrl(product.slug);
}

export function resolveProjectDemoUrl(project: {
  slug: string;
  liveDemoUrl?: string | null;
}): string | null {
  return project.liveDemoUrl || getProjectDemoUrl(project.slug);
}

export function getDemoUrl(
  slug: string,
  type: "service" | "product",
): string | null {
  return type === "service" ? getServiceDemoUrl(slug) : getProductDemoUrl(slug);
}

export const ALL_DEMO_SLUGS = [
  ...new Set([
    ...Object.values(SERVICE_DEMO_SLUGS),
    ...Object.values(PRODUCT_DEMO_SLUGS),
    ...Object.values(PROJECT_DEMO_SLUGS),
  ]),
];
