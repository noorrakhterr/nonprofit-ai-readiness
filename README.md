# AI Readiness Check for Nonprofits

A guided 8-question assessment that scores a nonprofit's AI/agent readiness (8–32),
maps the result to one of 4 maturity levels, and shows a tailored resources dashboard
(message, resources, next steps, Okta follow-up) for that level.

Scoring rules, level thresholds, and the resource/level mapping come from the team's
"AI Readiness Check for Nonprofits: Outcomes Explained" reference doc, encoded in
[`src/data/assessment.ts`](src/data/assessment.ts).

## Project structure

- `src/data/assessment.ts` — questions, scoring key, level thresholds, resources, Okta CTA.
- `src/lib/scoring.ts` — pure scoring function (`computeScore`), no I/O.
- `src/lib/submitResult.ts` — fires the result to the backend function; failure is non-fatal.
- `src/pages/` — `IntroPage` (entry point) → `FormPage` (wizard) → `ResultsPage` (dashboard).
- `src/App.tsx` — hash-based router (`/`, `/assessment`, `/results`).
- `functions/submit-assessment/` — OAP Function (node24) that appends a submission row
  to a Google Sheet via a service account.

## Local development

```bash
npm install
npm run dev
```

Walk the flow end to end at least once per level (answer all-lowest for Level 1,
all-highest for Level 4, a mix for Levels 2–3) and confirm the resources/next
steps/Okta follow-up shown match the reference doc.

To test submission against a deployed function locally, copy `env.example.txt` to
`.env.local` and set `VITE_FUNCTIONS_BASE_URL`. Without it, submission is skipped
(logged to console) and the results page still renders normally — scoring is fully
client-side.

```bash
npm run build    # tsc -b && vite build -> dist/
npm run preview  # serve the production build locally
```

## Backend function (Google Sheets logging)

`functions/submit-assessment/index.js` is a single-file OAP Function (`node24`
contract: `exports.handler(req, res)`). It validates the payload and appends a row
to a Google Sheet using a service account — credentials never touch the client.

### One-time setup on OAP

1. Create a Google Cloud service account with Sheets API access, and share the
   target spreadsheet with the service account's email (Editor access).
2. Set secrets for the function (dashboard Secrets card, or `iddb functions deploy
   ... --env KEY=value`, or `secrets set` after deploy):
   - `GOOGLE_SA_EMAIL` — service account email
   - `GOOGLE_SA_PRIVATE_KEY` — service account private key (PEM, `\n`-escaped is fine)
   - `SHEET_ID` — the spreadsheet ID
3. Allowlist `sheets.googleapis.com` (and `oauth2.googleapis.com` for token exchange)
   in OAP's function egress config (Security → Function egress / `iddb egress`),
   since Functions are default-deny for outbound calls in Kubernetes mode.
4. Deploy:
   ```bash
   cd functions/submit-assessment
   npm install
   iddb functions deploy . --name submit-assessment --runtime node24 --tenant <tenant>
   ```
5. Set `VITE_FUNCTIONS_BASE_URL` for the frontend build to
   `https://api.platform.atko.ai/<tenant>/functions/v1`.

### Testing the function

```bash
cd functions/submit-assessment
npm install
node test.local.js
```

This only exercises validation and the failure path (no real credentials are set
locally) — confirms the handler returns 405/400/500 correctly for bad input. The
actual Sheets append can only be verified once secrets are configured on OAP;
after deploying, submit the live form once and check the sheet for a new row.

## Deploying the frontend to OAP

Build output is a standard static Vite bundle (`dist/`) using a hash-based router
(`createHashRouter`), so client-side routes (`/#/assessment`, `/#/results`) work
without needing SPA-fallback rewrites configured on the host. Push via OAP Apps
(GitHub/git integration or an uploaded `dist/` bundle) per the platform's "Apps"
guide.

## Pre-launch checklist

- [ ] **Scoring key**: the per-option scores in `src/data/assessment.ts` are
      inferred from the form wording + the stated scoring rules (strongest = 4,
      "Not sure" = 1, Q2 takes the max category). Diff this against the live
      scoring sheet before sending this externally.
- [ ] **Sustainability Guide**: currently excluded from Level 2's resource list
      (`externallyCleared: false` in `assessment.ts`) because the source doc says
      it's an internal-only doc not yet cleared for external sharing. Flip that
      flag once cleared or a nonprofit-safe version is published.
- [ ] **AI Governance Brochure**: shown for Levels 3–4; the source doc says this
      still needs confirmation of external-sharing clearance. Confirm before launch.
- [ ] **Okta contact CTA**: `OKTA_CONTACT_URL` in `assessment.ts` is a placeholder.
      Swap it once the team decides the destination (page, form, or email).
- [ ] **Google Sheet columns**: the function appends
      `[timestamp, name, organization, email, total, "levelId - levelName", answersJson]`
      to the `Submissions` tab — confirm this matches the sheet's actual layout
      (`SHEET_RANGE` in `functions/submit-assessment/index.js`).
