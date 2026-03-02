export type UserRole = 'admin' | 'user';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  picture?: string;
  role: UserRole;
}

export interface TokenPayload {
  sub: string;
  email: string;
  name: string;
  picture?: string;
  role: UserRole;
}
