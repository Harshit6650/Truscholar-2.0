'use client'

import { useEffect, useRef, useState } from 'react'

type CountUpProps = {
  value: number
  suffix: string
}

/**
 * Counts up to `value` once the figure scrolls into view.
 *
 * Two constraints shape this:
 *
 * 1. The final figure must be in the HTML at first render, so `count` starts at
 *    `value`. The animation only begins after mount, once we know motion is
 *    allowed — the page never ships a zero that JavaScript has to fix.
 * 2. Under `prefers-reduced-motion: reduce` nothing animates at all; the value
 *    simply stays put.
 *
 * The figure is a plain text node throughout — never an image or canvas.
 */
export function CountUp({ value, suffix }: CountUpProps) {
  const [count, setCount] = useState(value)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frame = 0
    let cancelled = false

    const run = () => {
      const duration = 1200
      const start = performance.now()

      const tick = (now: number) => {
        if (cancelled) return
        const progress = Math.min((now - start) / duration, 1)
        // Ease-out so it settles rather than stopping dead.
        const eased = 1 - Math.pow(1 - progress, 3)
        setCount(Math.round(eased * value))
        if (progress < 1) frame = requestAnimationFrame(tick)
      }

      frame = requestAnimationFrame(tick)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setCount(0)
            run()
            observer.disconnect()
          }
        }
      },
      { threshold: 0.4 },
    )

    observer.observe(node)

    return () => {
      cancelled = true
      cancelAnimationFrame(frame)
      observer.disconnect()
    }
  }, [value])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}
