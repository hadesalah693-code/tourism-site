import { useEffect, useRef, useState, type ReactNode } from 'react'

interface AnimatedElementProps {
  children: ReactNode
  className?: string
  /** delay in ms */
  delay?: number
  /** type of entrance animation */
  animation?: 'fade-up' | 'fade-in' | 'fade' | 'slide-left' | 'slide-right' | 'zoom' | 'scale-in' | 'reveal' | 'clip'
  /** optional html tag */
  as?: 'div' | 'section' | 'span' | 'li' | 'figure' | 'p' | 'h2' | 'h3' | 'blockquote'
  threshold?: number
}

export function AnimatedElement({
  children,
  className = '',
  delay = 0,
  animation = 'fade-up',
  as = 'div',
  threshold = 0.15,
}: AnimatedElementProps) {
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            if (node) observer.unobserve(node)
          }
        })
      },
      { threshold, rootMargin: '0px 0px -60px 0px' }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold])

  const baseHidden: Record<string, string> = {
    'fade-up': 'opacity-0 translate-y-10',
    'fade-in': 'opacity-0',
    fade: 'opacity-0',
    'slide-left': 'opacity-0 -translate-x-14',
    'slide-right': 'opacity-0 translate-x-14',
    zoom: 'opacity-0 scale-90',
    'scale-in': 'opacity-0 scale-95',
    reveal: 'opacity-0 translate-y-16',
  }

  const visibleState: Record<string, string> = {
    'fade-up': 'opacity-100 translate-y-0',
    'fade-in': 'opacity-100',
    fade: 'opacity-100',
    'slide-left': 'opacity-100 translate-x-0',
    'slide-right': 'opacity-100 translate-x-0',
    zoom: 'opacity-100 scale-100',
    'scale-in': 'opacity-100 scale-100',
    reveal: 'opacity-100 translate-y-0',
  }

  const isClip = animation === 'clip'
  const clipClasses = visible ? 'clip-reveal is-visible' : 'clip-reveal'

  const Tag = as as 'div'
  const transition = `transition-all duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)]`
  const style = { transitionDelay: `${delay}ms` }

  return (
    <Tag
      ref={ref as never}
      className={`${transition} will-change-transform ${isClip ? clipClasses : visible ? visibleState[animation] : baseHidden[animation]} ${className}`}
      style={style}
    >
      {children}
    </Tag>
  )
}
