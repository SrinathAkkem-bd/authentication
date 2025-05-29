import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { checkAuth, githubLogin, logout } from '../store/slices/authSlice';
import { API_BASE_URL, API_ENDPOINTS, ROUTES } from '../config/constants';

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, error } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      dispatch(checkAuth());
    }
  }, [dispatch, isAuthenticated, isLoading]);

  const handleGithubLogin = () => {
    window.location.href = `${API_BASE_URL}${API_ENDPOINTS.GITHUB_AUTH}`;
  };

  const handleLogout = async () => {
    await dispatch(logout());
    navigate(ROUTES.HOME);
  };

  return {
    isAuthenticated,
    isLoading,
    error,
    handleGithubLogin,
    logout: handleLogout,
  };
};