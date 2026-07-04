import * as bcrypt from "bcryptjs";
import { issueTokens, sanitizeUser } from "@/lib/auth-server";
import { error, json } from "@/lib/api-helpers";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.email || !body.password || !body.name) {
      return error("Name, email and password are required");
    }

    const exists = await prisma.user.findUnique({
      where: { email: body.email.toLowerCase() },
    });
    if (exists) return error("Email already registered", 409);

    const clientRole = await prisma.role.findUnique({ where: { name: "CLIENT" } });
    if (!clientRole) return error("Client role not configured", 500);

    const user = await prisma.user.create({
      data: {
        email: body.email.toLowerCase(),
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

    return json({ ...tokens, user: sanitizeUser(user) }, 201);
  } catch (e: any) {
    return error(e.message || "Registration failed", 400);
  }
}
