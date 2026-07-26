'use client'

import { useEffect, useState } from 'react'
import { Menu, X, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'AI Tools', href: '#ai-tools' },
  { label: 'Productivity', href: '#productivity' },
  { label: 'Guides', href: '#guides' },
  { label: 'Resources', href: '#resources' },
]

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

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        scrolled
          ? 'border-b border-border/70 bg-background/80 backdrop-blur-lg'
          : 'border-b border-transparent bg-background/0',
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <a href="#top" className="shrink-0" aria-label="AIWorkSimple home">
          <LocalLogo />
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button render={<a href="#ai-tools" />} className="group rounded-full">
            Explore AI Tools
            <ArrowRight className="ml-1 size-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex size-10 items-center justify-center rounded-lg text-foreground md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="flex flex-col gap-1 px-4 py-4" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-base font-medium text-foreground transition-colors hover:bg-muted"
              >
                {link.label}
              </a>
            ))}
            <Button
              render={<a href="#ai-tools" onClick={() => setOpen(false)} />}
              className="mt-2 w-full rounded-full"
            >
              Explore AI Tools
              <ArrowRight className="ml-1 size-4" />
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
