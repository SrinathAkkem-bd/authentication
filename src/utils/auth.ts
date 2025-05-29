import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  exp: number;
  sub: string;
  sessionId: string;
}

const SESSION_KEY = 'auth_session';
const SESSION_CHECK_INTERVAL = 60000; // 1 minute

export const auth = {
  getSession: (): string | undefined => {
    return Cookies.get(SESSION_KEY);
  },

  setSession: (token: string): void => {
    try {
      const decoded = jwtDecode<DecodedToken>(token);
      const expiresIn = new Date(decoded.exp * 1000);
      
      Cookies.set(SESSION_KEY, token, {
        expires: expiresIn,
        secure: true,
        sameSite: 'strict'
      });
    } catch (error) {
      console.error('Failed to set session:', error);
      auth.clearSession();
    }
  },

  clearSession: (): void => {
    Cookies.remove(SESSION_KEY);
  },

  isTokenExpired: (token: string): boolean => {
    try {
      const decoded = jwtDecode<DecodedToken>(token);
      const currentTime = Math.floor(Date.now() / 1000);
      // Add 5 minute buffer for token refresh
      return decoded.exp - 300 < currentTime;
    } catch {
      return true;
    }
  },

  getSessionId: (token: string): string | null => {
    try {
      const decoded = jwtDecode<DecodedToken>(token);
      return decoded.sessionId;
    } catch {
      return null;
    }
  },

  startSessionCheck: (onExpired: () => void): () => void => {
    const intervalId = setInterval(() => {
      const session = auth.getSession();
      if (!session || auth.isTokenExpired(session)) {
        onExpired();
      }
    }, SESSION_CHECK_INTERVAL);

    return () => clearInterval(intervalId);
  }
};