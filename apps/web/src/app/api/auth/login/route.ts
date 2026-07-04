import { loginUser } from "@/lib/auth-server";
import { error, json } from "@/lib/api-helpers";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.email || !body.password) {
      return error("Email and password are required");
    }
    const result = await loginUser(body.email, body.password);
    return json(result);
  } catch (e: any) {
    return error(e.message || "Login failed", 401);
  }
}
