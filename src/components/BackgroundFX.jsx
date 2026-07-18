import { useEffect, useRef } from 'react'

// Constant ink-on-paper background animations, themed to the Atelier palette.
// Sits fixed behind all content (pointer-events-none), multiply-blended so it
// reads as ink on the cream page and tucks under the global paper grain.
// Five variants, switchable via the prop. 'off' clears the canvas.
const INK = [26, 22, 18]        // #1A1612
const ACCENT = [30, 76, 168]    // #1E4CA8
const ink = a => `rgba(${INK[0]},${INK[1]},${INK[2]},${a})`
const accent = a => `rgba(${ACCENT[0]},${ACCENT[1]},${ACCENT[2]},${a})`

export default function BackgroundFX({ variant = 'flow' }) {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    if (variant === 'off') {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      return
    }

    let w = 0, h = 0, dpr = 1, raf = 0, t = 0
    let particles = []
    const rand = (a, b) => a + Math.random() * (b - a)

    function init() {
      if (variant === 'flow') {
        const n = Math.min(150, Math.floor((w * h) / 11000))
        particles = Array.from({ length: n }, () => ({
          x: rand(0, w), y: rand(0, h), px: 0, py: 0, a: Math.random() < 0.14,
        }))
        particles.forEach(p => { p.px = p.x; p.py = p.y })
      } else if (variant === 'nodes') {
        const n = Math.min(80, Math.floor((w * h) / 20000))
        particles = Array.from({ length: n }, () => ({
          x: rand(0, w), y: rand(0, h), vx: rand(-0.25, 0.25), vy: rand(-0.25, 0.25),
          a: Math.random() < 0.16,
        }))
      } else if (variant === 'motes') {
        const n = Math.min(120, Math.floor((w * h) / 14000))
        particles = Array.from({ length: n }, () => ({
          x: rand(0, w), y: rand(0, h), r: rand(0.6, 2), sp: rand(0.15, 0.5),
          sway: rand(0, Math.PI * 2), o: rand(0.08, 0.3), a: Math.random() < 0.1,
        }))
      } else if (variant === 'plotter') {
        particles = [{ px: w / 2, py: h / 2 }]
      }
    }

    function fade(amount) {
      // trail fade independent of blend mode
      ctx.globalCompositeOperation = 'destination-out'
      ctx.fillStyle = `rgba(0,0,0,${amount})`
      ctx.fillRect(0, 0, w, h)
      ctx.globalCompositeOperation = 'source-over'
    }

    function drawFlow() {
      fade(0.045)
      for (const p of particles) {
        const ang = Math.sin(p.x * 0.0016 + t) * 1.5 + Math.cos(p.y * 0.0016 - t * 0.7) * 1.5
        p.px = p.x; p.py = p.y
        p.x += Math.cos(ang) * 0.9
        p.y += Math.sin(ang) * 0.9
        if (p.x < -5 || p.x > w + 5 || p.y < -5 || p.y > h + 5) {
          p.x = rand(0, w); p.y = rand(0, h); p.px = p.x; p.py = p.y
        }
        ctx.beginPath()
        ctx.moveTo(p.px, p.py)
        ctx.lineTo(p.x, p.y)
        ctx.strokeStyle = p.a ? accent(0.5) : ink(0.42)
        ctx.lineWidth = p.a ? 1.3 : 1
        ctx.stroke()
      }
      t += 0.0016
    }

    function drawContour() {
      ctx.clearRect(0, 0, w, h)
      const cx = w * 0.5 + Math.sin(t * 0.3) * w * 0.12
      const cy = h * 0.5 + Math.cos(t * 0.24) * h * 0.12
      const rings = Math.ceil(Math.max(w, h) / 34)
      for (let l = 1; l <= rings; l++) {
        const base = l * 34
        ctx.beginPath()
        for (let th = 0; th <= Math.PI * 2 + 0.16; th += 0.16) {
          const n = Math.sin(th * 3 + t * 0.6 + l * 0.4) * 11 + Math.cos(th * 2 - t * 0.4 + l) * 8
          const r = base + n
          const x = cx + Math.cos(th) * r
          const y = cy + Math.sin(th) * r
          th === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
        }
        ctx.closePath()
        ctx.strokeStyle = l % 6 === 0 ? accent(0.16) : ink(0.1)
        ctx.lineWidth = 1
        ctx.stroke()
      }
      t += 0.01
    }

    function drawNodes() {
      ctx.clearRect(0, 0, w, h)
      const D = 130
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > h) p.vy *= -1
      }
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j]
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < D) {
            ctx.beginPath()
            ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = ink((1 - d / D) * 0.22)
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      }
      for (const p of particles) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.a ? 2.6 : 1.6, 0, Math.PI * 2)
        ctx.fillStyle = p.a ? accent(0.85) : ink(0.65)
        ctx.fill()
      }
    }

    function drawMotes() {
      ctx.clearRect(0, 0, w, h)
      for (const p of particles) {
        p.sway += 0.01
        p.y -= p.sp
        p.x += Math.sin(p.sway) * 0.3
        if (p.y < -4) { p.y = h + 4; p.x = rand(0, w) }
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.a ? accent(p.o + 0.1) : ink(p.o)
        ctx.fill()
      }
    }

    function drawPlotter() {
      fade(0.012)
      const p = particles[0]
      const cx = w / 2, cy = h / 2
      const A = w * 0.32, B = h * 0.3
      const x = cx + Math.sin(t * 0.7) * A + Math.sin(t * 1.9) * A * 0.28
      const y = cy + Math.cos(t * 1.1) * B + Math.cos(t * 0.5) * B * 0.28
      ctx.beginPath()
      ctx.moveTo(p.px, p.py); ctx.lineTo(x, y)
      ctx.strokeStyle = accent(0.5)
      ctx.lineWidth = 1.4
      ctx.stroke()
      // ink pen head
      ctx.beginPath()
      ctx.arc(x, y, 1.8, 0, Math.PI * 2)
      ctx.fillStyle = ink(0.55)
      ctx.fill()
      p.px = x; p.py = y
      t += 0.01
    }

    const draws = { flow: drawFlow, contour: drawContour, nodes: drawNodes, motes: drawMotes, plotter: drawPlotter }
    const draw = draws[variant] || drawFlow

    function frame() {
      draw()
      raf = requestAnimationFrame(frame)
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.lineJoin = 'round'
      ctx.lineCap = 'round'
      init()
    }

    resize()
    window.addEventListener('resize', resize)
    raf = requestAnimationFrame(frame)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [variant])

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ mixBlendMode: 'multiply', opacity: 0.7 }}
    />
  )
}
