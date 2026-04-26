type BadgeProps = {
  children: React.ReactNode
  variant?: 'default' | 'success' | 'muted' | 'warning'
}

const variants: Record<NonNullable<BadgeProps['variant']>, string> = {
  default: 'bg-ocean-50 text-ocean-900 ring-1 ring-ocean-200/70 shadow-sm',
  success: 'bg-emerald-50 text-emerald-900 ring-1 ring-emerald-200/70 shadow-sm',
  muted: 'bg-slate-100 text-slate-700 ring-1 ring-slate-200/80 shadow-sm',
  warning: 'bg-amber-50 text-amber-950 ring-1 ring-amber-200/70 shadow-sm',
}

export function Badge({ children, variant = 'default' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wide ${variants[variant]}`}>
      {children}
    </span>
  )
}
