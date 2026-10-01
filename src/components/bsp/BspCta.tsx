import { Link } from 'react-router-dom'
import type { BspSession } from './useBspSession'

export function BspCta({ session }: { session: BspSession }) {
  return (
    <section className="bsp-cta">
      <p className="label-tech">Start a run</p>
      <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
        Turn weeks of silicon validation into minutes.
      </h2>
      <p className="mt-3 max-w-2xl text-text-muted">
        Connect your board, run the validation suite, and let AI explain what failed — down to the register.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <button type="button" className="bsp-action bsp-action--primary" onClick={() => { session.selectMode('demo'); session.startDemo() }}>
          Run interactive demo
        </button>
        <Link to="/#contact" className="bsp-action">Talk to our engineering team</Link>
      </div>
    </section>
  )
}
