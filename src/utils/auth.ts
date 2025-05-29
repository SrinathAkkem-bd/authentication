import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  exp: number;
  sub: string;
  sessionId: string;
}

const SESSION_KEY = 'session_active';
const SESSION_CHECK_INTERVAL = 15 * 60 * 1000; // 15 minutes

export const auth = {
  getSession: (): boolean => {
    return Cookies.get(SESSION_KEY) === 'true';
  },

  setSession: (): void => {
    try {
      Cookies.set(SESSION_KEY, 'true', {
        secure: true,
        sameSite: 'lax',
        expires: 1 // 1 day
      });
    } catch (error) {
      console.error('Failed to set session:', error);
      auth.clearSession();
    }
  },

  clearSession: (): void => {
    Cookies.remove(SESSION_KEY);
  },

  startSessionCheck: (onExpired: () => void): () => void => {
    const checkSession = async () => {
      try {
        await apiService.getUserInfo();
      } catch (error) {
        onExpired();
      }
    };

    // Initial check
    checkSession();
    
    const intervalId = setInterval(checkSession, SESSION_CHECK_INTERVAL);
    return () => clearInterval(intervalId);
  }
};