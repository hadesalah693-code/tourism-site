import { useRef, type MouseEvent } from 'react'
import { useReducedMotion } from './useReducedMotion'

export function useTilt<T extends HTMLElement>(maxDeg = 7) {
  const ref = useRef<T>(null)
  const reduced = useReducedMotion()
  const raf = useRef(0)

  function onMouseEnter() {
    if (reduced || !ref.current) return
    ref.current.classList.add('is-tilting')
  }

  function onMouseMove(e: MouseEvent<T>) {
    if (reduced || !ref.current) return
    const el = ref.current
    if (raf.current) cancelAnimationFrame(raf.current)
    raf.current = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect()
      const px = (e.clientX - rect.left) / rect.width
      const py = (e.clientY - rect.top) / rect.height
      const rx = (py - 0.5) * -maxDeg
      const ry = (px - 0.5) * maxDeg
      el.style.setProperty('--rx', `${rx.toFixed(2)}deg`)
      el.style.setProperty('--ry', `${ry.toFixed(2)}deg`)
    })
  }

  function onMouseLeave() {
    if (!ref.current) return
    if (raf.current) {
      cancelAnimationFrame(raf.current)
      raf.current = 0
    }
    ref.current.classList.remove('is-tilting')
    ref.current.style.setProperty('--rx', '0deg')
    ref.current.style.setProperty('--ry', '0deg')
  }

  return { ref, onMouseEnter, onMouseMove, onMouseLeave }
}