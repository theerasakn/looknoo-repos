/**
 * useGoogleAuth — Hook for Google OAuth sign-in flow.
 * If GOOGLE_CLIENT_ID is not set, provides demo mode.
 */

import { useState, useCallback } from 'react';
import { useAuthStore } from '../store/authStore';
import { User } from '../types/user';
import { decodeGoogleJwt } from '../utils/jwt';

const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID';

interface GoogleAuthResult {
  isConfigured: boolean;
  loading: boolean;
  error: string | null;
  signIn: () => Promise<void>;
  signInDemo: () => void;
}

/** Google OAuth hook — handles sign-in and demo mode fallback. */
export function useGoogleAuth(): GoogleAuthResult {
  const setUser = useAuthStore((s) => s.setUser);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isConfigured = GOOGLE_CLIENT_ID !== 'YOUR_GOOGLE_CLIENT_ID';

  const signIn = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // In production, this would use @react-native-google-signin/google-signin
      // For now, this is a placeholder for the OAuth flow
      throw new Error('Google Sign-In SDK not yet configured');
    } catch (err) {
      setError(
        err instanceof Error ? err.message : '\u0E40\u0E02\u0E49\u0E32\u0E2A\u0E39\u0E48\u0E23\u0E30\u0E1A\u0E1A\u0E44\u0E21\u0E48\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08',
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const signInDemo = useCallback(() => {
    const demoUser: User = {
      sub: 'demo-user-001',
      name: 'PawTrip Demo',
      email: 'demo@pawtrip.app',
      picture: undefined,
    };
    setUser(demoUser);
  }, [setUser]);

  return { isConfigured, loading, error, signIn, signInDemo };
}
