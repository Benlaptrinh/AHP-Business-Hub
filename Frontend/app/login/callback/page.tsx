'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchAuthMe } from '@/lib/api-client';
import { saveSession } from '@/lib/session';

function sanitizeNextPath(nextPath?: string | null) {
  if (!nextPath) return null;
  if (!nextPath.startsWith('/')) return null;
  if (nextPath.startsWith('//')) return null;
  return nextPath;
}

export default function LoginCallbackPage() {
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      const query = new URLSearchParams(window.location.search);
      const accessToken = query.get('accessToken');
      const nextPath = sanitizeNextPath(query.get('next'));

      if (!accessToken) {
        setErrorMessage('Thiếu accessToken từ backend callback.');
        return;
      }

      try {
        const response = await fetchAuthMe(accessToken);
        saveSession(accessToken, response.user);

        if (nextPath) {
          router.replace(nextPath);
          return;
        }

        router.replace(response.user.role === 'admin' ? '/admin' : '/profile');
      } catch {
        setErrorMessage('Không thể xác minh phiên đăng nhập. Vui lòng thử lại.');
      }
    };

    void run();
  }, [router]);

  if (errorMessage) {
    return (
      <div className='grid min-h-screen place-items-center px-4'>
        <div className='w-full max-w-md rounded-2xl border border-rose-200 bg-white p-6 text-center shadow-sm'>
          <h1 className='text-lg font-bold text-rose-700'>Đăng nhập thất bại</h1>
          <p className='mt-2 text-sm text-slate-600'>{errorMessage}</p>
          <Link
            href='/login'
            className='mt-5 inline-flex rounded-lg bg-[#001F3F] px-4 py-2 text-sm font-semibold text-white hover:bg-[#001633]'
          >
            Quay lại trang đăng nhập
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className='grid min-h-screen place-items-center px-4'>
      <div className='rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-600'>
        Đang hoàn tất đăng nhập Google...
      </div>
    </div>
  );
}
