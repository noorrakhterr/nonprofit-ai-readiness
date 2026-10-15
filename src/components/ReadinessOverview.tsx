import type { CategoryBreakdown, OverviewResult } from '../lib/categories'

const STATUS_STYLES: Record<CategoryBreakdown['status'], { label: string; text: string; bar: string }> = {
  good: { label: 'Good', text: 'text-emerald-600', bar: 'bg-emerald-500' },
  fair: { label: 'Fair', text: 'text-amber-600', bar: 'bg-amber-500' },
  needsAttention: { label: 'Needs attention', text: 'text-rose-600', bar: 'bg-rose-500' },
}

interface ReadinessOverviewProps {
  overview: OverviewResult
}

export default function ReadinessOverview({ overview }: ReadinessOverviewProps) {
  const { categories, biggestOpportunity } = overview

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Readiness overview</h2>
        <div className="mt-3 flex flex-col gap-4">
          {categories.map((category) => {
            const style = STATUS_STYLES[category.status]
            return (
              <div key={category.id}>
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-sm font-medium text-navy-900">{category.label}</span>
                  <span className={`text-xs font-semibold ${style.text}`}>
                    {style.label} · {category.percent}%
                  </span>
                </div>
                <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full ${style.bar}`}
                    style={{ width: `${category.percent}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="flex gap-3">
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#e11d48"
          strokeWidth="1.5"
          className="mt-0.5 flex-none"
          aria-hidden="true"
        >
          <path
            d="M12 3.5 2.5 20h19L12 3.5Z"
            strokeLinejoin="round"
          />
          <path d="M12 10v4" strokeLinecap="round" />
          <path d="M12 17h.01" strokeLinecap="round" />
        </svg>
        <div>
          <h3 className="font-serif text-lg font-semibold text-navy-900">
            Biggest opportunity: {biggestOpportunity.label}
          </h3>
          <p className="mt-1 text-sm text-slate-600">
            {biggestOpportunity.description} Start with{' '}
            <span className="font-medium text-navy-900">{biggestOpportunity.weakestQuestionTopic}</span>.
          </p>
        </div>
      </div>
    </div>
  )
}
