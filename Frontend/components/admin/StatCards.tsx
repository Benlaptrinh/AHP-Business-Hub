import { ArrowDownRight, ArrowUpRight, Minus } from 'lucide-react';

type Tone = 'up' | 'down' | 'neutral';

export type StatCardItem = {
  label: string;
  value: string;
  trend?: string;
  tone?: Tone;
};

function TrendIcon({ tone = 'neutral' }: { tone?: Tone }) {
  if (tone === 'up') return <ArrowUpRight className='h-4 w-4 text-emerald-600' />;
  if (tone === 'down') return <ArrowDownRight className='h-4 w-4 text-rose-600' />;
  return <Minus className='h-4 w-4 text-slate-400' />;
}

export default function StatCards({ items }: { items: StatCardItem[] }) {
  return (
    <div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
      {items.map((item) => (
        <article key={item.label} className='rounded-2xl border border-slate-200 bg-white p-5 shadow-sm'>
          <p className='text-sm font-medium text-slate-500'>{item.label}</p>
          <p className='mt-2 text-3xl font-bold text-slate-900'>{item.value}</p>
          {item.trend ? (
            <p className='mt-2 inline-flex items-center gap-1 text-xs font-semibold text-slate-600'>
              <TrendIcon tone={item.tone} />
              <span>{item.trend}</span>
            </p>
          ) : null}
        </article>
      ))}
    </div>
  );
}
