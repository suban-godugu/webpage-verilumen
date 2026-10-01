import { useReducedMotion } from 'framer-motion'

const traces = {
  fault: 'M0 18 H18 L28 8 L40 28 L52 18 H90 L100 6 L112 30 L140 18',
  warn: 'M0 18 H24 L34 10 L48 26 L70 18 L96 12 L120 22 L140 18',
  ok: 'M0 20 H16 L24 8 H40 L48 20 H70 L78 10 H96 L104 20 H140',
  idle: 'M0 20 H16 L24 8 H40 L48 20 H70 L78 10 H96 L104 20 H140',
}

export function Waveform({
  tone = 'ok',
  live = false,
}: {
  tone?: 'ok' | 'warn' | 'fault' | 'idle'
  live?: boolean
}) {
  const reduced = useReducedMotion()
  const path = traces[tone]
  const travel = live && !reduced && tone !== 'idle'

  return (
    <svg className={`bsp-wave-svg bsp-wave-svg--${tone}`} viewBox="0 0 140 36" aria-hidden>
      <line x1="0" y1="8" x2="140" y2="8" className="bsp-wave-grid" />
      <line x1="0" y1="18" x2="140" y2="18" className="bsp-wave-grid" />
      <line x1="0" y1="28" x2="140" y2="28" className="bsp-wave-grid" />
      <path className="bsp-wave-trace" d={path} />
      {travel ? (
        <circle className="bsp-wave-sample" r="1.8">
          <animateMotion dur="3.4s" repeatCount="indefinite" path={path} />
        </circle>
      ) : null}
    </svg>
  )
}
