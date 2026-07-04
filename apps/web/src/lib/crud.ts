import { prisma } from "./db";

export type ModelName =
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
  | "sEO"
  | "setting"
  | "homepageSection"
  | "blog"
  | "blogCategory"
  | "job"
  | "application"
  | "contact"
  | "newsletter"
  | "media"
  | "user"
  | "role"
  | "auditLog"
  | "founder"
  | "partner"
  | "processStep"
  | "statistic";

export interface CrudConfig {
  model: ModelName;
  publicListFilter?: Record<string, unknown>;
  include?: Record<string, unknown>;
  searchFields?: string[];
  slugField?: string;
  auditEntity?: string;
  hasSortOrder?: boolean;
  omitFields?: string[];
}

function delegate(model: ModelName): any {
  return (prisma as any)[model];
}

export async function findAll(
  config: CrudConfig,
  query: Record<string, string> = {},
  publicOnly = false,
) {
  const page = Math.max(1, parseInt(query.page || "1", 10));
  const limit = Math.min(100, Math.max(1, parseInt(query.limit || "50", 10)));
  const skip = (page - 1) * limit;
  const where: any = {};

  if (publicOnly && config.publicListFilter && query.status !== "ALL") {
    Object.assign(where, config.publicListFilter);
  }
  if (query.status && query.status !== "ALL") where.status = query.status;
  if (query.category) where.category = query.category;
  if (query.isActive) where.isActive = query.isActive === "true";
  if (query.isFeatured) where.isFeatured = query.isFeatured === "true";
  if (query.isLeadership) where.isLeadership = query.isLeadership === "true";
  if (query.isInternship) where.isInternship = query.isInternship === "true";
  if (query.search && config.searchFields?.length) {
    where.OR = config.searchFields.map((field) => ({
      [field]: { contains: query.search, mode: "insensitive" },
    }));
  }

  const orderBy =
    config.hasSortOrder === false
      ? { createdAt: "desc" as const }
      : query.sortBy
        ? { [query.sortBy]: query.sortOrder === "asc" ? "asc" : "desc" }
        : { sortOrder: "asc" as const };

  const d = delegate(config.model);
  const [data, total] = await Promise.all([
    d.findMany({
      where,
      include: config.include,
      orderBy,
      skip,
      take: limit,
    }),
    d.count({ where }),
  ]);

  const cleaned = config.omitFields?.length
    ? data.map((item: any) => {
        const copy = { ...item };
        config.omitFields!.forEach((f) => delete copy[f]);
        return copy;
      })
    : data;

  return {
    data: cleaned,
    meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
  };
}

export async function findOne(
  config: CrudConfig,
  idOrSlug: string,
  publicOnly = false,
) {
  const where: any = config.slugField
    ? {
        OR: [{ id: idOrSlug }, { [config.slugField]: idOrSlug }],
        ...(publicOnly ? config.publicListFilter || {} : {}),
      }
    : { id: idOrSlug };

  const item = await delegate(config.model).findFirst({
    where,
    include: config.include,
  });
  if (!item) {
    throw new Error(`${config.auditEntity || config.model} not found`);
  }

  if (config.omitFields?.length) {
    const copy = { ...item };
    config.omitFields.forEach((f) => delete copy[f]);
    return copy;
  }
  return item;
}

export async function create(config: CrudConfig, data: any, userId?: string) {
  const item = await delegate(config.model).create({ data });
  if (userId && config.auditEntity) {
    await prisma.auditLog.create({
      data: {
        userId,
        action: "CREATE",
        entity: config.auditEntity,
        entityId: item.id,
        details: { id: item.id },
      },
    });
  }
  return item;
}

export async function update(
  config: CrudConfig,
  id: string,
  data: any,
  userId?: string,
) {
  await findOne(config, id);
  const item = await delegate(config.model).update({ where: { id }, data });
  if (userId && config.auditEntity) {
    await prisma.auditLog.create({
      data: {
        userId,
        action: "UPDATE",
        entity: config.auditEntity,
        entityId: id,
      },
    });
  }
  return item;
}

export async function remove(config: CrudConfig, id: string, userId?: string) {
  await findOne(config, id);
  await delegate(config.model).delete({ where: { id } });
  if (userId && config.auditEntity) {
    await prisma.auditLog.create({
      data: {
        userId,
        action: "DELETE",
        entity: config.auditEntity,
        entityId: id,
      },
    });
  }
  return { success: true };
}

export const resourceConfigs: Record<string, CrudConfig> = {
  services: {
    model: "service",
    publicListFilter: { status: "PUBLISHED" },
    slugField: "slug",
    searchFields: ["title", "shortDesc"],
    auditEntity: "Service",
    hasSortOrder: true,
  },
  products: {
    model: "product",
    publicListFilter: { status: "PUBLISHED" },
    slugField: "slug",
    searchFields: ["name", "tagline", "overview"],
    auditEntity: "Product",
    hasSortOrder: true,
  },
  projects: {
    model: "project",
    publicListFilter: { status: "PUBLISHED" },
    slugField: "slug",
    searchFields: ["title", "overview", "clientName"],
    include: { industry: true },
    auditEntity: "Project",
    hasSortOrder: true,
  },
  technologies: {
    model: "technology",
    publicListFilter: { status: "PUBLISHED" },
    slugField: "slug",
    searchFields: ["name", "category"],
    auditEntity: "Technology",
    hasSortOrder: true,
  },
  industries: {
    model: "industry",
    publicListFilter: { status: "PUBLISHED" },
    slugField: "slug",
    searchFields: ["name", "description"],
    auditEntity: "Industry",
    hasSortOrder: true,
  },
  team: {
    model: "teamMember",
    publicListFilter: { status: "PUBLISHED" },
    searchFields: ["name", "role"],
    auditEntity: "TeamMember",
    hasSortOrder: true,
  },
  testimonials: {
    model: "testimonial",
    publicListFilter: { status: "PUBLISHED" },
    searchFields: ["name", "content", "company"],
    auditEntity: "Testimonial",
    hasSortOrder: true,
  },
  faqs: {
    model: "fAQ",
    publicListFilter: { status: "PUBLISHED" },
    searchFields: ["question", "answer"],
    auditEntity: "FAQ",
    hasSortOrder: true,
  },
  clients: {
    model: "client",
    searchFields: ["name", "industry"],
    auditEntity: "Client",
    hasSortOrder: true,
  },
  solutions: {
    model: "solution",
    publicListFilter: { status: "PUBLISHED" },
    slugField: "slug",
    searchFields: ["title", "description"],
    auditEntity: "Solution",
    hasSortOrder: true,
  },
  pricing: {
    model: "pricingPlan",
    publicListFilter: { status: "PUBLISHED" },
    slugField: "slug",
    searchFields: ["name", "description"],
    auditEntity: "PricingPlan",
    hasSortOrder: true,
  },
  seo: {
    model: "sEO",
    searchFields: ["pagePath", "title"],
    auditEntity: "SEO",
    hasSortOrder: false,
  },
  settings: {
    model: "setting",
    searchFields: ["key"],
    auditEntity: "Setting",
    hasSortOrder: false,
  },
  homepage: {
    model: "homepageSection",
    searchFields: ["key", "title"],
    auditEntity: "HomepageSection",
    hasSortOrder: true,
  },
  blogs: {
    model: "blog",
    publicListFilter: { status: "PUBLISHED" },
    slugField: "slug",
    searchFields: ["title", "excerpt"],
    include: {
      category: true,
      author: { select: { id: true, name: true, email: true } },
      tags: true,
    },
    auditEntity: "Blog",
    hasSortOrder: false,
  },
  categories: {
    model: "blogCategory",
    searchFields: ["name"],
    slugField: "slug",
    auditEntity: "BlogCategory",
    hasSortOrder: false,
  },
  jobs: {
    model: "job",
    publicListFilter: { isActive: true },
    slugField: "slug",
    searchFields: ["title", "department", "location"],
    auditEntity: "Job",
    hasSortOrder: false,
  },
  applications: {
    model: "application",
    include: { job: true },
    searchFields: ["name", "email", "phone"],
    auditEntity: "Application",
    hasSortOrder: false,
  },
  contacts: {
    model: "contact",
    searchFields: ["name", "email", "phone", "requirement"],
    auditEntity: "Contact",
    hasSortOrder: false,
  },
  newsletter: {
    model: "newsletter",
    searchFields: ["email"],
    auditEntity: "Newsletter",
    hasSortOrder: false,
  },
  media: {
    model: "media",
    searchFields: ["filename", "alt"],
    auditEntity: "Media",
    hasSortOrder: false,
  },
  users: {
    model: "user",
    include: { role: true },
    searchFields: ["name", "email"],
    omitFields: ["password", "refreshToken"],
    auditEntity: "User",
    hasSortOrder: false,
  },
  roles: {
    model: "role",
    include: { permissions: true },
    searchFields: ["name", "description"],
    auditEntity: "Role",
    hasSortOrder: false,
  },
  "audit-logs": {
    model: "auditLog",
    include: { user: { select: { id: true, name: true, email: true } } },
    searchFields: ["action", "entity"],
    auditEntity: "AuditLog",
    hasSortOrder: false,
  },
  partners: {
    model: "partner",
    searchFields: ["name"],
    auditEntity: "Partner",
    hasSortOrder: true,
  },
  statistics: {
    model: "statistic",
    searchFields: ["label"],
    auditEntity: "Statistic",
    hasSortOrder: true,
  },
  "process-steps": {
    model: "processStep",
    searchFields: ["title"],
    auditEntity: "ProcessStep",
    hasSortOrder: true,
  },
};
