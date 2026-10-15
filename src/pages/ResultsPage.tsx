import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import NextSteps from '../components/NextSteps'
import OktaCTA from '../components/OktaCTA'
import ReadinessOverview from '../components/ReadinessOverview'
import ResourceCard from '../components/ResourceCard'
import ScoreRing from '../components/ScoreRing'
import { MAX_SCORE, resourcesForLevel } from '../data/assessment'
import { categoryBreakdown } from '../lib/categories'
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
  const overview = categoryBreakdown(perQuestion)
  const percent = Math.round((total / MAX_SCORE) * 100)

  return (
    <div>
      <div className="bg-hero-gradient h-20 sm:h-24" aria-hidden="true" />

      <div className="mx-auto max-w-3xl px-4 pt-10 pb-10">
        <p className="text-sm text-slate-500">
          Results for {respondent.name} · {respondent.organization}
        </p>

        {/* Hero: level emphasis */}
        <div className="mt-4 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-[auto_1fr]">
            <div className="flex flex-col items-center justify-center">
              <ScoreRing percent={percent} levelId={level.id} levelName={level.name} />
              <span className="mt-2 text-sm text-slate-500">
                Score: {total} / {MAX_SCORE}
              </span>
            </div>

            <div className="flex flex-col justify-center">
              <h1 className="font-serif text-2xl font-semibold leading-snug text-navy-900">
                {level.mainMessage}
              </h1>
              <p className="mt-2 text-slate-600">{level.whoThisIs}</p>
            </div>
          </div>

          <div className="mt-8 border-t border-slate-100 pt-6">
            <ReadinessOverview overview={overview} />
          </div>
        </div>

        {/* Suggested next steps, emphasized and near the top */}
        <div className="mt-6">
          <NextSteps icon={level.icon} levelName={level.name} steps={level.nextSteps} />
        </div>

        {/* Okta CTA, directly below next steps */}
        <div className="mt-6">
          <OktaCTA />
        </div>

        {/* Resources, last */}
        <div className="mt-8">
          <h2 className="font-serif text-lg font-semibold text-navy-900">Resources for you</h2>
          <div className="mt-3 flex flex-col gap-3">
            {resources.map((resource, i) => (
              <ResourceCard key={resource.id} resource={resource} index={i} />
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => navigate('/')}
          className="mt-6 text-sm font-medium text-slate-500 hover:text-slate-700"
        >
          ← Back to start
        </button>
      </div>
    </div>
  )
}
