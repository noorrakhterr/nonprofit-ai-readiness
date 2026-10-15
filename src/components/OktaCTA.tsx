import { OKTA_CONTACT_SALES_URL, OKTA_SUCCESS_HUB_URL } from '../data/assessment'

export default function OktaCTA() {
  return (
    <div className="rounded-2xl bg-brand-500 p-6 text-white sm:p-8">
      <h2 className="font-serif text-xl font-semibold">How Okta can help</h2>

      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col">
          <p className="text-sm font-medium text-brand-100">New customer?</p>
          <a
            href={OKTA_CONTACT_SALES_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-3 rounded-lg bg-white px-5 py-3 text-center text-sm font-semibold text-brand-600 transition-colors hover:bg-brand-100"
          >
            Contact our team
          </a>
        </div>
        <div className="flex flex-col">
          <p className="text-sm font-medium text-brand-100">Already partnered with us?</p>
          <a
            href={OKTA_SUCCESS_HUB_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-3 rounded-lg border border-white/40 px-5 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            Contact your account team
          </a>
        </div>
      </div>
    </div>
  )
}
