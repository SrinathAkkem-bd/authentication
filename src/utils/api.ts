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
    if (error.response?.status === 401) {
      auth.clearSession();
      window.location.href = '/';
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
  }
};

export default api;