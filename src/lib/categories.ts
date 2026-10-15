import { CATEGORIES, QUESTION_TOPICS } from '../data/assessment'
import type { QuestionScore } from './scoring'

export type CategoryStatus = 'good' | 'fair' | 'needsAttention'

export interface CategoryBreakdown {
  id: string
  label: string
  description: string
  percent: number
  status: CategoryStatus
  weakestQuestionTopic: string
}

export interface OverviewResult {
  categories: CategoryBreakdown[]
  biggestOpportunity: CategoryBreakdown
}

export function statusForPercent(percent: number): CategoryStatus {
  if (percent >= 75) return 'good'
  if (percent >= 45) return 'fair'
  return 'needsAttention'
}

export function categoryBreakdown(perQuestion: QuestionScore[]): OverviewResult {
  const scoreById = new Map(perQuestion.map((q) => [q.questionId, q.score]))

  const categories: CategoryBreakdown[] = CATEGORIES.map((category) => {
    const scores = category.questionIds.map((id) => scoreById.get(id) ?? 0)
    const average = scores.reduce((sum, s) => sum + s, 0) / scores.length
    const percent = Math.round((average / 4) * 100)

    const weakestQuestionId = category.questionIds.reduce((weakest, id) =>
      (scoreById.get(id) ?? 0) < (scoreById.get(weakest) ?? 0) ? id : weakest,
    )

    return {
      id: category.id,
      label: category.label,
      description: category.description,
      percent,
      status: statusForPercent(percent),
      weakestQuestionTopic: QUESTION_TOPICS[weakestQuestionId] ?? weakestQuestionId,
    }
  })

  const biggestOpportunity = categories.reduce((weakest, c) => (c.percent < weakest.percent ? c : weakest))

  return { categories, biggestOpportunity }
}
