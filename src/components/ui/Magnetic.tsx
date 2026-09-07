import { useRef, type MouseEvent, type ReactNode } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export function Magnetic({
  children,
  strength = 0.3,
  className = '',
}: {
  children: ReactNode
  strength?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduced = useReducedMotion()

  function onMouseMove(e: MouseEvent<HTMLSpanElement>) {
    const el = ref.current
    if (!el || reduced) return
    const rect = el.getBoundingClientRect()
    const dx = e.clientX - (rect.left + rect.width / 2)
    const dy = e.clientY - (rect.top + rect.height / 2)
    el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`
  }

  function onMouseLeave() {
    const el = ref.current
    if (!el) return
    el.style.transform = 'translate(0, 0)'
  }

  return (
    <span
      ref={ref}
      className={`inline-flex ${className}`}
      style={{ transition: 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)' }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </span>
  )
}