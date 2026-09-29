import { useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Volume2, VolumeX } from 'lucide-react'
import { MagneticButton } from './ui/MagneticButton'
import { ParticleField } from './ParticleField'

const headline = 'AI-Driven ATE Test Optimization testing solution for the Next Generation of Semiconductor Manufacturing'
const words = headline.split(' ')

export function Hero() {
  const reduced = useReducedMotion()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [muted, setMuted] = useState(true)

  function toggleSound() {
    const video = videoRef.current
    if (!video) return
    const nextMuted = !video.muted
    video.muted = nextMuted
    if (!nextMuted) {
      video.volume = 1
      if (video.paused) void video.play()
    }
    setMuted(nextMuted)
  }

  return (
    <section id="home" className="hero-fit relative flex items-center overflow-x-hidden">
      <div className="pointer-events-none absolute inset-0">
        <ParticleField className="absolute inset-0" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_30%,var(--vl-glow),transparent_42%),radial-gradient(ellipse_at_85%_15%,var(--vl-glow-blue),transparent_40%)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg-primary via-bg-primary/78 to-bg-primary/35" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg-primary to-transparent" />
      </div>

      <div className="site relative z-10 grid items-center gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(16rem,0.85fr)] lg:gap-14">
        <div className="max-w-4xl">
          <motion.p
            className="label-tech mb-5"
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Semiconductor Test Intelligence
          </motion.p>

          <motion.p
            className="mb-4 font-semibold tracking-[0.08em] text-accent uppercase"
            style={{ fontSize: 'clamp(1.15rem, 2.4vw, 1.65rem)' }}
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.12 }}
          >
            VERILUMEN LABS
          </motion.p>

          <h1 className="fluid-hero-title max-w-full font-bold text-balance text-text">
            {words.map((word, i) => (
              <motion.span
                key={`${word}-${i}`}
                className="mr-[0.28em] inline-block"
                initial={reduced ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.22 + i * 0.035, ease: [0.22, 1, 0.36, 1] }}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            className="fluid-hero-body mt-6 text-text-muted"
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.85 }}
          >
            Transform ATE test data into actionable intelligence for yield, failure analysis, test
            optimization, and manufacturing decisions.
          </motion.p>

          <motion.div
            className="mt-9 flex w-full max-w-md flex-col gap-3 sm:max-w-none sm:flex-row sm:flex-wrap"
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 1 }}
          >
            <MagneticButton href="#solutions">Explore Solutions →</MagneticButton>
            <MagneticButton href="#contact" variant="secondary">
              Talk to Our Team →
            </MagneticButton>
          </motion.div>
        </div>

        <motion.div
          className="w-full min-w-0"
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.35 }}
        >
          <div className="relative overflow-hidden rounded-2xl border border-accent/25 bg-bg-card shadow-[0_0_28px_var(--vl-glow)]">
            <video
              ref={videoRef}
              className="max-h-[min(68svh,36rem)] w-full bg-black object-contain"
              src="/home-hero.mp4"
              autoPlay={!reduced}
              muted
              loop
              playsInline
              preload={reduced ? 'metadata' : 'auto'}
              aria-label="Verilumen Labs"
            />
            <button
              type="button"
              onClick={toggleSound}
              className="absolute right-3 bottom-3 inline-flex h-9 items-center gap-2 rounded-full border border-accent/40 bg-bg-primary/85 px-3 text-xs font-medium tracking-wide text-text backdrop-blur-sm transition hover:border-accent hover:text-accent"
              aria-pressed={!muted}
              aria-label={muted ? 'Unmute video' : 'Mute video'}
            >
              {muted ? <VolumeX size={15} aria-hidden /> : <Volume2 size={15} aria-hidden />}
              {muted ? 'Unmute' : 'Mute'}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
