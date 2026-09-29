import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import { useTheme } from '../theme/useTheme'

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  core: boolean
}

export function ParticleField({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = useReducedMotion()
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let w = 0
    let h = 0
    let visible = true
    let particles: Particle[] = []

    const countFor = () => {
      if (reduced) return 40
      return window.innerWidth < 768 ? 70 : 140
    }

    const seed = () => {
      const n = countFor()
      particles = Array.from({ length: n }, (_, i) => ({
        x: Math.random(),
        y: Math.random(),
        vx: (Math.random() - 0.5) * 0.00022,
        vy: (Math.random() - 0.5) * 0.00022,
        r: i % 17 === 0 ? 2.4 : 0.9 + Math.random() * 1.1,
        core: i % 17 === 0,
      }))
      if (!particles.some((p) => p.core)) particles[0].core = true
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      w = rect.width
      h = rect.height
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      seed()
    }

    const styles = () => {
      const cs = getComputedStyle(document.documentElement)
      return {
        particle: cs.getPropertyValue('--vl-particle').trim() || 'rgba(34,230,208,0.55)',
        line: cs.getPropertyValue('--vl-particle-line').trim() || 'rgba(41,151,255,0.22)',
        primary: cs.getPropertyValue('--vl-primary').trim() || '#22e6d0',
        secondary: cs.getPropertyValue('--vl-secondary').trim() || '#2997ff',
      }
    }

    const draw = () => {
      if (!visible) {
        raf = requestAnimationFrame(draw)
        return
      }
      const { particle, line, primary, secondary } = styles()
      ctx.clearRect(0, 0, w, h)

      const pts = particles.map((p) => {
        if (!reduced) {
          p.x += p.vx
          p.y += p.vy
          if (p.x < 0 || p.x > 1) p.vx *= -1
          if (p.y < 0 || p.y > 1) p.vy *= -1
          p.x = Math.min(1, Math.max(0, p.x))
          p.y = Math.min(1, Math.max(0, p.y))
        }
        return { ...p, px: p.x * w, py: p.y * h }
      })

      const linkDist = Math.min(w, h) * 0.12
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i]!
          const b = pts[j]!
          const d = Math.hypot(a.px - b.px, a.py - b.py)
          if (d > linkDist) continue
          ctx.strokeStyle = line
          ctx.globalAlpha = 0.18 * (1 - d / linkDist)
          ctx.lineWidth = 0.7
          ctx.beginPath()
          ctx.moveTo(a.px, a.py)
          ctx.lineTo(b.px, b.py)
          ctx.stroke()
        }
      }
      ctx.globalAlpha = 1

      pts.forEach((p) => {
        ctx.beginPath()
        ctx.fillStyle = p.core ? secondary : particle
        ctx.arc(p.px, p.py, p.r, 0, Math.PI * 2)
        ctx.fill()
        if (p.core) {
          ctx.strokeStyle = primary
          ctx.globalAlpha = 0.35
          ctx.beginPath()
          ctx.arc(p.px, p.py, 10, 0, Math.PI * 2)
          ctx.stroke()
          ctx.globalAlpha = 1
        }
      })

      raf = requestAnimationFrame(draw)
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
    }, { threshold: 0.05 })
    io.observe(canvas)
    document.addEventListener('visibilitychange', () => {
      visible = document.visibilityState === 'visible'
    })
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
    }
  }, [reduced, theme])

  return (
    <canvas
      ref={canvasRef}
      className={`h-full w-full ${className}`}
      aria-hidden
    />
  )
}
