import { Routes, Route, Navigate } from 'react-router-dom';
import { GithubAppLogin } from '../screens/GithubAppLogin';
import { Dashboard } from '../screens/Dashboard';
import { AuthCallback } from '../screens/AuthCallback';
import { PrivateRoute } from './PrivateRoute';
import { ROUTES } from '../config/constants';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<GithubAppLogin />} />
      <Route path={ROUTES.AUTH_CALLBACK} element={<AuthCallback />} />
      <Route
        path={ROUTES.DASHBOARD}
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};