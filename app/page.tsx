import Navbar from '@/components/landing/Navbar'
import Hero from '@/components/landing/Hero'
import Timeline from '@/components/landing/Timeline'
import ProblemSection from '@/components/landing/ProblemSection'
import Features from '@/components/landing/Features'
import SocialProof from '@/components/landing/SocialProof'
import Pricing from '@/components/landing/Pricing'
import FAQAndCTA from '@/components/landing/FAQAndCTA'
import Footer from '@/components/landing/Footer'
import dynamic from 'next/dynamic'

const AIChat = dynamic(() => import('@/components/landing/AIChat'), { ssr: false })

export default function LandingPage() {
  return (
    <main style={{ background: '#0b0d10', position: 'relative' }}>
      <div className="af-bg-glow" />
      <Navbar />
      <Hero />
      <Timeline />
      <ProblemSection />
      <Features />
      <SocialProof />
      <Pricing />
      <FAQAndCTA />
      <Footer />
      <AIChat />
    </main>
  )
}