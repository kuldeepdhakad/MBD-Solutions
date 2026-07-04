import { NextRequest } from "next/server";
import { ADMIN_ROLES, error, json, withAuth } from "@/lib/api-helpers";
import { getAnalytics } from "@/lib/queries";

export async function GET(req: NextRequest) {
  return withAuth(req, ADMIN_ROLES, async () => {
    try {
      return json(await getAnalytics());
    } catch (e: any) {
      return error(e.message || "Failed to load analytics", 500);
    }
  });
}
