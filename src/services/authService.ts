/**
 * Auth service — Google OAuth token verification.
 */

import { api } from './api';
import { User } from '../types/user';

/** Verifies Google OAuth token with backend and returns user profile. */
export async function verifyGoogleToken(
  idToken: string,
): Promise<User> {
  const { data } = await api.post<User>('/auth/google', { idToken });
  return data;
}
