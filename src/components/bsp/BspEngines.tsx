import { Activity, AppWindow, ArrowLeftRight, Cable, Car, Cpu, Grid3x3, HardDrive, Monitor, Network, Tv, Usb, type LucideIcon } from 'lucide-react'
import { engineFace, engineGroups, engines, type EngineDef, type EngineStatus } from '../../data/bspPlatform'
import { Waveform } from './Waveform'
import type { BspSession } from './useBspSession'

const icons: Record<string, LucideIcon> = {
  uart: Cable, spi: ArrowLeftRight, i2c: Activity, gpio: Grid3x3, can: Car, ethernet: Network,
  usb: Usb, pcie: Cpu, emmc: HardDrive, hdmi: Monitor, edp: Tv, tft: AppWindow,
}

const labels: Record<EngineStatus, string> = {
  ready: 'Ready', testing: 'Testing', validated: 'Validated', warning: 'Warning', fault: 'Fault',
}

function toneOf(status: EngineStatus) {
  if (status === 'fault') return 'fault' as const
  if (status === 'warning') return 'warn' as const
  if (status === 'ready') return 'idle' as const
  return 'ok' as const
}

export function BspEngines({ session, onOpen }: { session: BspSession; onOpen: (engine: EngineDef) => void }) {
  return (
    <div className="space-y-6">
      {engineGroups.map((group) => (
        <div key={group.id}>
          <h3 className="font-mono text-[11px] tracking-[0.16em] text-text-dim uppercase">{group.title}</h3>
          <ul className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {engines.filter((engine) => engine.group === group.id).map((engine) => {
              const status = session.statuses[engine.id] ?? 'ready'
              const face = engineFace[engine.id]
              const counts = session.counts[engine.id]
              const Icon = icons[engine.id] ?? Activity
              return (
                <li key={engine.id} className={`bsp-engine ${status === 'testing' ? 'is-testing' : ''}`}>
                  <div className="flex items-start justify-between gap-3">
                    <span className="inline-flex items-center gap-2 text-sm font-semibold">
                      <Icon size={16} className="text-accent" aria-hidden />
                      {engine.name}
                    </span>
                    <span className={`bsp-pill bsp-pill--${status}`}>{labels[status]}</span>
                  </div>
                  <Waveform tone={toneOf(status)} live={status === 'testing'} />
                  <dl className="bsp-engine__stats">
                    <div><dt>{face.specLabel}</dt><dd>{face.specValue}</dd></div>
                    <div><dt>Latency</dt><dd>{status === 'ready' ? '—' : face.latency}</dd></div>
                    <div><dt>Pass</dt><dd>{counts ? counts.pass : '—'}</dd></div>
                    <div><dt>Fail</dt><dd>{counts ? counts.fail : '—'}</dd></div>
                  </dl>
                  <button type="button" className="text-xs text-accent" onClick={() => onOpen(engine)}>View diagnostics</button>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </div>
  )
}
