import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { ADMIN_ROLES, error, json, withAuth } from "@/lib/api-helpers";

export async function GET() {
  try {
    const founder = await prisma.founder.findFirst({
      orderBy: { createdAt: "asc" },
    });
    return json(founder);
  } catch (e: any) {
    return error(e.message || "Failed to load founder", 500);
  }
}

export async function POST(req: NextRequest) {
  return withAuth(req, ADMIN_ROLES, async (user) => {
    try {
      const body = await req.json();
      const founder = await prisma.founder.create({ data: body });
      await prisma.auditLog.create({
        data: {
          userId: user.id,
          action: "CREATE",
          entity: "Founder",
          entityId: founder.id,
        },
      });
      return json(founder, 201);
    } catch (e: any) {
      return error(e.message || "Create failed", 400);
    }
  });
}

export async function PATCH(req: NextRequest) {
  return withAuth(req, ADMIN_ROLES, async (user) => {
    try {
      const body = await req.json();
      const { id, ...data } = body;
      const existing = id
        ? await prisma.founder.findUnique({ where: { id } })
        : await prisma.founder.findFirst({ orderBy: { createdAt: "asc" } });
      if (!existing) return error("Founder not found", 404);
      const founder = await prisma.founder.update({
        where: { id: existing.id },
        data,
      });
      await prisma.auditLog.create({
        data: {
          userId: user.id,
          action: "UPDATE",
          entity: "Founder",
          entityId: existing.id,
        },
      });
      return json(founder);
    } catch (e: any) {
      return error(e.message || "Update failed", 400);
    }
  });
}
