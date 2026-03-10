/**
 * PawTrip color tokens for Light and Dark themes.
 * Always use these tokens — never hardcode color values.
 */

export const LIGHT = {
  primary: '#2979FF',
  primaryLight: '#E3F2FD',
  primaryGlow: 'rgba(41,121,255,0.2)',
  secondary: '#00C853',
  secondaryLight: '#E8F5E9',
  orange: '#FF9100',
  orangeLight: '#FFF3E0',
  red: '#FF1744',
  redLight: '#FCE4EC',
  purple: '#AA00FF',
  purpleLight: '#F3E5F5',
  white: '#FFFFFF',
  bgGray: '#F5F7FA',
  bgCard: '#FFFFFF',
  textPrimary: '#1A1A2E',
  textSecondary: '#6B7280',
  border: '#E5E7EB',
} as const;

export const DARK = {
  primary: '#448AFF',
  primaryLight: '#1A2744',
  primaryGlow: 'rgba(68,138,255,0.3)',
  secondary: '#69F0AE',
  secondaryLight: '#1B3A2A',
  orange: '#FFAB40',
  orangeLight: '#3D2E1A',
  red: '#FF5252',
  redLight: '#3A1A1A',
  purple: '#E040FB',
  purpleLight: '#2A1A3A',
  white: '#1E1E2E',
  bgGray: '#16162A',
  bgCard: '#252540',
  textPrimary: '#EAEAFF',
  textSecondary: '#9CA3AF',
  border: '#374151',
} as const;

export type Theme = typeof LIGHT;
