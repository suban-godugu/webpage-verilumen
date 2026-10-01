import { useRef, useState, type MouseEvent } from 'react'
import { motion, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { Volume2, VolumeX, ChevronRight, Cpu } from 'lucide-react'
import { ParticleField } from './ParticleField'

const headline = 'AI-Driven Test Optimization for the Next Generation of Semiconductor Manufacturing'
const words = headline.split(' ')

export function Hero() {
  const reduced = useReducedMotion()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [muted, setMuted] = useState(true)

  // 3D Tilt Effect
  const mouseX = useSpring(0, { stiffness: 400, damping: 90 })
  const mouseY = useSpring(0, { stiffness: 400, damping: 90 })

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [4, -4])
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-4, 4])

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (reduced) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  function handleMouseLeave() {
    mouseX.set(0)
    mouseY.set(0)
  }

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
    <section 
      id="home" 
      className="relative min-h-[95vh] flex items-center pt-24 pb-16 overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute inset-0 pointer-events-none">
        <ParticleField className="absolute inset-0 opacity-60" />
        <div className="absolute top-0 right-0 w-[80vw] h-[80vw] bg-[radial-gradient(circle_at_center,var(--vl-glow-blue)_0,transparent_50%)] -translate-y-1/2 translate-x-1/3 opacity-40 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[60vw] h-[60vw] bg-[radial-gradient(circle_at_center,var(--vl-glow)_0,transparent_50%)] translate-y-1/3 -translate-x-1/4 opacity-40 blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-transparent to-bg-primary/90" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full relative z-10 grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
        <div className="max-w-3xl">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary font-mono text-xs font-semibold tracking-wider uppercase mb-8"
          >
            <Cpu size={14} />
            Semiconductor Intelligence
          </motion.div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-text leading-[1.1] mb-6">
            {words.map((word, i) => (
              <motion.span
                key={`${word}-${i}`}
                className="inline-block mr-[0.25em]"
                initial={reduced ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              >
                {word === 'AI-Driven' || word === 'Optimization' ? (
                  <span className="heading-gradient">{word}</span>
                ) : (
                  word
                )}
              </motion.span>
            ))}
          </h1>

          <motion.p
            className="text-lg md:text-xl text-text-muted leading-relaxed max-w-2xl mb-10"
            initial={reduced ? false : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Transform ATE test data into actionable intelligence for yield, failure analysis, test
            optimization, and manufacturing decisions.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={reduced ? false : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <a href="#solutions" className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-text text-bg-primary px-8 py-3.5 font-semibold transition-all hover:bg-text/90 overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.1)]">
              <span className="relative z-10 flex items-center gap-2">
                Explore Platform <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
            </a>
            <a href="#contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-elevated border border-border-subtle px-8 py-3.5 font-semibold text-text transition-all hover:border-primary/50 hover:bg-card">
              Talk to Our Team
            </a>
          </motion.div>
        </div>

        <motion.div
          style={{ rotateX, rotateY, transformPerspective: 1000 }}
          initial={reduced ? false : { opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative w-full aspect-square md:aspect-video lg:aspect-square max-w-[600px] mx-auto lg:mx-0"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-2xl blur-2xl opacity-60"></div>
          <div className="relative w-full h-full premium-card p-2 backdrop-blur-xl">
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary rounded-tl-xl -translate-x-1 -translate-y-1"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary rounded-tr-xl translate-x-1 -translate-y-1"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary rounded-bl-xl -translate-x-1 translate-y-1"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary rounded-br-xl translate-x-1 translate-y-1"></div>
            
            <div className="w-full h-full rounded-xl overflow-hidden bg-[#030712] relative border border-border-subtle">
              <video
                ref={videoRef}
                className="w-full h-full object-cover opacity-95"
                src="/home-hero.mp4"
                autoPlay={!reduced}
                muted
                loop
                playsInline
                preload={reduced ? 'metadata' : 'auto'}
                aria-label="Verilumen Platform Visualization"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/80 via-transparent to-transparent pointer-events-none"></div>
              
              <button
                type="button"
                onClick={toggleSound}
                className="absolute right-4 bottom-4 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full bg-elevated/80 border border-border-subtle text-text backdrop-blur-md transition-all hover:border-primary hover:text-primary hover:scale-105 shadow-lg"
                aria-pressed={!muted}
                aria-label={muted ? 'Unmute video' : 'Mute video'}
              >
                {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
