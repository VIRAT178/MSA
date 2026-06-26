import type { AppUser } from "../types";

interface ImportMetaWithEnv extends ImportMeta {
  readonly env?: {
    readonly VITE_API_URL?: string;
  };
}

const CURRENT_USER_KEY = "malwa_academy_current_user";
const API_BASE_URL = (import.meta as ImportMetaWithEnv).env?.VITE_API_URL || "http://localhost:5000";

function saveCurrentUser(user: AppUser) {
  try {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  } catch (err) {
    console.error("Failed to save current user:", err);
  }
}

export function getCurrentUser(): AppUser | null {
  if (typeof window === "undefined") return null;
  try {
    const value = localStorage.getItem(CURRENT_USER_KEY);
    return value ? (JSON.parse(value) as AppUser) : null;
  } catch (err) {
    console.error("Failed to read current user:", err);
    return null;
  }
}

export function logoutUser() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(CURRENT_USER_KEY);
}

export async function loginAppUser(email: string, password: string): Promise<AppUser> {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

  const json = await response.json();
  if (!response.ok) {
    throw new Error(json?.message || "Login failed.");
  }

  const currentUser: AppUser = {
    id: json?.data?.user?.id || "",
    name: json?.data?.user?.name || email,
    email: json?.data?.user?.email || email,
    sport: json?.data?.user?.sport || "",
  };
  saveCurrentUser(currentUser);
  return currentUser;
}

export async function registerAppUser(payload: { name: string; email: string; password: string; sport: string }): Promise<AppUser> {
  const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      name: payload.name,
      email: payload.email,
      mobile: "0000000000",
      password: payload.password,
      confirmPassword: payload.password,
      sport: payload.sport,
    }),
  });

  const json = await response.json();
  if (!response.ok) {
    throw new Error(json?.message || "Registration failed.");
  }

  const currentUser: AppUser = {
    id: json?.data?.user?.id || "",
    name: json?.data?.user?.name || payload.name,
    email: json?.data?.user?.email || payload.email,
    sport: json?.data?.user?.sport || payload.sport,
  };
  saveCurrentUser(currentUser);
  return currentUser;
}
