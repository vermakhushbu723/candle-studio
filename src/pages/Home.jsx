import Hero from '@/components/home/Hero'
import VelocityMarquee from '@/components/home/VelocityMarquee'
import StatsStrip from '@/components/home/StatsStrip'
import TwoWorlds from '@/components/home/TwoWorlds'
import ProductShowcase from '@/components/home/ProductShowcase'
import ScentStories from '@/components/home/ScentStories'
import SafetyTest from '@/components/home/SafetyTest'
import HowItWorks from '@/components/home/HowItWorks'
import CollectionsGrid from '@/components/home/CollectionsGrid'
import WhyUs from '@/components/home/WhyUs'
import ScentFinder from '@/components/home/ScentFinder'
import GiftingBanner from '@/components/home/GiftingBanner'
import Reviews from '@/components/home/Reviews'
import FaqPreview from '@/components/home/FaqPreview'
import InstagramWall from '@/components/home/InstagramWall'
import TrustBar from '@/components/home/TrustBar'

export default function Home() {
  return (
    <>
      <Hero />
      <VelocityMarquee words={['Hand-poured', 'Spill-proof', 'Built from India', 'Endlessly reusable']} />
      <StatsStrip />
      <TwoWorlds />
      <ProductShowcase />
      <ScentStories />
      <SafetyTest />
      <HowItWorks />
      <CollectionsGrid />
      <VelocityMarquee baseVelocity={2} words={['Chai breaks', 'Diwali nights', 'Seaside dinners', 'Slow mornings']} />
      <GiftingBanner />
      <WhyUs />
      <ScentFinder />
      <Reviews />
      <FaqPreview />
      <TrustBar />
      <InstagramWall />
    </>
  )
}
