import AuthGuard from '@/components/auth/AuthGuard';

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return <AuthGuard allowedRoles={['user']}>{children}</AuthGuard>;
}
