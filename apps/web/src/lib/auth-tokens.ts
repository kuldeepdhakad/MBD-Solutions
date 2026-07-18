import { SignJWT, jwtVerify } from "jose";
import { NextResponse } from "next/server";

export const ACCESS_COOKIE = "mbd_access_token";
export const REFRESH_COOKIE = "mbd_refresh_token";

const ACCESS_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "mbd-dev-secret-change-in-production",
);
const REFRESH_SECRET = new TextEncoder().encode(
  process.env.JWT_REFRESH_SECRET || "mbd-dev-refresh-change-in-production",
);

export type TokenPayload = {
  sub: string;
  email: string;
  role: string;
};

function cookieBase(maxAge: number) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge,
  };
}

export function setAuthCookies(
  res: NextResponse,
  tokens: { accessToken: string; refreshToken: string },
) {
  res.cookies.set(ACCESS_COOKIE, tokens.accessToken, cookieBase(15 * 60));
  res.cookies.set(REFRESH_COOKIE, tokens.refreshToken, cookieBase(7 * 24 * 60 * 60));
}

export function clearAuthCookies(res: NextResponse) {
  const expired = { ...cookieBase(0), maxAge: 0 };
  res.cookies.set(ACCESS_COOKIE, "", expired);
  res.cookies.set(REFRESH_COOKIE, "", expired);
}

export async function signAccessToken(payload: TokenPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("15m")
    .sign(ACCESS_SECRET);
}

export async function signRefreshToken(payload: TokenPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(REFRESH_SECRET);
}

export async function verifyAccessToken(token: string): Promise<TokenPayload> {
  const { payload } = await jwtVerify(token, ACCESS_SECRET);
  return payload as TokenPayload;
}

export async function verifyRefreshToken(token: string): Promise<TokenPayload> {
  const { payload } = await jwtVerify(token, REFRESH_SECRET);
  return payload as TokenPayload;
}

export async function issueTokens(userId: string, email: string, role: string) {
  const payload: TokenPayload = { sub: userId, email, role };
  const [accessToken, refreshToken] = await Promise.all([
    signAccessToken(payload),
    signRefreshToken(payload),
  ]);
  return { accessToken, refreshToken };
}
