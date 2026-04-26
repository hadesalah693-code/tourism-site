import type { ButtonHTMLAttributes } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-300 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean-500/80 disabled:pointer-events-none disabled:opacity-45'

const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary:
    'bg-gradient-to-b from-ocean-500 to-ocean-700 text-white shadow-elevate-lg shadow-ocean-900/10 hover:from-ocean-500 hover:to-ocean-800 hover:shadow-elevate-lg active:scale-[0.99] [text-shadow:0_1px_0_rgba(0,0,0,0.12)]',
  secondary:
    'bg-white/95 text-slate-800 shadow-elevate ring-1 ring-slate-200/80 hover:ring-slate-300/90 hover:shadow-elevate-lg active:scale-[0.99]',
  ghost: 'bg-transparent text-slate-600 hover:bg-slate-100/80 hover:text-slate-900 active:scale-[0.99]',
  danger: 'bg-red-600 text-white shadow-elevate hover:bg-red-700 hover:shadow-elevate-lg active:scale-[0.99]',
}

const sizes: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
}

export function Button({
  className = '',
  variant = 'primary',
  size = 'md',
  type = 'button',
  ...props
}: ButtonProps) {
  return <button type={type} className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props} />
}
