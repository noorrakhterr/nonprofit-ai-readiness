import type { Question } from '../data/assessment'

interface QuestionStepProps {
  question: Question
  value: string | string[] | undefined
  onChange: (value: string | string[]) => void
}

export default function QuestionStep({ question, value, onChange }: QuestionStepProps) {
  const isMulti = question.type === 'multi'
  const selected = isMulti ? (Array.isArray(value) ? value : []) : value

  function toggleMulti(label: string) {
    const current = Array.isArray(value) ? value : []
    const next = current.includes(label) ? current.filter((v) => v !== label) : [...current, label]
    onChange(next)
  }

  return (
    <div>
      <h2 className="font-serif text-2xl font-semibold leading-snug text-navy-900">
        {question.number}. {question.prompt}
      </h2>
      {question.helperText && <p className="mt-3 text-sm text-slate-500">{question.helperText}</p>}

      <div className="mt-6 flex flex-col gap-1">
        {question.options.map((option) => {
          const isSelected = isMulti
            ? (selected as string[]).includes(option.label)
            : selected === option.label

          return (
            <label
              key={option.label}
              className="flex cursor-pointer items-center gap-4 rounded-lg px-2 py-3 text-base text-navy-900 transition-colors hover:bg-brand-100/40"
            >
              <input
                type={isMulti ? 'checkbox' : 'radio'}
                name={question.id}
                checked={isSelected}
                onChange={() => (isMulti ? toggleMulti(option.label) : onChange(option.label))}
                className="sr-only"
              />
              <span
                className={`flex h-6 w-6 flex-none items-center justify-center rounded-full border-[1.5px] transition-colors ${
                  isSelected ? 'border-brand-500 bg-brand-500' : 'border-slate-300 bg-white'
                }`}
                aria-hidden="true"
              >
                {isSelected && (
                  <svg width="13" height="10" viewBox="0 0 13 10" fill="none">
                    <path
                      d="M1.5 5 5 8.5 11.5 1.5"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </span>
              <span>{option.label}</span>
            </label>
          )
        })}
      </div>
    </div>
  )
}
