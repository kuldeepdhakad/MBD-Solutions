import { NextRequest } from "next/server";
import { error, json } from "@/lib/api-helpers";
import { searchContent } from "@/lib/queries";

export async function GET(req: NextRequest) {
  try {
    const q = req.nextUrl.searchParams.get("q") || "";
    return json(await searchContent(q));
  } catch (e: any) {
    return error(e.message || "Search failed", 500);
  }
}
