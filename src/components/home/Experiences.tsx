import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '../../i18n/useI18n'
import { AnimatedElement } from '../ui/AnimatedElement'
import { useTilt } from '../../hooks/useTilt'

type CategoryKey = 'sea' | 'desert' | 'ancient' | 'diving' | 'nile' | 'luxury'

const categories: {
  key: CategoryKey
  image: string
  video?: string
  videoMov?: string
  wide: boolean
  accent: 'marine' | 'desert'
}[] = [
  {
    key: 'sea',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=88',
    video: '/videos/red-sea.webm',
    videoMov: '/videos/red-sea.mov',
    wide: true,
    accent: 'marine',
  },
  {
    key: 'ancient',
    image: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1400&q=88',
    wide: false,
    accent: 'desert',
  },
  {
    key: 'desert',
    image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=1400&q=88',
    video: '/videos/safari-dunes.webm',
    videoMov: '/videos/safari-dunes.mov',
    wide: false,
    accent: 'desert',
  },
  {
    key: 'diving',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1400&q=88',
    wide: false,
    accent: 'marine',
  },
  {
    key: 'nile',
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1400&q=88',
    wide: false,
    accent: 'marine',
  },
  {
    key: 'luxury',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1400&q=88',
    wide: true,
    accent: 'marine',
  },
]

const ferryToCategory: Record<CategoryKey, string> = {
  sea: 'sea',
  desert: 'safari',
  ancient: 'historical',
  diving: 'sea',
  nile: 'sea',
  luxury: 'other',
}

function CardMedia({
  image,
  alt,
  video,
  videoMov,
}: {
  image: string
  alt: string
  video?: string
  videoMov?: string
}) {
  const [videoFailed, setVideoFailed] = useState(false)
  const [reduceMotion] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const showVideo = !reduceMotion && video != null && !videoFailed

  return (
    <>
      <img
        src={image}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-110"
        loading="lazy"
      />
      {showVideo ? (
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-95"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={image}
          aria-hidden="true"
          tabIndex={-1}
          disablePictureInPicture
          onError={() => setVideoFailed(true)}
        >
          <source src={video} type="video/webm; codecs=vp9,opus" />
          {videoMov ? <source src={videoMov} type="video/quicktime" /> : null}
        </video>
      ) : null}
    </>
  )
}

function ExperienceCard({
  name,
  index,
  image,
  alt,
  video,
  videoMov,
  to,
  accent,
}: {
  name: CategoryKey
  index: number
  image: string
  alt: string
  video?: string
  videoMov?: string
  to: string
  accent: 'marine' | 'desert'
}) {
  const { t } = useI18n()
  const tilt = useTilt<HTMLAnchorElement>(6)
  const marine = accent === 'marine'

  return (
    <AnimatedElement animation="fade-up" delay={index * 90}>
      <Link
        to={to}
        className="tilt group relative block min-h-[380px] overflow-hidden bg-navy-900 sm:min-h-[440px] lg:min-h-[460px]"
        {...tilt}
      >
        <CardMedia image={image} alt={alt} video={video} videoMov={videoMov} />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/35 to-transparent transition-opacity duration-700 group-hover:via-navy-950/60" />
        <div
          className={`pointer-events-none absolute inset-0 opacity-70 transition-opacity duration-700 group-hover:opacity-100 ${
            marine
? 'bg-[radial-gradient(circle_at_20%_10%,rgba(255,170,50,0.22),transparent_45%),radial-gradient(circle_at_90%_80%,rgba(255,107,53,0.3),transparent_55%)]'
          : 'bg-[radial-gradient(circle_at_20%_10%,rgba(255,200,40,0.2),transparent_45%),radial-gradient(circle_at_90%_80%,rgba(255,107,53,0.3),transparent_55%)]'
          }`}
        />

        {/* Number */}
        <span
          className={`absolute right-5 top-5 rounded-full border px-2.5 py-1 font-serif text-sm backdrop-blur-sm ${
            marine ? 'border-orange-400/40 bg-orange-500/10 text-orange-200' : 'border-gold-400/40 bg-gold-500/10 text-gold-200'
          }`}
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* Content */}
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
          <div
            className={`h-1 w-10 rounded-full transition-all duration-700 group-hover:w-20 ${
              marine ? 'bg-gradient-to-r from-orange-400 to-gold-400' : 'bg-gradient-to-r from-gold-400 to-orange-500'
            }`}
          />
          <h3 className="mt-4 font-serif text-3xl font-medium tracking-tight text-ivory-50 sm:text-4xl">
            {t(`experiences.${name}.title`)}
          </h3>
          <p className="mt-3 max-w-xs text-sm font-light leading-6 text-ivory-100/75 opacity-0 translate-y-2 transition-all duration-700 group-hover:opacity-100 group-hover:translate-y-0">
            {t(`experiences.${name}.desc`)}
          </p>
        </div>
      </Link>
    </AnimatedElement>
  )
}

export function Experiences() {
  const { t } = useI18n()

  return (
    <section className="relative bg-sand-100 py-24 sm:py-32 lg:py-40">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_10%,rgba(255,107,53,0.13),transparent_35%),radial-gradient(circle_at_10%_65%,rgba(255,107,53,0.1),transparent_45%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
          <div className="max-w-lg">
            <AnimatedElement>
              <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-orange-600">
                {t('experiences.eyebrow')}
              </p>
            </AnimatedElement>
            <AnimatedElement delay={80}>
              <h2 className="mt-6 font-serif text-4xl font-medium leading-[1.1] tracking-tight text-navy-900 sm:text-5xl lg:text-6xl">
                {t('experiences.title')}
              </h2>
            </AnimatedElement>
          </div>
          <AnimatedElement delay={160} className="lg:justify-self-end">
            <p className="max-w-md text-base font-light leading-8 text-navy-800/80">
              {t('experiences.subtitle')}
            </p>
          </AnimatedElement>
        </div>

        {/* Asymmetric editorial grid */}
        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map(({ key, image, video, videoMov, accent }, index) => (
            <ExperienceCard
              key={key}
              name={key}
              index={index}
              image={image}
              alt={t(`experiences.${key}.title`)}
              video={video}
              videoMov={videoMov}
              accent={accent}
              to={`/trips?category=${ferryToCategory[key]}`}
            />
          ))}
        </div>

        <p className="mt-10 text-[11px] font-light leading-5 tracking-wide text-navy-700/60">
          Underwater footage: Red Sea clownfish in Soma Bay, Egypt — ©{' '}
          <a
            href="https://commons.wikimedia.org/wiki/File:Amphiprion_bicinctus_-_Red_Sea_-_Soma_Bay.ogv"
            target="_blank"
            rel="noreferrer noopener"
            className="underline underline-offset-2 transition hover:text-orange-600"
          >
            Amada44 / Wikimedia Commons
          </a>{' '}
          (CC BY-SA 4.0). Desert dunes footage in the public domain via Wikimedia Commons.
        </p>
      </div>
    </section>
  )
}
