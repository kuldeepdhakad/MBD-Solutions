"use client";

/** In-memory session cache only — never persisted to localStorage/sessionStorage. */
let cachedUser: Record<string, unknown> | null = null;

/** Remove legacy tokens if they exist from a previous auth implementation. */
function purgeLegacyAuthStorage() {
  if (typeof window === "undefined") return;
  for (const key of ["mbd_access_token", "mbd_refresh_token", "mbd_user"]) {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
  }
}

if (typeof window !== "undefined") {
  purgeLegacyAuthStorage();
}

export function getCachedUser<T = Record<string, unknown>>(): T | null {
  return cachedUser as T | null;
}

export function setCachedUser(user: Record<string, unknown> | null) {
  cachedUser = user;
}

export async function fetchCurrentUser<T = Record<string, unknown>>(): Promise<T | null> {
  try {
    const res = await fetch("/api/auth/me", {
      method: "GET",
      credentials: "include",
      cache: "no-store",
    });
    if (!res.ok) {
      cachedUser = null;
      return null;
    }
    const user = await res.json();
    cachedUser = user;
    return user as T;
  } catch {
    cachedUser = null;
    return null;
  }
}

export async function clearAuth() {
  try {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
  } catch {
    // Best-effort logout
  }
  cachedUser = null;
}

async function tryRefreshSession(): Promise<boolean> {
  const res = await fetch("/api/auth/refresh", {
    method: "POST",
    credentials: "include",
  });
  if (!res.ok) {
    cachedUser = null;
    return false;
  }
  const data = await res.json();
  if (data.user) cachedUser = data.user;
  return true;
}

export async function authedFetch<T = any>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const headers = new Headers(options.headers || {});
  if (!(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  let res = await fetch(`/api${path}`, {
    ...options,
    headers,
    credentials: "include",
  });

  if (res.status === 401) {
    const refreshed = await tryRefreshSession();
    if (refreshed) {
      res = await fetch(`/api${path}`, {
        ...options,
        headers,
        credentials: "include",
      });
    }
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(err.message || "Request failed");
  }

  return res.json();
}

export async function uploadMedia(file: File, folder = "mbd-solutions") {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("folder", folder);
  return authedFetch("/media/upload", {
    method: "POST",
    body: formData,
    headers: {},
  });
}
