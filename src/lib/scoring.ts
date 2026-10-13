import { LEVELS, type LevelContent, MAX_SCORE, MIN_SCORE, QUESTIONS, levelForScore } from '../data/assessment'

// Single-select questions store the chosen option label; the multi-select (Q2)
// stores an array of chosen labels.
export type Answers = Record<string, string | string[]>

export interface QuestionScore {
  questionId: string
  questionNumber: number
  score: number
}

export interface ScoreResult {
  total: number
  level: LevelContent
  perQuestion: QuestionScore[]
}

function scoreForQuestion(questionId: string, answer: string | string[] | undefined): number {
  const question = QUESTIONS.find((q) => q.id === questionId)
  if (!question || answer === undefined) return 0

  if (question.type === 'multi') {
    const selected = Array.isArray(answer) ? answer : [answer]
    const scores = question.options.filter((o) => selected.includes(o.label)).map((o) => o.score)
    return scores.length > 0 ? Math.max(...scores) : 0
  }

  const option = question.options.find((o) => o.label === answer)
  return option?.score ?? 0
}

export function computeScore(answers: Answers): ScoreResult {
  const perQuestion = QUESTIONS.map((q) => ({
    questionId: q.id,
    questionNumber: q.number,
    score: scoreForQuestion(q.id, answers[q.id]),
  }))

  const total = perQuestion.reduce((sum, q) => sum + q.score, 0)

  return {
    total,
    level: levelForScore(total),
    perQuestion,
  }
}

export function isComplete(answers: Answers): boolean {
  return QUESTIONS.every((q) => {
    const answer = answers[q.id]
    if (q.type === 'multi') return Array.isArray(answer) && answer.length > 0
    return typeof answer === 'string' && answer.length > 0
  })
}

export { LEVELS, MAX_SCORE, MIN_SCORE }
