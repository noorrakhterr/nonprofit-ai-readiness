// Scoring rules, question content, and level/resource mapping are sourced from
// "AI Readiness Check for Nonprofits: Outcomes Explained" (team reference doc).

export type QuestionType = 'single' | 'multi'

export interface QuestionOption {
  label: string
  score: number
}

export interface Question {
  id: string
  number: number
  prompt: string
  helperText?: string
  type: QuestionType
  options: QuestionOption[]
}

export const QUESTIONS: Question[] = [
  {
    id: 'q1',
    number: 1,
    prompt: 'Which best describes your familiarity with AI agents?',
    helperText:
      "An AI agent is a tool that doesn't just answer questions. It takes actions for you, like sending emails, updating your donor database, or scheduling volunteers, often using your organization's logins.",
    type: 'single',
    options: [
      { label: 'I could explain what AI agents are and what they can do', score: 4 },
      { label: "I've heard the term and have a general idea", score: 3 },
      { label: "I use AI chat tools, but I'm not sure how agents differ", score: 2 },
      { label: 'This is new to me', score: 1 },
    ],
  },
  {
    id: 'q2',
    number: 2,
    prompt: 'Which AI tools are you or your team comfortable using?',
    helperText: 'Select all that apply.',
    type: 'multi',
    options: [
      { label: 'ChatGPT', score: 2 },
      { label: 'Claude', score: 2 },
      { label: 'Microsoft Copilot', score: 2 },
      { label: 'Google Gemini', score: 2 },
      { label: 'AI features built into tools we already use (CRM, email, fundraising platform)', score: 3 },
      { label: 'AI agents that take actions for us (send emails, update records, etc.)', score: 4 },
      { label: "We don't use AI tools yet", score: 1 },
    ],
  },
  {
    id: 'q3',
    number: 3,
    prompt:
      'Do you know which AI tools your staff and volunteers are using, and what data those tools can reach?',
    helperText: 'Think donor records, payment details, beneficiary information, and volunteer contacts.',
    type: 'single',
    options: [
      { label: 'Yes, we keep a list and know what each tool can access', score: 4 },
      { label: "Mostly, but we haven't checked what each tool can access", score: 3 },
      { label: 'Only partly. Some people use tools we may not know about', score: 2 },
      { label: 'No, people use whatever they like', score: 1 },
      { label: 'Not sure', score: 1 },
    ],
  },
  {
    id: 'q4',
    number: 4,
    prompt: 'How do AI tools sign in to your systems (email, donor database, shared drives)?',
    helperText:
      "An agent that uses a shared password or a long-lived key is like handing out a master key. If it's stolen, the thief gets everything that key opens.",
    type: 'single',
    options: [
      { label: 'Each tool has its own limited login that expires or can be shut off', score: 4 },
      { label: "Each tool has its own account, but access doesn't expire", score: 3 },
      { label: 'They use a shared staff login or a shared password', score: 2 },
      { label: 'Passwords or keys are pasted directly into the tools', score: 1 },
      { label: 'Not sure', score: 1 },
    ],
  },
  {
    id: 'q5',
    number: 5,
    prompt: 'Once an AI tool is connected, what controls what it can do?',
    helperText:
      'For example, could an agent researching grants also open board minutes or salary data, or send an email to your whole donor list?',
    type: 'single',
    options: [
      { label: 'It can only do specific tasks, and a person approves anything sensitive', score: 4 },
      { label: 'It can do whatever the person who set it up can do', score: 3 },
      { label: 'It has broad access so it "just works"', score: 2 },
      { label: 'There are no limits once it\'s connected', score: 1 },
      { label: 'Not sure', score: 1 },
    ],
  },
  {
    id: 'q6',
    number: 6,
    prompt: 'Who is responsible for setting up, reviewing, and removing AI tools at your organization?',
    helperText: 'Old or forgotten tools that still have access to your data are a common way breaches start.',
    type: 'single',
    options: [
      { label: 'A named person or team approves, reviews, and removes them', score: 4 },
      { label: "There's a process, but it isn't always followed", score: 3 },
      { label: 'Whoever needs a tool sets it up themselves', score: 2 },
      { label: 'Nobody is specifically responsible', score: 1 },
      { label: 'Not sure', score: 1 },
    ],
  },
  {
    id: 'q7',
    number: 7,
    prompt: 'Does your organization have simple guidelines for how staff and volunteers use AI safely?',
    helperText: 'For example, what data can be entered into AI tools, and which tools are approved.',
    type: 'single',
    options: [
      { label: 'Yes, written guidelines that people know and follow', score: 4 },
      { label: "Yes, but they're informal or not widely known", score: 3 },
      { label: "We're planning to create them", score: 2 },
      { label: "No, we haven't thought about it yet", score: 1 },
      { label: 'Not sure', score: 1 },
    ],
  },
  {
    id: 'q8',
    number: 8,
    prompt: 'If an AI agent were hijacked or made a serious mistake, how much damage could it do?',
    helperText:
      'A compromised agent can act far faster than a person, such as emailing phishing links to volunteers or deleting records in minutes.',
    type: 'single',
    options: [
      { label: 'Very little. It could only touch the specific things it was given', score: 4 },
      { label: 'Limited to one tool or system', score: 3 },
      { label: 'It could reach several systems, including donor or financial data', score: 2 },
      { label: "We couldn't predict or contain it", score: 1 },
      { label: 'Not sure', score: 1 },
    ],
  },
]

export const MIN_SCORE = 8
export const MAX_SCORE = 32

export interface Resource {
  id: string
  title: string
  description: string
  url: string
  // Flip to true once the source doc's "Open items" clearance questions are resolved.
  externallyCleared: boolean
}

export const RESOURCES: Record<string, Resource> = {
  blog: {
    id: 'blog',
    title: 'Securing Nonprofit Impact with AI Agents',
    description:
      'A plain-language guide to what AI agents are, the risks (shared keys, over-privileged agents, prompt injection, unmanaged agents), and seven practical steps to secure them.',
    url: 'https://www.okta.com/blog/ai/securing-nonprofit-impact-with-ai-agents/',
    externallyCleared: true,
  },
  article: {
    id: 'article',
    title: 'Nonprofits at Work 2026: The New Frontline of the Agentic Era',
    description:
      "Okta's sector research: nonprofits are the most-attacked industry in Okta's dataset, 76% of larger nonprofits have no formal AI strategy, and 58% place no limits on AI tool use.",
    url: 'https://www.okta.com/newsroom/articles/nonprofits-at-work-2026--the-new-frontline-of-the-agentic-era/',
    externallyCleared: true,
  },
  oktaAssessment: {
    id: 'oktaAssessment',
    title: 'Okta AI Readiness Assessment',
    description:
      "A deeper, more technical assessment of how well your AI agents are protected across trust boundaries, identity and authorization, secure development, and centralized control.",
    url: 'https://www.okta.com/assessments/ai-readiness',
    externallyCleared: true,
  },
  governanceBrochure: {
    id: 'governanceBrochure',
    title: 'AI Governance Brochure: Securing AI Identity',
    description:
      'A short guide framing AI governance around three questions: Where are my agents? What can they connect to? What can they do?',
    url: 'https://drive.google.com/file/d/1gfY94o1B2OO0zy7vVt7xmf66VClO3qv-/view',
    // PDF "Open items": needs confirmation of external-sharing clearance before go-live.
    externallyCleared: true,
  },
  sustainabilityGuide: {
    id: 'sustainabilityGuide',
    title: 'Sustainability Guide to AI Usage',
    description:
      'Practical tips for using AI efficiently and sustainably: right-sized models, tighter prompts, and reused context.',
    url: '',
    // PDF "Open items": this is an internal Okta doc, explicitly not cleared for external
    // sharing yet. Keep this false until a nonprofit-safe version is published.
    externallyCleared: false,
  },
}

export type LevelId = 1 | 2 | 3 | 4

export interface LevelContent {
  id: LevelId
  name: string
  scoreRange: [number, number]
  whoThisIs: string
  mainMessage: string
  resourceIds: string[]
  nextSteps: string[]
  oktaFollowUp: string
}

export const LEVELS: LevelContent[] = [
  {
    id: 1,
    name: 'Level 1: Getting Oriented',
    scoreRange: [8, 14],
    whoThisIs:
      'An organization that is new to AI agents, or one that uses AI tools casually with no guidelines and little idea what the tools can reach.',
    mainMessage:
      'Start by understanding what AI agents are and why they are a risk. The habits you set now are easier than fixes later.',
    resourceIds: ['blog', 'article'],
    nextSteps: ['List the AI tools in use.', 'Name one person to approve new tools.'],
    oktaFollowUp:
      'An introductory conversation about getting started, including free and discounted nonprofit programs.',
  },
  {
    id: 2,
    name: 'Level 2: Building Awareness',
    scoreRange: [15, 20],
    whoThisIs:
      'An organization that understands the basics and uses AI tools, but with informal controls: shared logins, broad access, and no written policy.',
    mainMessage: 'Move from awareness to a basic policy and basic identity controls.',
    resourceIds: ['article', 'blog', 'sustainabilityGuide'],
    nextSteps: [
      'Write a one-page AI use guideline.',
      'Replace shared passwords with separate logins.',
      'Require human approval for sensitive actions.',
    ],
    oktaFollowUp:
      'Putting AI tools behind single sign-on and MFA, and giving each agent its own identity with a named owner.',
  },
  {
    id: 3,
    name: 'Level 3: Strengthening Controls',
    scoreRange: [21, 26],
    whoThisIs:
      'An organization with some structure, such as an owner for AI tools, separate accounts, and some access limits, but with inconsistent reviews and gaps in visibility.',
    mainMessage:
      'Make controls consistent and visible, especially around joiners and leavers, because volunteers and seasonal staff turn over.',
    resourceIds: ['governanceBrochure', 'blog', 'oktaAssessment'],
    nextSteps: [
      'Automate account removal.',
      'Scope each agent to the minimum access it needs.',
      'Schedule regular reviews of active agents.',
    ],
    oktaFollowUp: 'Discovering unmanaged agents, enforcing least privilege, and revoking access quickly.',
  },
  {
    id: 4,
    name: 'Level 4: Governing at Scale',
    scoreRange: [27, 32],
    whoThisIs:
      'An organization that knows where its agents are, gives them limited identities, checks actions against policy, and has clear ownership.',
    mainMessage:
      'Keep it consistent as the number of agents grows, and be able to prove it to boards, funders, and auditors.',
    resourceIds: ['governanceBrochure', 'oktaAssessment', 'article'],
    nextSteps: [
      'Confirm every agent action can be audited and access revoked immediately.',
      'Test the response plan for a compromised agent.',
    ],
    oktaFollowUp: 'Keeping governance consistent and audit-ready as agents multiply.',
  },
]

export function levelForScore(total: number): LevelContent {
  const match = LEVELS.find((l) => total >= l.scoreRange[0] && total <= l.scoreRange[1])
  if (match) return match
  return total < MIN_SCORE ? LEVELS[0] : LEVELS[LEVELS.length - 1]
}

// Resources shown to a respondent, in order, filtered to the ones cleared for external use.
export function resourcesForLevel(level: LevelContent): Resource[] {
  return level.resourceIds.map((id) => RESOURCES[id]).filter((r) => r.externallyCleared)
}

// Placeholder destination for the Okta "contact us" CTA — the source doc leaves this
// undecided. Swap this one constant once the team picks a page, form, or email.
export const OKTA_CONTACT_URL = 'https://www.okta.com/contact-sales/'
