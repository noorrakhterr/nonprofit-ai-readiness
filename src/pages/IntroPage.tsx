import { useNavigate } from 'react-router-dom'

export default function IntroPage() {
  const navigate = useNavigate()

  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <p className="text-sm font-medium uppercase tracking-wide text-indigo-600">Okta for Nonprofits</p>
      <h1 className="mt-2 text-3xl font-semibold text-slate-900">AI Readiness Check for Nonprofits</h1>

      <p className="mt-5 text-slate-600">
        AI tools can save your team hours on donor outreach, grant writing, and reporting. But AI
        "agents" can also act on their own, using your logins and reaching your donor, volunteer,
        and beneficiary data. This 8-question check shows where your organization stands today and
        where an unprotected agent could cause harm.
      </p>
      <p className="mt-3 text-slate-600">It takes about 3 minutes, and there are no wrong answers.</p>

      <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
        Never submit passwords, API keys, or other credentials in this form.
      </div>

      <button
        type="button"
        onClick={() => navigate('/assessment')}
        className="mt-8 rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white transition-colors hover:bg-indigo-700"
      >
        Start the check
      </button>
    </div>
  )
}
