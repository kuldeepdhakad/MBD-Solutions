import { refreshTokens } from "@/lib/auth-server";
import { error, json } from "@/lib/api-helpers";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.userId || !body.refreshToken) {
      return error("userId and refreshToken are required");
    }
    const result = await refreshTokens(body.userId, body.refreshToken);
    return json(result);
  } catch (e: any) {
    return error(e.message || "Refresh failed", 401);
  }
}
