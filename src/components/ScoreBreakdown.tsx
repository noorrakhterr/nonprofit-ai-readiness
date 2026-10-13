import { QUESTIONS } from '../data/assessment'
import type { QuestionScore } from '../lib/scoring'

// Status palette (fixed, reserved meaning — never themed) mapped onto the 1-4
// per-question score, since each question literally reports a readiness state.
const STATUS_BY_SCORE: Record<number, { hex: string; label: string }> = {
  4: { hex: '#0ca30c', label: 'Strong' },
  3: { hex: '#fab219', label: 'Fair' },
  2: { hex: '#ec835a', label: 'Weak' },
  1: { hex: '#d03b3b', label: 'Needs attention' },
}

const TRACK_COLOR = '#e1e0d9'
const MUTED_INK = '#52514e'
const PRIMARY_INK = '#0b0b0b'

function questionTopic(questionId: string): string {
  const topics: Record<string, string> = {
    q1: 'Familiarity with AI agents',
    q2: 'AI tools in use',
    q3: 'Visibility into tools and data',
    q4: 'How tools sign in',
    q5: 'What limits a tool’s actions',
    q6: 'Setup, review, and removal',
    q7: 'Written guidelines',
    q8: 'Potential blast radius',
  }
  return topics[questionId] ?? questionId
}

interface ScoreBreakdownProps {
  perQuestion: QuestionScore[]
}

export default function ScoreBreakdown({ perQuestion }: ScoreBreakdownProps) {
  const minScore = Math.min(...perQuestion.map((q) => q.score))

  return (
    <div className="rounded-xl border border-slate-200 bg-[#fcfcfb] p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-medium" style={{ color: PRIMARY_INK }}>
          Where you stand, question by question
        </h3>
        <div className="flex flex-wrap gap-3 text-xs" style={{ color: MUTED_INK }}>
          {([4, 3, 2, 1] as const).map((score) => (
            <span key={score} className="inline-flex items-center gap-1.5">
              <span
                className="inline-block h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: STATUS_BY_SCORE[score].hex }}
                aria-hidden="true"
              />
              {STATUS_BY_SCORE[score].label}
            </span>
          ))}
        </div>
      </div>

      <ul className="mt-4 flex flex-col gap-3">
        {perQuestion.map((q) => {
          const status = STATUS_BY_SCORE[q.score] ?? STATUS_BY_SCORE[1]
          const isOpportunity = q.score === minScore
          const question = QUESTIONS.find((item) => item.id === q.questionId)

          return (
            <li key={q.questionId}>
              <div className="flex items-baseline justify-between gap-2 text-sm">
                <span style={{ color: PRIMARY_INK }}>
                  Q{q.questionNumber}. {questionTopic(q.questionId)}
                </span>
                {isOpportunity && (
                  <span className="inline-flex items-center gap-1 text-xs font-medium" style={{ color: PRIMARY_INK }}>
                    <span aria-hidden="true" style={{ color: STATUS_BY_SCORE[1].hex }}>
                      &#9650;
                    </span>
                    Biggest opportunity
                  </span>
                )}
              </div>
              <div className="mt-1 flex items-center gap-3">
                <div
                  className="h-2.5 flex-1 overflow-hidden rounded-full"
                  style={{ backgroundColor: TRACK_COLOR }}
                  role="img"
                  aria-label={`${question?.prompt ?? ''}: scored ${q.score} of 4, ${status.label}`}
                >
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${(q.score / 4) * 100}%`, backgroundColor: status.hex }}
                  />
                </div>
                <span className="w-10 flex-none text-right text-xs tabular-nums" style={{ color: MUTED_INK }}>
                  {q.score}/4
                </span>
              </div>
            </li>
          )
        })}
      </ul>

      <table className="sr-only">
        <caption>Per-question score breakdown</caption>
        <thead>
          <tr>
            <th scope="col">Question</th>
            <th scope="col">Score</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {perQuestion.map((q) => (
            <tr key={q.questionId}>
              <td>
                Q{q.questionNumber}. {questionTopic(q.questionId)}
              </td>
              <td>{q.score} of 4</td>
              <td>{(STATUS_BY_SCORE[q.score] ?? STATUS_BY_SCORE[1]).label}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
