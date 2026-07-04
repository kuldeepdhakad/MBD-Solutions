import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

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
  | "homepageSection";

export interface CrudConfig {
  model: ModelName;
  publicListFilter?: Record<string, unknown>;
  include?: Record<string, unknown>;
  searchFields?: string[];
  slugField?: string;
  auditEntity?: string;
  hasSortOrder?: boolean;
}

@Injectable()
export class CrudService {
  constructor(private prisma: PrismaService) {}

  private delegate(model: ModelName): any {
    return (this.prisma as any)[model];
  }

  async findAll(config: CrudConfig, query: Record<string, string> = {}, publicOnly = false) {
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

    const delegate = this.delegate(config.model);
    const [data, total] = await Promise.all([
      delegate.findMany({
        where,
        include: config.include,
        orderBy,
        skip,
        take: limit,
      }),
      delegate.count({ where }),
    ]);

    return {
      data,
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  async findOne(config: CrudConfig, idOrSlug: string, publicOnly = false) {
    const where: any = config.slugField
      ? {
          OR: [{ id: idOrSlug }, { [config.slugField]: idOrSlug }],
          ...(publicOnly ? config.publicListFilter || {} : {}),
        }
      : { id: idOrSlug };

    const item = await this.delegate(config.model).findFirst({
      where,
      include: config.include,
    });
    if (!item) {
      throw new NotFoundException(`${config.auditEntity || config.model} not found`);
    }
    return item;
  }

  async create(config: CrudConfig, data: any, userId?: string) {
    const item = await this.delegate(config.model).create({ data });
    if (userId && config.auditEntity) {
      await this.prisma.auditLog.create({
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

  async update(config: CrudConfig, id: string, data: any, userId?: string) {
    await this.findOne(config, id);
    const item = await this.delegate(config.model).update({ where: { id }, data });
    if (userId && config.auditEntity) {
      await this.prisma.auditLog.create({
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

  async remove(config: CrudConfig, id: string, userId?: string) {
    await this.findOne(config, id);
    await this.delegate(config.model).delete({ where: { id } });
    if (userId && config.auditEntity) {
      await this.prisma.auditLog.create({
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
}
