import type { Resource } from '../data/assessment'

interface ResourceCardProps {
  resource: Resource
  index: number
}

export default function ResourceCard({ resource, index }: ResourceCardProps) {
  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noreferrer"
      className="flex gap-4 rounded-xl border border-slate-200 bg-white p-4 transition-shadow hover:shadow-md"
    >
      <div className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-brand-100 text-sm font-semibold text-brand-600">
        {index + 1}
      </div>
      <div>
        <h3 className="font-medium text-navy-900">{resource.title}</h3>
        <p className="mt-1 text-sm text-slate-500">{resource.description}</p>
      </div>
    </a>
  )
}
