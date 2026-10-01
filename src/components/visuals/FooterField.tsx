import { useEffect, useRef } from 'react'
import { useTheme } from '../../theme/useTheme'

function hexToRgba(hex: string, alpha: number) {
  const clean = hex.replace('#', '')
  const r = parseInt(clean.substring(0, 2), 16)
  const g = parseInt(clean.substring(2, 4), 16)
  const b = parseInt(clean.substring(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${Math.max(0, Math.min(1, alpha))})`
}

export function FooterField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let width = 0
    let height = 0
    let animationFrame = 0
    let visible = true
    let running = false

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isLight = theme === 'light'
    const far = isLight ? '#1A56DB' : '#2563FF'
    const mid = isLight ? '#0D80E8' : '#00B8FF'
    const near = isLight ? '#00A99D' : '#00E5D4'
    const spark = isLight ? '#00A99D' : '#8FFFF8'

    function paint(seconds: number) {
      if (!ctx) return
      ctx.clearRect(0, 0, width, height)
      const rows = width < 768 ? 11 : 18
      const cols = width < 768 ? 28 : 52
      const horizon = height * 0.02
      const floor = height - 0.5
      const speed = reducedMotion ? 0 : seconds * 0.95

      for (let r = 0; r < rows; r++) {
        const t = r / (rows - 1)
        const depth = 0.22 + t * 0.78
        const yBase = horizon + (floor - horizon) * (0.04 + t * 0.96)
        const spread = 0.78 + depth * 0.28
        const amp = height * (0.012 + depth * 0.05)
        const size = t < 0.34 ? 0.35 + t * 0.9 : t < 0.68 ? 0.62 + (t - 0.34) * 1.05 : 0.85 + (t - 0.68) * 1.55
        const alpha = 0.35 + depth * 0.35
        const color = t < 0.34 ? far : t < 0.68 ? mid : near

        for (let c = 0; c < cols; c++) {
          const u = c / (cols - 1)
          const x = width * 0.5 + (u - 0.5) * width * spread
          if (x < -4 || x > width + 4) continue
          const wave =
            Math.sin(u * Math.PI * 3.2 + r * 0.42 + speed) * amp +
            Math.sin(u * Math.PI * 1.4 - speed * 0.55 + r * 0.18) * amp * 0.45
          const y = Math.min(floor, yBase + wave)
          if (y < 0) continue

          const bright = (c + r) % 53 === 0 && t > 0.78
          ctx.fillStyle = hexToRgba(bright ? spark : color, bright ? 0.7 : alpha)
          ctx.beginPath()
          ctx.arc(x, y, size, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }

    function render(time: number) {
      running = false
      if (!visible) return
      paint(time * 0.001)
      if (!reducedMotion) {
        running = true
        animationFrame = requestAnimationFrame(render)
      }
    }

    function start() {
      if (running || reducedMotion || !visible) return
      running = true
      animationFrame = requestAnimationFrame(render)
    }

    function resize() {
      if (!canvas || !ctx) return
      const rect = canvas.getBoundingClientRect()
      width = Math.max(1, Math.floor(rect.width || window.innerWidth))
      height = Math.max(1, Math.floor(rect.height || 1))
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75)
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      paint(reducedMotion ? 0 : performance.now() * 0.001)
    }

    const ro = new ResizeObserver(resize)
    if (canvas.parentElement) ro.observe(canvas.parentElement)
    else ro.observe(canvas)

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = Boolean(entry?.isIntersecting)
        if (visible) start()
        else {
          cancelAnimationFrame(animationFrame)
          running = false
        }
      },
      { threshold: 0.02 },
    )
    io.observe(canvas)

    resize()
    start()

    return () => {
      cancelAnimationFrame(animationFrame)
      ro.disconnect()
      io.disconnect()
    }
  }, [theme])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="footer-wave pointer-events-none absolute inset-0 h-full w-full"
    />
  )
}
