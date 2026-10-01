import { diagnosis, failureTimeline, i2cRegister, signalViews } from '../../data/bspPlatform'
import { Waveform } from './Waveform'
import type { BspSession } from './useBspSession'

const checks = ['Discovering silicon', 'Generating firmware', 'Initializing engines', 'Running peripherals', 'Analyzing signals', 'AI diagnosis']

function checkState(index: number, session: BspSession) {
  const cursor = { idle: -1, discovering: 0, synthesizing: 1, testing: 3, analyzing: 4, completed: 6 }[session.phase]
  if (index < cursor) return 'done'
  if (index === cursor) return 'now'
  return 'wait'
}

export function BspChecklist({ session }: { session: BspSession }) {
  return (
    <ol className="bsp-checks">
      {checks.map((label, index) => (
        <li key={label} className={`is-${checkState(index, session)}`}>{label}</li>
      ))}
    </ol>
  )
}

export function BspInsight({ session }: { session: BspSession }) {
  const view = signalViews.find((item) => item.id === session.signal) ?? signalViews[2]
  const fault = session.diagnosisOn && !session.healthy

  return (
    <div className="space-y-4">
      <section className="pro-panel p-4 sm:p-5">
        <p className="label-tech">Signal intelligence</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {signalViews.map((item) => (
            <button key={item.id} type="button" className={`bsp-filter ${session.signal === item.id ? 'is-on' : ''}`} onClick={() => session.setSignal(item.id)}>
              {item.label}
            </button>
          ))}
        </div>
        <Waveform tone={fault && (view.id === 'i2c' || view.id === 'can') ? (view.id === 'i2c' ? 'fault' : 'warn') : 'ok'} live={session.running} />
        <dl className="bsp-engine__stats">
          <div><dt>Frequency</dt><dd>{view.freq}</dd></div>
          <div><dt>Voltage</dt><dd>{view.voltage}</dd></div>
          <div><dt>Timing</dt><dd>{view.timing}</dd></div>
          <div><dt>Rate</dt><dd>{view.rate}</dd></div>
          <div><dt>Errors</dt><dd>{fault ? view.errors : '0'}</dd></div>
        </dl>
      </section>

      <section className={`pro-panel p-4 sm:p-5 ${fault ? 'bsp-diagnosis' : ''}`}>
        <p className="label-tech">AI silicon diagnosis</p>
        {session.diagnosisOn ? (
          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            <div>
              <h3 className="text-sm font-semibold">Signal</h3>
              <Waveform tone={session.healthy ? 'ok' : 'fault'} live={session.running} />
              <p className="text-sm text-text-muted">{session.healthy ? 'All watched lines stayed inside timing.' : 'I2C clock held low past the timeout.'}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Fault</h3>
              <p className="mt-2 text-sm text-text-muted">{session.healthy ? 'No register fault asserted.' : diagnosis.title}</p>
              {!session.healthy && <p className="mt-2 font-mono text-xs text-text-dim">I2C_SR1 · offset 0x14 · BERR</p>}
            </div>
            <div>
              <h3 className="text-sm font-semibold">{session.healthy ? 'Result' : 'Recommended action'}</h3>
              <p className="mt-2 text-sm text-text-muted">{session.healthy ? 'Suite completed with every interface validated.' : diagnosis.recommendation}</p>
              <p className="mt-3 font-mono text-[11px] tracking-[0.12em] text-accent uppercase">{session.healthy ? '100% of watched registers clear' : diagnosis.confidence}</p>
            </div>
          </div>
        ) : (
          <p className="mt-3 text-sm text-text-muted">Run the suite. A fault lights the signal, the register bit, and the recommended fix.</p>
        )}
      </section>

      <section className="pro-panel p-4 sm:p-5">
        <p className="label-tech">Register inspector</p>
        <p className="mt-2 text-sm font-semibold">{i2cRegister.name}</p>
        <p className="font-mono text-xs text-text-dim">Address {i2cRegister.address}</p>
        <table className="mt-3 w-full text-left text-sm">
          <thead>
            <tr className="text-text-dim"><th className="py-1 font-medium">Bit</th><th className="font-medium">Name</th><th className="font-medium">Value</th></tr>
          </thead>
          <tbody>
            {i2cRegister.bits.map((bit) => (
              <tr key={bit.bit} className={fault && bit.fault ? 'bsp-bit' : ''}>
                <td className="py-1 font-mono">{bit.bit}</td>
                <td>{bit.name}</td>
                <td className="font-mono">{fault ? bit.value : 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="pro-panel p-4 sm:p-5">
        <p className="label-tech">From signal to root cause</p>
        <ol className="bsp-timeline">
          {failureTimeline.map((item, index) => (
            <li key={item.time} className={session.diagnosisOn ? 'is-on' : ''} style={{ animationDelay: `${index * 120}ms` }}>
              <span>{item.time}</span>
              {item.label}
            </li>
          ))}
        </ol>
      </section>
    </div>
  )
}
