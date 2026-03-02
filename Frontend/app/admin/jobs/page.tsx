'use client';

import { RotateCcw } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import AdminTable from '@/components/admin/AdminTable';
import ConfirmModal from '@/components/admin/ConfirmModal';
import FormModal, { type FormField } from '@/components/admin/FormModal';
import PageHeader from '@/components/admin/PageHeader';
import StatCards from '@/components/admin/StatCards';
import type { CreateJobPayload, JobRecord, JobStats } from '@/lib/api-client';
import { createJob, deleteJob, fetchJobStats, fetchJobs, updateJob } from '@/lib/api-client';
import { getAccessToken } from '@/lib/session';

type JobRow = {
  id: string;
  title: string;
  department: string;
  location: string;
  level: string;
  applicants: number;
  status: 'open' | 'paused' | 'closed';
  updatedAt: string;
};

const JOB_FIELDS: FormField[] = [
  { name: 'title', label: 'Job Title', type: 'text', required: true },
  { name: 'department', label: 'Department', type: 'text', required: true },
  { name: 'location', label: 'Location', type: 'text', required: true },
  { name: 'level', label: 'Level', type: 'text', required: true },
  { name: 'applicants', label: 'Applicants', type: 'number', required: true },
  {
    name: 'status',
    label: 'Status',
    type: 'select',
    required: true,
    options: [
      { label: 'Open', value: 'open' },
      { label: 'Paused', value: 'paused' },
      { label: 'Closed', value: 'closed' },
    ],
  },
];

function statusBadge(status: JobRow['status']) {
  if (status === 'open') {
    return <span className='rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700'>Open</span>;
  }
  if (status === 'paused') {
    return <span className='rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-700'>Paused</span>;
  }
  return <span className='rounded-full bg-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-700'>Closed</span>;
}

function toPayload(values: Record<string, string>): CreateJobPayload {
  return {
    title: values.title,
    department: values.department,
    location: values.location,
    level: values.level,
    applicants: Number(values.applicants),
    status: values.status as CreateJobPayload['status'],
  };
}

export default function AdminJobsPage() {
  const [rows, setRows] = useState<JobRow[]>([]);
  const [stats, setStats] = useState<JobStats | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loadingData, setLoadingData] = useState(false);

  const [formOpen, setFormOpen] = useState(false);
  const [editingRow, setEditingRow] = useState<JobRow | null>(null);
  const [submitLoading, setSubmitLoading] = useState(false);

  const [deletingRow, setDeletingRow] = useState<JobRow | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const loadData = useCallback(async () => {
    const token = getAccessToken();
    if (!token) return;

    setLoadingData(true);
    setErrorMessage(null);

    try {
      const [jobs, jobStats] = await Promise.all([fetchJobs(token), fetchJobStats(token)]);

      setRows(
        jobs.map((item: JobRecord) => ({
          id: item.id,
          title: item.title,
          department: item.department,
          location: item.location,
          level: item.level,
          applicants: item.applicants,
          status: item.status,
          updatedAt: item.updatedAt,
        })),
      );
      setStats(jobStats);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Không thể tải jobs');
    } finally {
      setLoadingData(false);
    }
  }, []);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  const statCards = useMemo(
    () => [
      { label: 'Open Jobs', value: String(stats?.open ?? '--'), trend: 'From API', tone: 'up' as const },
      { label: 'Applicants', value: String(stats?.applicants ?? '--'), trend: 'From API', tone: 'up' as const },
      { label: 'Paused', value: String(stats?.paused ?? '--'), trend: 'From API', tone: 'down' as const },
      { label: 'Closed', value: String(stats?.closed ?? '--'), trend: 'From API', tone: 'neutral' as const },
    ],
    [stats],
  );

  return (
    <div>
      <PageHeader
        title='Jobs Management'
        description='Quản lý vị trí tuyển dụng, pipeline ứng viên và trạng thái từng job.'
      />

      <div className='mb-4 flex flex-wrap gap-2'>
        <button
          type='button'
          onClick={() => {
            setEditingRow(null);
            setFormOpen(true);
          }}
          className='rounded-lg bg-[#001F3F] px-4 py-2 text-sm font-semibold text-white hover:bg-[#001633]'
        >
          Tạo Job Mới
        </button>
        <button
          type='button'
          onClick={() => void loadData()}
          disabled={loadingData}
          className='inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60'
        >
          <RotateCcw className='h-4 w-4' />
          Làm mới
        </button>
      </div>

      {errorMessage && (
        <div className='mb-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700'>
          {errorMessage}
        </div>
      )}

      <StatCards items={statCards} />

      <div className='mt-6'>
        <AdminTable<JobRow>
          rows={rows}
          getRowKey={(row) => row.id}
          onEdit={(row) => {
            setEditingRow(row);
            setFormOpen(true);
          }}
          onDelete={(row) => setDeletingRow(row)}
          deletingId={deleteLoading ? deletingRow?.id ?? null : null}
          loading={loadingData}
          emptyMessage='Chưa có job nào.'
          columns={[
            { header: 'Job Title', render: (item) => <span className='font-semibold text-slate-900'>{item.title}</span> },
            { header: 'Department', render: (item) => item.department },
            { header: 'Location', render: (item) => item.location },
            { header: 'Level', render: (item) => item.level },
            { header: 'Applicants', render: (item) => item.applicants },
            { header: 'Status', render: (item) => statusBadge(item.status) },
          ]}
        />
      </div>

      <FormModal
        open={formOpen}
        title={editingRow ? 'Cập nhật Job' : 'Tạo Job mới'}
        fields={JOB_FIELDS}
        loading={submitLoading}
        initialValues={
          editingRow ?? {
            title: '',
            department: '',
            location: '',
            level: '',
            applicants: 0,
            status: 'open',
          }
        }
        onClose={() => setFormOpen(false)}
        onSubmit={async (values) => {
          const token = getAccessToken();
          if (!token) return;

          setSubmitLoading(true);
          try {
            const payload = toPayload(values);
            if (editingRow) {
              await updateJob(token, editingRow.id, payload);
            } else {
              await createJob(token, payload);
            }
            await loadData();
            setFormOpen(false);
            setEditingRow(null);
          } catch (error) {
            setErrorMessage(error instanceof Error ? error.message : 'Lưu job thất bại');
          } finally {
            setSubmitLoading(false);
          }
        }}
      />

      <ConfirmModal
        open={Boolean(deletingRow)}
        title='Xoá job'
        message={`Bạn có chắc muốn xoá "${deletingRow?.title ?? ''}"?`}
        loading={deleteLoading}
        onCancel={() => setDeletingRow(null)}
        onConfirm={async () => {
          if (!deletingRow) return;
          const token = getAccessToken();
          if (!token) return;

          setDeleteLoading(true);
          try {
            await deleteJob(token, deletingRow.id);
            await loadData();
            setDeletingRow(null);
          } catch (error) {
            setErrorMessage(error instanceof Error ? error.message : 'Xoá job thất bại');
          } finally {
            setDeleteLoading(false);
          }
        }}
      />
    </div>
  );
}
