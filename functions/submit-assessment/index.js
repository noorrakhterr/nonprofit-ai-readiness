// OAP Function (runtime: node24). Validates an assessment submission and
// appends it as a row to the team's Google Sheet via a service account.
// Secrets (never shipped to the client): GOOGLE_SA_EMAIL, GOOGLE_SA_PRIVATE_KEY, SHEET_ID.
// Requires sheets.googleapis.com to be allowlisted in OAP's function egress config.

const SHEET_RANGE = 'Submissions!A:G'

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0
}

function validatePayload(body) {
  if (!body || typeof body !== 'object') return 'Missing request body'
  if (!isNonEmptyString(body.name)) return 'Missing name'
  if (!isNonEmptyString(body.organization)) return 'Missing organization'
  if (!isNonEmptyString(body.email)) return 'Missing email'
  if (!body.answers || typeof body.answers !== 'object') return 'Missing answers'
  if (typeof body.total !== 'number') return 'Missing total score'
  if (typeof body.levelId !== 'number') return 'Missing levelId'
  return null
}

async function getAccessToken() {
  const email = process.env.GOOGLE_SA_EMAIL
  const privateKey = (process.env.GOOGLE_SA_PRIVATE_KEY || '').replace(/\\n/g, '\n')

  if (!email || !privateKey) {
    throw new Error('Google service account credentials are not configured')
  }

  const { SignJWT, importPKCS8 } = await import('jose')
  const key = await importPKCS8(privateKey, 'RS256')

  const now = Math.floor(Date.now() / 1000)
  const assertion = await new SignJWT({
    scope: 'https://www.googleapis.com/auth/spreadsheets',
  })
    .setProtectedHeader({ alg: 'RS256', typ: 'JWT' })
    .setIssuer(email)
    .setAudience('https://oauth2.googleapis.com/token')
    .setIssuedAt(now)
    .setExpirationTime(now + 3600)
    .sign(key)

  const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion,
    }),
  })

  if (!tokenResponse.ok) {
    throw new Error(`Failed to obtain Google access token: ${tokenResponse.status}`)
  }

  const tokenJson = await tokenResponse.json()
  return tokenJson.access_token
}

async function appendRow(accessToken, row) {
  const sheetId = process.env.SHEET_ID
  if (!sheetId) throw new Error('SHEET_ID is not configured')

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(
    SHEET_RANGE,
  )}:append?valueInputOption=RAW`

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ values: [row] }),
  })

  if (!response.ok) {
    const text = await response.text()
    throw new Error(`Sheets append failed: ${response.status} ${text}`)
  }
}

exports.handler = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.statusCode = 405
    res.end(JSON.stringify({ ok: false, error: 'Method not allowed' }))
    return
  }

  const error = validatePayload(req.body)
  if (error) {
    res.statusCode = 400
    res.end(JSON.stringify({ ok: false, error }))
    return
  }

  const { name, organization, email, answers, total, levelId, levelName, submittedAt } = req.body

  try {
    const accessToken = await getAccessToken()
    await appendRow(accessToken, [
      submittedAt || new Date().toISOString(),
      name,
      organization,
      email,
      total,
      `${levelId} - ${levelName || ''}`,
      JSON.stringify(answers),
    ])

    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ ok: true }))
  } catch (err) {
    console.error('submit-assessment error', err)
    res.statusCode = 500
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ ok: false, error: 'Failed to record submission' }))
  }
}
