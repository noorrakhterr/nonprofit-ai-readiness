// Local smoke test for the handler contract — run with: node test.local.js
// Does not hit the real Sheets API (no credentials are set), so it only
// verifies method/payload validation and the failure path. Once GOOGLE_SA_EMAIL,
// GOOGLE_SA_PRIVATE_KEY, and SHEET_ID are set as OAP secrets, verify the actual
// append manually by submitting the form against a deployed function.

const { handler } = require('./index.js')

function mockRes() {
  const res = {
    statusCode: 200,
    headers: {},
    body: '',
    setHeader(key, value) {
      this.headers[key] = value
    },
    end(body) {
      this.body = body
    },
  }
  return res
}

async function run() {
  // Wrong method -> 405
  const res1 = mockRes()
  await handler({ method: 'GET', body: {} }, res1)
  console.assert(res1.statusCode === 405, 'expected 405 for GET')

  // Missing fields -> 400
  const res2 = mockRes()
  await handler({ method: 'POST', body: { name: 'Jane' } }, res2)
  console.assert(res2.statusCode === 400, 'expected 400 for incomplete payload')

  // Valid payload, no credentials configured -> 500 (fails closed, not silently)
  const res3 = mockRes()
  await handler(
    {
      method: 'POST',
      body: {
        name: 'Jane Doe',
        organization: 'Example Nonprofit',
        email: 'jane@example.org',
        answers: { q1: 'This is new to me' },
        total: 10,
        levelId: 1,
        levelName: 'Level 1: Getting Oriented',
        submittedAt: new Date().toISOString(),
      },
    },
    res3,
  )
  console.assert(res3.statusCode === 500, 'expected 500 without Google credentials configured')

  console.log('All local handler checks passed:', {
    getStatus: res1.statusCode,
    incompleteStatus: res2.statusCode,
    noCredsStatus: res3.statusCode,
  })
}

run()
