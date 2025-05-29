import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = "https://api.example.com"; // Replace with your actual API URL

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/user_info`, {
        withCredentials: true
      });
      
      if (response.status === 200) {
        setIsAuthenticated(true);
        return true;
      } else {
        setIsAuthenticated(false);
        return false;
      }
    } catch (error) {
      setIsAuthenticated(false);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleGithubLogin = () => {
    window.location.href = `${API_BASE_URL}/auth/github`;
  };

  const logout = async () => {
    try {
      await axios.post(`${API_BASE_URL}/auth/logout`, {}, {
        withCredentials: true
      });
    } finally {
      setIsAuthenticated(false);
      window.location.href = "/login";
    }
  };

  return {
    isAuthenticated,
    isLoading,
    handleGithubLogin,
    logout,
    checkSession
  };
};