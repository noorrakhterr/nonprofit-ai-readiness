import { statusForPercent } from '../lib/categories'

// Status ring color follows the same fixed, reserved good/fair/needs-attention
// scale as the readiness pillars — never the brand ramp, so a status color
// never doubles as a brand color.
const STATUS_RING: Record<ReturnType<typeof statusForPercent>, string> = {
  good: '#10b981',
  fair: '#f59e0b',
  needsAttention: '#e11d48',
}

const SIZE = 200
const CENTER = SIZE / 2
const RADIUS = 86
const STROKE = 14
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

interface ScoreRingProps {
  percent: number
  levelId: number
  levelName: string
}

export default function ScoreRing({ percent, levelId, levelName }: ScoreRingProps) {
  const status = statusForPercent(percent)
  const stageName = levelName.split(':')[1]?.trim() ?? levelName
  const offset = CIRCUMFERENCE * (1 - percent / 100)

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: SIZE, height: SIZE }}>
        <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
          <circle cx={CENTER} cy={CENTER} r={RADIUS} fill="none" stroke="#e5e7eb" strokeWidth={STROKE} />
          <circle
            cx={CENTER}
            cy={CENTER}
            r={RADIUS}
            fill="none"
            stroke={STATUS_RING[status]}
            strokeWidth={STROKE}
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={offset}
            transform={`rotate(-90 ${CENTER} ${CENTER})`}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-serif text-5xl font-semibold text-navy-900">{percent}</span>
        </div>
      </div>

      <p className="mt-3 text-base text-slate-600">
        Level {levelId}: <span className="font-medium text-navy-900">{stageName}</span>
      </p>
    </div>
  )
}
