/** Royalty-free Unsplash images + local AI-generated fallbacks. */

const unsplash = (id: string, w = 800) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

/** Local images — always available, never 404 */
export const localImages = {
  hospitalManagement: "/assets/images/hospital-management-system.png",
  schoolErp: "/assets/images/school-erp.png",
  businessEnterprise: "/assets/images/business-enterprise.png",
  educationStartup: "/assets/images/education-startup.png",
  digitalMarketing: "/assets/images/digital-marketing.png",
  blockchainPlatform: "/assets/images/blockchain-platform.png",
} as const;

/** Ignore empty or invalid DB paths; accept uploaded media URLs and public paths */
export function resolveImageUrl(
  dbValue: string | null | undefined,
  fallback: string,
): string {
  if (!dbValue || !dbValue.trim()) return fallback;
  const src = dbValue.trim();
  if (
    src.startsWith("http://") ||
    src.startsWith("https://") ||
    src.startsWith("data:") ||
    src.startsWith("/")
  ) {
    return src;
  }
  return fallback;
}

const SERVICE_IMAGES: Record<string, string> = {
  "website-development": unsplash("1460925895917-afdab827c52f"),
  "mobile-app-development": unsplash("1512941937669-90a1b58e7e9c"),
  "ai-solutions": unsplash("1677442136019-21780ecad995"),
  "software-erp-development": unsplash("1551288049-bebda4e38f71"),
  "cloud-devops": unsplash("1451187580459-43490279c0fa"),
  "digital-marketing": localImages.digitalMarketing,
  "healthcare-solutions": unsplash("1576091160399-112ba8d25d1d"),
  "gym-management": unsplash("1534438327276-14e5300c3a48"),
  "restaurant-solutions": unsplash("1517248135467-4c7edcad34c4"),
  "labour-management": unsplash("1504307651254-35680f356dfd"),
  "blockchain-platform": localImages.blockchainPlatform,
  "custom-software": unsplash("1522071820081-009f0129c71c"),
  "ui-ux-design": unsplash("1561070791-2526d30994b5"),
  "cyber-security": unsplash("1563986768609-322da13575f3"),
  "api-development": unsplash("1558494949-ef010cbdcc31"),
  "database-solutions": unsplash("1544383835-bda2bc66a55d"),
};

const PROJECT_IMAGES: Record<string, string> = {
  "doctorcare-pro-platform": unsplash("1576091160399-112ba8d25d1d"),
  "fitzone-gym-management": unsplash("1534438327276-14e5300c3a48"),
  "foodhub-restaurant-platform": unsplash("1517248135467-4c7edcad34c4"),
  "labour-erp-contractors": unsplash("1504307651254-35680f356dfd"),
};

const PRODUCT_IMAGES: Record<string, string> = {
  "doctorcare-pro": unsplash("1576091160399-112ba8d25d1d"),
  "fitzone-gym": unsplash("1534438327276-14e5300c3a48"),
  "foodhub-restaurant": unsplash("1517248135467-4c7edcad34c4"),
  "hospital-management-system": localImages.hospitalManagement,
  "school-erp": localImages.schoolErp,
  hrms: unsplash("1552664730-d307ca884978"),
  crm: unsplash("1460925895917-afdab827c52f"),
  "inventory-management": unsplash("1586528116311-ad8dd3c8310d"),
  "blockchain-platform": localImages.blockchainPlatform,
  "ai-chatbot": unsplash("1677442136019-21780ecad995"),
  "custom-erp": unsplash("1551288049-bebda4e38f71"),
  "custom-software": unsplash("1522071820081-009f0129c71c"),
};

const BLOG_IMAGES: Record<string, string> = {
  "benefits-of-business-website": unsplash("1460925895917-afdab827c52f"),
  "digital-marketing-tips": localImages.digitalMarketing,
  "ai-for-businesses": unsplash("1677442136019-21780ecad995"),
  "healthcare-software-benefits": unsplash("1576091160399-112ba8d25d1d"),
  "restaurant-management-solutions": unsplash("1517248135467-4c7edcad34c4"),
};

const BLOG_POOL = [
  unsplash("1460925895917-afdab827c52f"),
  unsplash("1551288049-bebda4e38f71"),
  unsplash("1522071820081-009f0129c71c"),
  unsplash("1552664730-d307ca884978"),
  unsplash("1451187580459-43490279c0fa"),
];

const SOLUTION_IMAGES: Record<string, string> = {
  "digital-transformation": unsplash("1451187580459-43490279c0fa"),
  "industry-platforms": unsplash("1551288049-bebda4e38f71"),
  "enterprise-software": unsplash("1460925895917-afdab827c52f"),
  "growth-marketing": localImages.digitalMarketing,
};

const INDUSTRY_IMAGES: Record<string, string> = {
  healthcare: unsplash("1576091160399-112ba8d25d1d"),
  "fitness-gyms": unsplash("1534438327276-14e5300c3a48"),
  restaurants: unsplash("1517248135467-4c7edcad34c4"),
  education: localImages.schoolErp,
  "real-estate": unsplash("1560518883-ce09059eeffa"),
  "labour-contractors": unsplash("1504307651254-35680f356dfd"),
  "retail-medical-stores": unsplash("1586528116311-ad8dd3c8310d"),
  hospitality: unsplash("1566073771259-6a8506099945"),
};

const AVATAR_POOL = [
  unsplash("1472099645785-5658abf4ff4e", 150),
  unsplash("1438761681033-6461ffad8d80", 150),
  unsplash("1507003211169-0a1dd7228f2d", 150),
  unsplash("1494790108377-be9c29b29330", 150),
  unsplash("1500648767791-00dcc994a43e", 150),
  unsplash("1573496359142-b8d87734a5a2", 150),
];

export const brandImages = {
  heroBusiness: unsplash("1553877522-43269d4ea984", 1400),
  aboutOffice: unsplash("1497366216548-37526070297c", 1200),
  aboutTeam: unsplash("1522071820081-009f0129c71c", 1200),
  contactOffice: unsplash("1497366216548-37526070297c", 1200),
  contactMap: unsplash("1524661135-423995f22d0b", 1200),
  pricingIllustration: unsplash("1554224155-6726b3ff858f", 1200),
  founderPortrait: unsplash("1507003211169-0a1dd7228f2d", 800),
} as const;

function hashPick(pool: string[], key: string): string {
  const index =
    key.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) % pool.length;
  return pool[index];
}

export function getServiceImage(slug: string, fallback?: string | null): string {
  const mapped = SERVICE_IMAGES[slug] || unsplash("1460925895917-afdab827c52f");
  return resolveImageUrl(fallback, mapped);
}

export function getProjectImage(slug: string, coverImage?: string | null): string {
  const mapped = PROJECT_IMAGES[slug] || unsplash("1460925895917-afdab827c52f");
  return resolveImageUrl(coverImage, mapped);
}

export function getProductImage(slug: string, bannerImage?: string | null): string {
  const mapped = PRODUCT_IMAGES[slug] || unsplash("1460925895917-afdab827c52f");
  return resolveImageUrl(bannerImage, mapped);
}

export function getBlogImage(slug: string, coverImage?: string | null): string {
  const mapped = BLOG_IMAGES[slug] || hashPick(BLOG_POOL, slug);
  return resolveImageUrl(coverImage, mapped);
}

export function getSolutionImage(slug: string): string {
  return SOLUTION_IMAGES[slug] || unsplash("1460925895917-afdab827c52f");
}

export function getIndustryImage(slug: string, image?: string | null): string {
  const mapped = INDUSTRY_IMAGES[slug] || unsplash("1460925895917-afdab827c52f");
  return resolveImageUrl(image, mapped);
}

export function getAvatarImage(name: string, avatar?: string | null): string {
  const mapped = hashPick(AVATAR_POOL, name);
  return resolveImageUrl(avatar, mapped);
}
