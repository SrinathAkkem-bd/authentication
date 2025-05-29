import Cookies from 'js-cookie';

const SESSION_KEY = 'session_active';
const SESSION_CHECK_INTERVAL = 60 * 60 * 1000; // 1 hour

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

  startSessionCheck: (checkFn: () => Promise<void>): () => void => {
    let timeoutId: NodeJS.Timeout;

    const scheduleNextCheck = () => {
      timeoutId = setTimeout(async () => {
        await checkFn();
        scheduleNextCheck();
      }, SESSION_CHECK_INTERVAL);
    };

    // Start the check cycle
    scheduleNextCheck();

    // Return cleanup function
    return () => clearTimeout(timeoutId);
  }
};