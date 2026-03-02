import type { AuthUser } from './api-client';

const TOKEN_KEY = 'ahp_access_token';
const USER_KEY = 'ahp_auth_user';

function hasWindow() {
  return typeof window !== 'undefined';
}

export function getAccessToken() {
  if (!hasWindow()) return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function getSessionUser(): AuthUser | null {
  if (!hasWindow()) return null;
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

export function saveSession(accessToken: string, user: AuthUser) {
  if (!hasWindow()) return;
  localStorage.setItem(TOKEN_KEY, accessToken);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function updateSessionUser(user: AuthUser) {
  if (!hasWindow()) return;
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearSession() {
  if (!hasWindow()) return;
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}
