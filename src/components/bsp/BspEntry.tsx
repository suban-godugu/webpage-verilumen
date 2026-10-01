import { Link } from 'react-router-dom'

export function BspEntry() {
  return (
    <Link to="/solutions/bsp-validation" className="bsp-entry group relative block rounded-2xl border border-border-subtle bg-card p-6 shadow-[var(--vl-shadow-sm)] transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_25px_var(--vl-glow)]">
      <span className="bsp-entry__scan" aria-hidden />
      <span className="bsp-entry__mote bsp-entry__mote--1" aria-hidden />
      <span className="bsp-entry__mote bsp-entry__mote--2" aria-hidden />
      <span className="bsp-entry__mote bsp-entry__mote--3" aria-hidden />
      <span className="flex items-start justify-between gap-4">
        <span>
          <span className="label-tech">BSP Validation</span>
          <span className="mt-2 block text-lg font-semibold tracking-tight text-text">
            Silicon and BSP Validation
          </span>
        </span>
        <span className="bsp-entry__node" aria-hidden />
      </span>
      <span className="mt-3 block text-sm leading-relaxed text-text-muted">
        Validate MCUs, SoCs, boards, and BSPs — from silicon discovery to engineering insight.
      </span>
      <span className="mt-5 flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.16em] text-accent uppercase">
          <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_var(--vl-primary)]" />
          Validation ready
        </span>
        <span className="bsp-entry__chev font-mono text-sm text-accent" aria-hidden>
          →
        </span>
      </span>
    </Link>
  )
}
