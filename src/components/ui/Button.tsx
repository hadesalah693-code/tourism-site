import type { ButtonHTMLAttributes } from 'react'
import { Magnetic } from './Magnetic'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  magnetic?: boolean
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-wide transition-all duration-500 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500/70 disabled:pointer-events-none disabled:opacity-45'

const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary:
    'btn-sheen bg-gradient-to-r from-gold-400 to-orange-500 text-navy-950 shadow-[0_18px_50px_-12px_rgba(255,107,53,0.55)] hover:from-gold-300 hover:to-orange-400 hover:shadow-[0_20px_60px_-12px_rgba(239,88,52,0.6)] active:scale-[0.99]',
  secondary:
    'bg-transparent text-navy-800 border border-navy-900/15 hover:border-orange-500/50 hover:text-orange-600 active:scale-[0.99] backdrop-blur-sm',
  ghost: 'bg-transparent text-sand-700 hover:bg-sand-100/70 hover:text-sand-900 active:scale-[0.99]',
  danger: 'bg-red-600 text-white shadow-elevate hover:bg-red-700 hover:shadow-elevate-lg active:scale-[0.99]',
}

const sizes: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3 text-sm',
  lg: 'px-9 py-4 text-sm tracking-[0.08em] uppercase',
}

export function Button({
  className = '',
  variant = 'primary',
  size = 'md',
  type = 'button',
  magnetic = false,
  ...props
}: ButtonProps) {
  const button = (
    <button
      type={type}
      className={`relative overflow-hidden ${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    />
  )

  if (magnetic) {
    return <Magnetic>{button}</Magnetic>
  }
  return button
}
