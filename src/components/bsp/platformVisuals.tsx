export type PlatformKind = 'MCU' | 'SOC' | 'BOARD'

export type PlatformVisual = {
  type: PlatformKind
  name: string
  architecture?: string
  interfaces: string[]
}

export function PlatformMark({
  type,
  name,
  className = '',
}: {
  type: PlatformKind
  name?: string
  className?: string
}) {
  return (
    <svg className={`platform-mark ${className}`} viewBox="0 0 160 110" role="img" aria-label={name ?? type}>
      {type === 'MCU' && <McuBody />}
      {type === 'SOC' && <SocBody />}
      {type === 'BOARD' && <BoardBody />}
      {name ? (
        <text x="80" y="104" textAnchor="middle" fill="#7F95A3" fontSize="9" fontFamily="IBM Plex Mono, monospace">
          {name}
        </text>
      ) : null}
    </svg>
  )
}

function McuBody() {
  return (
    <g>
      {Array.from({ length: 6 }, (_, i) => (
        <g key={i}>
          <rect x="28" y={18 + i * 10} width="10" height="4" fill="#19E6D0" />
          <rect x="122" y={18 + i * 10} width="10" height="4" fill="#19E6D0" />
        </g>
      ))}
      <rect x="36" y="14" width="88" height="68" rx="4" fill="#0b1c22" stroke="#19E6D0" />
      <rect x="52" y="30" width="56" height="28" rx="2" fill="#061016" stroke="#159FE8" />
      <text x="80" y="48" textAnchor="middle" fill="#F5F7FA" fontSize="11" fontFamily="Manrope, sans-serif" fontWeight="700">
        MCU
      </text>
    </g>
  )
}

function SocBody() {
  return (
    <g>
      <rect x="34" y="16" width="92" height="66" rx="6" fill="#0b1c22" stroke="#159FE8" />
      <rect x="48" y="28" width="64" height="42" rx="3" fill="#061016" stroke="#19E6D0" />
      <circle cx="80" cy="49" r="8" fill="none" stroke="#19E6D0" />
      <text x="80" y="52" textAnchor="middle" fill="#F5F7FA" fontSize="8" fontFamily="IBM Plex Mono, monospace">
        SoC
      </text>
    </g>
  )
}

function BoardBody() {
  return (
    <g>
      <rect x="16" y="16" width="128" height="70" rx="6" fill="#07141a" stroke="#19E6D0" />
      <path d="M28 32 H70 L84 46 H132" fill="none" stroke="#159FE8" strokeWidth="1" />
      <path d="M28 62 H90 L104 48 H132" fill="none" stroke="#19E6D0" strokeWidth="1" />
      <circle cx="28" cy="32" r="2" fill="#19E6D0" />
      <circle cx="132" cy="46" r="2" fill="#159FE8" />
    </g>
  )
}



export function EcosystemVisual({ still: _still }: { still?: boolean }) {
  return (
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-primary/20 shadow-[0_0_30px_var(--vl-glow)] group">
      <img
        src="/images/hero_intelligence_core.jpg"
        alt="Verilumen Intelligence Core"
        className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-[1.03]"
      />
      {/* Glossy glassmorphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-bg-primary/80 via-transparent to-primary/10 pointer-events-none" />
      
      {/* Scanline effect */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[repeating-linear-gradient(transparent,transparent_2px,#fff_3px,#fff_3px)]" />

      {/* Floating UI tags */}
      <div className="absolute top-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-md border border-primary/30 rounded-full">
        <span className="font-mono text-[9px] text-primary tracking-[0.2em] uppercase flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          Active Core
        </span>
      </div>
    </div>
  )
}
