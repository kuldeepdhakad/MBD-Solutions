import { NextRequest, NextResponse } from "next/server";
import { ACCESS_COOKIE, verifyAccessToken } from "@/lib/auth-tokens";

const ADMIN_ROLES = new Set(["SUPER_ADMIN", "ADMIN", "EDITOR"]);
const PORTAL_ROLES = new Set(["CLIENT", "USER", "SUPER_ADMIN", "ADMIN"]);

async function hasValidSession(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get(ACCESS_COOKIE)?.value;
  if (!token) return false;
  try {
    await verifyAccessToken(token);
    return true;
  } catch {
    return false;
  }
}

async function getSessionRole(request: NextRequest): Promise<string | null> {
  const token = request.cookies.get(ACCESS_COOKIE)?.value;
  if (!token) return null;
  try {
    const payload = await verifyAccessToken(token);
    return payload.role;
  } catch {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const valid = await hasValidSession(request);
    if (!valid) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }

    const role = await getSessionRole(request);
    if (!role || !ADMIN_ROLES.has(role)) {
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  if (pathname.startsWith("/portal") && pathname !== "/portal/login") {
    const valid = await hasValidSession(request);
    if (!valid) {
      return NextResponse.redirect(new URL("/portal/login", request.url));
    }

    const role = await getSessionRole(request);
    if (!role || !PORTAL_ROLES.has(role)) {
      return NextResponse.redirect(new URL("/portal/login", request.url));
    }
  }

  if (pathname === "/admin/login" || pathname === "/portal/login") {
    const valid = await hasValidSession(request);
    if (valid) {
      const role = await getSessionRole(request);
      if (role && ADMIN_ROLES.has(role)) {
        return NextResponse.redirect(new URL("/admin", request.url));
      }
      if (role && PORTAL_ROLES.has(role)) {
        return NextResponse.redirect(new URL("/portal", request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*", "/portal", "/portal/:path*"],
};
