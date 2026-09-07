import { AnimatedElement } from '../ui/AnimatedElement'

const photos = [
  {
    src: 'https://images.unsplash.com/photo-1570857502809-08184874388e?auto=format&fit=crop&w=1200&q=88',
    alt: 'Luxor Temple at sunset',
  },
  {
    src: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=88',
    alt: 'Snorkeling in the Red Sea',
  },
  {
    src: 'https://images.unsplash.com/photo-1539768942893-daf53e448371?auto=format&fit=crop&w=1200&q=88',
    alt: 'Karnak Temple columns',
  },
  {
    src: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=1200&q=88',
    alt: 'Sahara desert dunes at golden hour',
  },
  {
    src: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=88',
    alt: 'Felucca sailing on the Nile',
  },
  {
    src: 'https://images.unsplash.com/photo-1570459027562-4a916cc6113f?auto=format&fit=crop&w=1200&q=88',
    alt: 'Cairo skyline at dusk',
  },
]

export function Gallery() {
  return (
    <section className="relative overflow-hidden bg-sand-100 py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <AnimatedElement>
          <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-orange-600">
            SunSet Tours Egypt
          </p>
        </AnimatedElement>
        <AnimatedElement delay={80}>
          <h2 className="mt-6 font-serif text-4xl font-medium leading-[1.1] tracking-tight text-navy-900 sm:text-5xl lg:text-6xl">
            Gallery
          </h2>
        </AnimatedElement>

        <div className="mt-14 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {photos.map((photo, index) => (
            <AnimatedElement key={photo.src} delay={index * 60}>
              <div className="group relative mb-4 break-inside-avoid overflow-hidden rounded-2xl bg-white shadow-elevate-lg">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="aspect-[4/3] w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="absolute bottom-3 left-3 rounded-full border border-white/15 bg-navy-950/60 px-3 py-1 text-[11px] font-medium text-ivory-100/90 opacity-0 backdrop-blur-sm transition-opacity duration-500 group-hover:opacity-100">
                  {photo.alt}
                </span>
              </div>
            </AnimatedElement>
          ))}
        </div>
      </div>
    </section>
  )
}