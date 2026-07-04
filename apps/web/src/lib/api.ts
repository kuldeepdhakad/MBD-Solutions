export { siteConfig, whatsappLink } from "./site";
export {
  getHomeData,
  getPublishedList,
  getBySlug,
  getFounder,
  getLeadership,
  getInternships,
  searchContent,
  getSeoForPath,
  getSitemapEntries,
  getAnalytics,
} from "./queries";

import { unstable_cache } from "next/cache";
import { findAll, findOne, resourceConfigs } from "./crud";

/** Public list fetch used by server pages (cached 60s) */
export async function getList(
  resource: string,
  params?: Record<string, string>,
) {
  const config = resourceConfigs[resource];
  if (!config) {
    return { data: [], meta: { page: 1, limit: 50, total: 0, totalPages: 0 } };
  }

  const cacheKey = JSON.stringify(params || {});
  return unstable_cache(
    () => findAll(config, params || {}, true),
    [`public-list-${resource}`, cacheKey],
    { revalidate: 60, tags: [`list-${resource}`] },
  )();
}

/** Public single-item fetch by id or slug */
export async function getOne(resource: string, idOrSlug: string) {
  const config = resourceConfigs[resource];
  if (!config) throw new Error("Resource not found");
  return findOne(config, idOrSlug, true);
}

/** Client-side fetch to Next.js route handlers */
export async function api<T = any>(
  path: string,
  options: RequestInit & { revalidate?: number | false; token?: string } = {},
): Promise<T> {
  const { token, revalidate, ...init } = options;
  const headers = new Headers(init.headers || {});
  if (!(init.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const res = await fetch(`/api${path}`, {
    ...init,
    headers,
    cache: revalidate === false ? "no-store" : undefined,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(err.message || "Request failed");
  }

  return res.json();
}
