import { getUserFromRequest } from "@/lib/auth-server";
import { error, json } from "@/lib/api-helpers";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const user = await getUserFromRequest(req);
  if (!user) return error("Unauthorized", 401);
  const { raw, ...safe } = user as any;
  return json(safe);
}
