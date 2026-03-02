import type { Metadata } from 'next';
import AdminShell from '@/components/admin/AdminShell';
import AuthGuard from '@/components/auth/AuthGuard';

export const metadata: Metadata = {
  title: 'Admin | AN HỒNG PHÁT',
  description: 'Khu vực quản trị dự án số AHP',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard allowedRoles={['admin']}>
      <AdminShell>{children}</AdminShell>
    </AuthGuard>
  );
}
