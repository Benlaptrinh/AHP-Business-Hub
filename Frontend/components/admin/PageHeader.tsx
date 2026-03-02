import { Plus } from 'lucide-react';

type Action = {
  label: string;
  variant?: 'primary' | 'outline';
};

export default function PageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description: string;
  actions?: Action[];
}) {
  return (
    <section className='mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between'>
      <div>
        <h1 className='text-2xl font-bold text-slate-900 sm:text-3xl'>{title}</h1>
        <p className='mt-1 text-sm text-slate-500'>{description}</p>
      </div>

      {actions?.length ? (
        <div className='flex flex-wrap items-center gap-2'>
          {actions.map((action) => (
            <button
              key={action.label}
              type='button'
              className={[
                'inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors',
                action.variant === 'outline'
                  ? 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                  : 'bg-[#FF6B35] text-white hover:bg-[#e85b29]',
              ].join(' ')}
            >
              <Plus className='h-4 w-4' />
              <span>{action.label}</span>
            </button>
          ))}
        </div>
      ) : null}
    </section>
  );
}
