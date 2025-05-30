import { GithubIcon } from 'lucide-react';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { useAuth } from '../../hooks/useAuth';
import { RootState } from '../../store';
import { ROUTES } from '../../config/constants';
import './GithubAppLogin.css';

export const GithubAppLogin = (): JSX.Element => {
  const { handleGithubLogin } = useAuth();
  const { isAuthenticated, isLoading } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      navigate(ROUTES.DASHBOARD);
    }
  }, [isAuthenticated, isLoading, navigate]);

  return (
    <main className="login-container" id="login-page">
      <Card className="login-card" id="login-form">
        <CardContent className="login-card-content">
          <div className="logo-container" id="logo">
            <img
              className="logo-image"
              alt="Logo"
              src="/group.png"
              id="logo-img"
            />
          </div>

          <div className="heading-container" id="heading">
            <h1 className="heading-title">GitHub Security Scan Setup</h1>
            <p className="heading-subtitle">Login to configure your workflows</p>
          </div>

          <div className="button-container" id="login-button">
            <Button
              className="github-login-button"
              onClick={handleGithubLogin}
              id="github-login-btn"
            >
              <GithubIcon className="github-icon" />
              <span>Login with GitHub</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="terms-container" id="terms">
        <p className="terms-text">
          By clicking continue, you agree to our{" "}
          <a href={ROUTES.TERMS} className="terms-link">Terms of Service</a>
          {" "}and{" "}
          <a href={ROUTES.PRIVACY} className="terms-link">Privacy Policy</a>
        </p>
      </div>
    </main>
  );
};