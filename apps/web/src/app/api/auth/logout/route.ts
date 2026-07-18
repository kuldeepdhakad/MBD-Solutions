import { getUserFromRequest, logoutUser, logoutResponse } from "@/lib/auth-server";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const user = await getUserFromRequest(req);
  if (user) {
    await logoutUser(user.id);
  }
  return logoutResponse({ success: true });
}
