import { useEffect, useRef, useState } from 'react'
import type { EngineDef, EventChannel } from '../../data/bspPlatform'
import { BspEngineModal } from './BspEngineModal'
import { BspEngines } from './BspEngines'
import { BspChecklist, BspInsight } from './BspInsight'
import { VirtualBoard } from './VirtualBoard'
import type { BspSession } from './useBspSession'

const filters: { id: 'all' | EventChannel; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'uart', label: 'UART' },
  { id: 'can', label: 'CAN-FD' },
  { id: 'i2c', label: 'I2C' },
  { id: 'ai', label: 'AI' },
]

export function BspLab({ session }: { session: BspSession }) {
  const [filter, setFilter] = useState<(typeof filters)[number]['id']>('all')
  const [open, setOpen] = useState<EngineDef | null>(null)
  const logRef = useRef<HTMLDivElement>(null)
  const visible = session.events.filter((event) => filter === 'all' || event.channel === filter)

  useEffect(() => {
    const node = logRef.current
    if (!node) return
    node.scrollTop = node.scrollHeight
  }, [session.events, filter])

  return (
    <section id="bsp-lab" className="scroll-mt-28 space-y-6" aria-labelledby="bsp-lab-title">
      <div>
        <p className="label-tech">Validation lab</p>
        <h2 id="bsp-lab-title" className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Silicon validation lab</h2>
        <p className="mt-2 max-w-2xl text-sm text-text-muted">Run the complete validation suite and watch the silicon telemetry evolve in real time.</p>
      </div>

      {session.mode === 'lab' ? (
        <div className="bsp-empty">
          <p className="label-tech">No hardware detected</p>
          <p className="mt-3 text-lg font-semibold">Connect a development board to begin physical validation.</p>
          <button type="button" className="bsp-action mt-5" onClick={session.scanHardware}>Scan for hardware</button>
        </div>
      ) : (
        <VirtualBoard statuses={session.statuses} live={session.running || session.phase !== 'idle'} />
      )}

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_16rem]">
        <div>
          <div className="flex flex-wrap gap-3">
            <button type="button" className="bsp-action bsp-action--primary" disabled={session.running} onClick={session.mode === 'demo' ? session.startDemo : session.scanHardware}>
              {session.running ? 'Validation in progress' : session.phase === 'completed' ? 'Run again' : 'Run full validation suite'}
            </button>
            <button type="button" className="bsp-action" disabled={session.running || session.mode === 'lab'} onClick={session.startHealthy}>
              Simulate healthy run
            </button>
          </div>
          <div className="bsp-progress mt-4" aria-hidden><span style={{ width: `${session.progress}%` }} /></div>
          <p className="mt-1 font-mono text-[11px] text-text-dim">{Math.round(session.progress)}%</p>
          {session.labNote ? <p className="mt-3 text-sm text-warning">{session.labNote}</p> : null}
        </div>
        <BspChecklist session={session} />
      </div>

      <BspEngines session={session} onOpen={setOpen} />

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <div className="pro-panel bsp-scope overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-3 py-3">
            <p className="label-tech">Live telemetry</p>
            <div className="flex flex-wrap gap-2">
              {filters.map((item) => (
                <button key={item.id} type="button" className={`bsp-filter ${filter === item.id ? 'is-on' : ''}`} aria-pressed={filter === item.id} onClick={() => setFilter(item.id)}>
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          <div ref={logRef} className="bsp-terminal" aria-live="polite">
            {visible.length === 0 ? <p className="text-text-dim">No events in this view yet.</p> : visible.map((event) => (
              <p key={event.id} className={`bsp-log bsp-log--${event.level}`}>
                <span>{event.time}</span>
                <span>{event.label}</span>
                <span>{event.message}</span>
                <span>{event.state}</span>
              </p>
            ))}
          </div>
        </div>
        <BspInsight session={session} />
      </div>
      {open ? <BspEngineModal engine={open} onClose={() => setOpen(null)} /> : null}
    </section>
  )
}
