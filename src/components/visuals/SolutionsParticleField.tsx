import { useEffect, useRef } from 'react'
import { useTheme } from '../../theme/useTheme'

// Verilumen Semiconductor Color Palette
const COLORS = {
  cyan: '#00E5D4',       // Primary Verilumen Cyan
  electric: '#00B8FF',   // Secondary Electric Blue
  cobalt: '#2563FF',     // Vivid Signal Cobalt
  navy: '#164BFF',       // Deep Wave Navy
  highlight: '#8FFFF8',  // Peak Optical Cyan
  white: '#FFFFFF',      // Rare Pure Sparkle
  lightCyan: '#00A99D',
  lightBlue: '#0D80E8',
  lightCobalt: '#1A56DB',
  lightNavy: '#1E3A8A',
}

interface WaveParticle {
  normX: number
  depth: number
  ridgeId: number
  crossOffset: number
  baseSize: number
  tier: 'subtle' | 'medium' | 'bright' | 'highlight'
  colorKey: 'cyan' | 'electric' | 'cobalt' | 'navy' | 'highlight' | 'white'
  phaseOffset: number
}

interface AmbientParticle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  alpha: number
  phase: number
  color: string
}

const PROBE_NODES = [
  { nx: 0.065, height: 32, phase: 0.3, type: 'cyan' },
  { nx: 0.140, height: 62, phase: 2.4, type: 'highlight' },
  { nx: 0.225, height: 38, phase: 4.1, type: 'cyan' },
  { nx: 0.315, height: 68, phase: 1.2, type: 'electric' },
  { nx: 0.410, height: 44, phase: 3.5, type: 'cyan' },
  { nx: 0.510, height: 64, phase: 5.0, type: 'highlight' },
  { nx: 0.615, height: 36, phase: 0.9, type: 'electric' },
  { nx: 0.705, height: 70, phase: 2.7, type: 'highlight' },
  { nx: 0.795, height: 48, phase: 4.4, type: 'electric' },
  { nx: 0.880, height: 58, phase: 1.6, type: 'cyan' },
  { nx: 0.955, height: 30, phase: 3.8, type: 'electric' },
]

export function SolutionsParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', {
      alpha: true,
      desynchronized: true,
    })
    if (!ctx) return

    let width = 0
    let height = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    let animationFrame = 0
    let visible = true
    let scrollY = 0

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isLight = theme === 'light'

    const waveParticles: WaveParticle[] = []
    const ambientParticles: AmbientParticle[] = []

    function hexToRgba(hex: string, alpha: number): string {
      const clean = hex.replace('#', '')
      const r = parseInt(clean.substring(0, 2), 16)
      const g = parseInt(clean.substring(2, 4), 16)
      const b = parseInt(clean.substring(4, 6), 16)
      return `rgba(${r}, ${g}, ${b}, ${Math.max(0, Math.min(1, alpha))})`
    }

    function initAmbientParticles() {
      ambientParticles.length = 0
      const count = width < 768 ? 30 : 60
      const upperColors = isLight
        ? [COLORS.lightCyan, COLORS.lightBlue]
        : [COLORS.cyan, COLORS.electric, COLORS.cobalt]

      for (let i = 0; i < count; i++) {
        ambientParticles.push({
          x: Math.random() * width,
          y: Math.random() * (height * 0.72),
          vx: (Math.random() - 0.5) * 0.04,
          vy: (Math.random() - 0.5) * 0.025,
          size: Math.random() * 0.8 + 0.4,
          alpha: Math.random() * 0.12 + 0.04,
          phase: Math.random() * Math.PI * 2,
          color: upperColors[Math.floor(Math.random() * upperColors.length)]!,
        })
      }
    }

    function initWaveParticles() {
      waveParticles.length = 0
      const isMobile = width < 768
      const totalParticles = isMobile ? 3000 : 7000

      const ridgeDepths = [0.98, 0.74, 0.50, 0.24]

      for (let i = 0; i < totalParticles; i++) {
        let normX = Math.random()

        if (Math.random() < 0.35) {
          const clusterCenter = [0.16, 0.44, 0.74][Math.floor(Math.random() * 3)]!
          normX = Math.max(0.01, Math.min(0.99, clusterCenter + (Math.random() - 0.5) * 0.18))
        }

        const randRidge = Math.random()
        let ridgeId = 0
        if (randRidge < 0.35) ridgeId = 0      // Near: 35%
        else if (randRidge < 0.65) ridgeId = 1 // Mid-Near: 30%
        else if (randRidge < 0.85) ridgeId = 2 // Mid-Deep: 20%
        else ridgeId = 3                       // Far Horizon: 15%

        const baseDepth = ridgeDepths[ridgeId]!
        const depth = Math.max(0.15, Math.min(1.08, baseDepth + (Math.random() - 0.5) * 0.16))
        const crossOffset = (Math.random() + Math.random() - 1)

        const tierRand = Math.random()
        let tier: WaveParticle['tier'] = 'subtle'
        if (tierRand > 0.98) tier = 'highlight'
        else if (tierRand > 0.90) tier = 'bright'
        else if (tierRand > 0.65) tier = 'medium'

        let baseSize = 0.8
        if (depth > 0.85) {
          baseSize = tier === 'highlight' ? 2.4 : tier === 'bright' ? 1.8 : tier === 'medium' ? 1.5 : 1.2
        } else if (depth > 0.42) {
          baseSize = tier === 'highlight' ? 1.6 : tier === 'bright' ? 1.3 : tier === 'medium' ? 1.0 : 0.8
        } else {
          baseSize = tier === 'highlight' ? 1.0 : tier === 'bright' ? 0.8 : tier === 'medium' ? 0.6 : 0.5
        }

        let colorKey: WaveParticle['colorKey'] = 'cyan'
        if (tier === 'highlight') {
          colorKey = Math.random() < 0.25 ? 'white' : 'highlight'
        } else if (ridgeId === 3) {
          colorKey = Math.random() < 0.6 ? 'navy' : 'cobalt'
        } else if (ridgeId === 1) {
          colorKey = normX < 0.35 ? (Math.random() < 0.4 ? 'cyan' : 'electric') : 'electric'
        } else if (ridgeId === 2) {
          colorKey = normX < 0.5 ? 'cyan' : 'electric'
        } else {
          colorKey = normX < 0.48 ? 'cyan' : normX < 0.75 ? (Math.random() < 0.5 ? 'cyan' : 'electric') : 'electric'
        }

        waveParticles.push({
          normX,
          depth,
          ridgeId,
          crossOffset,
          baseSize,
          tier,
          colorKey,
          phaseOffset: Math.random() * Math.PI * 2,
        })
      }
    }

    function onScroll() {
      scrollY = window.scrollY
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    function resize() {
      if (!canvas) return
      const rect = canvas.getBoundingClientRect()
      width = Math.floor(rect.width || window.innerWidth)
      height = Math.floor(rect.height || window.innerHeight)

      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)

      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0)
      initAmbientParticles()
      initWaveParticles()
    }

    function getRidgeElevation(normX: number, ridgeId: number, seconds: number): number {
      const speed = seconds * 0.2
      const maxWaveHeight = Math.min(220, height * 0.30)

      const leftEdgeRise = Math.pow(Math.max(0, 0.16 - normX) / 0.16, 2) * (maxWaveHeight * 0.35)
      const rightEdgeRise = Math.pow(Math.max(0, normX - 0.82) / 0.18, 2) * (maxWaveHeight * 0.50)

      let elev = 0
      switch (ridgeId) {
        case 0: {
          const primary = Math.sin(normX * Math.PI * 2.8 + speed * 1.1) * (maxWaveHeight * 0.55)
          const harmonic = Math.sin(normX * Math.PI * 5.6 - speed * 0.7 + 1.2) * (maxWaveHeight * 0.25)
          const ripple = Math.cos(normX * Math.PI * 8.4 + speed * 0.4) * (maxWaveHeight * 0.10)
          elev = primary + harmonic + ripple + leftEdgeRise * 0.9 + rightEdgeRise * 0.4
          break
        }
        case 1: {
          const primary = Math.sin(normX * Math.PI * 3.2 - speed * 0.85 + 2.0) * (maxWaveHeight * 0.50)
          const harmonic = Math.cos(normX * Math.PI * 6.2 + speed * 0.6) * (maxWaveHeight * 0.22)
          const ripple = Math.sin(normX * Math.PI * 10.0 - speed * 0.3) * (maxWaveHeight * 0.08)
          elev = primary + harmonic + ripple + rightEdgeRise * 1.0 + leftEdgeRise * 0.3
          break
        }
        case 2: {
          const primary = Math.sin(normX * Math.PI * 2.4 + speed * 0.95 + 4.1) * (maxWaveHeight * 0.45)
          const harmonic = Math.sin(normX * Math.PI * 4.8 - speed * 0.5 + 0.8) * (maxWaveHeight * 0.20)
          elev = primary + harmonic + leftEdgeRise * 0.6 + rightEdgeRise * 0.5
          break
        }
        case 3:
        default: {
          const primary = Math.sin(normX * Math.PI * 3.8 + speed * 0.75 + 1.5) * (maxWaveHeight * 0.35)
          const harmonic = Math.sin(normX * Math.PI * 7.5 - speed * 0.4) * (maxWaveHeight * 0.16)
          elev = primary + harmonic + leftEdgeRise * 0.4 + rightEdgeRise * 0.3
          break
        }
      }

      return elev
    }

    function drawAmbientField(seconds: number) {
      if (!ctx) return
      for (const p of ambientParticles) {
        if (!reducedMotion) {
          p.x += p.vx
          p.y += p.vy
          p.y += Math.sin(seconds * 0.25 + p.phase) * 0.015
        }
        if (p.x < -10) p.x = width + 10
        if (p.x > width + 10) p.x = -10
        if (p.y < -10) p.y = height * 0.72
        if (p.y > height * 0.72) p.y = -10

        const centerX = width * 0.5
        const heroY = height * 0.18
        const dist = Math.hypot(p.x - centerX, p.y - heroY)
        let alpha = p.alpha
        if (dist < 340) alpha *= 0.15

        ctx.beginPath()
        ctx.fillStyle = hexToRgba(p.color, alpha)
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    function draw3DDataWave(seconds: number) {
      if (!ctx) return

      const baseY = height * 0.785
      const volumetricThickness = Math.min(42, height * 0.065)

      for (const p of waveParticles) {
        const parallaxFactor = 0.08 + (p.depth - 0.2) * 0.21
        const parallaxOffset = reducedMotion ? 0 : scrollY * parallaxFactor
        const depthPlaneY = baseY - (1.0 - p.depth) * (height * 0.08) + parallaxOffset
        const ridgeElevation = getRidgeElevation(p.normX, p.ridgeId, seconds)
        const perspectiveScale = 0.55 + p.depth * 0.55
        const perspectiveSpread = 0.6 + p.depth * 0.5
        
        // Breathing oscillation effect on the Z-Y cross offset to make the surface look alive
        const breathing = Math.sin(seconds * 0.8 + p.phaseOffset) * 0.1
        const waveX = p.normX * width
        const waveY = depthPlaneY - ridgeElevation * perspectiveScale + ((p.crossOffset + breathing) * volumetricThickness * perspectiveSpread)

        let cardMaskVisibility = 1.0
        if (waveY > height * 0.26 && waveY < height * 0.79 && waveX > width * 0.04 && waveX < width * 0.96) {
          cardMaskVisibility = 0.18
        }

        let alpha = 0.18
        if (p.tier === 'highlight') alpha = 1.0
        else if (p.tier === 'bright') alpha = 0.85
        else if (p.tier === 'medium') alpha = 0.60
        else alpha = 0.35 + p.depth * 0.25 // Significantly higher base visibility

        alpha = alpha * (0.4 + p.depth * 0.6) * cardMaskVisibility * (isLight ? 0.8 : 1)
        if (alpha <= 0.01) continue

        const radius = p.baseSize * perspectiveScale

        let colorHex = COLORS.cyan
        if (p.colorKey === 'white') colorHex = COLORS.white
        else if (p.colorKey === 'highlight') colorHex = isLight ? COLORS.lightCyan : COLORS.highlight
        else if (p.colorKey === 'electric') colorHex = isLight ? COLORS.lightBlue : COLORS.electric
        else if (p.colorKey === 'cobalt') colorHex = isLight ? COLORS.lightCobalt : COLORS.cobalt
        else if (p.colorKey === 'navy') colorHex = isLight ? COLORS.lightNavy : COLORS.navy
        else colorHex = isLight ? COLORS.lightCyan : COLORS.cyan

        // Draw soft localized halo
        if (p.tier === 'highlight') {
          ctx.beginPath()
          ctx.fillStyle = hexToRgba(colorHex, alpha * 0.3)
          ctx.arc(waveX, waveY, radius * 3.5, 0, Math.PI * 2)
          ctx.fill()
        } else if (p.tier === 'bright' && p.depth > 0.6) {
          ctx.beginPath()
          ctx.fillStyle = hexToRgba(colorHex, alpha * 0.2)
          ctx.arc(waveX, waveY, radius * 2.5, 0, Math.PI * 2)
          ctx.fill()
        }

        // Draw solid core
        // Optimization: use fillRect for very small particles to boost performance
        if (radius < 0.8) {
          ctx.fillStyle = hexToRgba(colorHex, alpha)
          ctx.fillRect(waveX - radius, waveY - radius, radius * 2, radius * 2)
        } else {
          ctx.beginPath()
          ctx.fillStyle = hexToRgba(colorHex, alpha)
          ctx.arc(waveX, waveY, radius, 0, Math.PI * 2)
          ctx.fill()
        }
      }
      
      // Removed solid glowing line strokes to allow pure particle cloud representation
    }

    function drawProbeNodes(seconds: number) {
      if (!ctx) return

      const midDepth = 0.74
      const parallaxFactor = 0.08 + (midDepth - 0.2) * 0.21
      const depthPlaneY = height * 0.785 - (1.0 - midDepth) * (height * 0.08) + (reducedMotion ? 0 : scrollY * parallaxFactor)
      const perspectiveScale = 0.55 + midDepth * 0.55

      for (let idx = 0; idx < PROBE_NODES.length; idx++) {
        const probe = PROBE_NODES[idx]!
        const x = probe.nx * width
        const elevation = getRidgeElevation(probe.nx, 1, seconds)
        const baseContactY = depthPlaneY - elevation * perspectiveScale

        const stemHeight = probe.height * Math.min(1.2, Math.max(0.8, height / 820))
        const topNodeY = baseContactY - stemHeight

        const cyclePeriod = 4.5
        const rawTime = (seconds + probe.phase * 1.5) % cyclePeriod
        const isPulseActive = rawTime < 1.3
        const pulseProgress = isPulseActive ? rawTime / 1.3 : 0

        const nodeColor = probe.type === 'highlight'
          ? (isLight ? COLORS.lightCyan : COLORS.highlight)
          : probe.type === 'electric'
            ? (isLight ? COLORS.lightBlue : COLORS.electric)
            : (isLight ? COLORS.lightCyan : COLORS.cyan)

        // Stem
        ctx.beginPath()
        ctx.moveTo(x, baseContactY)
        ctx.lineTo(x, topNodeY)
        const stemAlpha = isPulseActive ? 0.6 + 0.4 * Math.sin(pulseProgress * Math.PI) : 0.4
        ctx.strokeStyle = hexToRgba(nodeColor, stemAlpha * (isLight ? 0.8 : 1))
        ctx.lineWidth = 1.0
        ctx.stroke()

        // Base connection
        ctx.beginPath()
        ctx.arc(x, baseContactY, 2.5, 0, Math.PI * 2)
        ctx.fillStyle = hexToRgba(nodeColor, 0.7)
        ctx.fill()

        ctx.beginPath()
        ctx.arc(x, baseContactY, 6.0, 0, Math.PI * 2)
        ctx.fillStyle = hexToRgba(nodeColor, 0.15)
        ctx.fill()

        // Traveling bead
        if (isPulseActive && !reducedMotion) {
          const beadY = baseContactY - stemHeight * pulseProgress
          
          ctx.beginPath()
          ctx.arc(x, beadY, 6.0, 0, Math.PI * 2)
          ctx.fillStyle = hexToRgba(isLight ? COLORS.lightCyan : COLORS.highlight, 0.35)
          ctx.fill()

          ctx.beginPath()
          ctx.arc(x, beadY, 2.8, 0, Math.PI * 2)
          ctx.fillStyle = hexToRgba(COLORS.white, 0.95)
          ctx.fill()
        }

        // Top Terminal
        const isBlooming = isPulseActive && pulseProgress > 0.88
        const haloRadius = isBlooming ? 18.0 : 10.0
        const haloAlpha = isBlooming ? 0.45 : 0.20
        const nodeRadius = isBlooming ? 4.0 : 3.0

        ctx.beginPath()
        ctx.arc(x, topNodeY, haloRadius, 0, Math.PI * 2)
        ctx.fillStyle = hexToRgba(nodeColor, haloAlpha * (isLight ? 0.7 : 1))
        ctx.fill()

        ctx.beginPath()
        ctx.arc(x, topNodeY, nodeRadius, 0, Math.PI * 2)
        ctx.fillStyle = hexToRgba(nodeColor, 0.95)
        ctx.fill()

        ctx.beginPath()
        ctx.arc(x, topNodeY, 1.5, 0, Math.PI * 2)
        ctx.fillStyle = hexToRgba(COLORS.white, 1.0)
        ctx.fill()
      }
    }

    function render(time: number) {
      if (!ctx || !visible) {
        animationFrame = requestAnimationFrame(render)
        return
      }

      ctx.clearRect(0, 0, width, height)
      const seconds = time * 0.001

      const gradient = ctx.createRadialGradient(
        width * 0.5, height * 0.22, 0,
        width * 0.5, height * 0.22, width * 0.7,
      )

      if (isLight) {
        gradient.addColorStop(0, 'rgba(0, 169, 157, 0.045)')
        gradient.addColorStop(0.5, 'rgba(13, 128, 232, 0.025)')
        gradient.addColorStop(1, 'rgba(244, 248, 250, 0)')
      } else {
        gradient.addColorStop(0, 'rgba(0, 229, 212, 0.06)')
        gradient.addColorStop(0.5, 'rgba(0, 184, 255, 0.03)')
        gradient.addColorStop(1, 'rgba(2, 7, 12, 0)')
      }

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)

      drawAmbientField(seconds)
      draw3DDataWave(seconds)
      drawProbeNodes(seconds)

      animationFrame = requestAnimationFrame(render)
    }

    resize()

    const ro = new ResizeObserver(resize)
    if (canvas.parentElement) ro.observe(canvas.parentElement)
    else ro.observe(canvas)

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = Boolean(entry?.isIntersecting)
      },
      { threshold: 0.02 },
    )
    io.observe(canvas)

    animationFrame = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animationFrame)
      window.removeEventListener('scroll', onScroll)
      ro.disconnect()
      io.disconnect()
    }
  }, [theme])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
    />
  )
}
