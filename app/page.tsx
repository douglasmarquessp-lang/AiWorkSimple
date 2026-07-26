'use client'

import { useState } from 'react'
import {
  ArrowRight,
  PlayCircle,
  PenLine,
  Zap,
  Workflow,
  Megaphone,
  Search,
  Palette,
  Clock,
  Repeat2,
  Compass,
  Gauge,
  Check,
  Sparkles,
  Mail,
  ListChecks,
  BarChart3,
  Send,
  Globe,
  MessageCircle,
  AtSign,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SiteHeader } from '@/components/site-header'
import { DashboardMockup } from '@/components/dashboard-mockup'

// LOGO LOCAL
function LocalLogo() {
  return (
    <span className="inline-flex items-center gap-2">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2.5 14.4 9l6.6 2.4L14.4 14 12 20.5 9.6 14 3 11.4 9.6 9 12 2.5Z" fill="currentColor" />
        </svg>
      </span>
      <span className="text-lg font-semibold tracking-tight text-foreground">
        AIWork<span className="text-primary">Simple</span>
      </span>
    </span>
  )
}

export default function Page() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      
      <main>
        {/* HERO SECTION */}
        <section id="top" className="relative overflow-hidden">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-[-10%] h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
          </div>

          <div className="mx-auto max-w-7xl px-4 pb-16 pt-14 sm:px-6 lg:px-8 lg:pb-24 lg:pt-20">
            <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
              <div className="animate-fade-up">
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm">
                  <span className="flex size-1.5 rounded-full bg-primary" />
                  AI for Business &amp; Productivity
                </span>
                <h1 className="mt-5 text-pretty text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                  Work Smarter.<br />Simplify More.<br /><span className="text-primary">With AI.</span>
                </h1>
                <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
                  Discover the best AI tools, workflows, and productivity strategies to help you save time, automate repetitive work, and get more done.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button render={<a href="#ai-tools" />} className="group h-12 rounded-full px-6 text-base">
                    Explore AI Tools
                    <ArrowRight className="ml-1 size-4 transition-transform group-hover:translate-x-0.5" />
                  </Button>
                  <Button render={<a href="#how-it-works" />} variant="outline" className="h-12 rounded-full border-border bg-card px-6 text-base">
                    <PlayCircle className="mr-1 size-4" />
                    Learn How AI Can Help
                  </Button>
                </div>
              </div>

              <div className="relative animate-fade-up">
                <DashboardMockup />
              </div>
            </div>
          </div>
        </section>

        {/* VALUE STRIP */}
        <section className="border-y border-border bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
              {[
                { icon: Clock, title: 'Save Time', desc: 'Cut hours from your week with smarter tools.' },
                { icon: Repeat2, title: 'Automate Tasks', desc: 'Let AI handle the busywork for you.' },
                { icon: Compass, title: 'Better Tools', desc: 'Hand-picked, tested, and reviewed.' },
                { icon: Gauge, title: 'Work Efficiently', desc: 'Do your best work with less friction.' },
              ].map((v) => (
                <div key={v.title} className="flex items-start gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border bg-card text-primary shadow-sm">
                    <v.icon className="size-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{v.title}</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TOOLS GRID */}
        <section id="ai-tools" className="scroll-mt-20">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wide text-primary">Featured AI Tools</p>
              <h2 className="mt-3 text-pretty text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Find the Right AI Tools for the Way You Work
              </h2>
            </div>
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: PenLine, title: 'AI Writing', desc: 'Draft emails, posts, and documents in seconds with tools that match your voice.' },
                { icon: Zap, title: 'AI Productivity', desc: 'Assistants and copilots that organize your day and keep you focused.' },
                { icon: Workflow, title: 'AI Automation', desc: 'Connect your apps and automate repetitive workflows end to end.' },
                { icon: Megaphone, title: 'AI Marketing', desc: 'Generate campaigns, copy, and creative that convert your audience.' },
                { icon: Search, title: 'AI Research', desc: 'Summarize, analyze, and find answers across mountains of information.' },
                { icon: Palette, title: 'AI Design', desc: 'Create visuals, mockups, and brand assets without a design team.' },
              ].map((tool) => (
                <a key={tool.title} href="#resources" className="group relative flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30">
                  <span className="flex size-12 items-center justify-center rounded-xl bg-accent text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <tool.icon className="size-6" />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-foreground">{tool.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{tool.desc}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                    Explore Tools <ArrowRight className="size-4" />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* PRODUCTIVITY */}
        <section id="productivity" className="scroll-mt-20 bg-muted/30 py-20 lg:py-28">
          <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-primary">Everyday Productivity</p>
              <h2 className="mt-3 text-pretty text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Turn AI Into Your Everyday Productivity Advantage
              </h2>
              <ul className="mt-8 space-y-3">
                {['Draft and reply to emails', 'Turn meetings into action items', 'Analyze data and surface insights'].map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <Check className="size-3" />
                    </span>
                    <span className="text-sm leading-relaxed text-foreground">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-xl shadow-primary/5">
              <p className="text-sm font-semibold text-foreground border-b border-border pb-4">Automated workflow</p>
              <ol className="mt-4 space-y-3">
                {[
                  { icon: Mail, label: 'New email received', status: 'Triaged by AI' },
                  { icon: ListChecks, label: 'Tasks extracted', status: '4 items added' },
                ].map((step, i) => (
                  <li key={i} className="flex items-center gap-4 rounded-xl border border-border bg-background p-3.5">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent text-primary">
                      <step.icon className="size-4.5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-foreground">{step.label}</p>
                      <p className="text-xs text-muted-foreground">{step.status}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="scroll-mt-20 py-20">
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
            <h2 className="text-pretty text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Work smarter in three simple steps
            </h2>
            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {[
                { num: '01', title: 'Discover', desc: 'Find AI tools that match your goals.' },
                { num: '02', title: 'Learn', desc: 'Understand how to use them effectively.' },
                { num: '03', title: 'Simplify', desc: 'Build smarter workflows.' },
              ].map((step) => (
                <div key={step.num} className="rounded-2xl border border-border bg-card p-8 text-left">
                  <span className="font-mono text-4xl font-semibold text-primary/20">{step.num}</span>
                  <h3 className="mt-4 text-xl font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-muted-foreground">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* NEWSLETTER */}
        <section id="resources" className="scroll-mt-20 py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="relative overflow-hidden rounded-3xl border border-border bg-primary px-6 py-14 text-primary-foreground sm:px-12 text-center">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Get Smarter With AI</h2>
              <p className="mx-auto mt-4 max-w-lg text-lg text-primary-foreground/80">
                Practical AI tools, productivity tips, and strategies delivered to your inbox.
              </p>
              {submitted ? (
                <div className="mx-auto mt-8 flex max-w-md items-center justify-center gap-2 rounded-full bg-primary-foreground/15 px-5 py-3 text-sm">
                  <Check className="size-4" /> You're in! Check your inbox.
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="h-12 flex-1 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-5 text-sm text-primary-foreground placeholder:text-primary-foreground/60 outline-none"
                  />
                  <Button type="submit" size="lg" className="h-12 rounded-full bg-primary-foreground px-7 text-primary">
                    Join Free
                  </Button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-border bg-muted/30 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
            <LocalLogo />
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} AIWorkSimple.com — All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
