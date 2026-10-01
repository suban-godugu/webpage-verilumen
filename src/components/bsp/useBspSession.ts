import { useEffect, useRef, useState } from 'react'
import { engines, type EngineStatus, type EventChannel, type EventLevel } from '../../data/bspPlatform'

export type Phase = 'idle' | 'discovering' | 'synthesizing' | 'testing' | 'analyzing' | 'completed'
export type BspMode = 'demo' | 'lab'

export type TelemetryEvent = {
  id: string
  time: string
  channel: EventChannel
  label: string
  level: EventLevel
  state: string
  message: string
}

type BeatApi = {
  setPhase: (phase: Phase) => void
  setStep: (step: number) => void
  setEngine: (id: string, status: EngineStatus, pass: number, fail: number) => void
  push: (event: Omit<TelemetryEvent, 'id'>) => void
  showDiagnosis: () => void
  finish: () => void
}

const IDLE = 'Interactive simulation ready. Run the validation suite.'

function clock(ms: number) {
  const total = Math.max(0, Math.floor(ms))
  const minutes = Math.floor(total / 60000)
  const seconds = Math.floor((total % 60000) / 1000)
  const hundredths = Math.floor((total % 1000) / 10)
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(hundredths).padStart(2, '0')}`
}

function readyMap() {
  return Object.fromEntries(engines.map((engine) => [engine.id, 'ready' as EngineStatus]))
}

function buildBeats(healthy: boolean): { at: number; apply: (api: BeatApi) => void }[] {
  const beats: { at: number; apply: (api: BeatApi) => void }[] = [
    {
      at: 280,
      apply: ({ setPhase, setStep, push }) => {
        setPhase('discovering')
        setStep(0)
        push({ time: clock(280), channel: 'system', label: 'Discovery', level: 'info', state: 'TESTING', message: 'Silicon scan started on the debug connection.' })
      },
    },
    {
      at: 1100,
      apply: ({ push }) => {
        push({ time: clock(1100), channel: 'system', label: 'Discovery', level: 'pass', state: 'PASS', message: 'MCU identified on the debug connection.' })
      },
    },
    {
      at: 1500,
      apply: ({ setPhase, setStep, push }) => {
        setPhase('synthesizing')
        setStep(1)
        push({ time: clock(1500), channel: 'system', label: 'Firmware', level: 'info', state: 'TESTING', message: 'Validation firmware generating for discovered pins.' })
      },
    },
    {
      at: 2400,
      apply: ({ setPhase, setStep, push }) => {
        setPhase('testing')
        setStep(2)
        push({ time: clock(2400), channel: 'system', label: 'Engines', level: 'pass', state: 'PASS', message: 'Firmware ready. Twelve engines initialized.' })
      },
    },
  ]

  engines.forEach((engine, index) => {
    const start = 2700 + index * 460
    const channel: EventChannel = engine.id === 'uart' ? 'uart' : engine.id === 'can' ? 'can' : engine.id === 'i2c' ? 'i2c' : 'system'
    const fault = !healthy && engine.id === 'i2c'
    const warn = !healthy && engine.id === 'can'
    beats.push({
      at: start,
      apply: ({ setEngine, push }) => {
        setEngine(engine.id, 'testing', 0, 0)
        push({ time: clock(start), channel, label: engine.name, level: 'info', state: 'TESTING', message: `${engine.checks[0]} in progress.` })
      },
    })
    beats.push({
      at: start + 320,
      apply: ({ setEngine, push }) => {
        const status: EngineStatus = fault ? 'fault' : warn ? 'warning' : 'validated'
        setEngine(engine.id, status, engine.passes, fault || warn ? 1 : 0)
        push({
          time: clock(start + 320),
          channel,
          label: engine.name,
          level: fault ? 'error' : warn ? 'warn' : 'pass',
          state: fault ? 'FAIL' : warn ? 'WARNING' : 'PASS',
          message: fault
            ? 'Clock held low for more than 25 ms at address 0x48.'
            : warn
              ? 'CRC timing sits outside the expected window.'
              : `${engine.checks[0]} passed.`,
        })
      },
    })
  })

  const end = 2700 + engines.length * 460 + 360
  beats.push({
    at: end,
    apply: ({ setPhase, setStep, push, showDiagnosis }) => {
      setPhase('analyzing')
      setStep(3)
      push({
        time: clock(end),
        channel: 'ai',
        label: 'AI diagnosis',
        level: healthy ? 'pass' : 'warn',
        state: healthy ? 'PASS' : 'WARNING',
        message: healthy
          ? 'All twelve interfaces validated. No register fault found.'
          : 'I2C bus lockup explained. 98.4% match to the published silicon note.',
      })
      showDiagnosis()
    },
  })
  beats.push({
    at: end + 420,
    apply: ({ setPhase, finish }) => {
      setPhase('completed')
      finish()
    },
  })
  return beats
}

export function useBspSession() {
  const [mode, setMode] = useState<BspMode>('demo')
  const [phase, setPhase] = useState<Phase>('idle')
  const [healthy, setHealthy] = useState(false)
  const [running, setRunning] = useState(false)
  const [progress, setProgress] = useState(0)
  const [step, setStep] = useState(0)
  const [statuses, setStatuses] = useState<Record<string, EngineStatus>>(readyMap)
  const [counts, setCounts] = useState<Record<string, { pass: number; fail: number }>>({})
  const [events, setEvents] = useState<TelemetryEvent[]>([
    { id: 'idle', time: '00:00.00', channel: 'system', label: 'Demo', level: 'info', state: 'INFO', message: IDLE },
  ])
  const [diagnosisOn, setDiagnosisOn] = useState(false)
  const [labNote, setLabNote] = useState<string | null>(null)
  const [signal, setSignal] = useState<'uart' | 'spi' | 'i2c' | 'can' | 'ethernet'>('i2c')
  const [runId, setRunId] = useState(0)
  const timers = useRef<number[]>([])
  const generation = useRef(0)

  const clearTimers = () => {
    timers.current.forEach((id) => window.clearTimeout(id))
    timers.current = []
  }

  useEffect(() => () => clearTimers(), [])

  useEffect(() => {
    if (!running) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const duration = reduced ? 1700 : 10400
    const started = performance.now()
    const tick = window.setInterval(() => {
      const next = Math.min(100, ((performance.now() - started) / duration) * 100)
      setProgress(next)
      if (next >= 100) window.clearInterval(tick)
    }, 50)
    return () => window.clearInterval(tick)
  }, [running, runId])

  function resetVisuals() {
    setStatuses(readyMap())
    setCounts({})
    setDiagnosisOn(false)
    setProgress(0)
    setStep(0)
    setPhase('idle')
    setEvents([])
  }

  function start(nextHealthy: boolean) {
    const token = generation.current + 1
    generation.current = token
    setMode('demo')
    setHealthy(nextHealthy)
    setLabNote(null)
    setSignal(nextHealthy ? 'uart' : 'i2c')
    clearTimers()
    resetVisuals()
    setRunning(true)
    setRunId((id) => id + 1)

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const scale = reduced ? 1700 / 10400 : 1
    let serial = 0
    const live = () => generation.current === token
    const api: BeatApi = {
      setPhase: (next) => {
        if (live()) setPhase(next)
      },
      setStep: (next) => {
        if (live()) setStep(next)
      },
      setEngine: (id, status, pass, fail) => {
        if (!live()) return
        setStatuses((current) => ({ ...current, [id]: status }))
        if (status !== 'testing') setCounts((current) => ({ ...current, [id]: { pass, fail } }))
      },
      push: (event) => {
        if (!live()) return
        serial += 1
        setEvents((current) => [...current.slice(-18), { ...event, id: `e-${token}-${serial}` }])
      },
      showDiagnosis: () => {
        if (live()) setDiagnosisOn(true)
      },
      finish: () => {
        if (!live()) return
        setRunning(false)
        setProgress(100)
      },
    }

    buildBeats(nextHealthy).forEach((beat) => {
      const id = window.setTimeout(() => beat.apply(api), Math.round(beat.at * scale))
      timers.current.push(id)
    })
  }

  function scanHardware() {
    generation.current += 1
    clearTimers()
    setRunning(false)
    setMode('lab')
    setPhase('idle')
    setProgress(0)
    setStep(0)
    setStatuses(readyMap())
    setCounts({})
    setDiagnosisOn(false)
    setHealthy(false)
    setLabNote('No hardware detected. Connect a development board to begin physical validation.')
    setEvents([
      {
        id: 'lab-empty',
        time: '00:00.00',
        channel: 'system',
        label: 'Hardware',
        level: 'warn',
        state: 'INFO',
        message: 'No board detected. The interactive demo can run without hardware.',
      },
    ])
  }

  function selectMode(next: BspMode) {
    if (next === 'lab') {
      scanHardware()
      return
    }
    generation.current += 1
    clearTimers()
    setMode('demo')
    setLabNote(null)
    setRunning(false)
    setPhase('idle')
    setProgress(0)
    setStep(0)
    setStatuses(readyMap())
    setCounts({})
    setDiagnosisOn(false)
    setEvents([{ id: 'idle', time: '00:00.00', channel: 'system', label: 'Demo', level: 'info', state: 'INFO', message: IDLE }])
  }

  const tested = Object.values(statuses).filter((status) => status === 'validated' || status === 'warning' || status === 'fault').length
  const passTotal = Object.values(counts).reduce((sum, item) => sum + item.pass, 0)
  const failTotal = Object.values(counts).reduce((sum, item) => sum + item.fail, 0)

  return {
    mode,
    phase,
    healthy,
    running,
    progress,
    step,
    setStep,
    statuses,
    counts,
    events,
    diagnosisOn,
    labNote,
    signal,
    setSignal,
    tested,
    passTotal,
    failTotal,
    startDemo: () => start(false),
    startHealthy: () => start(true),
    scanHardware,
    selectMode,
  }
}

export type BspSession = ReturnType<typeof useBspSession>
