import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { apiService } from "../utils/api";
import { auth } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import {API_BASE_URL, API_ENDPOINTS, ROUTES} from "../config/constants";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  handleGithubLogin: () => void;
  logout: () => Promise<void>;
  checkSession: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const checkSession = useCallback(async () => {
    try {
      const session = auth.getSession();
      if (!session || auth.isTokenExpired(session)) {
        setIsAuthenticated(false);
        return false;
      }

      const response = await apiService.getUserInfo();
      const isValid = response.status === 200;
      setIsAuthenticated(isValid);
      return isValid;
    } catch (error) {
      console.error("Session check failed:", error);
      setIsAuthenticated(false);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleGithubLogin = useCallback(() => {
    window.location.href = `${API_BASE_URL}${API_ENDPOINTS.GITHUB_AUTH}`;
  }, []);

  const logout = useCallback(async () => {
    try {
      await apiService.logout();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      auth.clearSession();
      setIsAuthenticated(false);
      navigate(ROUTES.HOME);
    }
  }, [navigate]);

  useEffect(() => {
    checkSession();

    const sessionCheckInterval = setInterval(() => {
      const session = auth.getSession();
      if (session && auth.shouldRefreshToken(session)) {
        apiService.refreshToken()
          .catch(() => {
            logout();
          });
      }
    }, 60000); // Check every minute

    return () => clearInterval(sessionCheckInterval);
  }, [checkSession, logout]);

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      isLoading,
      handleGithubLogin,
      logout,
      checkSession
    }}>
      {children}
    </AuthContext.Provider>
  );
};