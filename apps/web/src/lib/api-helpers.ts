import { NextRequest, NextResponse } from "next/server";
import {
  getUserFromRequest,
  requireRoles,
  type AuthUser,
} from "./auth-server";

export function json(data: unknown, status = 200) {
  return NextResponse.json(data, { status });
}

export function error(message: string, status = 400) {
  return NextResponse.json({ message }, { status });
}

export async function withAuth(
  req: NextRequest,
  roles: string[],
  handler: (user: AuthUser) => Promise<NextResponse>,
) {
  const user = await getUserFromRequest(req);
  if (!requireRoles(user, roles)) {
    return error("Unauthorized", 401);
  }
  return handler(user!);
}

export function queryParams(req: NextRequest): Record<string, string> {
  const params: Record<string, string> = {};
  req.nextUrl.searchParams.forEach((value, key) => {
    params[key] = value;
  });
  return params;
}

export const ADMIN_ROLES = ["SUPER_ADMIN", "ADMIN", "EDITOR"];
export const FULL_ADMIN_ROLES = ["SUPER_ADMIN", "ADMIN"];
