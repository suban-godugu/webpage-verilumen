import { useRef, type MouseEvent } from 'react'
import { ScrollReveal } from './ui/ScrollReveal'
import { FooterField } from './visuals/FooterField'

function IconLinkedIn() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5h4V23h-4V8.5zM8.5 8.5h3.8v2h.05c.53-1 1.82-2.05 3.75-2.05 4.01 0 4.75 2.64 4.75 6.07V23h-4v-6.6c0-1.57-.03-3.59-2.19-3.59-2.19 0-2.52 1.71-2.52 3.48V23h-4V8.5z" />
    </svg>
  )
}

function IconInstagram() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
      <defs>
        <linearGradient id="igNodeInk" x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00E5D4" />
          <stop offset="52%" stopColor="#00B8FF" />
          <stop offset="100%" stopColor="#2563FF" />
        </linearGradient>
      </defs>
      <path
        className="ig-node__glyph"
        fill="currentColor"
        fillRule="evenodd"
        d="M12 2.2c-2.7 0-3.04.01-4.1.06-2.66.12-3.9 1.36-4.02 4.02C3.83 7.34 3.8 7.68 3.8 12s.01 4.66.06 5.72c.12 2.66 1.36 3.9 4.02 4.02 1.06.05 1.4.06 4.12.06s3.04-.01 4.1-.06c2.66-.12 3.9-1.36 4.02-4.02.05-1.06.06-1.4.06-4.12s-.01-3.04-.06-4.1c-.12-2.66-1.36-3.9-4.02-4.02C15.04 2.21 14.7 2.2 12 2.2zm0 1.62c2.66 0 2.97.01 4.02.06 1.95.09 2.86.94 2.95 2.95.05 1.05.06 1.36.06 4.02s-.01 2.97-.06 4.02c-.09 1.95-.94 2.86-2.95 2.95-1.05.05-1.36.06-4.02.06s-2.97-.01-4.02-.06c-1.95-.09-2.86-.94-2.95-2.95-.05-1.05-.06-1.36-.06-4.02s.01-2.97.06-4.02c.09-1.95.94-2.86 2.95-2.95 1.05-.05 1.36-.06 4.02-.06zM12 7.05A4.95 4.95 0 1 0 16.95 12 4.95 4.95 0 0 0 12 7.05zm0 8.16A3.21 3.21 0 1 1 15.21 12 3.21 3.21 0 0 1 12 15.21zM17.35 6.3a1.16 1.16 0 1 0 1.16 1.16 1.16 1.16 0 0 0-1.16-1.16z"
      />
    </svg>
  )
}

const columns = [
  {
    title: 'Solutions',
    links: [
      { href: '/#solutions', label: 'Retest Reduction' },
      { href: '/#solutions', label: 'SHMOO Optimization' },
      { href: '/#solutions', label: 'Test Time Optimization' },
      { href: '/#solutions', label: 'RA Advisor' },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: '/#home', label: 'Home' },
      { href: '/#careers', label: 'Careers' },
      { href: '/#contact', label: 'Contact Us' },
    ],
  },
]

export function Footer() {
  const logoRef = useRef<HTMLAnchorElement>(null)

  const onLogoMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const el = logoRef.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - (r.left + r.width / 2)) / r.width
    const y = (e.clientY - (r.top + r.height / 2)) / r.height
    el.style.transform = `perspective(420px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateZ(6px)`
  }

  const onLogoLeave = () => {
    const el = logoRef.current
    if (!el) return
    el.style.transform = 'perspective(420px) rotateY(0deg) rotateX(0deg) translateZ(0)'
  }

  return (
    <footer className="relative mt-20 border-t border-border-subtle/50 bg-bg-secondary/30 overflow-hidden">
      {/* Top glowing edge */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-primary/30 to-transparent blur-sm" />

      {/* Ambient background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-48 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 site py-16">
        <div className="grid gap-12 md:grid-cols-2 xl:grid-cols-3">
          <ScrollReveal>
            <a
              ref={logoRef}
              href="/#home"
              className="inline-flex items-center gap-3 transition-transform duration-300 will-change-transform"
              onMouseMove={onLogoMove}
              onMouseLeave={onLogoLeave}
            >
              <div className="relative w-14 h-14 flex items-center justify-center transition-transform duration-300">
                <img src="/images/new_logo.png" alt="Verilumen" className="w-full h-full object-contain drop-shadow-[0_0_15px_var(--vl-glow)]" />
              </div>
              <div>
                <div className="text-lg font-extrabold tracking-tight text-text">VERILUMEN</div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="h-px w-3 bg-primary" />
                  <span className="font-mono text-[9px] font-bold tracking-[0.3em] text-primary">LABS</span>
                </div>
              </div>
            </a>
            <p className="mt-6 max-w-[280px] text-sm leading-relaxed text-text-muted">
              The intelligent semiconductor engineering operating layer. <br/> From data, to AI, to action.
            </p>
            
                        <div className="social-net mt-8">
              <a
                href="https://www.linkedin.com/company/verilumen-labs"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Verilumen Labs on LinkedIn"
                className="li-node"
              >
                <span className="li-node__icon">
                  <span className="li-node__ring" />
                  <span className="li-node__idle" />
                  <span className="li-node__pulse" />
                  <span className="li-node__particle li-node__particle--1" />
                  <span className="li-node__particle li-node__particle--2" />
                  <span className="li-node__particle li-node__particle--3" />
                  <span className="li-node__particle li-node__particle--4" />
                  <span className="li-node__particle li-node__particle--5" />
                  <span className="li-node__particle li-node__particle--6" />
                  <IconLinkedIn />
                </span>
                <span className="li-node__label font-medium">
                  LinkedIn
                  <span className="li-node__underline" />
                </span>
                <span className="li-node__trace" aria-hidden="true">
                  <svg width="40" height="10" viewBox="0 0 40 10" fill="none">
                    <line x1="0" y1="5" x2="33" y2="5" stroke="#00B8FF" strokeWidth="0.6" />
                    <line x1="0" y1="5" x2="33" y2="5" stroke="#00E5D4" strokeWidth="0.6" />
                    <circle cx="34.6" cy="5" r="1.15" fill="#00E5D4" />
                    <line
                      className="li-node__signal"
                      pathLength="1"
                      x1="34"
                      y1="5"
                      x2="0"
                      y2="5"
                      stroke="#00E5D4"
                      strokeWidth="1"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </a>
              <a
                href="https://www.instagram.com/verilumenlabs.ai/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Verilumen Labs on Instagram"
                className="ig-node"
              >
                <span className="ig-node__icon">
                  <span className="ig-node__ring" />
                  <span className="ig-node__idle" />
                  <span className="ig-node__pulse" />
                  <IconInstagram />
                </span>
                <span className="ig-node__label font-medium">
                  Instagram
                  <span className="ig-node__underline" />
                </span>
                <span className="ig-node__trace" aria-hidden="true">
                  <svg width="52" height="10" viewBox="0 0 52 10" fill="none">
                    <line x1="0" y1="5" x2="50" y2="5" stroke="#2563FF" strokeWidth="0.6" />
                    <line x1="0" y1="5" x2="50" y2="5" stroke="#00E5D4" strokeWidth="0.6" />
                    <circle cx="26" cy="5" r="1.15" fill="#00B8FF" />
                    <line
                      className="ig-node__signal"
                      pathLength="1"
                      x1="0"
                      y1="5"
                      x2="50"
                      y2="5"
                      stroke="#00E5D4"
                      strokeWidth="1"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="ig-node__mote ig-node__mote--1" />
                  <span className="ig-node__mote ig-node__mote--2" />
                  <span className="ig-node__mote ig-node__mote--3" />
                  <span className="ig-node__mote ig-node__mote--4" />
                  <span className="ig-node__mote ig-node__mote--5" />
                </span>
              </a>
            </div>
          </ScrollReveal>

          {columns.map((col, ci) => (
            <ScrollReveal key={col.title} delay={0.1 + ci * 0.1} className="lg:justify-self-center">
              <p className="font-mono text-[11px] font-bold tracking-[0.2em] text-text uppercase">
                {col.title}
              </p>
              <ul className="mt-6 space-y-3">
                {col.links.map((link) => (
                  <li key={`${col.title}-${link.label}`}>
                    <a href={link.href} className="group inline-flex items-center gap-3 text-sm text-text-muted hover:text-text transition-colors">
                      <span className="h-px w-2 bg-border-subtle group-hover:w-4 group-hover:bg-primary transition-all duration-300" aria-hidden />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-border-subtle/40 pt-8 sm:flex-row sm:items-center sm:justify-between relative">
          <div className="absolute top-0 left-0 w-32 h-px bg-gradient-to-r from-primary to-transparent opacity-60" />
          <p className="text-xs text-text-muted font-medium flex items-center gap-1.5">
            &copy; 2026 Verilumen Labs <span className="text-primary mx-1">&middot;</span> Distributed Neural Trust
          </p>
          <p className="flex items-center gap-4 text-xs font-medium text-text-muted">
            <span className="hover:text-primary cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-primary cursor-pointer transition-colors">Terms</span>
            <span className="hover:text-primary cursor-pointer transition-colors">Security</span>
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 w-full h-[250px] pointer-events-none opacity-85 overflow-hidden">
        <FooterField />
      </div>
    </footer>
  )
}







