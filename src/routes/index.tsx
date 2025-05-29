import { Routes, Route, Navigate } from "react-router-dom";
import { GithubAppLogin } from "../screens/GithubAppLogin";
import { Dashboard } from "../screens/Dashboard";
import { AuthCallback } from "../screens/AuthCallback";
import { PrivateRoute } from "./PrivateRoute";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<GithubAppLogin />} />
      <Route path="/auth/callback" element={<AuthCallback />} />
      <Route path="/dashboard" element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      } />
      <Route path="/" element={<Navigate to="/login\" replace />} />
    </Routes>
  );
};