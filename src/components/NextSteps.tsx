interface NextStepsProps {
  icon: string
  levelName: string
  steps: string[]
}

export default function NextSteps({ icon, levelName, steps }: NextStepsProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <h2 className="font-serif text-2xl font-semibold text-navy-900">
        <span aria-hidden="true">{icon}</span> {levelName}
      </h2>
      <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-slate-500">Suggested next steps</p>
      <ol className="mt-5 flex flex-col gap-4">
        {steps.map((step, i) => (
          <li key={step} className="flex items-start gap-4">
            <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-brand-100 text-base font-bold text-brand-600">
              {i + 1}
            </span>
            <span className="pt-1 text-lg text-navy-900">{step}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}
