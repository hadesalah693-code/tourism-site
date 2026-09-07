import { useEffect, useRef } from 'react'

/**
 * Applies a smooth parallax translateY to the target element based on scroll.
 * The element moves at a fraction of the scroll velocity for depth.
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(speed = 0.15) {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    let raf = 0
    const update = () => {
      const rect = node.getBoundingClientRect()
      const vh = window.innerHeight
      const progress = rect.top / vh
      // Only move when element is near/within viewport
      if (rect.bottom < 0 || rect.top > vh) {
        node.style.transform = ''
      } else {
        node.style.transform = `translate3d(0, ${progress * speed * 100}%, 0)`
      }
    }

    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [speed])

  return ref
}
