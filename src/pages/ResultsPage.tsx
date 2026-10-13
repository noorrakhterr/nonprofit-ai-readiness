import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import LevelBadge from '../components/LevelBadge'
import ResourceCard from '../components/ResourceCard'
import ScoreBreakdown from '../components/ScoreBreakdown'
import { MAX_SCORE, OKTA_CONTACT_URL, resourcesForLevel } from '../data/assessment'
import type { ScoreResult } from '../lib/scoring'
import type { Respondent } from '../lib/submitResult'

interface ResultsLocationState {
  respondent: Respondent
  result: ScoreResult
}

export default function ResultsPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const state = location.state as ResultsLocationState | null

  if (!state?.result) {
    return <Navigate to="/" replace />
  }

  const { respondent, result } = state
  const { level, total, perQuestion } = result
  const resources = resourcesForLevel(level)

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <p className="text-sm text-slate-500">
        Results for {respondent.name} · {respondent.organization}
      </p>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <LevelBadge levelId={level.id} name={level.name} />
        <span className="text-sm text-slate-500">
          Score: {total} / {MAX_SCORE}
        </span>
      </div>

      <h1 className="mt-4 text-2xl font-semibold text-slate-900">{level.mainMessage}</h1>
      <p className="mt-2 text-slate-600">{level.whoThisIs}</p>

      <div className="mt-8">
        <ScoreBreakdown perQuestion={perQuestion} />
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold text-slate-900">Resources for you</h2>
        <div className="mt-3 flex flex-col gap-3">
          {resources.map((resource, i) => (
            <ResourceCard key={resource.id} resource={resource} index={i} />
          ))}
        </div>
      </div>

      <div className="mt-8 rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="font-semibold text-slate-900">Suggested next steps</h2>
        <ul className="mt-3 flex flex-col gap-2 text-sm text-slate-600">
          {level.nextSteps.map((step) => (
            <li key={step} className="flex gap-2">
              <span className="text-indigo-500">•</span>
              {step}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 rounded-xl bg-indigo-600 p-6 text-white">
        <h2 className="font-semibold">How Okta can help</h2>
        <p className="mt-2 text-sm text-indigo-100">{level.oktaFollowUp}</p>
        <a
          href={OKTA_CONTACT_URL}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-indigo-700 transition-colors hover:bg-indigo-50"
        >
          Talk to the Okta team
        </a>
      </div>

      <button
        type="button"
        onClick={() => navigate('/')}
        className="mt-6 text-sm font-medium text-slate-500 hover:text-slate-700"
      >
        ← Back to start
      </button>
    </div>
  )
}
