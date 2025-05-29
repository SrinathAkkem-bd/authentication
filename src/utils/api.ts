import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { auth } from "./auth";
import { API_BASE_URL, API_ENDPOINTS } from "../config/constants";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const session = auth.getSession();
    if (session) {
      config.headers.Authorization = `Bearer ${session}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const session = auth.getSession();
        if (session && auth.shouldRefreshToken(session)) {
          const response = await api.post(API_ENDPOINTS.REFRESH_TOKEN);
          const newToken = response.data.token;
          auth.setSession(newToken);
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return api(originalRequest);
        }
      } catch {
        auth.clearSession();
        window.location.href = '/login';
        return Promise.reject(error);
      }
    }
    
    return Promise.reject(error);
  }
);

export const apiService = {
  getUserInfo: () => api.get(API_ENDPOINTS.USER_INFO),
  logout: async () => {
    const session = auth.getSession();
    if (session) {
      const sessionId = auth.getSessionId(session);
      await api.post(API_ENDPOINTS.LOGOUT, { sessionId });
      auth.clearSession();
    }
  },
  refreshToken: () => api.post(API_ENDPOINTS.REFRESH_TOKEN),
};

export default api;