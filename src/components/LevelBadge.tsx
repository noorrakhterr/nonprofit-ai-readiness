import type { LevelId } from '../data/assessment'

const LEVEL_STYLES: Record<LevelId, string> = {
  1: 'bg-rose-100 text-rose-700 border-rose-200',
  2: 'bg-amber-100 text-amber-700 border-amber-200',
  3: 'bg-sky-100 text-sky-700 border-sky-200',
  4: 'bg-emerald-100 text-emerald-700 border-emerald-200',
}

interface LevelBadgeProps {
  levelId: LevelId
  name: string
}

export default function LevelBadge({ levelId, name }: LevelBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium ${LEVEL_STYLES[levelId]}`}
    >
      {name}
    </span>
  )
}
