import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useTheme } from '../../theme/useTheme'

type Accent = 'cyan' | 'purple' | 'green' | 'amber'

const accents: Record<
  Accent,
  {
    primary: string
    secondary: string
    glow: string
    border: string
    borderHover: string
    badge: string
  }
> = {
  cyan: {
    primary: '#22E6D0',
    secondary: '#2997FF',
    glow: 'rgba(34, 230, 208, 0.12)',
    border: 'rgba(34, 230, 208, 0.20)',
    borderHover: 'rgba(34, 230, 208, 0.50)',
    badge: 'text-[#22E6D0] border-[#22E6D0]/35 bg-[#22E6D0]/10',
  },
  purple: {
    primary: '#7667FF',
    secondary: '#2997FF',
    glow: 'rgba(118, 103, 255, 0.14)',
    border: 'rgba(118, 103, 255, 0.22)',
    borderHover: 'rgba(118, 103, 255, 0.55)',
    badge: 'text-[#9B8CFF] border-[#7667FF]/40 bg-[#7667FF]/10',
  },
  green: {
    primary: '#3DDC97',
    secondary: '#22E6D0',
    glow: 'rgba(61, 220, 151, 0.12)',
    border: 'rgba(61, 220, 151, 0.20)',
    borderHover: 'rgba(61, 220, 151, 0.50)',
    badge: 'text-[#3DDC97] border-[#3DDC97]/35 bg-[#3DDC97]/10',
  },
  amber: {
    primary: '#F0A63A',
    secondary: '#FF5364',
    glow: 'rgba(240, 166, 58, 0.14)',
    border: 'rgba(240, 166, 58, 0.22)',
    borderHover: 'rgba(240, 166, 58, 0.55)',
    badge: 'text-[#F0A63A] border-[#F0A63A]/40 bg-[#F0A63A]/10',
  },
}

function useCountUp(target: number, active: boolean, decimals = 1, duration = 1.2) {
  const reduced = useReducedMotion()
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!active || reduced) return
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / (duration * 1000))
      const eased = 1 - Math.pow(1 - t, 3)
      setValue(target * eased)
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active, target, duration, reduced])

  const current = reduced && active ? target : value
  return current.toFixed(decimals)
}

export function KpiCard({
  accent,
  title,
  kpi,
  kpiDecimals = 1,
  kpiSuffix = '%',
  subtext,
  badge,
  meta,
  children,
}: {
  accent: Accent
  title: string
  kpi: number
  kpiDecimals?: number
  kpiSuffix?: string
  subtext: string
  badge: string
  meta?: ReactNode
  children: ReactNode
}) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.35 })
  const reduced = useReducedMotion()
  const { theme } = useTheme()
  const a = accents[accent]
  const display = useCountUp(kpi, inView, kpiDecimals)

  return (
    <motion.article
      ref={ref}
      className="group relative flex min-h-0 flex-col overflow-hidden rounded-2xl border p-5 transition-all duration-300 sm:p-6 md:min-h-[430px]"
      style={
        {
          backgroundColor: theme === 'light' ? '#FFFFFF' : 'rgba(5, 15, 22, 0.94)',
          borderColor: a.border,
          boxShadow:
            theme === 'light'
              ? '0 12px 30px rgba(0, 0, 0, 0.05)'
              : '0 20px 60px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.035)',
          '--kpi-glow': a.glow,
          '--kpi-accent': a.primary,
        } as React.CSSProperties
      }
      initial={reduced ? false : { opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={
        reduced
          ? undefined
          : {
              y: -3,
              borderColor: a.borderHover,
              boxShadow:
                theme === 'light'
                  ? '0 16px 36px rgba(0, 0, 0, 0.08)'
                  : `0 25px 70px rgba(0, 0, 0, 0.35), 0 0 25px ${a.glow}, inset 0 1px 0 rgba(255, 255, 255, 0.05)`,
              transition: { duration: 0.28, ease: 'easeOut' },
            }
      }
    >
      {/* Subtle internal engineering grid (3-6% opacity) */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            'linear-gradient(var(--vl-border) 1px, transparent 1px), linear-gradient(90deg, var(--vl-border) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          maskImage: 'radial-gradient(ellipse at 50% 55%, black 25%, transparent 80%)',
        }}
      />

      {/* Top Header: Title & Badge */}
      <div className="relative z-10 flex items-start justify-between gap-3">
        <h3 className="text-[16px] sm:text-[17px] font-bold tracking-tight text-text leading-snug">
          {title}
        </h3>
        <span
          className={`shrink-0 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold tracking-wide ${a.badge}`}
        >
          ▲ {badge}
        </span>
      </div>

      {/* Main KPI Number (64-76px on desktop) */}
      <div className="relative z-10 mt-3 sm:mt-4">
        <p
          className="font-extrabold tracking-[-0.04em] text-text transition-all duration-300"
          style={{ fontSize: 'clamp(2.75rem, 4.4vw, 4.4rem)', lineHeight: 1 }}
        >
          {display}
          {kpiSuffix}
        </p>
        <p className="mt-1.5 text-[13px] sm:text-[14px] tracking-wide text-text-muted">{subtext}</p>
      </div>

      {/* Main Visualization Container */}
      <div className="relative z-10 mt-3.5 min-h-[140px] flex-1 opacity-90 transition-opacity duration-300 group-hover:opacity-100">
        {children}
      </div>

      {/* Secondary Metrics Meta */}
      {meta && <div className="relative z-10 mt-3.5 min-w-0">{meta}</div>}

      {/* Bottom Action Footer */}
      <div className="relative z-10 mt-auto flex items-center justify-between border-t border-border/50 pt-3.5">
        <span className="text-[11px] font-bold tracking-[0.2em] text-text-muted uppercase transition-colors group-hover:text-text">
          EXPLORE
        </span>
        <span
          className="font-mono text-base transition-transform duration-200 group-hover:translate-x-1"
          style={{ color: a.primary }}
          aria-hidden
        >
          →
        </span>
      </div>
    </motion.article>
  )
}

/* =======================================================================
   CARD 01: HistogramViz (Retest Reduction)
   ======================================================================= */
export function HistogramViz({ active }: { active: boolean }) {
  const reduced = useReducedMotion()
  const { theme } = useTheme()
  const ai = useMemo(() => [0.15, 0.28, 0.45, 0.72, 0.95, 0.78, 0.52, 0.34, 0.22, 0.12], [])
  const cur = useMemo(() => [0.08, 0.18, 0.32, 0.48, 0.55, 0.62, 0.7, 0.58, 0.4, 0.25], [])

  return (
    <div className="flex h-full w-full flex-col justify-end">
      <svg viewBox="0 0 280 120" className="h-full w-full" aria-hidden>
        {/* Engineering technical grid */}
        {[20, 40, 60, 80, 100].map((y) => (
          <line
            key={y}
            x1="8"
            x2="272"
            y1={y}
            y2={y}
            stroke={theme === 'light' ? 'rgba(7,18,25,0.06)' : 'rgba(255,255,255,0.05)'}
            strokeWidth="1"
          />
        ))}
        {/* Smooth Baseline */}
        <line x1="8" x2="272" y1="108" y2="108" stroke="rgba(34,230,208,0.30)" strokeWidth="1.5" />

        {/* AI Recommended distribution (cyan) */}
        {ai.map((h, i) => {
          const x = 16 + i * 26
          const height = h * 78
          const isPeak = i === 4
          return (
            <motion.rect
              key={`ai-${i}`}
              x={x}
              width="9"
              rx="1.5"
              fill="url(#histCyan)"
              style={{
                filter: isPeak ? 'drop-shadow(0 0 6px rgba(34,230,208,0.5))' : undefined,
              }}
              initial={reduced ? false : { height: 0, y: 108 }}
              animate={active ? { height, y: 108 - height } : { height: 0, y: 108 }}
              transition={{ duration: 0.6, delay: reduced ? 0 : i * 0.035, ease: [0.25, 1, 0.5, 1] }}
            />
          )
        })}

        {/* Current distribution (blue) */}
        {cur.map((h, i) => {
          const x = 26 + i * 26
          const height = h * 78
          const isPeak = i === 6
          return (
            <motion.rect
              key={`cur-${i}`}
              x={x}
              width="9"
              rx="1.5"
              fill="url(#histBlue)"
              opacity={0.82}
              style={{
                filter: isPeak ? 'drop-shadow(0 0 6px rgba(41,151,255,0.4))' : undefined,
              }}
              initial={reduced ? false : { height: 0, y: 108 }}
              animate={active ? { height, y: 108 - height } : { height: 0, y: 108 }}
              transition={{ duration: 0.6, delay: reduced ? 0 : 0.12 + i * 0.035, ease: [0.25, 1, 0.5, 1] }}
            />
          )
        })}

        <defs>
          <linearGradient id="histCyan" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22E6D0" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#22E6D0" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="histBlue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2997FF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#2997FF" stopOpacity="0.18" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

/* =======================================================================
   CARD 02: ShmooViz (SHMOO ML-Based Optimization)
   ======================================================================= */
export function ShmooViz({ active }: { active: boolean }) {
  const reduced = useReducedMotion()
  const { theme } = useTheme()

  const points = useMemo(() => {
    const pts: { x: number; y: number; kind: 'red' | 'blue' | 'opt' }[] = []
    const rand = (n: number) => {
      const x = Math.sin(n * 12.9898) * 43758.5453
      return x - Math.floor(x)
    }
    // Red failure data points
    for (let i = 0; i < 26; i++) {
      pts.push({
        x: 30 + rand(i) * 90,
        y: 25 + rand(i + 40) * 75,
        kind: 'red',
      })
    }
    // Blue pass/characterization data points
    for (let i = 0; i < 22; i++) {
      pts.push({
        x: 130 + rand(i + 80) * 100,
        y: 20 + rand(i + 120) * 70,
        kind: 'blue',
      })
    }
    // Cyan optimal region points
    for (let i = 0; i < 16; i++) {
      const a = rand(i + 200) * Math.PI * 2
      const r = rand(i + 240) * 26
      pts.push({
        x: 175 + Math.cos(a) * r,
        y: 55 + Math.sin(a) * r * 0.7,
        kind: 'opt',
      })
    }
    return pts
  }, [])

  const gridStroke = theme === 'light' ? 'rgba(7,18,25,0.06)' : 'rgba(255,255,255,0.05)'

  return (
    <div className="flex h-full w-full flex-col justify-end">
      <svg viewBox="0 0 280 120" className="h-full w-full" aria-hidden>
        {/* Subtle coordinate grid */}
        {Array.from({ length: 6 }, (_, i) => (
          <line key={`h${i}`} x1="10" x2="270" y1={15 + i * 18} y2={15 + i * 18} stroke={gridStroke} />
        ))}
        {Array.from({ length: 8 }, (_, i) => (
          <line key={`v${i}`} y1="10" y2="110" x1={20 + i * 32} x2={20 + i * 32} stroke={gridStroke} />
        ))}

        {/* Cyan optimal operating region */}
        <motion.ellipse
          cx="175"
          cy="55"
          rx="42"
          ry="30"
          fill="rgba(34, 230, 208, 0.12)"
          stroke="#22E6D0"
          strokeWidth="1.2"
          initial={reduced ? false : { opacity: 0, scale: 0.8 }}
          animate={active ? { opacity: 1, scale: 1 } : { opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          style={{ transformOrigin: '175px 55px' }}
        />

        {/* Selected operating region crosshair */}
        <line x1="167" y1="55" x2="183" y2="55" stroke="#22E6D0" strokeWidth="1" opacity="0.75" />
        <line x1="175" y1="47" x2="175" y2="63" stroke="#22E6D0" strokeWidth="1" opacity="0.75" />

        {/* Glowing selected node */}
        <motion.circle
          cx="175"
          cy="55"
          r="3"
          fill="#22E6D0"
          style={{ filter: 'drop-shadow(0 0 5px #22E6D0)' }}
          initial={reduced ? false : { scale: 0 }}
          animate={active ? { scale: 1 } : { scale: 0 }}
          transition={{ delay: 0.5 }}
        />

        {/* Curved optimization line */}
        <motion.path
          d="M40 95 C 90 88, 120 70, 155 55 C 170 48, 190 42, 230 38"
          fill="none"
          stroke="url(#shmooPath)"
          strokeWidth="1.5"
          strokeDasharray="4 3"
          initial={reduced ? false : { pathLength: 0, opacity: 0 }}
          animate={active ? { pathLength: 1, opacity: 0.9 } : { pathLength: 0, opacity: 0 }}
          transition={{ duration: 1.0, delay: 0.2 }}
        />

        {/* Scatter points */}
        {points.map((p, i) => (
          <motion.circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={p.kind === 'opt' ? 2.4 : 1.8}
            fill={p.kind === 'red' ? '#FF5364' : p.kind === 'blue' ? '#7667FF' : '#22E6D0'}
            initial={reduced ? false : { opacity: 0, scale: 0 }}
            animate={active ? { opacity: p.kind === 'opt' ? 1 : 0.75, scale: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3, delay: reduced ? 0 : 0.1 + i * 0.012 }}
          />
        ))}

        <defs>
          <linearGradient id="shmooPath" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FF5364" />
            <stop offset="55%" stopColor="#7667FF" />
            <stop offset="100%" stopColor="#22E6D0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

/* =======================================================================
   CARD 03: PatternCompareViz (Test Time Optimization)
   ======================================================================= */
export function PatternCompareViz({ active }: { active: boolean }) {
  const reduced = useReducedMotion()
  const particles = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        id: i,
        y: 22 + (i % 4) * 8,
        delay: i * 0.12,
      })),
    [],
  )

  return (
    <div className="relative flex h-full flex-col justify-end space-y-3 pt-1">
      {/* Bar 1: PATTERN SIZE 14.38 MB (cyan / blue) */}
      <div>
        <div className="mb-1.5 flex justify-between text-[10px] font-semibold tracking-[0.14em] text-text-dim uppercase">
          <span>Pattern Size</span>
          <span className="font-mono text-text-muted">14.38 MB</span>
        </div>
        <div className="h-2.5 overflow-hidden rounded-full bg-bg-elevated">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-[#2997FF] to-[#22E6D0] opacity-80"
            initial={reduced ? false : { width: 0 }}
            animate={active ? { width: '100%' } : { width: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          />
        </div>
      </div>

      {/* Bar 2: OPTIMIZED SIZE 8.63 MB (cyan / green with subtle glow) */}
      <div>
        <div className="mb-1.5 flex justify-between text-[10px] font-semibold tracking-[0.14em] text-text-dim uppercase">
          <span>Optimized Size</span>
          <span className="font-mono text-accent">8.63 MB</span>
        </div>
        <div className="h-2.5 overflow-hidden rounded-full bg-bg-elevated">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-[#22E6D0] to-[#3DDC97]"
            style={{
              boxShadow: '0 0 10px rgba(34, 230, 208, 0.28)',
            }}
            initial={reduced ? false : { width: 0 }}
            animate={active ? { width: '60%' } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 1, 0.5, 1] }}
          />
        </div>
      </div>

      {/* Data Flow track */}
      <div className="pt-0.5">
        <svg viewBox="0 0 280 38" className="h-9 w-full" aria-hidden>
          <line x1="30" y1="18" x2="250" y2="18" stroke="var(--vl-border)" strokeWidth="1" strokeDasharray="3 3" opacity="0.35" />
          {particles.map((p) => (
            <motion.circle
              key={p.id}
              r="1.8"
              fill="#22E6D0"
              cy={p.y}
              initial={{ cx: 30, opacity: 0 }}
              animate={
                active && !reduced
                  ? { cx: [30, 240], opacity: [0, 0.9, 0] }
                  : { cx: 30, opacity: 0 }
              }
              transition={{
                duration: 1.8,
                delay: p.delay,
                repeat: active && !reduced ? Infinity : 0,
                ease: 'easeInOut',
              }}
            />
          ))}
          <text x="10" y="34" fill="currentColor" className="fill-text-dim font-bold" fontSize="8" letterSpacing="0.16em">
            DATA FLOW
          </text>
        </svg>
      </div>
    </div>
  )
}

/* =======================================================================
   CARD 04: FailureMatrixViz (RA Advisor)
   ======================================================================= */
export function FailureMatrixViz({ active }: { active: boolean }) {
  const reduced = useReducedMotion()
  const { theme } = useTheme()

  const cells = useMemo(() => {
    const grid: { r: number; c: number; hot: boolean; mid: boolean }[] = []
    for (let r = 0; r < 6; r++) {
      for (let c = 0; c < 8; c++) {
        const cluster1 = r >= 1 && r <= 2 && c >= 1 && c <= 3
        const cluster2 = r >= 3 && r <= 4 && c >= 4 && c <= 6
        const isolated = (r === 2 && c === 5) || (r === 5 && c === 2)
        const cluster = cluster1 || cluster2 || isolated
        const edge = cluster && (r + c) % 3 === 0
        grid.push({ r, c, hot: cluster && !edge, mid: edge })
      }
    }
    return grid
  }, [])

  const cold = theme === 'light' ? '#B8C8D0' : '#16323C'

  return (
    <div className="flex h-full w-full flex-col justify-end">
      <svg viewBox="0 0 280 120" className="h-full w-full" aria-hidden>
        {/* Subtle connection paths within failure clusters */}
        <line x1="54" y1="30" x2="84" y2="46" stroke="rgba(255,83,100,0.22)" strokeWidth="0.8" />
        <line x1="84" y1="46" x2="114" y2="30" stroke="rgba(255,83,100,0.22)" strokeWidth="0.8" />
        <line x1="144" y1="62" x2="174" y2="78" stroke="rgba(255,83,100,0.22)" strokeWidth="0.8" />
        <line x1="174" y1="78" x2="204" y2="62" stroke="rgba(255,83,100,0.22)" strokeWidth="0.8" />

        {/* Matrix Nodes */}
        {cells.map((cell, i) => {
          const x = 24 + cell.c * 30
          const y = 14 + cell.r * 16
          const fill = cell.hot ? '#FF5364' : cell.mid ? '#F0A63A' : cold
          const r = cell.hot ? 3.2 : cell.mid ? 2.4 : 1.8
          return (
            <motion.circle
              key={i}
              cx={x}
              cy={y}
              r={r}
              fill={fill}
              style={{
                filter: cell.hot ? 'drop-shadow(0 0 5px rgba(255,83,100,0.65))' : undefined,
              }}
              initial={reduced ? false : { opacity: 0, scale: 0.4 }}
              animate={active ? { opacity: cell.hot ? 1 : cell.mid ? 0.75 : 0.35, scale: 1 } : { opacity: 0 }}
              transition={{ duration: 0.35, delay: reduced ? 0 : i * 0.008 }}
            />
          )
        })}

        {/* Defect cluster region bounding box 1 */}
        <motion.rect
          x="46"
          y="22"
          width="82"
          height="38"
          rx="4"
          fill="none"
          stroke="rgba(255,83,100,0.38)"
          strokeWidth="1.2"
          strokeDasharray="3 2"
          initial={{ opacity: 0 }}
          animate={active ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.4 }}
        />

        {/* Defect cluster region bounding box 2 */}
        <motion.rect
          x="138"
          y="54"
          width="84"
          height="38"
          rx="4"
          fill="none"
          stroke="rgba(240,166,58,0.32)"
          strokeWidth="1.2"
          strokeDasharray="3 2"
          initial={{ opacity: 0 }}
          animate={active ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.55 }}
        />
      </svg>
    </div>
  )
}

/* =======================================================================
   Intersection Observer VizGate
   ======================================================================= */
export function VizGate({ children }: { children: (active: boolean) => ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.35 })
  return (
    <div ref={ref} className="h-full w-full">
      {children(inView)}
    </div>
  )
}
