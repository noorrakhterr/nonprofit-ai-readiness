import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProgressBar from '../components/ProgressBar'
import QuestionStep from '../components/QuestionStep'
import { QUESTIONS } from '../data/assessment'
import { computeScore, isComplete, type Answers } from '../lib/scoring'
import { submitResult, type Respondent } from '../lib/submitResult'

const TOTAL_STEPS = QUESTIONS.length + 1 // +1 for the respondent-info step

export default function FormPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [respondent, setRespondent] = useState<Respondent>({ name: '', organization: '', email: '' })
  const [answers, setAnswers] = useState<Answers>({})
  const [submitting, setSubmitting] = useState(false)

  const isInfoStep = step === 0
  const question = isInfoStep ? undefined : QUESTIONS[step - 1]

  const infoComplete = respondent.name.trim() && respondent.organization.trim() && respondent.email.trim()
  const canAdvance = isInfoStep ? Boolean(infoComplete) : question !== undefined && hasAnswer(answers[question.id])

  function hasAnswer(value: string | string[] | undefined) {
    if (Array.isArray(value)) return value.length > 0
    return typeof value === 'string' && value.length > 0
  }

  async function handleNext() {
    if (step < TOTAL_STEPS - 1) {
      setStep(step + 1)
      return
    }

    if (!isComplete(answers)) return

    setSubmitting(true)
    const result = computeScore(answers)
    void submitResult(respondent, answers, result)
    navigate('/results', { state: { respondent, result } })
  }

  function handleBack() {
    setStep(Math.max(0, step - 1))
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <ProgressBar current={step + 1} total={TOTAL_STEPS} />

      <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        {isInfoStep ? (
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Let's start with the basics</h2>
            <p className="mt-2 text-sm text-slate-500">
              We'll use this to send your results and the resources that fit your level. An Okta team
              member may also reach out about securing your AI agents.
            </p>

            <div className="mt-5 flex flex-col gap-4">
              <Field
                label="Your name"
                value={respondent.name}
                onChange={(v) => setRespondent((r) => ({ ...r, name: v }))}
                autoComplete="name"
              />
              <Field
                label="Organization name"
                value={respondent.organization}
                onChange={(v) => setRespondent((r) => ({ ...r, organization: v }))}
                autoComplete="organization"
              />
              <Field
                label="Work email"
                type="email"
                value={respondent.email}
                onChange={(v) => setRespondent((r) => ({ ...r, email: v }))}
                autoComplete="email"
              />
            </div>
          </div>
        ) : question ? (
          <QuestionStep
            question={question}
            value={answers[question.id]}
            onChange={(value) => setAnswers((a) => ({ ...a, [question.id]: value }))}
          />
        ) : null}
      </div>

      <div className="mt-6 flex justify-between">
        <button
          type="button"
          onClick={handleBack}
          disabled={step === 0}
          className="rounded-lg px-4 py-2 text-sm font-medium text-slate-500 disabled:opacity-0"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleNext}
          disabled={!canAdvance || submitting}
          className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          {step === TOTAL_STEPS - 1 ? 'See my results' : 'Next'}
        </button>
      </div>
    </div>
  )
}

interface FieldProps {
  label: string
  value: string
  onChange: (value: string) => void
  type?: string
  autoComplete?: string
}

function Field({ label, value, onChange, type = 'text', autoComplete }: FieldProps) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <input
        type={type}
        value={value}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
      />
    </label>
  )
}
