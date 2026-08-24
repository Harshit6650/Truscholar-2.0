'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

import { Placeholder } from '@/components/common/placeholder'
import { journeySteps } from '@/config/marketing'
import { cn } from '@/lib/utils'

/**
 * Section — The journey, as a scroll-driven "player".
 *
 * Desktop: a sticky frame on the left previews the active step, with a chapter
 * scrubber beneath it that fills as you scroll the section. The six steps
 * scroll past on the right and take turns being active.
 * Mobile: a vertical rail whose fill tracks the same progress.
 *
 * Implementation notes:
 *
 * - The scroll listener is attached only while the section intersects the
 *   viewport (IntersectionObserver gates it) and every update is coalesced
 *   into one requestAnimationFrame, so there is no per-scroll-event layout
 *   thrash and no cost at all when the section is off screen.
 *
 * - All six step previews stay in the DOM; only opacity changes. Nothing is
 *   conditionally rendered, so the whole section is present at first paint and
 *   readable with JavaScript disabled (it simply shows step 01 as active).
 *
 * - Inactive steps are NOT dimmed. Lowering their opacity would drop text
 *   below the contrast floor; active state is carried by the accent rail and
 *   the step number colour instead, so every step stays fully legible.
 *
 * - Progress tracking is direct manipulation rather than autoplay, so it is
 *   kept under `prefers-reduced-motion`; the easing transitions are disabled
 *   globally by the reduced-motion rule in globals.css.
 */
export function Journey() {
  const sectionRef = useRef<HTMLElement>(null)
  const [progress, setProgress] = useState(0)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    let frame = 0

    const update = () => {
      frame = 0
      const rect = section.getBoundingClientRect()
      const viewport = window.innerHeight
      const travel = rect.height - viewport

      // Primary mapping: 0 when the section top reaches the top of the
      // viewport (the player pins), 1 when its bottom reaches the bottom.
      //
      // Fallback for a section shorter than the viewport — which happens on
      // very tall screens — is the full view-timeline range. Its denominator
      // is always positive, so progress stays a smooth ramp instead of
      // snapping between 0 and 1.
      const raw =
        travel > 0 ? -rect.top / travel : (viewport - rect.top) / (viewport + rect.height)

      const value = Math.min(Math.max(raw, 0), 1)

      setProgress(value)
      setActive(Math.min(journeySteps.length - 1, Math.floor(value * journeySteps.length)))
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          window.addEventListener('scroll', onScroll, { passive: true })
          update()
        } else {
          window.removeEventListener('scroll', onScroll)
        }
      },
      { threshold: 0 },
    )

    observer.observe(section)

    // Every measurement depends on viewport height, so a resize or an
    // orientation change invalidates the current progress.
    window.addEventListener('resize', onScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  const activeStep = journeySteps[active]!

  return (
    <section
      ref={sectionRef}
      aria-labelledby="journey-heading"
      className="bg-surface-muted section-y"
    >
      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="journey-heading"
            className="text-ink text-h2 font-extrabold tracking-tight text-balance"
          >
            What happens after you earn it
          </h2>
          <p className="text-ink-muted text-body mt-6">
            A certificate sitting in an inbox has done nothing. Here is the path from the
            moment you earn one to the day it gets you hired — six steps, and TruScholar
            is with you for all of them.
          </p>
        </div>

        <div className="mt-12 lg:mt-16 lg:grid lg:grid-cols-2 lg:items-start lg:gap-16">
          {/* ---------- Sticky player (lg and up) ---------- */}
          <div className="hidden lg:sticky lg:top-24 lg:block">
            <div className="bg-surface border-surface-border rounded-card overflow-hidden border shadow-sm">
              {/* Frame. All six previews stay mounted; only opacity changes. */}
              <div className="bg-surface-muted relative">
                {journeySteps.map((step, index) => (
                  <div
                    key={step.number}
                    className={cn(
                      'transition-opacity duration-500',
                      index === active ? 'opacity-100' : 'absolute inset-0 opacity-0',
                    )}
                  >
                    <Placeholder
                      label={step.fragment}
                      ratio="4/3"
                      className="rounded-none border-0 bg-transparent"
                    />
                  </div>
                ))}
              </div>

              {/* Player chrome */}
              <div className="border-surface-border border-t p-6">
                <div className="flex items-baseline justify-between gap-4">
                  <p className="text-ink text-h4 font-bold">{activeStep.title}</p>
                  <p className="text-ink-muted text-micro shrink-0 tabular-nums">
                    Step {activeStep.number} / 06
                  </p>
                </div>

                {/* Chapter scrubber. Ticks mark the six steps; the fill tracks scroll. */}
                <div
                  className="bg-surface-border relative mt-4 h-1.5 w-full overflow-hidden rounded-full"
                  role="progressbar"
                  aria-label="Journey progress"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={Math.round(progress * 100)}
                >
                  <div
                    className="bg-primary h-full rounded-full transition-[width] duration-150 ease-out"
                    style={{ width: `${progress * 100}%` }}
                  />
                </div>

                <div aria-hidden className="mt-2 grid grid-cols-6 gap-1">
                  {journeySteps.map((step, index) => (
                    <span
                      key={step.number}
                      className={cn(
                        'h-1 rounded-full transition-colors',
                        index <= active ? 'bg-primary' : 'bg-surface-border',
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ---------- Steps ---------- */}
          {/* The rail is a sibling of the list, not a child: <ol> may only
              contain <li>, and the fill needs a real element for its height. */}
          <div className="relative">
            <div
              aria-hidden
              className="bg-surface-border absolute top-0 left-0 h-full w-0.5 lg:hidden"
            >
              <div
                className="bg-primary w-full transition-[height] duration-150 ease-out"
                style={{ height: `${progress * 100}%` }}
              />
            </div>

            <ol>
              {journeySteps.map((step, index) => {
                const isActive = index === active

                return (
                  <li
                    key={step.number}
                    className={cn(
                      'relative pb-10 pl-10',
                      // Desktop: accent rail on the left marks the active step.
                      'lg:border-l-2 lg:pb-16 lg:pl-8 lg:transition-colors',
                      isActive ? 'lg:border-primary' : 'lg:border-surface-border',
                    )}
                  >
                    {/* Mobile dot, centred on the rail. */}
                    <span
                      aria-hidden
                      className={cn(
                        'absolute top-1.5 left-0 size-4 -translate-x-1/2 rounded-full transition-colors lg:hidden',
                        index <= active ? 'bg-primary' : 'bg-surface-border',
                      )}
                    />

                    <span
                      aria-hidden
                      className={cn(
                        'text-h3 block font-extrabold tabular-nums transition-colors',
                        isActive ? 'text-primary' : 'text-ink-muted',
                      )}
                    >
                      {step.number}
                    </span>

                    <h3 className="text-ink text-h4 mt-2 font-bold">{step.title}</h3>
                    <p className="text-ink-muted text-body mt-3">{step.description}</p>
                  </li>
                )
              })}
            </ol>
          </div>
        </div>

        <p className="mt-4 text-center">
          <Link
            href="/about"
            className="text-navy text-body font-semibold underline-offset-4 hover:underline"
          >
            See the full journey &rarr;
          </Link>
        </p>
      </div>
    </section>
  )
}
