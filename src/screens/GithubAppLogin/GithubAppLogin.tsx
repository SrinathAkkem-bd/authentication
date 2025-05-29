import { GithubIcon } from "lucide-react";
import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { useAuth } from "../../hooks/useAuth";
import "./GithubAppLogin.css";

export const GithubAppLogin = (): JSX.Element => {
  const { handleGithubLogin, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      navigate("/dashboard");
    }

    // Handle the callback from GitHub OAuth
    const code = searchParams.get("code");
    if (code) {
      // The backend will handle this code and set the session
      navigate("/dashboard");
    }
  }, [isAuthenticated, isLoading, navigate, searchParams]);

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
          <a href="/terms" className="terms-link">Terms of Service</a>
          {" "}and{" "}
          <a href="/privacy" className="terms-link">Privacy Policy</a>
        </p>
      </div>
    </main>
  );
};