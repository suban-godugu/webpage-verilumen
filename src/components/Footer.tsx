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
      { href: '#solutions', label: 'Retest Reduction' },
      { href: '#solutions', label: 'SHMOO Optimization' },
      { href: '#solutions', label: 'Test Time Optimization' },
      { href: '#solutions', label: 'RA Advisor' },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: '#home', label: 'Home' },
      { href: '#careers', label: 'Careers' },
      { href: '#contact', label: 'Contact Us' },
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
    <footer className="footer-shell relative border-t border-border">
      <div className="footer-rail absolute inset-x-0 top-0 h-px" aria-hidden />

      <div className="relative z-10 site py-10 sm:py-12">
        <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3 xl:gap-12">
          <ScrollReveal>
            <a
              ref={logoRef}
              href="#home"
              className="footer-brand inline-flex items-center gap-2.5 transition-transform duration-300 will-change-transform"
              onMouseMove={onLogoMove}
              onMouseLeave={onLogoLeave}
            >
              <img src="/logo.svg" alt="Verilumen" className="fluid-logo drop-shadow-[0_0_12px_var(--vl-glow)]" />
              <div>
                <div className="text-sm font-extrabold tracking-[-0.02em] text-text italic">VERILUMEN</div>
                <div className="mt-1 flex items-center gap-2">
                  <span className="h-px w-3 bg-accent" />
                  <span className="font-mono text-[10px] font-semibold tracking-[0.28em] text-accent">LABS</span>
                </div>
              </div>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-text-muted">
              An intelligent semiconductor engineering operating layer — data to AI to action.
            </p>
            <div className="social-net">
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
                <span className="li-node__label">
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
                <span className="ig-node__label">
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
            <ScrollReveal key={col.title} delay={0.06 + ci * 0.06}>
              <p className="font-mono text-[11px] font-semibold tracking-[0.18em] text-text uppercase">
                {col.title}
              </p>
              <ul className="mt-4 space-y-1.5">
                {col.links.map((link) => (
                  <li key={`${col.title}-${link.label}`}>
                    <a href={link.href} className="footer-link">
                      <span className="footer-link__tick" aria-hidden />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          ))}
        </div>

        <div className="footer-bottom mt-8 flex flex-col gap-3 border-t border-border pt-5 text-xs text-text-dim sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Verilumen Labs · Distributed Neural Trust</p>
          <p className="tracking-wide">
            <span className="footer-legal">Privacy</span>
            <span className="mx-2 opacity-40">·</span>
            <span className="footer-legal">Terms</span>
            <span className="mx-2 opacity-40">·</span>
            <span className="footer-legal">Security</span>
          </p>
        </div>
      </div>

      <div className="footer-wave-stage relative w-full">
        <FooterField />
      </div>
    </footer>
  )
}
