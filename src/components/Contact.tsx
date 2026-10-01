import { useState, type FormEvent } from 'react'
import { ScrollReveal } from './ui/ScrollReveal'
import { MagneticButton } from './ui/MagneticButton'

const interests = [
  'ATE Optimization',
  'Yield Analysis',
  'Failure Analysis',
  'Test Cost',
  'AI / ML Engineering',
]

export function Contact() {
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const email = String(data.get('email') || '')
    if (!email.includes('@')) {
      setError('Enter a valid work email.')
      return
    }
    setError('')
    setDone(true)
    e.currentTarget.reset()
  }

  return (
    <section id="contact" className="section-editorial border-t section-y">
      <div className="site grid min-w-0 gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
        <ScrollReveal className="min-w-0">
          <p className="label-tech">Contact</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-text leading-tight mt-3">Talk to our team</h2>
          <div className="section-rule mt-4" />
          <p className="text-lg md:text-xl text-text-muted leading-relaxed mt-5">
            Share your semiconductor test challenge &mdash; yield, retest, SHMOO, or cost &mdash; and we'll
            follow up with the right engineering contact.
          </p>
          <ul className="mt-8 space-y-2.5">
            {interests.map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-text-muted">
                <span className="h-px w-4 bg-accent/70" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </ScrollReveal>

        <ScrollReveal className="min-w-0" delay={0.08}>
          {done ? (
            <div className="pro-panel p-8 text-center sm:p-10">
              <p className="label-tech">Request received</p>
              <h3 className="mt-3 text-2xl font-bold tracking-tight text-text">Thank you</h3>
              <p className="mt-3 text-sm text-text-muted">
                Our team will review your note and follow up shortly.
              </p>
              <button
                type="button"
                className="mt-6 text-sm font-semibold text-accent transition hover:opacity-80"
                onClick={() => setDone(false)}
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="pro-panel space-y-4 p-6 sm:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field id="contact-name" name="name" label="Full Name" placeholder="Full Name" required />
                <Field
                  id="contact-email"
                  name="email"
                  type="email"
                  label="Work Email"
                  placeholder="you@company.com"
                  required
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field id="contact-company" name="company" label="Company" placeholder="Company" required />
                <Field
                  id="contact-position"
                  name="position"
                  label="Position / Role"
                  placeholder="Test Engineer, Yield Lead"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="contact-interest"
                  className="mb-2 block font-mono text-[10px] tracking-[0.14em] text-text-muted uppercase"
                >
                  Area of Interest
                </label>
                <select
                  id="contact-interest"
                  name="interest"
                  required
                  className="pro-field"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select an area
                  </option>
                  {interests.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="contact-message"
                  className="mb-2 block font-mono text-[10px] tracking-[0.14em] text-text-muted uppercase"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  placeholder="What test data challenges are you solving?"
                  className="pro-field resize-y"
                />
              </div>
              {error && <p className="text-sm text-critical">{error}</p>}
              <MagneticButton type="submit">Submit Request &rarr;</MagneticButton>
            </form>
          )}
        </ScrollReveal>
      </div>
    </section>
  )
}

function Field({
  id,
  name,
  label,
  placeholder,
  required,
  type = 'text',
}: {
  id: string
  name: string
  label: string
  placeholder: string
  required?: boolean
  type?: string
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block font-mono text-[10px] tracking-[0.14em] text-text-muted uppercase"
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="pro-field"
      />
    </div>
  )
}
