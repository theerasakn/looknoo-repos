/**
 * Theme barrel export and useTheme hook.
 */

export { LIGHT, DARK } from './colors';
export type { Theme } from './colors';
export { FONTS, TYPOGRAPHY } from './typography';
export { SPACING, RADIUS, SHADOW, MIN_TOUCH } from './spacing';

import { useThemeStore } from '../store/themeStore';
import { LIGHT, DARK, Theme } from './colors';

/**
 * Returns the active color palette based on the user's theme preference.
 */
export function useTheme(): Theme {
  const isDark = useThemeStore((s) => s.isDark);
  return isDark ? DARK : LIGHT;
}
