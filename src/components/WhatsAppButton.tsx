import { MessageCircle } from './icons'

const DEFAULT_WA = '201000000000'

const btnPrimary =
  'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-medium transition-all duration-500 ease-out bg-gradient-to-r from-gold-400 to-orange-500 text-navy-950 shadow-[0_18px_40px_-12px_rgba(255,107,53,0.5)] hover:from-gold-300 hover:to-orange-400 active:scale-[0.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500/70'

function buildWhatsAppUrl(phone: string, text: string): string {
  const n = phone.replace(/\D/g, '')
  return `https://wa.me/${n}?${new URLSearchParams({ text }).toString()}`
}

type WhatsAppButtonProps = {
  message: string
  className?: string
  label: string
}

export function WhatsAppButton({ message, className = '', label }: WhatsAppButtonProps) {
  const raw = import.meta.env.VITE_WHATSAPP_NUMBER || DEFAULT_WA
  const href = buildWhatsAppUrl(raw, message)

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className={`${btnPrimary} w-full sm:w-auto ${className}`}
    >
      <MessageCircle className="h-5 w-5" />
      {label}
    </a>
  )
}

export function WhatsAppFloatingButton({ message, label }: { message: string; label: string }) {
  const raw = import.meta.env.VITE_WHATSAPP_NUMBER || DEFAULT_WA
  const n = raw.replace(/\D/g, '')
  const href = `https://wa.me/${n}?${new URLSearchParams({ text: message }).toString()}`

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className="fixed bottom-5 z-40 flex h-14 w-14 items-center justify-center rounded-full border border-gold-300/50 bg-gradient-to-r from-gold-400 to-orange-500 text-navy-950 shadow-[0_18px_50px_-10px_rgba(240,68,36,0.55)] transition duration-300 ease-out hover:scale-105 ltr:right-5 rtl:left-5"
      aria-label={label}
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  )
}
