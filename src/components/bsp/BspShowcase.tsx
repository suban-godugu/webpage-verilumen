import { useRef, type MouseEvent, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useReducedMotion } from 'framer-motion'
import { ScrollReveal } from '../ui/ScrollReveal'
import { SemiconductorField } from './SemiconductorField'
import { EcosystemVisual } from './platformVisuals'
import {
  architectures,
  bspLinks,
  bspStack,
  formFactors,
  hardwareTiles,
  heroSupport,
  platformTags,
  stackLayers,
  understandLayers,
  workflow,
} from '../../data/bspShowcase'

export function BspShowcase() {
  const reduced = useReducedMotion()

  return (
    <div className="bsp-lab relative overflow-hidden pt-24 pb-20">
      <SemiconductorField />
      <div className="site relative z-10 space-y-20 sm:space-y-24">
        <ScrollReveal>
        <header className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div>
            <p className="text-sm text-text-muted">
              <Link to="/#solutions" className="hover:text-accent">Solutions</Link>
              <span className="mx-2 opacity-40">/</span>
              BSP Validation
            </p>
            <p className="label-tech mt-6">Silicon + BSP intelligence</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-text leading-[1.1] mt-5">Universal Silicon & BSP Validation</h1>
            <p className="mt-5 text-xl md:text-2xl text-text-muted font-medium">Built for the hardware you build.</p>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-text-muted">{heroSupport}</p>
            <p className="mt-6">
              <Link to="/#solutions" className="text-sm text-accent">← Back to Solutions</Link>
            </p>
          </div>
          <HeroStage still={Boolean(reduced)}>
            <EcosystemVisual still={Boolean(reduced)} />
          </HeroStage>
        </header>
        </ScrollReveal>

        <ScrollReveal>
        <section>
          <p className="label-tech">Platform coverage</p>
          <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">Any silicon. Any board. Any BSP.</h2>
          <ul className="mt-5 flex flex-wrap gap-2">
            {platformTags.map((tag) => (
              <li key={tag} className="show-tag">{tag}</li>
            ))}
          </ul>
          <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-text-muted">
            {architectures.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
        </ScrollReveal>

        <section>
          <p className="label-tech">What we validate</p>
          <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">Built for heterogeneous hardware</h2>
          <p className="mt-2 max-w-2xl text-sm text-text-muted">One validation intelligence layer across diverse silicon and embedded platforms.</p>
          <div className="hardware-row mt-6 grid gap-4 lg:grid-cols-3">
            {hardwareTiles.map((tile) => (
                <article key={tile.title} className="show-card flex flex-col group">
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-5 border border-border-subtle bg-bg-secondary"><img src={tile.type === 'MCU' ? '/images/mcu_hardware_chip.jpg' : tile.type === 'SOC' ? '/images/soc_processor.jpg' : '/images/custom_pcb_board.jpg'} alt={tile.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100" /><div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-80" /></div>
                <h3 className="text-lg font-semibold">{tile.title}</h3>
                <p className="text-sm text-accent">{tile.lede}</p>
                <ul className="mt-3 space-y-1 text-sm text-text-muted">
                  {tile.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section>
          <p className="label-tech">Product story</p>
          <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">From silicon to software</h2>
          <ol className="show-flow mt-6">
            {stackLayers.map((layer) => (
              <li key={layer.code} className="show-card">
                <p className="font-mono text-[11px] tracking-[0.16em] text-accent">{layer.code}</p>
                <h3 className="mt-1 font-semibold">{layer.title}</h3>
                <ul className="mt-3 space-y-1 text-sm text-text-muted">
                  {layer.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </section>

        <section>
          <p className="label-tech">Workflow</p>
          <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">How VERILUMEN works</h2>
          <div className="workflow-row mt-6 grid gap-4 lg:grid-cols-4">
            {workflow.map((step) => (
              <article key={step.code} className="show-card">
                <p className="font-mono text-[11px] tracking-[0.16em] text-accent">{step.code}</p>
                <h3 className="mt-1 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-text-muted">{step.body}</p>
                {step.code === '01' && (
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden mt-5 border border-border-subtle bg-bg-secondary group">
                    <img
                      src="/images/hardware_discovery.jpg"
                      alt="Hardware Discovery"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-80" />
                  </div>
                )}
                {step.code === '02' && (
                  <ol className="mt-4 space-y-1 text-sm">
                    {understandLayers.map((layer) => (
                      <li key={layer}>{layer}</li>
                    ))}
                  </ol>
                )}
                {step.coverage && (
                  <div className="mt-4">
                    <p className="font-mono text-[11px] tracking-[0.14em] text-text-dim uppercase">Validation coverage</p>
                    <ul className="mt-2 flex flex-wrap gap-2">
                      {step.coverage.map((item) => (
                        <li key={item} className="show-tag">{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {step.chain && (
                  <ol className="mt-4 space-y-1 text-sm text-accent">
                    {step.chain.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                )}
              </article>
            ))}
          </div>
        </section>

        <section>
          <p className="label-tech">Platform forms</p>
          <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">From component to complete platform</h2>
          <div className="form-row mt-6 grid gap-4 lg:grid-cols-2">
            {formFactors.map((card) => (<article key={card.title} className="show-card flex flex-col group"><div className="relative w-full aspect-video rounded-lg overflow-hidden mb-5 border border-border-subtle bg-bg-secondary"><img src={card.type === 'SOC' ? '/images/soc_processor.jpg' : '/images/custom_pcb_board.jpg'} alt={card.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100" /><div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-80" /></div>
                <h3 className="text-lg font-semibold">{card.title}</h3>
                <p className="mt-2 text-sm text-text-muted">{card.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section>
          <p className="label-tech">BSP validation</p>
          <h2 className="mt-2 max-w-2xl text-2xl font-semibold sm:text-3xl">Validate the software layer that brings silicon to life.</h2>
          <div className="mt-6 grid items-start gap-6 lg:grid-cols-[16rem_1fr]">
            <ol className="show-stack">
              {bspStack.map((layer) => (
                <li key={layer} className={layer === 'BSP' ? 'is-bsp' : undefined}>{layer}</li>
              ))}
            </ol>
            <ul className="grid gap-2 sm:grid-cols-3">
              {bspLinks.map((item) => (
                <li key={item} className="show-tag" title="Software layer connecting silicon capabilities with the operating environment and drivers.">{item}</li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
}

function HeroStage({ still, children }: { still: boolean; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  function tilt(event: MouseEvent<HTMLDivElement>) {
    const plate = ref.current
    if (still || !plate) return
    const bounds = plate.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width - 0.5
    const y = (event.clientY - bounds.top) / bounds.height - 0.5
    plate.style.setProperty('--tilt-x', `${(-y * 14).toFixed(2)}deg`)
    plate.style.setProperty('--tilt-y', `${(x * 16).toFixed(2)}deg`)
  }

  function reset() {
    const plate = ref.current
    if (!plate) return
    plate.style.removeProperty('--tilt-x')
    plate.style.removeProperty('--tilt-y')
  }

  return (
    <div className="bsp-stage" onMouseMove={tilt} onMouseLeave={reset}>
      <div ref={ref} className="bsp-stage__plate">
        {children}
      </div>
      <div className="bsp-stage__shadow" aria-hidden />
    </div>
  )
}




