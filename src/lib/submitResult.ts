import type { Answers, ScoreResult } from './scoring'

export interface Respondent {
  name: string
  organization: string
  email: string
}

// Deployed OAP function base, e.g. https://api.platform.atko.ai/<tenant>/functions/v1
const FUNCTIONS_BASE_URL = import.meta.env.VITE_FUNCTIONS_BASE_URL as string | undefined

// Fires the submission to the backend function for Google Sheet logging. This is
// best-effort: the results page already has everything it needs from the
// client-side score, so a network failure here is logged and otherwise ignored —
// it must never block or error the respondent's view of their results.
export async function submitResult(respondent: Respondent, answers: Answers, result: ScoreResult): Promise<void> {
  if (!FUNCTIONS_BASE_URL) {
    console.warn('VITE_FUNCTIONS_BASE_URL is not configured; skipping result submission.')
    return
  }

  try {
    const response = await fetch(`${FUNCTIONS_BASE_URL}/submit-assessment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: respondent.name,
        organization: respondent.organization,
        email: respondent.email,
        answers,
        total: result.total,
        levelId: result.level.id,
        levelName: result.level.name,
        submittedAt: new Date().toISOString(),
      }),
    })

    if (!response.ok) {
      console.error('submit-assessment responded with', response.status)
    }
  } catch (error) {
    console.error('Failed to submit assessment result', error)
  }
}
