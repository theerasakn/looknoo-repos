/**
 * Auth store — manages Google OAuth user state with MMKV persistence.
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { storage } from './mmkvStorage';
import { User } from '../types/user';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  hasCompletedOnboarding: boolean;
  setUser: (user: User) => void;
  setOnboardingComplete: () => void;
  logout: () => void;
}

/** Global auth store with MMKV persistence */
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      hasCompletedOnboarding: false,
      setUser: (user) => set({ user, isAuthenticated: true }),
      setOnboardingComplete: () => set({ hasCompletedOnboarding: true }),
      logout: () =>
        set({
          user: null,
          isAuthenticated: false,
          hasCompletedOnboarding: false,
        }),
    }),
    { name: 'auth-store', storage: createJSONStorage(() => storage) },
  ),
);
