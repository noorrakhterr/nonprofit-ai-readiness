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
      <h2 className="text-xl font-semibold text-slate-900">
        {question.number}. {question.prompt}
      </h2>
      {question.helperText && <p className="mt-2 text-sm text-slate-500">{question.helperText}</p>}

      <div className="mt-5 flex flex-col gap-2">
        {question.options.map((option) => {
          const isSelected = isMulti
            ? (selected as string[]).includes(option.label)
            : selected === option.label

          return (
            <label
              key={option.label}
              className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 text-sm transition-colors ${
                isSelected
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-900'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
              }`}
            >
              <input
                type={isMulti ? 'checkbox' : 'radio'}
                name={question.id}
                checked={isSelected}
                onChange={() => (isMulti ? toggleMulti(option.label) : onChange(option.label))}
                className="mt-0.5 h-4 w-4 accent-indigo-600"
              />
              <span>{option.label}</span>
            </label>
          )
        })}
      </div>
    </div>
  )
}
