import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "./AuthCallback.css";

export const AuthCallback = () => {
  const { checkSession } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const isValid = await checkSession();
        if (isValid) {
          navigate("/dashboard");
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Auth callback error:", error);
        navigate("/login");
      }
    };

    handleCallback();
  }, [checkSession, navigate]);

  return (
    <div className="callback-container" id="auth-callback">
      <div className="loading-spinner" id="loading-spinner"></div>
      <p>Authenticating...</p>
    </div>
  );
};