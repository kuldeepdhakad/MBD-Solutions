import { getUserFromRequest, logoutUser } from "@/lib/auth-server";
import { error, json } from "@/lib/api-helpers";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const user = await getUserFromRequest(req);
  if (!user) return error("Unauthorized", 401);
  await logoutUser(user.id);
  return json({ success: true });
}
