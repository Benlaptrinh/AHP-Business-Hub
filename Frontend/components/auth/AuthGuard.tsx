'use client';

import { createContext, type ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import type { AuthUser, UserRole } from '@/lib/api-client';
import { fetchAuthMe } from '@/lib/api-client';
import { clearSession, getAccessToken, getSessionUser, updateSessionUser } from '@/lib/session';

const AuthUserContext = createContext<AuthUser | null>(null);

export function useAuthUser() {
  return useContext(AuthUserContext);
}

function redirectByRole(router: ReturnType<typeof useRouter>, role: UserRole) {
  if (role === 'admin') {
    router.replace('/admin');
    return;
  }

  router.replace('/profile');
}

export default function AuthGuard({
  children,
  allowedRoles,
}: {
  children: ReactNode;
  allowedRoles?: UserRole[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<AuthUser | null>(() => getSessionUser());

  const roleKey = useMemo(() => (allowedRoles ?? []).join(','), [allowedRoles]);

  useEffect(() => {
    let active = true;

    const run = async () => {
      const token = getAccessToken();

      if (!token) {
        router.replace(`/login?next=${encodeURIComponent(pathname)}`);
        return;
      }

      try {
        const response = await fetchAuthMe(token);
        if (!active) return;

        const currentUser = response.user;
        setUser(currentUser);
        updateSessionUser(currentUser);

        if (allowedRoles?.length && !allowedRoles.includes(currentUser.role)) {
          redirectByRole(router, currentUser.role);
          return;
        }
      } catch {
        if (!active) return;
        clearSession();
        router.replace(`/login?next=${encodeURIComponent(pathname)}`);
        return;
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    void run();

    return () => {
      active = false;
    };
  }, [router, pathname, roleKey, allowedRoles]);

  if (loading) {
    return (
      <div className='grid min-h-[50vh] place-items-center'>
        <div className='rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-600'>
          Đang xác thực phiên đăng nhập...
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <AuthUserContext.Provider value={user}>{children}</AuthUserContext.Provider>;
}
