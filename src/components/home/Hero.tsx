import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { useI18n } from '../../i18n/useI18n'
import { AnimatedElement } from '../ui/AnimatedElement'
import { Magnetic } from '../ui/Magnetic'
import { useParallax } from '../../hooks/useParallax'

// Red Sea / Hurghada cinematic backdrop (used as fallback + video poster)
const heroImage =
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2500&q=90'
const localFallback = '/src/assets/hero-red-sea.png'
// Local montage: Karnak columns + Luxor temple (Ken Burns) → Giza flyover → Nile
// felucca → Red Sea (underwater). Includes CC BY-SA clip Amada44 (see Experiences).
const heroVideo = '/videos/giza-montage.webm'

const particleColors = ['#ffb258', '#ff6b35', '#ff8a5c', '#ffd9b0', '#ef5834']

const wavePathA =
  'M0,80 C240,140 480,20 720,80 C960,140 1200,20 1440,80 L1440,160 L0,160 Z'
const wavePathB =
  'M0,60 C260,110 520,10 780,60 C1040,110 1300,10 1440,60 L1440,160 L0,160 Z'

function WaveLayer({
  path,
  color,
  opacity,
  className,
}: {
  path: string
  color: string
  opacity: number
  className?: string
}) {
  return (
    <div className={`wave-layer ${className ?? ''}`} aria-hidden="true">
      {[0, 1].map((copy) => (
        <svg
          key={copy}
          viewBox="0 0 1440 160"
          preserveAspectRatio="none"
          className="h-32 w-1/2 shrink-0 sm:h-36"
        >
          <path d={path} fill={color} opacity={opacity} />
        </svg>
      ))}
    </div>
  )
}

export function Hero() {
  const { t, dir } = useI18n()
  const imageRef = useParallax<HTMLDivElement>(0.12)
  const starsRef = useRef<HTMLDivElement>(null)
  const [imageSrc, setImageSrc] = useState(heroImage)
  const [videoFailed, setVideoFailed] = useState(false)
  const [reduceMotion] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const [reducedParticles] = useState(
    () =>
      typeof window === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    if (reducedParticles || !starsRef.current) return

    const stars = starsRef.current
    const count = 64
    let html = ''
    for (let i = 0; i < count; i++) {
      const top = Math.random() * 66
      const left = Math.random() * 100
      const size = Math.random() * 3 + 1
      const delay = Math.random() * 5
      const color = particleColors[i % particleColors.length]
      html += `<span class="hero-star" style="top:${top}%;left:${left}%;width:${size}px;height:${size}px;background-color:${color};animation-delay:${delay}s"></span>`
    }
    stars.innerHTML = html
  }, [reducedParticles])

  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-sand-50 text-navy-950">
      {/* Cinematic background */}
      <div ref={imageRef} className="absolute inset-0 will-change-transform">
        <img
          src={imageSrc}
          alt="Turquoise Red Sea waters meeting warm Egyptian sands at Hurghada"
          className="ken-burns absolute inset-0 h-full w-full object-cover opacity-80"
          fetchPriority="high"
          onError={() => setImageSrc(localFallback)}
        />

        {!reduceMotion ? (
          <video
            className="ken-burns absolute inset-0 h-full w-full object-cover opacity-80"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={imageSrc}
            aria-hidden="true"
            tabIndex={-1}
            disablePictureInPicture
            style={{ display: videoFailed ? 'none' : undefined }}
            onError={() => setVideoFailed(true)}
          >
            <source src={heroVideo} type="video/webm; codecs=vp9,opus" />
            <source src="/videos/giza-montage.mov" type="video/quicktime" />
          </video>
        ) : null}

        <div className="absolute inset-0 bg-gradient-to-t from-sand-50 via-sand-100/45 to-sand-50/95" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,rgba(255,107,53,0.1),transparent_32%),radial-gradient(circle_at_18%_82%,rgba(239,88,52,0.08),transparent_42%)]" />
      </div>

      {/* Floating particles */}
      <div ref={starsRef} className="pointer-events-none absolute inset-0" />

      {/* Neon glow orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[6%] top-[24%] h-24 w-24 rounded-full border border-sunset-400/30 float-slow" style={{ animationDuration: '12s' }} />
        <div className="absolute right-[8%] top-[18%] h-16 w-16 rounded-full border border-orange-400/30 float-slower" style={{ animationDuration: '16s' }} />
        <div className="absolute bottom-[30%] right-[14%] h-32 w-32 rounded-full border border-gold-300/25 float-slow" style={{ animationDuration: '20s' }} />
        <div className="absolute left-[12%] bottom-[22%] h-20 w-20 rounded-full border border-orange-500/30 float-slower" style={{ animationDuration: '14s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-4 pb-40 pt-32 sm:px-6 sm:pt-36">
        <div className={`max-w-3xl ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
          <AnimatedElement animation="fade-up">
            <p className="inline-flex items-center gap-3 rounded-full border border-orange-500/25 bg-white/70 px-5 py-2 text-[11px] font-medium uppercase tracking-[0.4em] text-orange-600 backdrop-blur-sm shadow-elevate">
              <span className="h-[6px] w-[6px] rounded-full bg-gradient-to-r from-gold-400 to-sunset-500" />
              {t('hero.eyebrow')}
            </p>
          </AnimatedElement>

          <AnimatedElement delay={150}>
            <h1 className="text-hero-title mt-7 font-serif text-5xl font-medium leading-[1.02] tracking-tight text-balance sm:text-7xl lg:text-[5.5rem]">
              {t('hero.title')}
            </h1>
          </AnimatedElement>

          <AnimatedElement delay={300}>
            <p className="mt-8 max-w-xl text-base font-light leading-8 text-navy-800/90 sm:text-lg sm:leading-9">
              {t('hero.subtitle')}
            </p>
          </AnimatedElement>

          <AnimatedElement delay={450}>
            <div className={`mt-11 flex flex-col gap-4 sm:flex-row ${dir === 'rtl' ? 'sm:flex-row-reverse' : ''}`}>
              <Magnetic>
                <Link
                  to="/trips"
                  className="btn-sheen group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-gold-300 via-gold-500 to-orange-500 px-9 py-4 text-sm font-semibold uppercase tracking-[0.08em] text-navy-950 shadow-[0_18px_50px_-12px_rgba(255,107,53,0.5)] transition-all duration-500 hover:from-gold-200 hover:via-gold-400 hover:to-orange-400"
                >
                  {t('hero.ctaPrimary')}
                  <span className="transition-transform duration-500 group-hover:translate-x-1 rtl:group-hover:-translate-x-1">→</span>
                </Link>
              </Magnetic>
              <Magnetic>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-3 rounded-full border border-navy-900/15 bg-white/70 px-9 py-4 text-sm font-semibold uppercase tracking-[0.08em] text-navy-900 backdrop-blur-sm transition-all duration-500 hover:border-orange-500/50 hover:bg-white hover:text-orange-600"
                >
                  {t('hero.ctaSecondary')}
                </Link>
              </Magnetic>
            </div>
          </AnimatedElement>
        </div>

        {/* Stats strip */}
        <AnimatedElement delay={600} animation="fade-up">
          <div className="mt-20 grid max-w-2xl grid-cols-3 gap-6 border-t border-navy-900/10 pt-8">
            {[
              [t('hero.stats.years'), '01'],
              [t('hero.stats.experiences'), '02'],
              [t('hero.stats.travelers'), '03'],
            ].map(([label, num]) => (
              <div key={num} className={dir === 'rtl' ? 'text-right' : 'text-left'}>
                <p className="text-gradient-sunset text-[10px] font-semibold uppercase tracking-[0.25em]">{num}</p>
                <p className="mt-2 font-serif text-lg font-medium text-navy-900 sm:text-xl">{label}</p>
              </div>
            ))}
          </div>
        </AnimatedElement>
      </div>

      {/* Animated waves — sunset meeting the sands */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5]">
<WaveLayer path={wavePathA} color="#f6ebdb" opacity={0.85} />
          <WaveLayer path={wavePathB} color="#efdcc0" opacity={0.75} className="wave-slow wave-reverse" />
        <WaveLayer path={wavePathA} color="#e6c79e" opacity={0.55} className="wave-slower" />
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[6] h-px bg-gradient-to-r from-transparent via-gold-400/70 to-transparent" />

      {/* Vertical scroll indicator */}
      <div className="pointer-events-none absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-navy-700/70">
            {t('hero.scroll')}
          </span>
          <span className="flex h-10 w-6 items-start justify-center rounded-full border border-navy-900/25 p-1.5">
            <span className="scroll-hint-dot h-2 w-1 rounded-full bg-orange-500" />
          </span>
        </div>
      </div>
    </section>
  )
}