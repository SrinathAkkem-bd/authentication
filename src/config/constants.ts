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
  LOGOUT: "/auth/logout",
  REFRESH_TOKEN: "/auth/refresh"
} as const;

export const AUTH_CONFIG = {
  SESSION_DURATION: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
  REFRESH_THRESHOLD: 5 * 60 * 1000, // 5 minutes in milliseconds
  MAX_RETRY_ATTEMPTS: 3,
  REQUEST_TIMEOUT: 10000 // 10 seconds
} as const;