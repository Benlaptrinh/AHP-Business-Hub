'use client';

import {
  BarChart3,
  Briefcase,
  FolderKanban,
  LayoutDashboard,
  LogOut,
  Menu,
  Shield,
  Users,
  Wallet,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { type ReactNode, useMemo, useState } from 'react';
import { clearSession } from '@/lib/session';

type NavItem = {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
};

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Projects', href: '/admin/projects', icon: FolderKanban },
  { label: 'Jobs', href: '/admin/jobs', icon: Briefcase },
  { label: 'Payments', href: '/admin/payments', icon: Wallet },
  { label: 'Users', href: '/admin/users', icon: Users },
];

function isActivePath(currentPath: string, href: string) {
  if (href === '/admin') return currentPath === '/admin';
  return currentPath === href || currentPath.startsWith(`${href}/`);
}

function NavLinks({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return (
    <nav className='space-y-1'>
      {NAV_ITEMS.map((item) => {
        const active = isActivePath(pathname, item.href);
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={[
              'group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all',
              active
                ? 'bg-[#001F3F] text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100 hover:text-[#001F3F]',
            ].join(' ')}
          >
            <Icon className='h-4 w-4 shrink-0' />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export default function AdminShell({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const pageTitle = useMemo(() => {
    const current = NAV_ITEMS.find((item) => isActivePath(pathname, item.href));
    return current?.label ?? 'Admin';
  }, [pathname]);

  return (
    <div className='min-h-screen bg-slate-100'>
      <aside className='fixed inset-y-0 left-0 hidden w-72 border-r border-slate-200 bg-white p-6 lg:block'>
        <div className='mb-8'>
          <p className='text-xs font-semibold uppercase tracking-[0.16em] text-slate-400'>AHP Control</p>
          <h1 className='mt-2 text-2xl font-bold text-[#001F3F]'>Admin Panel</h1>
          <p className='mt-1 text-sm text-slate-500'>Quản trị nội dung và vận hành hệ thống</p>
        </div>

        <NavLinks pathname={pathname} />

        <div className='mt-8 rounded-xl border border-orange-100 bg-orange-50 p-4'>
          <div className='flex items-center gap-2 text-orange-700'>
            <Shield className='h-4 w-4' />
            <p className='text-sm font-semibold'>Admin Mode</p>
          </div>
          <p className='mt-1 text-xs text-orange-700/90'>
            Màn hình đang kết nối NestJS API. CRUD đang ở bước hoàn thiện action thật.
          </p>
        </div>

        <button
          type='button'
          onClick={() => {
            clearSession();
            router.replace('/login');
          }}
          className='mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-rose-200 px-3 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-50'
        >
          <LogOut className='h-4 w-4' />
          Đăng xuất
        </button>
      </aside>

      <div className='lg:ml-72'>
        <header className='sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur'>
          <div className='flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8'>
            <div className='flex items-center gap-3'>
              <button
                type='button'
                className='inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700 lg:hidden'
                onClick={() => setMobileOpen(true)}
                aria-label='Mở menu admin'
              >
                <Menu className='h-5 w-5' />
              </button>
              <div>
                <p className='text-xs font-medium uppercase tracking-[0.14em] text-slate-400'>Admin</p>
                <h2 className='text-lg font-semibold text-slate-900'>{pageTitle}</h2>
              </div>
            </div>

            <div className='hidden items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-slate-500 sm:flex'>
              <BarChart3 className='h-4 w-4' />
              <span className='text-sm'>Live metrics</span>
            </div>
          </div>
        </header>

        <main className='p-4 sm:p-6 lg:p-8'>{children}</main>
      </div>

      <div
        className={[
          'fixed inset-0 z-50 bg-black/50 transition-opacity lg:hidden',
          mobileOpen ? 'visible opacity-100' : 'invisible opacity-0',
        ].join(' ')}
        onClick={() => setMobileOpen(false)}
        aria-hidden={!mobileOpen}
      />

      <aside
        className={[
          'fixed inset-y-0 left-0 z-[60] w-72 border-r border-slate-200 bg-white p-6 transition-transform lg:hidden',
          mobileOpen ? 'translate-x-0' : '-translate-x-full',
        ].join(' ')}
        role='dialog'
        aria-label='Admin sidebar mobile'
      >
        <div className='mb-6 flex items-center justify-between'>
          <h3 className='text-xl font-bold text-[#001F3F]'>Admin Panel</h3>
          <button
            type='button'
            className='inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-slate-700'
            onClick={() => setMobileOpen(false)}
            aria-label='Đóng menu admin'
          >
            <X className='h-4 w-4' />
          </button>
        </div>

        <NavLinks pathname={pathname} onNavigate={() => setMobileOpen(false)} />
      </aside>
    </div>
  );
}
