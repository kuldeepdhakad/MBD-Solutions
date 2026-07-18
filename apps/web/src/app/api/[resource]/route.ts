import { NextRequest } from "next/server";
import {
  ADMIN_ROLES,
  FULL_ADMIN_ROLES,
  error,
  json,
  queryParams,
  withAuth,
} from "@/lib/api-helpers";
import { create, findAll, resourceConfigs } from "@/lib/crud";
import { prisma } from "@/lib/db";
import * as bcrypt from "bcryptjs";

const PUBLIC_POST = new Set(["contacts", "applications", "newsletter"]);
const ADMIN_ONLY_RESOURCES = new Set([
  "users",
  "roles",
  "audit-logs",
  "settings",
  "seo",
  "homepage",
  "media",
  "applications",
  "contacts",
  "newsletter",
]);

type Params = { params: Promise<{ resource: string }> };

export async function GET(req: NextRequest, { params }: Params) {
  const { resource } = await params;
  const config = resourceConfigs[resource];
  if (!config) return error("Resource not found", 404);

  const query = queryParams(req);
  const isAdminQuery = query.status === "ALL" || ADMIN_ONLY_RESOURCES.has(resource);

  if (isAdminQuery) {
    return withAuth(req, ADMIN_ROLES, async () => {
      try {
        return json(await findAll(config, query, false));
      } catch (e: any) {
        return error(e.message || "Failed to list", 500);
      }
    });
  }

  try {
    return json(await findAll(config, query, true));
  } catch (e: any) {
    return error(e.message || "Failed to list", 500);
  }
}

export async function POST(req: NextRequest, { params }: Params) {
  const { resource } = await params;
  const config = resourceConfigs[resource];
  if (!config) return error("Resource not found", 404);

  const body = await req.json();

  if (PUBLIC_POST.has(resource)) {
    try {
      if (resource === "newsletter") {
        const item = await prisma.newsletter.upsert({
          where: { email: body.email.toLowerCase() },
          update: { isActive: true },
          create: { email: body.email.toLowerCase() },
        });
        return json(item, 201);
      }
      if (resource === "contacts") {
        const item = await prisma.contact.create({
          data: {
            name: body.name,
            email: body.email,
            phone: body.phone,
            businessType: body.businessType,
            requirement: body.requirement,
            budget: body.budget,
          },
        });
        return json(item, 201);
      }
      if (resource === "applications") {
        const item = await prisma.application.create({
          data: {
            jobId: body.jobId,
            name: body.name,
            email: body.email,
            phone: body.phone,
            resumeUrl: body.resumeUrl,
            coverLetter: body.coverLetter,
            portfolioUrl: body.portfolioUrl,
          },
        });
        return json(item, 201);
      }
    } catch (e: any) {
      return error(e.message || "Create failed", 400);
    }
  }

  return withAuth(
    req,
    resource === "users" || resource === "roles" ? FULL_ADMIN_ROLES : ADMIN_ROLES,
    async (user) => {
      try {
        const data = { ...body };
        if (resource === "users" && data.password) {
          data.password = await bcrypt.hash(data.password, 12);
        }
        if (resource === "blogs" && !data.authorId) {
          data.authorId = user.id;
        }
        const item = await create(config, data, user.id);
        const omit = config.omitFields || [];
        omit.forEach((f) => delete (item as any)[f]);
        return json(item, 201);
      } catch (e: any) {
        return error(e.message || "Create failed", 400);
      }
    },
  );
}
