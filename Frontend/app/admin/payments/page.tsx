'use client';

import { RotateCcw } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import AdminTable from '@/components/admin/AdminTable';
import ConfirmModal from '@/components/admin/ConfirmModal';
import FormModal, { type FormField } from '@/components/admin/FormModal';
import PageHeader from '@/components/admin/PageHeader';
import StatCards from '@/components/admin/StatCards';
import type { CreatePaymentPayload, PaymentRecord, PaymentStats } from '@/lib/api-client';
import {
  createPayment,
  deletePayment,
  fetchPaymentStats,
  fetchPayments,
  updatePayment,
} from '@/lib/api-client';
import { getAccessToken } from '@/lib/session';

type PaymentRow = {
  id: string;
  invoiceId: string;
  customer: string;
  ownerEmail: string;
  method: string;
  amount: number;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
  updatedAt: string;
};

const PAYMENT_FIELDS: FormField[] = [
  { name: 'invoiceId', label: 'Invoice ID', type: 'text', required: true },
  { name: 'customer', label: 'Customer', type: 'text', required: true },
  { name: 'ownerEmail', label: 'Owner Email', type: 'email', required: true },
  { name: 'method', label: 'Method', type: 'text', required: true },
  { name: 'amount', label: 'Amount (VND)', type: 'number', required: true },
  { name: 'dueDate', label: 'Due Date', type: 'date', required: true },
  {
    name: 'status',
    label: 'Status',
    type: 'select',
    required: true,
    options: [
      { label: 'Paid', value: 'paid' },
      { label: 'Pending', value: 'pending' },
      { label: 'Overdue', value: 'overdue' },
    ],
  },
];

function toCurrencyVnd(value: number) {
  return `${Math.round(value).toLocaleString('vi-VN')}đ`;
}

function statusBadge(status: PaymentRow['status']) {
  if (status === 'paid') {
    return <span className='rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700'>Paid</span>;
  }
  if (status === 'pending') {
    return <span className='rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-700'>Pending</span>;
  }
  return <span className='rounded-full bg-rose-100 px-2.5 py-1 text-xs font-semibold text-rose-700'>Overdue</span>;
}

function toPayload(values: Record<string, string>): CreatePaymentPayload {
  return {
    invoiceId: values.invoiceId,
    customer: values.customer,
    ownerEmail: values.ownerEmail,
    method: values.method,
    amount: Number(values.amount),
    dueDate: values.dueDate,
    status: values.status as CreatePaymentPayload['status'],
  };
}

export default function AdminPaymentsPage() {
  const [rows, setRows] = useState<PaymentRow[]>([]);
  const [stats, setStats] = useState<PaymentStats | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loadingData, setLoadingData] = useState(false);

  const [formOpen, setFormOpen] = useState(false);
  const [editingRow, setEditingRow] = useState<PaymentRow | null>(null);
  const [submitLoading, setSubmitLoading] = useState(false);

  const [deletingRow, setDeletingRow] = useState<PaymentRow | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const loadData = useCallback(async () => {
    const token = getAccessToken();
    if (!token) return;

    setLoadingData(true);
    setErrorMessage(null);

    try {
      const [payments, paymentStats] = await Promise.all([fetchPayments(token), fetchPaymentStats(token)]);

      setRows(
        payments.map((item: PaymentRecord) => ({
          id: item.id,
          invoiceId: item.invoiceId,
          customer: item.customer,
          ownerEmail: item.ownerEmail,
          method: item.method,
          amount: item.amount,
          dueDate: item.dueDate,
          status: item.status,
          updatedAt: item.updatedAt,
        })),
      );
      setStats(paymentStats);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Không thể tải payments');
    } finally {
      setLoadingData(false);
    }
  }, []);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  const statCards = useMemo(
    () => [
      {
        label: 'Paid',
        value: stats ? toCurrencyVnd(stats.paid) : '--',
        trend: 'From API',
        tone: 'up' as const,
      },
      {
        label: 'Pending',
        value: stats ? toCurrencyVnd(stats.pending) : '--',
        trend: 'From API',
        tone: 'down' as const,
      },
      {
        label: 'Overdue',
        value: stats ? toCurrencyVnd(stats.overdue) : '--',
        trend: 'From API',
        tone: 'down' as const,
      },
      {
        label: 'Invoices',
        value: String(stats?.totalInvoices ?? '--'),
        trend: 'From API',
        tone: 'up' as const,
      },
    ],
    [stats],
  );

  return (
    <div>
      <PageHeader
        title='Payments Management'
        description='Theo dõi hóa đơn, trạng thái thanh toán và công nợ theo khách hàng.'
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
          Tạo Invoice Mới
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
        <AdminTable<PaymentRow>
          rows={rows}
          getRowKey={(row) => row.id}
          onEdit={(row) => {
            setEditingRow(row);
            setFormOpen(true);
          }}
          onDelete={(row) => setDeletingRow(row)}
          deletingId={deleteLoading ? deletingRow?.id ?? null : null}
          loading={loadingData}
          emptyMessage='Chưa có invoice nào.'
          columns={[
            { header: 'Invoice', render: (item) => <span className='font-semibold text-slate-900'>{item.invoiceId}</span> },
            { header: 'Customer', render: (item) => item.customer },
            { header: 'Method', render: (item) => item.method },
            { header: 'Amount', render: (item) => <span className='font-semibold'>{toCurrencyVnd(item.amount)}</span> },
            { header: 'Due Date', render: (item) => item.dueDate },
            { header: 'Status', render: (item) => statusBadge(item.status) },
          ]}
        />
      </div>

      <FormModal
        open={formOpen}
        title={editingRow ? 'Cập nhật Invoice' : 'Tạo Invoice mới'}
        fields={PAYMENT_FIELDS}
        loading={submitLoading}
        initialValues={
          editingRow ?? {
            invoiceId: '',
            customer: '',
            ownerEmail: '',
            method: '',
            amount: 0,
            dueDate: new Date().toISOString().slice(0, 10),
            status: 'pending',
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
              await updatePayment(token, editingRow.id, payload);
            } else {
              await createPayment(token, payload);
            }
            await loadData();
            setFormOpen(false);
            setEditingRow(null);
          } catch (error) {
            setErrorMessage(error instanceof Error ? error.message : 'Lưu invoice thất bại');
          } finally {
            setSubmitLoading(false);
          }
        }}
      />

      <ConfirmModal
        open={Boolean(deletingRow)}
        title='Xoá invoice'
        message={`Bạn có chắc muốn xoá "${deletingRow?.invoiceId ?? ''}"?`}
        loading={deleteLoading}
        onCancel={() => setDeletingRow(null)}
        onConfirm={async () => {
          if (!deletingRow) return;
          const token = getAccessToken();
          if (!token) return;

          setDeleteLoading(true);
          try {
            await deletePayment(token, deletingRow.id);
            await loadData();
            setDeletingRow(null);
          } catch (error) {
            setErrorMessage(error instanceof Error ? error.message : 'Xoá invoice thất bại');
          } finally {
            setDeleteLoading(false);
          }
        }}
      />
    </div>
  );
}
