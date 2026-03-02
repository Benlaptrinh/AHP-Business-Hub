'use client';

import { useEffect, useState } from 'react';

type Option = {
  label: string;
  value: string;
};

export type FormField = {
  name: string;
  label: string;
  type: 'text' | 'number' | 'email' | 'date' | 'select';
  required?: boolean;
  options?: Option[];
};

export default function FormModal({
  open,
  title,
  fields,
  initialValues,
  loading,
  onClose,
  onSubmit,
}: {
  open: boolean;
  title: string;
  fields: FormField[];
  initialValues: Record<string, string | number>;
  loading?: boolean;
  onClose: () => void;
  onSubmit: (values: Record<string, string>) => Promise<void> | void;
}) {
  const [values, setValues] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!open) return;

    const nextValues: Record<string, string> = {};
    fields.forEach((field) => {
      const raw = initialValues[field.name];
      nextValues[field.name] = raw === undefined || raw === null ? '' : String(raw);
    });

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setValues(nextValues);
  }, [open, fields, initialValues]);

  if (!open) return null;

  return (
    <div className='fixed inset-0 z-[120] grid place-items-center bg-black/45 px-4' onClick={onClose}>
      <div
        className='w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl'
        onClick={(event) => event.stopPropagation()}
      >
        <h3 className='text-lg font-bold text-slate-900'>{title}</h3>

        <form
          className='mt-4 space-y-4'
          onSubmit={async (event) => {
            event.preventDefault();
            await onSubmit(values);
          }}
        >
          {fields.map((field) => (
            <label key={field.name} className='block'>
              <span className='mb-1.5 block text-sm font-medium text-slate-700'>{field.label}</span>

              {field.type === 'select' ? (
                <select
                  value={values[field.name] ?? ''}
                  onChange={(event) =>
                    setValues((prev) => ({
                      ...prev,
                      [field.name]: event.target.value,
                    }))
                  }
                  className='h-11 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none ring-orange-300 focus:ring'
                  required={field.required}
                >
                  <option value=''>Chọn...</option>
                  {field.options?.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  value={values[field.name] ?? ''}
                  onChange={(event) =>
                    setValues((prev) => ({
                      ...prev,
                      [field.name]: event.target.value,
                    }))
                  }
                  className='h-11 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none ring-orange-300 focus:ring'
                  required={field.required}
                />
              )}
            </label>
          ))}

          <div className='flex justify-end gap-2 pt-2'>
            <button
              type='button'
              onClick={onClose}
              className='rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50'
            >
              Huỷ
            </button>
            <button
              type='submit'
              disabled={loading}
              className='rounded-lg bg-[#001F3F] px-4 py-2 text-sm font-semibold text-white hover:bg-[#001633] disabled:opacity-60'
            >
              {loading ? 'Đang lưu...' : 'Lưu'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
