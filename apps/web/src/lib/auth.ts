"use client";

const ACCESS_KEY = "mbd_access_token";
const REFRESH_KEY = "mbd_refresh_token";
const USER_KEY = "mbd_user";

export function saveAuth(data: {
  accessToken: string;
  refreshToken: string;
  user: any;
}) {
  localStorage.setItem(ACCESS_KEY, data.accessToken);
  localStorage.setItem(REFRESH_KEY, data.refreshToken);
  localStorage.setItem(USER_KEY, JSON.stringify(data.user));
}

export function clearAuth() {
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(USER_KEY);
}

export function getAccessToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(ACCESS_KEY);
}

export function getRefreshToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(REFRESH_KEY);
}

export function getUser<T = any>(): T | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(USER_KEY);
  return raw ? JSON.parse(raw) : null;
}

async function refreshAccessToken(): Promise<string | null> {
  const user = getUser();
  const refreshToken = getRefreshToken();
  if (!user?.id || !refreshToken) return null;

  const res = await fetch("/api/auth/refresh", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId: user.id, refreshToken }),
  });

  if (!res.ok) {
    clearAuth();
    return null;
  }

  const data = await res.json();
  saveAuth(data);
  return data.accessToken as string;
}

export async function authedFetch<T = any>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const token = getAccessToken();
  const headers = new Headers(options.headers || {});
  if (!(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }
  if (token) headers.set("Authorization", `Bearer ${token}`);

  let res = await fetch(`/api${path}`, { ...options, headers });

  if (res.status === 401) {
    const newToken = await refreshAccessToken();
    if (newToken) {
      headers.set("Authorization", `Bearer ${newToken}`);
      res = await fetch(`/api${path}`, { ...options, headers });
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
