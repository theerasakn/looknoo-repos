/**
 * Lightweight JWT decoder for Google OAuth credentials.
 */

import { User } from '../types/user';

/**
 * Decodes a Google JWT token and extracts user profile fields.
 * Does NOT verify signature — that should be done server-side.
 */
export function decodeGoogleJwt(token: string): User | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }
    const payload = JSON.parse(atob(parts[1]));
    return {
      sub: payload.sub,
      name: payload.name,
      email: payload.email,
      picture: payload.picture,
    };
  } catch {
    return null;
  }
}
