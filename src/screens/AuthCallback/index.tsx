import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { githubLogin } from '../../store/slices/authSlice';
import { LoadingSpinner } from '../../components/common/LoadingSpinner/LoadingSpinner';
import { ROUTES } from '../../config/constants';
import './AuthCallback.css';

export const AuthCallback = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(githubLogin())
      .unwrap()
      .then(() => {
        navigate(ROUTES.DASHBOARD);
      })
      .catch(() => {
        navigate(ROUTES.HOME);
      });
  }, [dispatch, navigate]);

  return (
    <div className="callback-container" id="auth-callback">
      <LoadingSpinner size="large" />
      <p>Authenticating...</p>
    </div>
  );
};