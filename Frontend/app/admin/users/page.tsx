'use client';

import { RotateCcw } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import AdminTable from '@/components/admin/AdminTable';
import ConfirmModal from '@/components/admin/ConfirmModal';
import FormModal, { type FormField } from '@/components/admin/FormModal';
import PageHeader from '@/components/admin/PageHeader';
import StatCards from '@/components/admin/StatCards';
import type { CreateUserPayload, UserRecord, UserStats } from '@/lib/api-client';
import { createUser, deleteUser, fetchUserStats, fetchUsers, updateUser } from '@/lib/api-client';
import { getAccessToken } from '@/lib/session';

type UserRow = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  status: 'active' | 'suspended';
  phone: string;
  updatedAt: string;
};

const USER_FIELDS: FormField[] = [
  { name: 'name', label: 'Name', type: 'text', required: true },
  { name: 'email', label: 'Email', type: 'email', required: true },
  {
    name: 'role',
    label: 'Role',
    type: 'select',
    required: true,
    options: [
      { label: 'Admin', value: 'admin' },
      { label: 'User', value: 'user' },
    ],
  },
  {
    name: 'status',
    label: 'Status',
    type: 'select',
    required: true,
    options: [
      { label: 'Active', value: 'active' },
      { label: 'Suspended', value: 'suspended' },
    ],
  },
  { name: 'phone', label: 'Phone', type: 'text', required: true },
];

function roleBadge(role: UserRow['role']) {
  if (role === 'admin') {
    return <span className='rounded-full bg-[#001F3F] px-2.5 py-1 text-xs font-semibold text-white'>Admin</span>;
  }

  return <span className='rounded-full bg-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-700'>User</span>;
}

function statusBadge(status: UserRow['status']) {
  if (status === 'active') {
    return <span className='rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700'>Active</span>;
  }
  return <span className='rounded-full bg-rose-100 px-2.5 py-1 text-xs font-semibold text-rose-700'>Suspended</span>;
}

function toPayload(values: Record<string, string>): CreateUserPayload {
  return {
    name: values.name,
    email: values.email,
    role: values.role as CreateUserPayload['role'],
    status: values.status as CreateUserPayload['status'],
    phone: values.phone,
  };
}

export default function AdminUsersPage() {
  const [rows, setRows] = useState<UserRow[]>([]);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loadingData, setLoadingData] = useState(false);

  const [formOpen, setFormOpen] = useState(false);
  const [editingRow, setEditingRow] = useState<UserRow | null>(null);
  const [submitLoading, setSubmitLoading] = useState(false);

  const [deletingRow, setDeletingRow] = useState<UserRow | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const loadData = useCallback(async () => {
    const token = getAccessToken();
    if (!token) return;

    setLoadingData(true);
    setErrorMessage(null);

    try {
      const [users, userStats] = await Promise.all([fetchUsers(token), fetchUserStats(token)]);

      setRows(
        users.map((item: UserRecord) => ({
          id: item.id,
          name: item.name,
          email: item.email,
          role: item.role,
          status: item.status,
          phone: item.phone,
          updatedAt: item.updatedAt,
        })),
      );
      setStats(userStats);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Không thể tải users');
    } finally {
      setLoadingData(false);
    }
  }, []);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  const statCards = useMemo(
    () => [
      { label: 'Total Users', value: String(stats?.total ?? '--'), trend: 'From API', tone: 'up' as const },
      { label: 'Admins', value: String(stats?.admins ?? '--'), trend: 'From API', tone: 'neutral' as const },
      { label: 'Active', value: String(stats?.active ?? '--'), trend: 'From API', tone: 'up' as const },
      {
        label: 'Suspended',
        value: String(stats?.suspended ?? '--'),
        trend: 'From API',
        tone: 'down' as const,
      },
    ],
    [stats],
  );

  return (
    <div>
      <PageHeader
        title='Users Management'
        description='Quản lý người dùng, phân quyền admin/user và trạng thái tài khoản.'
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
          Tạo User Mới
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
        <AdminTable<UserRow>
          rows={rows}
          getRowKey={(row) => row.id}
          onEdit={(row) => {
            setEditingRow(row);
            setFormOpen(true);
          }}
          onDelete={(row) => setDeletingRow(row)}
          deletingId={deleteLoading ? deletingRow?.id ?? null : null}
          loading={loadingData}
          emptyMessage='Chưa có user nào.'
          columns={[
            { header: 'Name', render: (item) => <span className='font-semibold text-slate-900'>{item.name}</span> },
            { header: 'Email', render: (item) => item.email },
            { header: 'Role', render: (item) => roleBadge(item.role) },
            { header: 'Status', render: (item) => statusBadge(item.status) },
            { header: 'Last Login', render: (item) => item.updatedAt.slice(0, 16).replace('T', ' ') },
          ]}
        />
      </div>

      <FormModal
        open={formOpen}
        title={editingRow ? 'Cập nhật User' : 'Tạo User mới'}
        fields={USER_FIELDS}
        loading={submitLoading}
        initialValues={
          editingRow ?? {
            name: '',
            email: '',
            role: 'user',
            status: 'active',
            phone: '',
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
              await updateUser(token, editingRow.id, payload);
            } else {
              await createUser(token, payload);
            }
            await loadData();
            setFormOpen(false);
            setEditingRow(null);
          } catch (error) {
            setErrorMessage(error instanceof Error ? error.message : 'Lưu user thất bại');
          } finally {
            setSubmitLoading(false);
          }
        }}
      />

      <ConfirmModal
        open={Boolean(deletingRow)}
        title='Xoá user'
        message={`Bạn có chắc muốn xoá "${deletingRow?.email ?? ''}"?`}
        loading={deleteLoading}
        onCancel={() => setDeletingRow(null)}
        onConfirm={async () => {
          if (!deletingRow) return;
          const token = getAccessToken();
          if (!token) return;

          setDeleteLoading(true);
          try {
            await deleteUser(token, deletingRow.id);
            await loadData();
            setDeletingRow(null);
          } catch (error) {
            setErrorMessage(error instanceof Error ? error.message : 'Xoá user thất bại');
          } finally {
            setDeleteLoading(false);
          }
        }}
      />
    </div>
  );
}
