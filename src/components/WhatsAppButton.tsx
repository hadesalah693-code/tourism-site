import { MessageCircle } from './icons'

const DEFAULT_WA = '201000000000'

const btnPrimary =
  'inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-base font-medium transition-all duration-300 ease-out bg-gradient-to-b from-ocean-500 to-ocean-700 text-white shadow-elevate-lg shadow-ocean-900/10 hover:from-ocean-500 hover:to-ocean-800 active:scale-[0.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean-500/80 [text-shadow:0_1px_0_rgba(0,0,0,0.1)]'

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
      className="fixed bottom-5 z-40 flex h-14 w-14 items-center justify-center rounded-full border border-white/25 bg-[#25D366] text-white shadow-elevate-lg shadow-emerald-900/20 transition duration-300 ease-out hover:scale-105 hover:shadow-elevate-lg ltr:right-5 rtl:left-5"
      aria-label={label}
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  )
}
