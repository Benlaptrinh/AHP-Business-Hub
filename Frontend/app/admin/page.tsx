'use client';

import { useEffect, useMemo, useState } from 'react';
import PageHeader from '@/components/admin/PageHeader';
import StatCards from '@/components/admin/StatCards';
import type { JobStats, PaymentStats, ProjectStats, UserStats } from '@/lib/api-client';
import { fetchJobStats, fetchPaymentStats, fetchProjectStats, fetchUserStats } from '@/lib/api-client';
import { getAccessToken } from '@/lib/session';

const recentActivities = [
  'Project “Villa Riverside” vừa được cập nhật tiến độ 68%.',
  'Job “Kỹ sư kết cấu” có 12 hồ sơ mới trong 24h.',
  'Payment INV-2026-0225 đã được xác nhận thành công.',
  'User `tran.a@company.com` được nâng quyền lên manager.',
];

function toCurrencyVnd(value: number) {
  return `${Math.round(value).toLocaleString('vi-VN')}đ`;
}

export default function AdminDashboardPage() {
  const [projectStats, setProjectStats] = useState<ProjectStats | null>(null);
  const [jobStats, setJobStats] = useState<JobStats | null>(null);
  const [paymentStats, setPaymentStats] = useState<PaymentStats | null>(null);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const run = async () => {
      const token = getAccessToken();
      if (!token) return;

      try {
        const [project, job, payment, user] = await Promise.all([
          fetchProjectStats(token),
          fetchJobStats(token),
          fetchPaymentStats(token),
          fetchUserStats(token),
        ]);

        if (!active) return;
        setProjectStats(project);
        setJobStats(job);
        setPaymentStats(payment);
        setUserStats(user);
      } catch (error) {
        if (!active) return;
        setErrorMessage(error instanceof Error ? error.message : 'Không thể tải dashboard stats');
      }
    };

    void run();

    return () => {
      active = false;
    };
  }, []);

  const stats = useMemo(
    () => [
      {
        label: 'Tổng dự án',
        value: String(projectStats?.total ?? '--'),
        trend: projectStats ? `${projectStats.active} active` : undefined,
        tone: 'up' as const,
      },
      {
        label: 'Jobs đang tuyển',
        value: String(jobStats?.open ?? '--'),
        trend: jobStats ? `${jobStats.applicants} ứng viên` : undefined,
        tone: 'up' as const,
      },
      {
        label: 'Doanh thu hiện tại',
        value: paymentStats ? toCurrencyVnd(paymentStats.paid) : '--',
        trend: paymentStats ? `${paymentStats.totalInvoices} invoices` : undefined,
        tone: 'up' as const,
      },
      {
        label: 'Người dùng',
        value: String(userStats?.total ?? '--'),
        trend: userStats ? `${userStats.admins} admin` : undefined,
        tone: 'neutral' as const,
      },
    ],
    [projectStats, jobStats, paymentStats, userStats],
  );

  return (
    <div>
      <PageHeader
        title='Dashboard'
        description='Tổng quan vận hành hệ thống và số liệu realtime từ backend NestJS.'
      />

      {errorMessage && (
        <div className='mb-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700'>
          {errorMessage}
        </div>
      )}

      <StatCards items={stats} />

      <section className='mt-6 grid gap-6 xl:grid-cols-[1.6fr_1fr]'>
        <article className='rounded-2xl border border-slate-200 bg-white p-5 shadow-sm'>
          <h2 className='text-lg font-bold text-slate-900'>Revenue Snapshot</h2>
          <p className='mt-1 text-sm text-slate-500'>Biểu đồ cột minh họa.</p>

          <div className='mt-5 grid grid-cols-12 items-end gap-2'>
            {[35, 42, 28, 56, 64, 52, 72, 66, 74, 61, 79, 83].map((height, index) => (
              <div key={index} className='flex flex-col items-center gap-2'>
                <div
                  className='w-full rounded-t bg-gradient-to-t from-[#001F3F] to-[#FF6B35]'
                  style={{ height: `${height * 2}px` }}
                />
                <span className='text-[10px] font-medium text-slate-400'>{index + 1}</span>
              </div>
            ))}
          </div>
        </article>

        <article className='rounded-2xl border border-slate-200 bg-white p-5 shadow-sm'>
          <h2 className='text-lg font-bold text-slate-900'>Recent Activity</h2>
          <ul className='mt-4 space-y-3'>
            {recentActivities.map((item) => (
              <li key={item} className='rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700'>
                {item}
              </li>
            ))}
          </ul>
        </article>
      </section>
    </div>
  );
}
