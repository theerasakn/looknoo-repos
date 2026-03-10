/** Google OAuth user profile */
export interface User {
  sub: string;
  name: string;
  email: string;
  picture?: string;
}
