import { Menu, X, ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ThemeToggle } from './ThemeToggle'

const links = [
  { href: '/#home', hash: '#home', label: 'Home' },
  { href: '/#solutions', hash: '#solutions', label: 'Solutions' },
  { href: '/#careers', hash: '#careers', label: 'Careers' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('Home')
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
      if (pathname !== '/') return
      
      const line = window.scrollY + 120
      const order = [...links].reverse()
      for (const link of order) {
        const el = document.querySelector(link.hash)
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
  }, [pathname])

  const isBspRoute = pathname.includes('/solutions/bsp-validation')

  return (
    <header
      className={'fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out ' +
        (scrolled || open || isBspRoute
          ? 'glass-panel border-b border-border-subtle py-3 shadow-[var(--vl-shadow-sm)]'
          : 'bg-transparent py-5 border-b border-transparent')}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-3 group relative z-10"
          aria-label="Verilumen home"
          onClick={() => setActive('Home')}
        >
          <div className="w-12 h-12 flex items-center justify-center transition-all duration-300">
            <img src="/images/new_logo.png" alt="V Logo" className="w-full h-full object-contain drop-shadow-[0_0_15px_var(--vl-glow)]" />
          </div>
          <div className="leading-tight flex flex-col">
            <div className="font-sans font-bold tracking-widest text-text text-sm uppercase">
              Verilumen
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-[1px] bg-primary/60"></span>
              <span className="font-mono text-[9px] font-medium tracking-[0.25em] text-primary">
                LABS
              </span>
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 xl:flex absolute left-1/2 -translate-x-1/2" aria-label="Primary">
          <div className="relative flex items-center p-1.5 rounded-full bg-bg-card/90 border border-border-subtle backdrop-blur-2xl shadow-[var(--vl-shadow-sm)]">
            {/* Ambient inner glow */}
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(ellipse_at_center,var(--vl-glow)_0%,transparent_70%)] opacity-30 pointer-events-none" />
            
            {links.map((link) => {
              const isActive = active === link.label && !isBspRoute;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setActive(link.label)}
                  className={`relative px-5 py-2 rounded-full text-[13px] font-bold tracking-wide transition-all duration-300 ${
                    isActive
                      ? 'text-primary bg-primary/10 border border-primary/30 shadow-[0_0_15px_var(--vl-glow)]'
                      : 'text-text-muted hover:text-text hover:bg-elevated border border-transparent'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
            
            {isBspRoute && (
              <div className="flex items-center">
                <span className="w-px h-5 bg-border-subtle mx-2" />
                <span className="relative px-5 py-2 rounded-full text-[13px] font-bold tracking-wide text-bg-primary bg-primary shadow-[0_0_20px_var(--vl-glow)]">
                  BSP Validation
                </span>
              </div>
            )}
          </div>
        </nav>

        <div className="flex items-center gap-4 z-10">
          <ThemeToggle />
          
          <a
            href="/#contact"
            className="hidden md:flex items-center gap-2 rounded-full border border-border-subtle bg-card hover:bg-elevated px-5 py-2 text-sm font-semibold text-text shadow-[var(--vl-shadow-sm)] transition-all duration-300 hover:border-primary/50 group"
            onClick={() => setActive('Contact')}
          >
            Deploy
            <ArrowRight size={14} className="text-primary group-hover:translate-x-1 transition-transform" />
          </a>

          <button
            type="button"
            className="rounded-lg p-2 text-text-muted hover:text-text hover:bg-elevated transition-colors xl:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={'absolute top-full left-0 right-0 glass-panel border-b border-border-subtle overflow-hidden transition-all duration-300 ease-in-out xl:hidden ' +
          (open ? 'max-h-[400px] opacity-100 py-4' : 'max-h-0 opacity-0 py-0')
        }
      >
        <div className="flex flex-col gap-2 px-6">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`text-sm font-medium p-3 rounded-lg transition-colors ${
                active === link.label && !isBspRoute ? 'bg-primary/10 border border-primary/30 text-primary shadow-[0_0_15px_var(--vl-glow)]' : 'text-text-muted hover:bg-border-subtle hover:text-text'
              }`}
              onClick={() => {
                setActive(link.label)
                setOpen(false)
              }}
            >
              {link.label}
            </a>
          ))}
          {isBspRoute && (
            <div className="text-sm font-medium p-3 rounded-lg bg-primary text-bg-primary">
              BSP Validation
            </div>
          )}
          <div className="h-px w-full bg-border-subtle my-2"></div>
          <a
            href="/#contact"
            className="flex items-center justify-between p-3 rounded-lg bg-card border border-border-subtle text-sm font-semibold text-text"
            onClick={() => {
              setActive('Contact')
              setOpen(false)
            }}
          >
            Deploy Solutions
            <ArrowRight size={16} className="text-primary" />
          </a>
        </div>
      </div>
    </header>
  )
}







