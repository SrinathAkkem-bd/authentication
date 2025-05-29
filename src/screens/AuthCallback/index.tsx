import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { githubLogin } from '../../store/slices/authSlice';
import { LoadingSpinner } from '../../components/common/LoadingSpinner/LoadingSpinner';
import { ROUTES } from '../../config/constants';
import './AuthCallback.css';

export const AuthCallback = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isAuthenticated, error } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        await dispatch(githubLogin()).unwrap();
        navigate(ROUTES.DASHBOARD);
      } catch (error) {
        console.error('Auth callback error:', error);
        navigate(ROUTES.HOME);
      }
    };

    handleCallback();
  }, [dispatch, navigate]);

  if (error) {
    return (
      <div className="callback-container">
        <p>Authentication failed. Redirecting...</p>
      </div>
    );
  }

  return (
    <div className="callback-container" id="auth-callback">
      <LoadingSpinner size="large" />
      <p>Authenticating...</p>
    </div>
  );
};