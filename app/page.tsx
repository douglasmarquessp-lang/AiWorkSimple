--- app/page.tsx ---
import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { ValueStrip } from '@/components/value-strip'
import { ToolsGrid } from '@/components/tools-grid'
import { Productivity } from '@/components/productivity'
import { HowItWorks } from '@/components/how-it-works'
import { Guides } from '@/components/guides'
import { Newsletter } from '@/components/newsletter'
import { FinalCta } from '@/components/final-cta'
import { SiteFooter } from '@/components/site-footer'

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <Hero />
        <ValueStrip />
        <ToolsGrid />
        <Productivity />
        <HowItWorks />
        <Guides />
        <Newsletter />
        <FinalCta />
      </main>
      <SiteFooter />
    </div>
  )
}
