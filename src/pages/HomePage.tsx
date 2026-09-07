import { Hero } from '../components/home/Hero'
import { Discover } from '../components/home/Discover'
import { Experiences } from '../components/home/Experiences'
import { FeaturedTrips } from '../components/home/FeaturedTrips'
import { Destinations } from '../components/home/Destinations'
import { Heritage } from '../components/home/Heritage'
import { WhyUs } from '../components/home/WhyUs'
import { SocialProof } from '../components/home/SocialProof'
import { Gallery } from '../components/home/Gallery'
import { CTASection } from '../components/home/CTASection'
import { SupabaseNotice } from '../components/SupabaseNotice'
import { Marquee } from '../components/ui/Marquee'

export function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Discover />
      <Experiences />
      <FeaturedTrips />
      <Destinations />
      <Heritage />
      <WhyUs />
      <SocialProof />
      <Gallery />
      <CTASection />
      <div className="bg-sand-50 px-4 pb-4 sm:px-6">
        <SupabaseNotice />
      </div>
    </>
  )
}