'use client';

import { Chrome, KeyRound, ShieldCheck, UserCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { devLogin, getGoogleOAuthLoginUrl } from '@/lib/api-client';
import { ADMIN_EMAILS } from '@/lib/auth-config';
import { saveSession } from '@/lib/session';

function mapErrorMessage(errorCode: string | null) {
  if (!errorCode) return null;

  switch (errorCode) {
    case 'google_access_denied':
      return 'Bạn đã hủy đăng nhập Google.';
    case 'missing_google_code':
      return 'Google không trả về mã xác thực. Vui lòng thử lại.';
    case 'google_auth_failed':
      return 'Xác thực Google thất bại ở backend. Kiểm tra GOOGLE_CLIENT_ID/SECRET/REDIRECT_URI.';
    default:
      return `Đăng nhập thất bại: ${errorCode}`;
  }
}

export default function LoginPage() {
  const router = useRouter();

  const [nextPath, setNextPath] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [devEmail, setDevEmail] = useState('admin@anhongphat.vn');
  const [devName, setDevName] = useState('Dev Admin');

  const safeNextPath = useMemo(() => {
    if (!nextPath) return null;
    if (!nextPath.startsWith('/')) return null;
    if (nextPath.startsWith('//')) return null;
    return nextPath;
  }, [nextPath]);

  const googleOAuthUrl = useMemo(
    () => getGoogleOAuthLoginUrl(safeNextPath),
    [safeNextPath],
  );

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    setNextPath(query.get('next'));
    setErrorMessage(mapErrorMessage(query.get('error')));
  }, []);

  const handleDevLogin = useCallback(async () => {
    setLoading(true);
    setErrorMessage(null);

    try {
      const response = await devLogin(devEmail, devName);
      saveSession(response.accessToken, response.user);

      if (safeNextPath) {
        router.replace(safeNextPath);
        return;
      }

      router.replace(response.user.role === 'admin' ? '/admin' : '/profile');
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Dev login thất bại');
    } finally {
      setLoading(false);
    }
  }, [devEmail, devName, router, safeNextPath]);

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-100 via-white to-orange-50 px-4 py-12'>
      <div className='mx-auto grid w-full max-w-5xl gap-8 lg:grid-cols-2'>
        <section className='rounded-3xl border border-slate-200 bg-white p-8 shadow-sm'>
          <p className='text-sm font-semibold uppercase tracking-[0.14em] text-orange-600'>AHP Platform</p>
          <h1 className='mt-3 text-3xl font-bold text-slate-900'>Đăng nhập với Google</h1>
          <p className='mt-3 text-sm leading-6 text-slate-600'>
            Frontend chỉ mở đường dẫn backend `GET /auth/google/login`, mọi logic OAuth được xử lý ở NestJS.
          </p>

          <div className='mt-8'>
            <button
              type='button'
              disabled={loading}
              onClick={() => {
                window.location.href = googleOAuthUrl;
              }}
              className='inline-flex w-full items-center justify-center gap-3 rounded-xl bg-[#001F3F] px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#001633] disabled:cursor-not-allowed disabled:opacity-60'
            >
              <Chrome className='h-5 w-5' />
              {loading ? 'Đang xử lý đăng nhập...' : 'Đăng nhập bằng Google (Backend OAuth)'}
            </button>

            {errorMessage && <p className='mt-3 text-sm text-rose-600'>{errorMessage}</p>}
          </div>

          <div className='mt-6 rounded-xl border border-orange-100 bg-orange-50 p-4 text-sm text-orange-800'>
            <p className='font-semibold'>Quy tắc phân quyền</p>
            <p className='mt-1'>
              Email Google trùng danh sách `ADMIN_EMAILS` ở backend sẽ vào <span className='font-semibold'>Admin</span>,
              còn lại vào <span className='font-semibold'>User Profile</span>.
            </p>
          </div>

          <div className='mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4'>
            <p className='text-sm font-semibold text-slate-800'>Đăng nhập nhanh (Dev)</p>
            <p className='mt-1 text-xs text-slate-500'>
              Dùng endpoint `POST /auth/dev-login` để test frontend/backend khi chưa cấu hình Google.
            </p>

            <div className='mt-3 grid gap-2 sm:grid-cols-2'>
              <input
                type='email'
                value={devEmail}
                onChange={(event) => setDevEmail(event.target.value)}
                placeholder='Email'
                className='h-10 rounded-lg border border-slate-300 px-3 text-sm outline-none ring-orange-300 focus:ring'
              />
              <input
                type='text'
                value={devName}
                onChange={(event) => setDevName(event.target.value)}
                placeholder='Tên hiển thị'
                className='h-10 rounded-lg border border-slate-300 px-3 text-sm outline-none ring-orange-300 focus:ring'
              />
            </div>

            <button
              type='button'
              onClick={() => void handleDevLogin()}
              disabled={loading}
              className='mt-3 inline-flex h-10 items-center rounded-lg bg-[#001F3F] px-4 text-sm font-semibold text-white hover:bg-[#001633] disabled:opacity-60'
            >
              {loading ? 'Đang đăng nhập...' : 'Dev Login'}
            </button>
          </div>

          <div className='mt-8 flex flex-wrap gap-2'>
            <Link
              href='/profile'
              className='inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50'
            >
              <UserCircle2 className='h-4 w-4' />
              Xem UI Profile
            </Link>
            <Link
              href='/admin'
              className='inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50'
            >
              <ShieldCheck className='h-4 w-4' />
              Xem UI Admin
            </Link>
          </div>
        </section>

        <section className='rounded-3xl border border-slate-200 bg-white p-8 shadow-sm'>
          <h2 className='text-xl font-bold text-slate-900'>Admin Emails Cấu Hình</h2>
          <p className='mt-2 text-sm text-slate-600'>
            Danh sách này chỉ để tham khảo UI. Quyền thực tế được backend kiểm tra qua biến `ADMIN_EMAILS`.
          </p>

          <div className='mt-5 space-y-3'>
            {ADMIN_EMAILS.map((email) => (
              <div
                key={email}
                className='flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3'
              >
                <p className='text-sm font-semibold text-slate-800'>{email}</p>
                <span className='rounded-full bg-[#001F3F] px-2.5 py-1 text-xs font-semibold text-white'>
                  ADMIN
                </span>
              </div>
            ))}
          </div>

          <div className='mt-8 rounded-xl border border-slate-200 bg-slate-50 p-4'>
            <p className='flex items-center gap-2 text-sm font-semibold text-slate-800'>
              <KeyRound className='h-4 w-4 text-orange-600' />
              API đang dùng
            </p>
            <ul className='mt-3 space-y-2 text-sm text-slate-600'>
              <li>1. `GET /auth/google/login`</li>
              <li>2. `GET /auth/google/callback`</li>
              <li>3. `GET /auth/me`</li>
              <li>4. `GET /users/me`</li>
              <li>5. `GET /projects|jobs|payments|users` cho admin</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
