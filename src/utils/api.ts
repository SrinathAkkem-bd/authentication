import axios from "axios";
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

export const apiService = {
  getUserInfo: () => api.get(API_ENDPOINTS.USER_INFO),
  logout: () => {
    auth.clearSession();
    window.location.href = '/';
  }
};