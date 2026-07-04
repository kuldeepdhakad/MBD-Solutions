import { SignJWT, jwtVerify } from "jose";
import { NextRequest } from "next/server";
import * as bcrypt from "bcryptjs";
import { prisma } from "./db";

const ACCESS_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "mbd-dev-secret-change-in-production",
);
const REFRESH_SECRET = new TextEncoder().encode(
  process.env.JWT_REFRESH_SECRET || "mbd-dev-refresh-change-in-production",
);

export type AuthUser = {
  id: string;
  email: string;
  name: string;
  role: { name: string };
  permissions: string[];
};

export async function signAccessToken(payload: {
  sub: string;
  email: string;
  role: string;
}) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("15m")
    .sign(ACCESS_SECRET);
}

export async function signRefreshToken(payload: {
  sub: string;
  email: string;
  role: string;
}) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(REFRESH_SECRET);
}

export async function verifyAccessToken(token: string) {
  const { payload } = await jwtVerify(token, ACCESS_SECRET);
  return payload as { sub: string; email: string; role: string };
}

export async function verifyRefreshToken(token: string) {
  const { payload } = await jwtVerify(token, REFRESH_SECRET);
  return payload as { sub: string; email: string; role: string };
}

export async function issueTokens(userId: string, email: string, role: string) {
  const payload = { sub: userId, email, role };
  const [accessToken, refreshToken] = await Promise.all([
    signAccessToken(payload),
    signRefreshToken(payload),
  ]);
  return { accessToken, refreshToken };
}

export function sanitizeUser(user: any): AuthUser {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: { name: user.role?.name },
    permissions: user.role?.permissions?.map((p: any) => p.name) || [],
  };
}

export async function getUserFromRequest(req: NextRequest) {
  const header = req.headers.get("authorization");
  const token = header?.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return null;

  try {
    const payload = await verifyAccessToken(token);
    const user = await prisma.user.findUnique({
      where: { id: payload.sub },
      include: { role: { include: { permissions: true } } },
    });
    if (!user?.isActive) return null;
    return { ...sanitizeUser(user), raw: user };
  } catch {
    return null;
  }
}

export function requireRoles(user: AuthUser | null, roles: string[]) {
  if (!user || !roles.includes(user.role.name)) {
    return false;
  }
  return true;
}

export async function loginUser(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
    include: { role: { include: { permissions: true } } },
  });

  if (!user || !user.isActive) {
    throw new Error("Invalid credentials");
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Invalid credentials");

  const tokens = await issueTokens(user.id, user.email, user.role.name);
  await prisma.user.update({
    where: { id: user.id },
    data: {
      refreshToken: await bcrypt.hash(tokens.refreshToken, 10),
      lastLoginAt: new Date(),
    },
  });

  await prisma.auditLog.create({
    data: {
      userId: user.id,
      action: "LOGIN",
      entity: "User",
      entityId: user.id,
    },
  });

  return { ...tokens, user: sanitizeUser(user) };
}

export async function refreshTokens(userId: string, refreshToken: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { role: { include: { permissions: true } } },
  });

  if (!user?.refreshToken || !user.isActive) {
    throw new Error("Invalid refresh token");
  }

  const valid = await bcrypt.compare(refreshToken, user.refreshToken);
  if (!valid) throw new Error("Invalid refresh token");

  const tokens = await issueTokens(user.id, user.email, user.role.name);
  await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken: await bcrypt.hash(tokens.refreshToken, 10) },
  });

  return { ...tokens, user: sanitizeUser(user) };
}

export async function logoutUser(userId: string) {
  await prisma.user.update({
    where: { id: userId },
    data: { refreshToken: null },
  });
  return { success: true };
}
