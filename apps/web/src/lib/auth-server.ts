import { NextRequest, NextResponse } from "next/server";
import * as bcrypt from "bcryptjs";
import { prisma } from "./db";
import {
  ACCESS_COOKIE,
  clearAuthCookies,
  issueTokens,
  setAuthCookies,
  verifyAccessToken,
  verifyRefreshToken,
} from "./auth-tokens";

export {
  ACCESS_COOKIE,
  REFRESH_COOKIE,
  clearAuthCookies,
  issueTokens,
  setAuthCookies,
  verifyAccessToken,
  verifyRefreshToken,
} from "./auth-tokens";

export type AuthUser = {
  id: string;
  email: string;
  name: string;
  role: { name: string };
  permissions: string[];
};

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
  const cookieToken = req.cookies.get(ACCESS_COOKIE)?.value;
  const header = req.headers.get("authorization");
  const bearerToken = header?.startsWith("Bearer ") ? header.slice(7) : null;
  const token = cookieToken || bearerToken;
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
    where: { email: email.toLowerCase().trim() },
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

export async function refreshTokensFromCookie(refreshToken: string) {
  const payload = await verifyRefreshToken(refreshToken);
  return refreshTokens(payload.sub, refreshToken);
}

export async function logoutUser(userId: string) {
  await prisma.user.update({
    where: { id: userId },
    data: { refreshToken: null },
  });
  return { success: true };
}

/** Build a JSON response with HttpOnly auth cookies. Tokens are never sent in the body. */
export function authResponse(
  data: Record<string, unknown>,
  tokens: { accessToken: string; refreshToken: string },
  status = 200,
) {
  const res = NextResponse.json(data, { status });
  setAuthCookies(res, tokens);
  return res;
}

/** Build a JSON response that clears auth cookies. */
export function logoutResponse(data: Record<string, unknown> = { success: true }) {
  const res = NextResponse.json(data);
  clearAuthCookies(res);
  return res;
}
