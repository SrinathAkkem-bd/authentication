import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { LoadingSpinner } from "../../components/common/LoadingSpinner/LoadingSpinner";
import { ROUTES } from "../../config/constants";
import "./AuthCallback.css";

export const AuthCallback = () => {
  const { checkSession } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const isValid = await checkSession();
        navigate(isValid ? ROUTES.DASHBOARD : ROUTES.LOGIN);
      } catch (error) {
        console.error("Auth callback error:", error);
        navigate(ROUTES.LOGIN);
      }
    };

    handleCallback();
  }, [checkSession, navigate]);

  return (
    <div className="callback-container" id="auth-callback">
      <LoadingSpinner size="large" />
      <p>Authenticating...</p>
    </div>
  );
};