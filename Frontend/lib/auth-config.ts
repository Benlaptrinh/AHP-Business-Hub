export const ADMIN_EMAILS = [
  'admin@anhongphat.vn',
  'ceo@anhongphat.vn',
  'techlead@anhongphat.vn',
  'uktaongu747@gmail.com',
] as const;

export type UserRole = 'admin' | 'user';

export function inferRoleFromEmail(email?: string): UserRole {
  if (!email) return 'user';
  const normalized = email.trim().toLowerCase();
  return ADMIN_EMAILS.some((item) => item.toLowerCase() === normalized) ? 'admin' : 'user';
}
