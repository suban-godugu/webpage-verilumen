import { valueRows } from '../../data/bspPlatform'

export function BspCompare() {
  return (
    <section className="space-y-5" aria-labelledby="bsp-why">
      <div>
        <p className="label-tech">Why Verilumen</p>
        <h2 id="bsp-why" className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Weeks of lab work, compressed</h2>
      </div>
      <div className="space-y-3">
        {valueRows.map((row) => (
          <article key={row.title} className="bsp-value">
            <h3>{row.title}</h3>
            <p><span>Traditional</span>{row.traditional}</p>
            <p><span>Verilumen</span>{row.platform}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
