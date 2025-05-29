export const API_BASE_URL = "http://localhost:8080/api/api";

export const ROUTES = {
  DASHBOARD: "/dashboard",
  AUTH_CALLBACK: "/auth/callback",
  HOME: "/",
  TERMS: "/terms",
  PRIVACY: "/privacy"
} as const;

export const API_ENDPOINTS = {
  USER_INFO: "/auth/user_info",
  GITHUB_AUTH: "/auth/github/login",
  LOGOUT: "/auth/logout"
} as const;

export const AUTH_CONFIG = {
  SESSION_DURATION: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
  MAX_RETRY_ATTEMPTS: 3,
  REQUEST_TIMEOUT: 10000 // 10 seconds
} as const;