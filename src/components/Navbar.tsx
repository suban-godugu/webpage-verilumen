import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { ThemeToggle } from './ThemeToggle'

const links = [
  { href: '#home', label: 'Home' },
  { href: '#solutions', label: 'Solutions' },
  { href: '#careers', label: 'Careers' },
  { href: '#contact', label: 'Contact' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('Home')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10)
      const line = window.scrollY + 120
      const order = [...links].reverse()
      for (const link of order) {
        const el = document.querySelector(link.href)
        if (el instanceof HTMLElement && line >= el.offsetTop) {
          setActive(link.label)
          return
        }
      }
      setActive('Home')
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? 'border-b border-border bg-[var(--vl-nav)] shadow-[var(--vl-shadow)] backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="site flex items-center justify-between gap-4 py-[clamp(0.75rem,1.4vh,1.15rem)]">
        <a
          href="#home"
          className="flex items-center gap-3"
          aria-label="Verilumen home"
          onClick={() => setActive('Home')}
        >
          <img src="/logo.svg" alt="" className="fluid-logo" />
          <div className="leading-none">
            <div className="fluid-brand font-extrabold tracking-[0.16em] text-text italic">
              VERILUMEN
            </div>
            <div className="mt-1.5 flex items-center gap-2">
              <span className="h-px w-4 bg-accent" />
              <span className="font-mono text-[10px] font-semibold tracking-[0.28em] text-accent">
                LABS
              </span>
            </div>
          </div>
        </a>

        <nav className="hidden items-center gap-[clamp(1rem,1.8vw,2rem)] xl:flex" aria-label="Primary">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setActive(link.label)}
              className={`fluid-nav-link relative pb-1 font-medium tracking-wide transition ${
                active === link.label ? 'text-accent' : 'text-text-muted hover:text-text'
              }`}
            >
              {link.label}
              <span
                className={`absolute right-0 -bottom-0.5 left-0 h-px bg-accent transition-all duration-300 ${
                  active === link.label ? 'w-full opacity-100' : 'w-0 opacity-0'
                }`}
              />
            </a>
          ))}
          <a
            href="#contact"
            className="fluid-btn rounded-full bg-gradient-to-r from-accent to-accent-blue px-4 py-2 text-sm font-semibold text-bg-primary shadow-[0_0_16px_var(--vl-glow)] transition hover:opacity-95"
            onClick={() => setActive('Contact')}
          >
            Talk to Us
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            className="rounded-lg p-2 text-text xl:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-b border-border bg-[var(--vl-nav)] px-4 py-5 backdrop-blur-xl xl:hidden">
          <div className="flex flex-col gap-4">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`text-base ${active === link.label ? 'text-accent' : 'text-text'}`}
                onClick={() => {
                  setActive(link.label)
                  setOpen(false)
                }}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="mt-1 inline-flex w-fit rounded-full bg-gradient-to-r from-accent to-accent-blue px-4 py-2.5 text-sm font-semibold text-bg-primary"
              onClick={() => {
                setActive('Contact')
                setOpen(false)
              }}
            >
              Talk to Us
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
