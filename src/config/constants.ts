export const API_BASE_URL = "https://api.example.com";

export const ROUTES = {
  LOGIN: "/login",
  DASHBOARD: "/dashboard",
  AUTH_CALLBACK: "/auth/callback",
  HOME: "/",
  TERMS: "/terms",
  PRIVACY: "/privacy"
} as const;

export const API_ENDPOINTS = {
  USER_INFO: "/user_info",
  GITHUB_AUTH: "/auth/github",
  LOGOUT: "/auth/logout"
} as const;