const destinations = [
  'The Nile',
  'Luxor',
  'Hurghada',
  'Sharm El Sheikh',
  'Marsa Alam',
  'The Red Sea',
  'Aswan',
  'Sinai',
]

const accents = ['text-orange-700/85', 'text-orange-600/60', 'text-navy-700/80', 'text-gold-600/70']
const glyphs = ['✦', '✦', '✧', '•']

export function Marquee() {
  return (
    <div
      aria-hidden="true"
      className="relative overflow-hidden border-y border-gold-400/25 bg-sand-100 py-5 mask-fade-x"
    >
      <div className="marquee-track flex w-max items-center gap-14 whitespace-nowrap">
        {[...destinations, ...destinations].map((name, i) => (
          <span key={i} className="flex items-center gap-14">
            <span className={`font-serif text-xl font-light italic tracking-wide ${accents[i % accents.length]}`}>
              {name}
            </span>
            <span className={`text-xs ${accentGlyph(i)}`}>{glyphs[i % glyphs.length]}</span>
          </span>
        ))}
      </div>
    </div>
  )
}

function accentGlyph(i: number) {
  return i % 2 === 0 ? 'text-orange-500/70' : 'text-gold-500/60'
}