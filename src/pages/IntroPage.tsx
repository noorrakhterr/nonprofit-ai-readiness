import { useNavigate } from 'react-router-dom'

export default function IntroPage() {
  const navigate = useNavigate()

  return (
    <div>
      <div className="bg-hero-gradient h-24 sm:h-32" aria-hidden="true" />

      <div className="mx-auto max-w-2xl px-4 pt-12 pb-16">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-500">Okta for Nonprofits</p>
        <h1 className="mt-3 font-serif text-5xl font-semibold leading-tight text-navy-900">
          AI Readiness Check for Nonprofits
        </h1>

        <p className="mt-6 text-lg text-slate-600">
          AI tools can save your team hours on donor outreach, grant writing, and reporting. But AI
          "agents" can also act on their own, using your logins and reaching your donor, volunteer,
          and beneficiary data. This 8-question check shows where your organization stands today and
          where an unprotected agent could cause harm.
        </p>
        <p className="mt-3 text-lg text-slate-600">It takes about 3 minutes, and there are no wrong answers.</p>

        <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          Never submit passwords, API keys, or other credentials in this form.
        </div>

        <button
          type="button"
          onClick={() => navigate('/assessment')}
          className="mt-8 rounded-full bg-brand-500 px-7 py-3.5 font-semibold text-white shadow-sm transition-colors hover:bg-brand-600"
        >
          Start the check
        </button>
      </div>
    </div>
  )
}
