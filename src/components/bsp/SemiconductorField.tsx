import { useEffect, useRef } from 'react'
import { useTheme } from '../../theme/useTheme'

export function SemiconductorField() {
  const ref = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return
    let frame = 0
    let width = 0
    let height = 0
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    // Neural node particles
    const particleCount = 45
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0005,
      vy: (Math.random() - 0.5) * 0.0005,
      size: Math.random() * 1.5 + 0.5,
      colorIndex: Math.random() > 0.5 ? 0 : 1, // 0 = Cyan, 1 = Blue
    }))

    function resize() {
      if (!canvas || !ctx) return
      const rect = canvas.getBoundingClientRect()
      width = Math.max(1, rect.width)
      height = Math.max(1, rect.height)
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function paint(_now: number) {
      if (!ctx) return
      ctx.clearRect(0, 0, width, height)
      
      const isLight = theme === 'light'
      const cyan = isLight ? '13, 148, 136' : '25, 230, 208'
      const blue = isLight ? '2, 132, 199' : '24, 168, 255'
      const maxDistance = 180
      const alphaMult = isLight ? 0.35 : 0.25

      // Update and draw particles
      particles.forEach((p, i) => {
        if (!reduced) {
          p.x += p.vx
          p.y += p.vy
          
          // Bounce off edges smoothly
          if (p.x < -0.1 || p.x > 1.1) p.vx *= -1
          if (p.y < -0.1 || p.y > 1.1) p.vy *= -1
        }

        const px = p.x * width
        const py = p.y * height

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const px2 = p2.x * width
          const py2 = p2.y * height
          const dx = px - px2
          const dy = py - py2
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * alphaMult
            ctx.beginPath()
            ctx.moveTo(px, py)
            ctx.lineTo(px2, py2)
            const color = p.colorIndex === 0 ? cyan : blue
            ctx.strokeStyle = `rgba(${color}, ${alpha})`
            ctx.lineWidth = isLight ? 1.2 : 1
            ctx.stroke()
          }
        }

        // Draw particle
        ctx.beginPath()
        ctx.arc(px, py, p.size, 0, Math.PI * 2)
        const pColor = p.colorIndex === 0 ? cyan : blue
        ctx.fillStyle = `rgba(${pColor}, ${isLight ? 0.9 : 0.8})`
        ctx.shadowColor = `rgba(${pColor}, 1)`
        ctx.shadowBlur = isLight ? 4 : 8
        ctx.fill()
        ctx.shadowBlur = 0
      })
    }

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    resize()
    const loop = (now: number) => {
      paint(reduced ? 0 : now)
      if (!reduced) frame = requestAnimationFrame(loop)
    }
    frame = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(frame)
      ro.disconnect()
    }
  }, [theme])

  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-80 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-bg-primary to-bg-secondary/20" />
      
      {/* Ambient orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[140px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-secondary/10 blur-[150px] rounded-full" />
      
      <canvas ref={ref} className="relative z-10 w-full h-full" aria-hidden />
      
      {/* Soft gradient mask */}
      <div className="absolute inset-0 z-20 bg-gradient-to-b from-transparent via-transparent to-bg-primary" />
    </div>
  )
}
