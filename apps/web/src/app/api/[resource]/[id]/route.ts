import { NextRequest } from "next/server";
import {
  ADMIN_ROLES,
  FULL_ADMIN_ROLES,
  error,
  json,
  withAuth,
} from "@/lib/api-helpers";
import { findOne, remove, resourceConfigs, update } from "@/lib/crud";
import * as bcrypt from "bcryptjs";

type Params = { params: Promise<{ resource: string; id: string }> };

const PUBLIC_READ = new Set([
  "services",
  "products",
  "projects",
  "technologies",
  "industries",
  "team",
  "testimonials",
  "faqs",
  "clients",
  "solutions",
  "pricing",
  "blogs",
  "jobs",
]);

export async function GET(req: NextRequest, { params }: Params) {
  const { resource, id } = await params;
  const config = resourceConfigs[resource];
  if (!config) return error("Resource not found", 404);

  if (PUBLIC_READ.has(resource)) {
    try {
      return json(await findOne(config, id, true));
    } catch (e: any) {
      return error(e.message || "Not found", 404);
    }
  }

  return withAuth(req, ADMIN_ROLES, async () => {
    try {
      return json(await findOne(config, id, false));
    } catch (e: any) {
      return error(e.message || "Not found", 404);
    }
  });
}

export async function PATCH(req: NextRequest, { params }: Params) {
  const { resource, id } = await params;
  const config = resourceConfigs[resource];
  if (!config) return error("Resource not found", 404);

  return withAuth(
    req,
    resource === "users" || resource === "roles" ? FULL_ADMIN_ROLES : ADMIN_ROLES,
    async (user) => {
      try {
        const body = await req.json();
        let data = { ...body };
        delete data.id;
        if (resource === "users" && data.password) {
          data.password = await bcrypt.hash(data.password, 12);
        }
        const item = await update(config, id, data, user.id);
        const omit = config.omitFields || [];
        omit.forEach((f) => delete (item as any)[f]);
        return json(item);
      } catch (e: any) {
        return error(e.message || "Update failed", 400);
      }
    },
  );
}

export async function DELETE(req: NextRequest, { params }: Params) {
  const { resource, id } = await params;
  const config = resourceConfigs[resource];
  if (!config) return error("Resource not found", 404);

  return withAuth(req, FULL_ADMIN_ROLES, async (user) => {
    try {
      return json(await remove(config, id, user.id));
    } catch (e: any) {
      return error(e.message || "Delete failed", 400);
    }
  });
}
