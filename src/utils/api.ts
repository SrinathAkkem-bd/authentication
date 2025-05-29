import axios from "axios";
import { API_BASE_URL } from "../config/constants";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true
});

export const apiService = {
  getUserInfo: () => api.get("/user_info"),
  logout: () => api.post("/auth/logout"),
};

export default api;