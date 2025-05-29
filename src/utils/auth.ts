import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  exp: number;
  sub: string;
  sessionId: string;
}

const SESSION_KEY = 'auth_session';
const REFRESH_THRESHOLD = 5 * 60; // 5 minutes in seconds

export const auth = {
  getSession: (): string | null => {
    return Cookies.get(SESSION_KEY);
  },

  setSession: (token: string): void => {
    Cookies.set(SESSION_KEY, token, {
      secure: true,
      sameSite: 'strict',
      expires: 7 // 7 days
    });
  },

  clearSession: (): void => {
    Cookies.remove(SESSION_KEY);
  },

  isTokenExpired: (token: string): boolean => {
    try {
      const decoded = jwtDecode<DecodedToken>(token);
      const currentTime = Math.floor(Date.now() / 1000);
      return decoded.exp < currentTime;
    } catch {
      return true;
    }
  },

  shouldRefreshToken: (token: string): boolean => {
    try {
      const decoded = jwtDecode<DecodedToken>(token);
      const currentTime = Math.floor(Date.now() / 1000);
      return decoded.exp - currentTime < REFRESH_THRESHOLD;
    } catch {
      return false;
    }
  },

  getSessionId: (token: string): string | null => {
    try {
      const decoded = jwtDecode<DecodedToken>(token);
      return decoded.sessionId;
    } catch {
      return null;
    }
  }
};