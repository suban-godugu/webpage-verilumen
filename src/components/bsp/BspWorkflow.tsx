import type { BspSession } from './useBspSession'

const stages = [
  { title: 'Silicon auto-discovery', kicker: 'Board connected' },
  { title: 'Firmware synthesis', kicker: 'Pins mapped' },
  { title: '12-engine validation', kicker: 'Signals live' },
  { title: 'AI root-cause diagnosis', kicker: 'Register evidence' },
]

export function BspWorkflow({ session }: { session: BspSession }) {
  const step = session.step

  return (
    <section className="space-y-5" aria-labelledby="bsp-flow">
      <div>
        <p className="label-tech">How it works</p>
        <h2 id="bsp-flow" className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Board to diagnosis, in one pass</h2>
      </div>
      <ol className="bsp-rail">
        {stages.map((stage, index) => (
          <li key={stage.title}>
            <button type="button" className={step === index ? 'is-on' : ''} onClick={() => session.setStep(index)}>
              <span>{index + 1}</span>
              {stage.title}
            </button>
          </li>
        ))}
      </ol>
      <div className="bsp-stage-panel">
        {step === 0 && (
          <div>
            <p className="label-tech">{stages[0].kicker}</p>
            <h3 className="mt-2 text-xl font-semibold">Chip detected</h3>
            <ul className="bsp-spec">
              <li>MCU</li>
              <li>On-chip core</li>
              <li>168 MHz</li>
              <li>1 MB flash</li>
              <li>SWD connected</li>
            </ul>
          </div>
        )}
        {step === 1 && (
          <div>
            <p className="label-tech">{stages[1].kicker}</p>
            <h3 className="mt-2 text-xl font-semibold">Generating test firmware</h3>
            <ul className="bsp-blocks">
              {['UART', 'SPI', 'I2C', 'GPIO', 'CAN-FD'].map((name) => (
                <li key={name}>{name}<span>built</span></li>
              ))}
            </ul>
          </div>
        )}
        {step === 2 && (
          <div>
            <p className="label-tech">{stages[2].kicker}</p>
            <h3 className="mt-2 text-xl font-semibold">Engines on the board</h3>
            <ul className="bsp-mini-grid">
              {Object.entries(session.statuses).map(([id, status]) => (
                <li key={id} className={`bsp-node--${status === 'fault' ? 'fault' : status === 'warning' ? 'warn' : status === 'testing' ? 'live' : status === 'validated' ? 'ok' : 'idle'}`}>
                  {id.toUpperCase()} <span>{status === 'ready' ? 'ready' : status}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {step === 3 && (
          <div className="bsp-cause">
            <p className="label-tech">{stages[3].kicker}</p>
            <ol>
              <li><span>Signal</span>I2C clock held low</li>
              <li><span>Register</span>I2C_SR1 · offset 0x14</li>
              <li><span>Flag</span>BERR</li>
              <li><span>AI</span>Clock stretching timeout</li>
              <li><span>Fix</span>Enable SMBus timeout</li>
            </ol>
          </div>
        )}
      </div>
    </section>
  )
}
