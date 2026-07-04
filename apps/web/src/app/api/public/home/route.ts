import { getHomeData } from "@/lib/queries";
import { error, json } from "@/lib/api-helpers";

export async function GET() {
  try {
    const data = await getHomeData();
    return json(data);
  } catch (e: any) {
    return error(e.message || "Failed to load home data", 500);
  }
}
