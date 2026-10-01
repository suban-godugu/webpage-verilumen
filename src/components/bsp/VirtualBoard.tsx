import { engines, type EngineStatus } from '../../data/bspPlatform'

const left = ['uart', 'spi', 'i2c', 'gpio', 'can', 'ethernet']
const right = ['usb', 'pcie', 'emmc', 'hdmi', 'edp', 'tft']

function tone(status: EngineStatus | undefined) {
  if (status === 'fault') return 'fault'
  if (status === 'warning') return 'warn'
  if (status === 'testing') return 'live'
  if (status === 'validated') return 'ok'
  return 'idle'
}

export function VirtualBoard({
  statuses,
  live,
}: {
  statuses: Record<string, EngineStatus>
  live?: boolean
}) {
  const nodes = [
    ...left.map((id, index) => ({ id, index, side: 'left' as const })),
    ...right.map((id, index) => ({ id, index, side: 'right' as const })),
  ]

  return (
    <svg className="bsp-board" viewBox="0 0 720 390" role="img" aria-label="Virtual development board">
      <defs>
        <linearGradient id="bsp-pcb" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0c2420" />
          <stop offset="100%" stopColor="#07141a" />
        </linearGradient>
        <pattern id="bsp-copper" width="16" height="16" patternUnits="userSpaceOnUse">
          <path d="M0 8 H16 M8 0 V16" stroke="rgba(25,230,208,0.08)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect x="8" y="8" width="704" height="374" rx="18" fill="url(#bsp-pcb)" stroke="rgba(25,230,208,0.32)" strokeWidth="1" />
      <rect x="28" y="24" width="664" height="332" rx="8" fill="url(#bsp-copper)" />
      {Array.from({ length: 5 }, (_, i) => (
        <circle key={`via-t-${i}`} cx={286 + i * 32} cy={104} r="1.7" fill="none" stroke="rgba(25,230,208,0.4)" strokeWidth="1" />
      ))}
      {Array.from({ length: 5 }, (_, i) => (
        <circle key={`via-b-${i}`} cx={286 + i * 32} cy={286} r="1.7" fill="none" stroke="rgba(24,168,255,0.35)" strokeWidth="1" />
      ))}
      {nodes.map((node) => {
        const engine = engines.find((item) => item.id === node.id)
        const y = 42 + node.index * 54
        const x = node.side === 'left' ? 28 : 602
        const padX = node.side === 'left' ? 122 : 598
        const pinX = node.side === 'left' ? 250 : 470
        const pinY = 136 + node.index * 20
        const elbow = node.side === 'left' ? 186 : 534
        const path = `M ${padX} ${y + 11} H ${elbow} L ${pinX} ${pinY}`
        const state = tone(statuses[node.id])
        return (
          <g key={node.id} className={`bsp-node bsp-node--${state}`}>
            <path d={path} fill="none" stroke="currentColor" strokeWidth="1" />
            <circle cx={(padX + elbow) / 2} cy={y + 11} r="1.6" fill="#07141a" stroke="currentColor" strokeWidth="1" />
            {live && state !== 'idle' ? (
              <circle r="2" fill="currentColor">
                <animateMotion dur={`${2.2 + (node.index % 3) * 0.3}s`} repeatCount="indefinite" path={path} />
              </circle>
            ) : null}
            <rect x={x} y={y} width="90" height="22" rx="4" fill="#071018" stroke="currentColor" strokeWidth="1" />
            <circle cx={padX} cy={y + 11} r="3.2" fill="#071018" stroke="currentColor" strokeWidth="1" />
            <circle cx={pinX} cy={pinY} r="2.2" fill="currentColor" />
            <text x={node.side === 'left' ? 36 : 684} y={y + 15} textAnchor={node.side === 'left' ? 'start' : 'end'} fill="currentColor" fontSize="10" fontFamily="IBM Plex Mono, monospace">
              {engine?.name}
            </text>
          </g>
        )
      })}
      <g>
        {Array.from({ length: 6 }, (_, i) => {
          const y = 132 + i * 20
          return (
            <g key={`mcu-pin-${i}`}>
              <rect x="238" y={y} width="14" height="6" rx="1" fill="#19E6D0" />
              <rect x="468" y={y} width="14" height="6" rx="1" fill="#19E6D0" />
            </g>
          )
        })}
        {Array.from({ length: 8 }, (_, i) => {
          const x = 278 + i * 20
          return (
            <g key={`mcu-pin-tb-${i}`}>
              <rect x={x} y="108" width="6" height="12" rx="1" fill="#19E6D0" />
              <rect x={x} y="266" width="6" height="12" rx="1" fill="#19E6D0" />
            </g>
          )
        })}
        <rect x="250" y="118" width="220" height="150" rx="6" fill="#0b1c22" stroke="#19E6D0" strokeWidth="1" />
        <rect x="292" y="156" width="136" height="74" rx="3" fill="#061016" stroke="rgba(24,168,255,0.7)" strokeWidth="1" />
        <text x="360" y="198" textAnchor="middle" fill="#F5F7FA" fontSize="18" fontFamily="Manrope, sans-serif" fontWeight="700">
          MCU
        </text>
      </g>
      <text x="36" y="372" fill="#8FA3B2" fontSize="10" fontFamily="IBM Plex Mono, monospace">
        12 INTERFACES
      </text>
    </svg>
  )
}
