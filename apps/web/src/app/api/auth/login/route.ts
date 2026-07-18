import { NextRequest } from "next/server";
import { authResponse, loginUser } from "@/lib/auth-server";
import { error } from "@/lib/api-helpers";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  if (!checkRateLimit(`login:${ip}`, 5, 15 * 60 * 1000)) {
    return error("Too many login attempts. Please try again in 15 minutes.", 429);
  }

  try {
    const body = await req.json();
    if (!body.email || !body.password) {
      return error("Email and password are required");
    }

    const result = await loginUser(body.email, body.password);

    return authResponse(
      { user: result.user },
      { accessToken: result.accessToken, refreshToken: result.refreshToken },
    );
  } catch {
    return error("Invalid credentials", 401);
  }
}
