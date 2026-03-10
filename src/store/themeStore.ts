/**
 * Theme store — persists dark mode preference via MMKV.
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { storage } from './mmkvStorage';

interface ThemeState {
  isDark: boolean;
  toggleTheme: () => void;
}

/** Global theme store with MMKV persistence */
export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      isDark: false,
      toggleTheme: () => set((s) => ({ isDark: !s.isDark })),
    }),
    { name: 'theme-store', storage: createJSONStorage(() => storage) },
  ),
);
