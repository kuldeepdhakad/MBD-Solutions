import * as bcrypt from "bcryptjs";
import { NextRequest } from "next/server";
import { authResponse, issueTokens, sanitizeUser } from "@/lib/auth-server";
import { error } from "@/lib/api-helpers";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  if (!checkRateLimit(`register:${ip}`, 3, 60 * 60 * 1000)) {
    return error("Too many registration attempts. Please try again later.", 429);
  }

  try {
    const body = await req.json();
    if (!body.email || !body.password || !body.name) {
      return error("Name, email and password are required");
    }

    const exists = await prisma.user.findUnique({
      where: { email: body.email.toLowerCase().trim() },
    });
    if (exists) return error("Email already registered", 409);

    const clientRole = await prisma.role.findUnique({ where: { name: "CLIENT" } });
    if (!clientRole) return error("Client role not configured", 500);

    const user = await prisma.user.create({
      data: {
        email: body.email.toLowerCase().trim(),
        password: await bcrypt.hash(body.password, 12),
        name: body.name,
        phone: body.phone,
        roleId: clientRole.id,
      },
      include: { role: { include: { permissions: true } } },
    });

    const tokens = await issueTokens(user.id, user.email, user.role.name);
    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: await bcrypt.hash(tokens.refreshToken, 10) },
    });

    return authResponse(
      { user: sanitizeUser(user) },
      { accessToken: tokens.accessToken, refreshToken: tokens.refreshToken },
      201,
    );
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Registration failed";
    return error(message, 400);
  }
}
