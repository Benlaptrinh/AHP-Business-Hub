'use client';

import { RotateCcw } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import AdminTable from '@/components/admin/AdminTable';
import ConfirmModal from '@/components/admin/ConfirmModal';
import FormModal, { type FormField } from '@/components/admin/FormModal';
import PageHeader from '@/components/admin/PageHeader';
import StatCards from '@/components/admin/StatCards';
import type { CreateProjectPayload, ProjectRecord, ProjectStats } from '@/lib/api-client';
import {
  createProject,
  deleteProject,
  fetchProjectStats,
  fetchProjects,
  updateProject,
} from '@/lib/api-client';
import { getAccessToken } from '@/lib/session';

type ProjectRow = {
  id: string;
  name: string;
  type: string;
  region: string;
  progress: number;
  status: 'active' | 'pending' | 'closed';
  budget: number;
  updatedAt: string;
};

const PROJECT_FIELDS: FormField[] = [
  { name: 'name', label: 'Project Name', type: 'text', required: true },
  { name: 'type', label: 'Type', type: 'text', required: true },
  { name: 'region', label: 'Region', type: 'text', required: true },
  { name: 'progress', label: 'Progress (%)', type: 'number', required: true },
  {
    name: 'status',
    label: 'Status',
    type: 'select',
    required: true,
    options: [
      { label: 'Active', value: 'active' },
      { label: 'Pending', value: 'pending' },
      { label: 'Closed', value: 'closed' },
    ],
  },
  { name: 'budget', label: 'Budget (VND)', type: 'number', required: true },
];

function statusBadge(status: ProjectRow['status']) {
  if (status === 'active') {
    return <span className='rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700'>Active</span>;
  }
  if (status === 'pending') {
    return <span className='rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-700'>Pending</span>;
  }
  return <span className='rounded-full bg-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-700'>Closed</span>;
}

function toPayload(values: Record<string, string>): CreateProjectPayload {
  return {
    name: values.name,
    type: values.type,
    region: values.region,
    progress: Number(values.progress),
    status: values.status as CreateProjectPayload['status'],
    budget: Number(values.budget),
  };
}

export default function AdminProjectsPage() {
  const [rows, setRows] = useState<ProjectRow[]>([]);
  const [stats, setStats] = useState<ProjectStats | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loadingData, setLoadingData] = useState(false);

  const [formOpen, setFormOpen] = useState(false);
  const [editingRow, setEditingRow] = useState<ProjectRow | null>(null);
  const [submitLoading, setSubmitLoading] = useState(false);

  const [deletingRow, setDeletingRow] = useState<ProjectRow | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const loadData = useCallback(async () => {
    const token = getAccessToken();
    if (!token) return;

    setLoadingData(true);
    setErrorMessage(null);

    try {
      const [projects, projectStats] = await Promise.all([fetchProjects(token), fetchProjectStats(token)]);

      setRows(
        projects.map((item: ProjectRecord) => ({
          id: item.id,
          name: item.name,
          type: item.type,
          region: item.region,
          progress: item.progress,
          status: item.status,
          budget: item.budget,
          updatedAt: item.updatedAt,
        })),
      );
      setStats(projectStats);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Không thể tải projects');
    } finally {
      setLoadingData(false);
    }
  }, []);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  const statCards = useMemo(
    () => [
      { label: 'Active', value: String(stats?.active ?? '--'), trend: 'From API', tone: 'up' as const },
      { label: 'Pending', value: String(stats?.pending ?? '--'), trend: 'From API', tone: 'down' as const },
      { label: 'Closed', value: String(stats?.closed ?? '--'), trend: 'From API', tone: 'up' as const },
      {
        label: 'Avg Progress',
        value: stats ? `${stats.avgProgress}%` : '--',
        trend: 'From API',
        tone: 'neutral' as const,
      },
    ],
    [stats],
  );

  return (
    <div>
      <PageHeader
        title='Projects Management'
        description='Quản lý danh mục dự án: tạo mới, cập nhật tiến độ, phân vùng và trạng thái.'
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
          Tạo Project Mới
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
        <AdminTable<ProjectRow>
          rows={rows}
          getRowKey={(row) => row.id}
          onEdit={(row) => {
            setEditingRow(row);
            setFormOpen(true);
          }}
          onDelete={(row) => setDeletingRow(row)}
          deletingId={deleteLoading ? deletingRow?.id ?? null : null}
          loading={loadingData}
          emptyMessage='Chưa có project nào.'
          columns={[
            { header: 'Project', render: (item) => <span className='font-semibold text-slate-900'>{item.name}</span> },
            { header: 'Type', render: (item) => item.type },
            { header: 'Region', render: (item) => item.region },
            { header: 'Progress', render: (item) => `${item.progress}%` },
            { header: 'Status', render: (item) => statusBadge(item.status) },
            { header: 'Updated', render: (item) => item.updatedAt.slice(0, 10) },
          ]}
        />
      </div>

      <FormModal
        open={formOpen}
        title={editingRow ? 'Cập nhật Project' : 'Tạo Project mới'}
        fields={PROJECT_FIELDS}
        loading={submitLoading}
        initialValues={
          editingRow ?? {
            name: '',
            type: '',
            region: '',
            progress: 0,
            status: 'active',
            budget: 0,
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
              await updateProject(token, editingRow.id, payload);
            } else {
              await createProject(token, payload);
            }
            await loadData();
            setFormOpen(false);
            setEditingRow(null);
          } catch (error) {
            setErrorMessage(error instanceof Error ? error.message : 'Lưu project thất bại');
          } finally {
            setSubmitLoading(false);
          }
        }}
      />

      <ConfirmModal
        open={Boolean(deletingRow)}
        title='Xoá project'
        message={`Bạn có chắc muốn xoá "${deletingRow?.name ?? ''}"?`}
        loading={deleteLoading}
        onCancel={() => setDeletingRow(null)}
        onConfirm={async () => {
          if (!deletingRow) return;
          const token = getAccessToken();
          if (!token) return;

          setDeleteLoading(true);
          try {
            await deleteProject(token, deletingRow.id);
            await loadData();
            setDeletingRow(null);
          } catch (error) {
            setErrorMessage(error instanceof Error ? error.message : 'Xoá project thất bại');
          } finally {
            setDeleteLoading(false);
          }
        }}
      />
    </div>
  );
}
