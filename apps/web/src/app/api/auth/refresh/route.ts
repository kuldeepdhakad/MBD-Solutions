import { NextRequest } from "next/server";
import { REFRESH_COOKIE } from "@/lib/auth-tokens";
import { authResponse, refreshTokensFromCookie } from "@/lib/auth-server";
import { error } from "@/lib/api-helpers";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  if (!checkRateLimit(`refresh:${ip}`, 20, 15 * 60 * 1000)) {
    return error("Too many requests. Please try again later.", 429);
  }

  try {
    const refreshToken = req.cookies.get(REFRESH_COOKIE)?.value;
    if (!refreshToken) {
      return error("Session expired", 401);
    }

    const result = await refreshTokensFromCookie(refreshToken);
    return authResponse(
      { user: result.user },
      { accessToken: result.accessToken, refreshToken: result.refreshToken },
    );
  } catch {
    return error("Session expired", 401);
  }
}
