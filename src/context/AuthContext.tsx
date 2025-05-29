import React, { createContext, useContext, useState, useEffect } from "react";
import { apiService } from "../utils/api";
import { API_BASE_URL, API_ENDPOINTS } from "../config/constants";

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

  const checkSession = async () => {
    try {
      const response = await apiService.getUserInfo();
      const isValid = response.status === 200;
      setIsAuthenticated(isValid);
      return isValid;
    } catch (error) {
      setIsAuthenticated(false);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleGithubLogin = () => {
    window.location.href = `${API_BASE_URL}${API_ENDPOINTS.GITHUB_AUTH}`;
  };

  const logout = async () => {
    try {
      await apiService.logout();
    } finally {
      setIsAuthenticated(false);
      window.location.href = "/login";
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};