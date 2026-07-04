import { unstable_cache } from "next/cache";
import { prisma } from "./db";

export async function getHomeData() {
  return unstable_cache(
    async () => {
      const [
        sections,
        stats,
        services,
        products,
        projects,
        industries,
        testimonials,
        blogs,
        faqs,
        clients,
        partners,
        processSteps,
        settings,
        technologies,
      ] = await Promise.all([
        prisma.homepageSection.findMany({
          where: { isVisible: true },
          orderBy: { sortOrder: "asc" },
        }),
        prisma.statistic.findMany({ orderBy: { sortOrder: "asc" } }),
        prisma.service.findMany({
          where: { status: "PUBLISHED", isFeatured: true },
          orderBy: { sortOrder: "asc" },
          take: 6,
        }),
        prisma.product.findMany({
          where: { status: "PUBLISHED", isFeatured: true },
          orderBy: { sortOrder: "asc" },
          take: 6,
        }),
        prisma.project.findMany({
          where: { status: "PUBLISHED", isFeatured: true },
          orderBy: { sortOrder: "asc" },
          take: 4,
          include: { industry: true },
        }),
        prisma.industry.findMany({
          where: { status: "PUBLISHED" },
          orderBy: { sortOrder: "asc" },
        }),
        prisma.testimonial.findMany({
          where: { status: "PUBLISHED", isFeatured: true },
          orderBy: { sortOrder: "asc" },
        }),
        prisma.blog.findMany({
          where: { status: "PUBLISHED" },
          orderBy: { publishedAt: "desc" },
          take: 3,
          include: { category: true, author: { select: { name: true } } },
        }),
        prisma.fAQ.findMany({
          where: { status: "PUBLISHED" },
          orderBy: { sortOrder: "asc" },
          take: 6,
        }),
        prisma.client.findMany({
          where: { isFeatured: true },
          orderBy: { sortOrder: "asc" },
        }),
        prisma.partner.findMany({ orderBy: { sortOrder: "asc" } }),
        prisma.processStep.findMany({ orderBy: { sortOrder: "asc" } }),
        prisma.setting.findMany(),
        prisma.technology.findMany({
          where: { status: "PUBLISHED", isFeatured: true },
          orderBy: { sortOrder: "asc" },
          take: 12,
        }),
      ]);

      return {
        sections,
        stats,
        services,
        products,
        projects,
        industries,
        testimonials,
        blogs,
        faqs,
        clients,
        partners,
        processSteps,
        technologies,
        settings: Object.fromEntries(settings.map((s) => [s.key, s.value])),
      };
    },
    ["home-data"],
    { revalidate: 60, tags: ["home"] },
  )();
}

export async function getPublishedList(
  model:
    | "service"
    | "product"
    | "project"
    | "technology"
    | "industry"
    | "teamMember"
    | "testimonial"
    | "fAQ"
    | "client"
    | "solution"
    | "pricingPlan"
    | "blog"
    | "job",
  options: {
    include?: Record<string, unknown>;
    where?: Record<string, unknown>;
    orderBy?: any;
    take?: number;
  } = {},
) {
  const delegate = (prisma as any)[model];
  const defaultWhere =
    model === "job"
      ? { isActive: true }
      : model === "client"
        ? {}
        : { status: "PUBLISHED" };

  return delegate.findMany({
    where: { ...defaultWhere, ...options.where },
    include: options.include,
    orderBy: options.orderBy || (model === "blog" || model === "job" ? { createdAt: "desc" } : { sortOrder: "asc" }),
    take: options.take,
  });
}

export async function getBySlug(
  model: "service" | "product" | "project" | "industry" | "blog" | "job" | "solution" | "technology",
  slug: string,
  include?: Record<string, unknown>,
) {
  const delegate = (prisma as any)[model];
  const where: any = { slug };
  if (model === "job") where.isActive = true;
  else if (model !== "technology") where.status = "PUBLISHED";
  else where.status = "PUBLISHED";

  return delegate.findFirst({ where, include });
}

export async function getFounder() {
  return prisma.founder.findFirst({ orderBy: { createdAt: "asc" } });
}

export async function getLeadership() {
  return prisma.teamMember.findMany({
    where: { status: "PUBLISHED", isLeadership: true },
    orderBy: { sortOrder: "asc" },
  });
}

export async function getInternships() {
  return prisma.job.findMany({
    where: { isActive: true, isInternship: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function searchContent(q: string) {
  if (!q.trim()) return { services: [], products: [], projects: [], blogs: [] };

  const [services, products, projects, blogs] = await Promise.all([
    prisma.service.findMany({
      where: {
        status: "PUBLISHED",
        OR: [
          { title: { contains: q, mode: "insensitive" } },
          { shortDesc: { contains: q, mode: "insensitive" } },
        ],
      },
      take: 8,
    }),
    prisma.product.findMany({
      where: {
        status: "PUBLISHED",
        OR: [
          { name: { contains: q, mode: "insensitive" } },
          { tagline: { contains: q, mode: "insensitive" } },
        ],
      },
      take: 8,
    }),
    prisma.project.findMany({
      where: {
        status: "PUBLISHED",
        OR: [
          { title: { contains: q, mode: "insensitive" } },
          { overview: { contains: q, mode: "insensitive" } },
        ],
      },
      take: 8,
    }),
    prisma.blog.findMany({
      where: {
        status: "PUBLISHED",
        OR: [
          { title: { contains: q, mode: "insensitive" } },
          { excerpt: { contains: q, mode: "insensitive" } },
        ],
      },
      take: 8,
    }),
  ]);

  return { services, products, projects, blogs };
}

export async function getSeoForPath(pagePath: string) {
  return prisma.sEO.findUnique({ where: { pagePath } });
}

export async function getSitemapEntries() {
  const [services, products, projects, blogs, industries, jobs] = await Promise.all([
    prisma.service.findMany({ where: { status: "PUBLISHED" }, select: { slug: true, updatedAt: true } }),
    prisma.product.findMany({ where: { status: "PUBLISHED" }, select: { slug: true, updatedAt: true } }),
    prisma.project.findMany({ where: { status: "PUBLISHED" }, select: { slug: true, updatedAt: true } }),
    prisma.blog.findMany({ where: { status: "PUBLISHED" }, select: { slug: true, updatedAt: true } }),
    prisma.industry.findMany({ where: { status: "PUBLISHED" }, select: { slug: true, updatedAt: true } }),
    prisma.job.findMany({ where: { isActive: true }, select: { slug: true, updatedAt: true } }),
  ]);

  return { services, products, projects, blogs, industries, jobs };
}

export async function getAnalytics() {
  const [
    contacts,
    applications,
    blogs,
    services,
    products,
    projects,
    jobs,
    newsletter,
    unreadContacts,
    pendingApplications,
  ] = await Promise.all([
    prisma.contact.count(),
    prisma.application.count(),
    prisma.blog.count({ where: { status: "PUBLISHED" } }),
    prisma.service.count({ where: { status: "PUBLISHED" } }),
    prisma.product.count({ where: { status: "PUBLISHED" } }),
    prisma.project.count({ where: { status: "PUBLISHED" } }),
    prisma.job.count({ where: { isActive: true } }),
    prisma.newsletter.count({ where: { isActive: true } }),
    prisma.contact.count({ where: { isRead: false } }),
    prisma.application.count({ where: { status: "PENDING" } }),
  ]);

  const recentContacts = await prisma.contact.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });
  const recentApplications = await prisma.application.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: { job: true },
  });

  return {
    counts: {
      contacts,
      applications,
      blogs,
      services,
      products,
      projects,
      jobs,
      newsletter,
      unreadContacts,
      pendingApplications,
    },
    recentContacts,
    recentApplications,
  };
}
