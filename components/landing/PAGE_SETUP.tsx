/**
 * ─────────────────────────────────────────────────────────────
 * AdmitFlow — Page Layout Wrapper
 * 
 * STEP 1: Add to your globals.css (or a new admitflow.css imported 
 *         in layout.tsx):
 * ─────────────────────────────────────────────────────────────
 *
 *   html, body { background: #080a0f; }
 *
 *   .af-page {
 *     background: #080a0f;
 *     min-height: 100vh;
 *     position: relative;
 *     isolation: isolate;
 *   }
 *
 *   // One global dot grid for the whole page
 *   .af-page::before {
 *     content: '';
 *     position: fixed;
 *     inset: 0;
 *     background-image:
 *       linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px),
 *       linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px);
 *     background-size: 48px 48px;
 *     pointer-events: none;
 *     z-index: 0;
 *   }
 *
 *   .af-page > * {
 *     position: relative;
 *     z-index: 1;
 *   }
 *
 * ─────────────────────────────────────────────────────────────
 * STEP 2: Wrap your home page sections like this:
 * ─────────────────────────────────────────────────────────────
 */

// app/page.tsx  (or pages/index.tsx)
import Timeline from '@/components/Timeline'
import ProblemSection from '@/components/ProblemSection'
import Features from '@/components/Features'
import SocialProof from '@/components/SocialProof'
import Pricing from '@/components/Pricing'
import FAQAndCTA from '@/components/FAQAndCTA'
import { CTA, FAQ, Footer } from '@/components/shared-components'

export default function HomePage() {
  return (
    <div className="af-page">
      {/* Hero / Navbar goes here */}

      <Timeline />
      <ProblemSection />
      <Features />
      <SocialProof />
      <Pricing />
      <FAQAndCTA />
      <CTA />
      <Footer />
    </div>
  )
}

/**
 * ─────────────────────────────────────────────────────────────
 * WHAT CHANGED IN EACH COMPONENT:
 *
 *  • background: '#080a0f' → background: 'transparent'   (all sections)
 *  • background: '#0c0d0f' → transparent                  (Timeline, SocialProof)
 *  • background: '#0d0f12' → transparent                  (Pricing)  
 *  • Removed borderTop/borderBottom lines from section wrappers
 *  • Removed per-section <div className="xx-bg-grid" /> divs
 *    (the global ::before pseudo-element handles the dot grid)
 *  • All orb blobs, accent colors, cards, and animations untouched
 *
 * RESULT: One seamless #080a0f canvas. Orbs bleed naturally 
 * between sections. No more hard color seams.
 * ─────────────────────────────────────────────────────────────
 */
