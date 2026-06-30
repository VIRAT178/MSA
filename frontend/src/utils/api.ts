const apiBaseUrl = import.meta.env.VITE_API_URL?.replace(/\/$/, "") || "";

export function apiPath(path: string) {
  return apiBaseUrl ? `${apiBaseUrl}${path}` : path;
}
