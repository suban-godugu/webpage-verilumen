import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { VirtualBoard } from './VirtualBoard'
import type { BspSession } from './useBspSession'

function useCount(target: number) {
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting || started.current) return
      started.current = true
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduced) {
        setValue(target)
        return
      }
      const begin = performance.now()
      let frame = 0
      const tick = (now: number) => {
        const progress = Math.min(1, (now - begin) / 900)
        setValue(Math.round(target * (1 - (1 - progress) ** 3)))
        if (progress < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
      return () => cancelAnimationFrame(frame)
    }, { threshold: 0.4 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [target])

  return { ref, value }
}

export function BspHero({ session }: { session: BspSession }) {
  const time = useCount(80)
  const engines = useCount(12)
  const coverage = useCount(92)
  const active = Object.values(session.statuses).filter((status) => status === 'testing').length

  function runDemo() {
    document.getElementById('bsp-lab')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    session.startDemo()
  }

  return (
    <header className="bsp-hero">
      <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
        <p className="text-text-muted">
          <Link to="/#solutions" className="hover:text-accent">Solutions</Link>
          <span className="mx-2 opacity-40">/</span>
          <span>BSP Validation</span>
        </p>
        <Link to="/#solutions" className="text-accent">← Back to Solutions</Link>
      </div>

      <div className="mt-8 grid items-center gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div>
          <p className="label-tech">Silicon + BSP intelligence</p>
          <h1 className="bsp-hero__title mt-3">
            Universal AI-driven
            <br />
            silicon & BSP validation
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-text-muted">
            Automatically discover silicon, generate validation firmware, execute multi-peripheral tests, and diagnose register-level failures with AI.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button type="button" className="bsp-action bsp-action--primary" onClick={runDemo}>Run live demo</button>
            <button type="button" className="bsp-action" onClick={session.scanHardware}>Scan physical hardware</button>
          </div>
          <div className="bsp-mode mt-5" role="group" aria-label="Validation mode">
            <button type="button" className={session.mode === 'demo' ? 'is-on' : ''} aria-pressed={session.mode === 'demo'} onClick={() => session.selectMode('demo')}>
              Interactive demo
            </button>
            <button type="button" className={session.mode === 'lab' ? 'is-on' : ''} aria-pressed={session.mode === 'lab'} onClick={() => session.selectMode('lab')}>
              Live lab hardware
            </button>
          </div>
          <p className="mt-4 flex items-center gap-2 text-sm text-text-muted">
            <span className={`bsp-dot ${session.mode === 'demo' ? 'is-on' : ''}`} />
            {session.mode === 'demo' ? 'Interactive simulation ready' : 'Waiting for a connected board'}
          </p>
          <div ref={time.ref} className="bsp-metrics">
            <p><strong>60–{time.value}%</strong><span>Validation time reduction</span></p>
            <p ref={engines.ref}><strong>{engines.value}</strong><span>AI validation engines</span></p>
            <p ref={coverage.ref}><strong>{coverage.value}%</strong><span>Register-level coverage</span></p>
          </div>
        </div>

        <div className="bsp-stage">
          {session.mode === 'lab' ? (
            <div className="bsp-empty">
              <p className="label-tech">No hardware detected</p>
              <p className="mt-3 text-lg font-semibold">Connect a development board to begin physical validation.</p>
              <button type="button" className="bsp-action mt-5" onClick={session.scanHardware}>Scan for hardware</button>
            </div>
          ) : (
            <VirtualBoard statuses={session.statuses} live={session.running || session.phase === 'completed'} />
          )}
          <aside className="bsp-float bsp-float--a">
            <p>Target</p>
            <strong>MCU</strong>
            <p>Core</p>
            <strong>On-chip microcontroller</strong>
            <p>Flash</p>
            <strong>1 MB · SWD</strong>
            <p>Status</p>
            <strong>{session.phase === 'completed' ? 'Validated' : session.running ? 'Running' : 'Validation ready'}</strong>
          </aside>
          <aside className="bsp-float bsp-float--b">
            <p>Peripherals <strong>12</strong></p>
            <p>Active <strong>{active}</strong></p>
            <p>Pass <strong>{session.passTotal || '—'}</strong></p>
            <p>Fail <strong>{session.diagnosisOn ? session.failTotal : '—'}</strong></p>
          </aside>
        </div>
      </div>
    </header>
  )
}
