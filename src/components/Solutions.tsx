import { motion, useReducedMotion } from 'framer-motion'
import {
  FailureMatrixViz,
  HistogramViz,
  KpiCard,
  PatternCompareViz,
  ShmooViz,
  VizGate,
} from './visuals/SolutionKpiCards'
import { SolutionsParticleField } from './visuals/SolutionsParticleField'

export function Solutions() {
  const reduced = useReducedMotion()

  return (
    <section
      id="solutions"
      className="section-editorial relative overflow-hidden border-y section-y"
    >
      <SolutionsParticleField />

      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_15%_40%,var(--vl-glow),transparent_52%),radial-gradient(ellipse_at_85%_40%,var(--vl-glow-blue),transparent_52%)]" />

      <div className="site relative z-10">
        <div className="max-w-3xl">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.45 }}
          >
            <p className="label-tech">Solutions</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-text leading-tight mt-3">
              Intelligence for every stage of semiconductor test
            </h2>
            <div className="section-rule mt-4" />
            <p className="text-lg md:text-xl text-text-muted leading-relaxed mt-5">
              AI-powered modules for retest reduction, SHMOO optimization, test-time compression, and
              root-cause advisory — built for ATE engineering teams.
            </p>
          </motion.div>
        </div>

        <div className="mt-10 grid grid-cols-1 items-stretch gap-5 sm:mt-12 md:grid-cols-2 md:gap-6 xl:grid-cols-4">
          <KpiCard
            accent="cyan"
            title="Retest Reduction"
            kpi={22.4}
            badge="22.4%"
            subtext="Retest rate reduced"
            meta={
              <div className="grid min-w-0 grid-cols-2 gap-3 text-xs">
                <div className="min-w-0 rounded-lg border border-border/50 bg-bg-elevated/40 px-3 py-2">
                  <p className="font-mono text-[9px] tracking-widest truncate text-text-dim uppercase">
                    AI Recommended
                  </p>
                  <p className="mt-0.5 text-sm font-bold text-accent">119.0</p>
                  <p className="text-[10px] text-text-muted">Devices</p>
                </div>
                <div className="min-w-0 rounded-lg border border-border/50 bg-bg-elevated/40 px-3 py-2">
                  <p className="font-mono text-[9px] tracking-widest truncate text-text-dim uppercase">
                    Current
                  </p>
                  <p className="mt-0.5 text-sm font-bold text-text">24.0</p>
                  <p className="text-[10px] text-text-muted">Devices</p>
                </div>
              </div>
            }
          >
            <VizGate>{(active) => <HistogramViz active={active} />}</VizGate>
          </KpiCard>

          <KpiCard
            accent="purple"
            title="SHMOO ML-Based Optimization"
            kpi={96.4}
            kpiDecimals={2}
            badge="96.40%"
            subtext="Yield improvement"
            meta={
              <div className="grid min-w-0 grid-cols-2 gap-3 text-xs">
                <div className="min-w-0 rounded-lg border border-border/50 bg-bg-elevated/40 px-3 py-2">
                  <p className="font-mono text-[9px] tracking-widest truncate text-text-dim uppercase">
                    Margin
                  </p>
                  <p className="mt-0.5 text-sm font-bold text-text">4.2%</p>
                </div>
                <div className="min-w-0 rounded-lg border border-border/50 bg-bg-elevated/40 px-3 py-2">
                  <p className="font-mono text-[9px] tracking-widest truncate text-text-dim uppercase">
                    Characterization
                  </p>
                  <p className="mt-0.5 text-sm font-bold text-text">92.58%</p>
                </div>
              </div>
            }
          >
            <VizGate>{(active) => <ShmooViz active={active} />}</VizGate>
          </KpiCard>

          <KpiCard
            accent="green"
            title="Test Time Optimization"
            kpi={18.5}
            badge="18.5%"
            subtext="Reduction in test time"
            meta={
              <div className="grid min-w-0 grid-cols-2 gap-3 text-xs">
                <div className="min-w-0 rounded-lg border border-border/50 bg-bg-elevated/40 px-3 py-2">
                  <p className="font-mono text-[9px] tracking-widest truncate text-text-dim uppercase">
                    Pattern Size
                  </p>
                  <p className="mt-0.5 text-sm font-bold text-text">14.38 MB</p>
                </div>
                <div className="min-w-0 rounded-lg border border-border/50 bg-bg-elevated/40 px-3 py-2">
                  <p className="font-mono text-[9px] tracking-widest truncate text-text-dim uppercase">
                    Optimized Size
                  </p>
                  <p className="mt-0.5 text-sm font-bold text-accent">8.63 MB</p>
                </div>
              </div>
            }
          >
            <VizGate>{(active) => <PatternCompareViz active={active} />}</VizGate>
          </KpiCard>

          <KpiCard
            accent="amber"
            title="RA Advisor"
            kpi={100}
            kpiDecimals={2}
            badge="100.00%"
            subtext="Root cause accuracy"
          >
            <VizGate>{(active) => <FailureMatrixViz active={active} />}</VizGate>
          </KpiCard>
        </div>
      </div>
    </section>
  )
}


