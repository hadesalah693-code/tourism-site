import type { ReactNode } from 'react'

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string
  description?: string
  action?: ReactNode
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200/90 bg-white/70 px-6 py-16 text-center shadow-elevate backdrop-blur-[2px]">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-orange-200 bg-gradient-to-br from-orange-100 to-gold-200 text-2xl shadow-inner-soft">
        ✦
      </div>
      <h3 className="text-lg font-semibold tracking-tight text-slate-900">{title}</h3>
      {description ? <p className="mt-2 max-w-md text-sm text-slate-600">{description}</p> : null}
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  )
}
