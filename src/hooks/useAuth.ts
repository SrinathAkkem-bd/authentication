import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const API_BASE_URL = "https://api.example.com"; // Replace with your actual API URL

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    const sessionToken = Cookies.get("session_token");
    if (sessionToken) {
      try {
        const response = await axios.get(`${API_BASE_URL}/user_info`, {
          headers: { Authorization: `Bearer ${sessionToken}` }
        });
        setIsAuthenticated(true);
      } catch (error) {
        Cookies.remove("session_token");
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
    setIsLoading(false);
  };

  const handleGithubLogin = () => {
    window.location.href = `${API_BASE_URL}/auth/github`;
  };

  const logout = () => {
    Cookies.remove("session_token");
    setIsAuthenticated(false);
    window.location.href = "/login";
  };

  return {
    isAuthenticated,
    isLoading,
    handleGithubLogin,
    logout
  };
};