import { useEffect, useId, useState } from 'react'
import { engineFace, type EngineDef } from '../../data/bspPlatform'
import { Waveform } from './Waveform'

export function BspEngineModal({ engine, onClose }: { engine: EngineDef; onClose: () => void }) {
  const titleId = useId()
  const face = engineFace[engine.id]
  const [saved, setSaved] = useState(false)
  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(engine.params.map((param) => [param.id, param.options[0]])),
  )

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="bsp-modal" role="presentation" onClick={onClose}>
      <div role="dialog" aria-modal="true" aria-labelledby={titleId} className="bsp-modal__panel" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="label-tech">{engine.name} diagnostics</p>
            <h3 id={titleId} className="mt-2 text-xl font-semibold">{engine.name} signal and results</h3>
          </div>
          <button type="button" className="bsp-action" onClick={onClose}>Close</button>
        </div>
        <p className="mt-3 text-sm text-text-muted">{engine.tooltip}</p>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          {['TX', 'RX', 'CLK'].map((lane) => (
            <div key={lane} className="rounded-xl border border-border p-3">
              <p className="font-mono text-[10px] tracking-[0.14em] text-text-dim">{lane}</p>
              <Waveform tone={engine.id === 'i2c' || engine.id === 'can' ? 'warn' : 'ok'} />
            </div>
          ))}
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {engine.params.map((param) => (
            <label key={param.id} className="text-sm text-text-muted">
              {param.label}
              <select className="pro-field mt-1.5" value={values[param.id]} onChange={(event) => { setValues((current) => ({ ...current, [param.id]: event.target.value })); setSaved(true) }}>
                {param.options.map((option) => <option key={option}>{option}</option>)}
              </select>
            </label>
          ))}
        </div>
        <ul className="mt-4 space-y-1 text-sm">
          {face.results.map((result) => <li key={result}>✓ {result}</li>)}
        </ul>
        <p className="mt-4 text-sm text-accent">{face.insight}</p>
        {saved ? <p className="mt-2 text-sm text-text-muted">Saved for the next validation run.</p> : null}
      </div>
    </div>
  )
}
