import { Pencil, Trash2 } from 'lucide-react';
import { type ReactNode } from 'react';

type Column<T> = {
  header: string;
  render: (item: T) => ReactNode;
  className?: string;
};

export default function AdminTable<T>({
  rows,
  columns,
  getRowKey,
  onEdit,
  onDelete,
  deletingId,
  loading,
  emptyMessage,
}: {
  rows: T[];
  columns: Column<T>[];
  getRowKey: (row: T) => string;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  deletingId?: string | null;
  loading?: boolean;
  emptyMessage?: string;
}) {
  const colSpan = columns.length + 1;

  return (
    <div className='overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>
      <div className='overflow-x-auto'>
        <table className='min-w-full text-left'>
          <thead className='bg-slate-50 text-xs uppercase tracking-wide text-slate-500'>
            <tr>
              {columns.map((column, index) => (
                <th key={index} className='px-4 py-3 font-semibold'>
                  {column.header}
                </th>
              ))}
              <th className='px-4 py-3 font-semibold'>Actions</th>
            </tr>
          </thead>

          <tbody className='divide-y divide-slate-100 text-sm'>
            {loading ? (
              <tr>
                <td colSpan={colSpan} className='px-4 py-8 text-center text-sm text-slate-500'>
                  Đang tải dữ liệu...
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={colSpan} className='px-4 py-8 text-center text-sm text-slate-500'>
                  {emptyMessage ?? 'Chưa có dữ liệu'}
                </td>
              </tr>
            ) : (
              rows.map((row) => {
              const rowId = getRowKey(row);
              return (
                <tr key={rowId} className='hover:bg-slate-50/70'>
                  {columns.map((column, colIndex) => (
                    <td key={colIndex} className={['px-4 py-3 text-slate-700', column.className].join(' ')}>
                      {column.render(row)}
                    </td>
                  ))}
                  <td className='px-4 py-3'>
                    <div className='flex items-center gap-2'>
                      <button
                        type='button'
                        onClick={() => onEdit?.(row)}
                        disabled={!onEdit}
                        className='inline-flex items-center gap-1 rounded-md border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50'
                      >
                        <Pencil className='h-3.5 w-3.5' />
                        Edit
                      </button>
                      <button
                        type='button'
                        onClick={() => onDelete?.(row)}
                        disabled={!onDelete || deletingId === rowId}
                        className='inline-flex items-center gap-1 rounded-md border border-rose-200 px-2.5 py-1.5 text-xs font-medium text-rose-600 hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-50'
                      >
                        <Trash2 className='h-3.5 w-3.5' />
                        {deletingId === rowId ? 'Deleting...' : 'Delete'}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
