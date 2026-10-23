'use client'

import { useLenis } from 'lenis/react'
import { useEffect, useRef } from 'react'

type Lane = { y: number; dash: number; gap: number; speed: number; offset: number }

// Traffic lanes drawn on a canvas. Dashes drift at their own speeds, speed up with scroll velocity,
// and light up gold near the pointer like headlights. Pauses off-screen; one static frame under reduced motion.
export function LaneCanvas({
  className = '',
  color = '#f4f2df',
  accent = '#f5b301',
  laneGap = 30,
  thickness = 10,
}: {
  className?: string
  color?: string
  accent?: string
  laneGap?: number
  thickness?: number
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const velocity = useRef(0)

  useLenis((lenis) => {
    velocity.current = lenis.velocity
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let width = 0
    let height = 0
    let lanes: Lane[] = []
    let raf = 0
    let visible = true
    let last = performance.now()
    let boost = 0
    const pointer = { x: -9999, y: -9999, glow: 0 }

    // Deterministic pseudo-random so the pattern is stable between renders.
    let seed = 7
    const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647)

    const build = () => {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      seed = 7
      const count = Math.max(3, Math.floor(height / laneGap))
      const step = height / count
      lanes = Array.from({ length: count }, (_, i) => {
        const dash = 40 + Math.round(rand() * 160)
        return {
          y: step * i + (step - thickness) / 2,
          dash,
          gap: 24 + Math.round(rand() * 80),
          speed: (18 + rand() * 46) * (i % 2 === 0 ? 1 : -1),
          offset: rand() * 400,
        }
      })
    }

    const draw = (dt: number) => {
      ctx.clearRect(0, 0, width, height)
      boost += (Math.min(Math.abs(velocity.current), 60) / 6 - boost) * 0.08
      pointer.glow += ((pointer.x > -999 ? 1 : 0) - pointer.glow) * 0.1

      for (const lane of lanes) {
        lane.offset += lane.speed * (1 + boost) * dt
        const period = lane.dash + lane.gap
        const start = ((lane.offset % period) + period) % period - period
        for (let x = start; x < width; x += period) {
          const cx = x + lane.dash / 2
          const cy = lane.y + thickness / 2
          const d = Math.hypot(cx - pointer.x, cy - pointer.y)
          const near = pointer.glow * Math.max(0, 1 - d / 160)
          ctx.fillStyle = near > 0.05 ? accent : color
          ctx.globalAlpha = near > 0.05 ? 0.55 + near * 0.45 : 1
          const lift = near * 3
          ctx.fillRect(x, lane.y - lift, lane.dash, thickness + lift * 2)
        }
      }
      ctx.globalAlpha = 1
    }

    const loop = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      draw(dt)
      raf = visible && !document.hidden ? requestAnimationFrame(loop) : 0
    }

    const start = () => {
      if (reduce || raf) return
      last = performance.now()
      raf = requestAnimationFrame(loop)
    }

    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = e.clientX - rect.left
      pointer.y = e.clientY - rect.top
      if (pointer.x < -200 || pointer.y < -200 || pointer.x > width + 200 || pointer.y > height + 200) {
        pointer.x = pointer.y = -9999
      }
    }
    const onLeave = () => (pointer.x = pointer.y = -9999)

    build()
    draw(0)

    const ro = new ResizeObserver(() => {
      build()
      draw(0)
    })
    ro.observe(canvas)

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) start()
    })
    io.observe(canvas)

    const onVisibility = () => !document.hidden && visible && start()
    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('pointermove', onPointer, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    start()

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('pointermove', onPointer)
      document.documentElement.removeEventListener('pointerleave', onLeave)
    }
  }, [color, accent, laneGap, thickness])

  return <canvas ref={canvasRef} aria-hidden className={`block h-full w-full ${className}`} />
}
