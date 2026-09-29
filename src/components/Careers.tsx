import { ScrollReveal } from './ui/ScrollReveal'
import { MagneticButton } from './ui/MagneticButton'

const disciplines = [
  'AI / ML',
  'ATE / Test',
  'Backend',
  'Frontend',
  'Research',
  'Automation',
]

const roles = [
  {
    title: 'ATE Test Engineer',
    tags: ['Systems', 'Performance', 'R&D'],
    location: 'Bangalore',
    experience: '2–6 years',
    desc: 'Develop, debug, and optimize automatic test programs for SoC, analog, mixed-signal, or digital ICs.',
  },
  {
    title: 'AI Engineer',
    tags: ['Machine Learning', 'Engineering'],
    location: 'Onsite / Hybrid / Remote',
    experience: '1–5+ years',
    desc: 'Design and deploy machine learning systems that convert semiconductor test data into actionable intelligence.',
  },
]

export function Careers() {
  return (
    <section id="careers" className="section-y">
      <div className="site">
        <div className="grid min-w-0 gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16">
          <ScrollReveal className="min-w-0">
            <p className="label-tech">Careers</p>
            <h2 className="fluid-section-title mt-3 text-text">
              Build the intelligence layer for semiconductor engineering
            </h2>
            <div className="section-rule mt-4" />
            <p className="fluid-section-lede mt-5">
              We turn engineering data into machine intelligence — for people who care about yield,
              test cost, and the systems behind both.
            </p>
            <p className="mt-8 font-mono text-[11px] tracking-[0.14em] text-text-dim uppercase">
              Disciplines
            </p>
            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
              {disciplines.map((d) => (
                <li key={d} className="text-sm text-text-muted">
                  {d}
                </li>
              ))}
            </ul>
          </ScrollReveal>

          <div className="min-w-0 space-y-4">
            {roles.map((role, i) => (
              <ScrollReveal key={role.title} delay={i * 0.06}>
                <article className="pro-panel flex h-full flex-col p-6 sm:p-7">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    {role.tags.map((tag, ti) => (
                      <span key={tag} className="font-mono text-[10px] tracking-[0.12em] text-accent uppercase">
                        {tag}
                        {ti < role.tags.length - 1 ? (
                          <span className="ml-2 text-text-dim" aria-hidden>
                            ·
                          </span>
                        ) : null}
                      </span>
                    ))}
                  </div>
                  <h3 className="mt-3 text-xl font-bold tracking-tight text-text">{role.title}</h3>
                  <div className="mt-4 grid grid-cols-2 gap-4 border-t border-border pt-4 text-sm">
                    <div>
                      <p className="font-mono text-[10px] tracking-[0.14em] text-text-dim uppercase">
                        Location
                      </p>
                      <p className="mt-1 text-text-muted">{role.location}</p>
                    </div>
                    <div>
                      <p className="font-mono text-[10px] tracking-[0.14em] text-text-dim uppercase">
                        Experience
                      </p>
                      <p className="mt-1 text-text-muted">{role.experience}</p>
                    </div>
                  </div>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-text-muted">{role.desc}</p>
                  <div className="mt-6">
                    <MagneticButton href="#contact" variant="secondary">
                      Apply Now →
                    </MagneticButton>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
