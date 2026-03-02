'use client';

export default function ConfirmModal({
  open,
  title,
  message,
  loading,
  onCancel,
  onConfirm,
}: {
  open: boolean;
  title: string;
  message: string;
  loading?: boolean;
  onCancel: () => void;
  onConfirm: () => Promise<void> | void;
}) {
  if (!open) return null;

  return (
    <div className='fixed inset-0 z-[120] grid place-items-center bg-black/45 px-4' onClick={onCancel}>
      <div
        className='w-full max-w-md rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl'
        onClick={(event) => event.stopPropagation()}
      >
        <h3 className='text-lg font-bold text-slate-900'>{title}</h3>
        <p className='mt-2 text-sm text-slate-600'>{message}</p>

        <div className='mt-5 flex justify-end gap-2'>
          <button
            type='button'
            onClick={onCancel}
            className='rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50'
          >
            Huỷ
          </button>
          <button
            type='button'
            onClick={() => void onConfirm()}
            disabled={loading}
            className='rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-700 disabled:opacity-60'
          >
            {loading ? 'Đang xoá...' : 'Xoá'}
          </button>
        </div>
      </div>
    </div>
  );
}
