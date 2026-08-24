import { Play, Quote } from 'lucide-react'

import { Placeholder } from '@/components/common/placeholder'
import { testimonials } from '@/config/marketing'

/**
 * Section 8 — Testimonials.
 *
 * Structure is complete; the quotes are bracketed placeholders. A quote or an
 * institution name invented here would be a fabricated review, so they stay
 * unsupplied until real, attributed, approved copy exists.
 *
 * Where a video exists the play affordance sits beside the written quote — it
 * never replaces the text.
 *
 * The avatar and logo placeholders run with `labelVisible={false}`: at 48px and
 * 64px there is no room for a caption, and an unclamped one spilled out of the
 * box and read as a rendering bug.
 */
export function Testimonials() {
  return (
    <section aria-labelledby="testimonials-heading" className="section-y">
      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="testimonials-heading"
            className="text-ink text-h2 font-extrabold tracking-tight text-balance"
          >
            How our solution transforms leading institutions
          </h2>
          <p className="text-ink-muted text-body mt-6">In their words.</p>
        </div>

        <ul className="mt-12 grid gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <li
              key={testimonial.id}
              className="bg-surface border-surface-border rounded-card flex flex-col border p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <Quote className="text-surface-border size-8 shrink-0" aria-hidden />

                {testimonial.hasVideo ? (
                  <button
                    type="button"
                    className="bg-primary text-surface rounded-btn text-small inline-flex shrink-0 items-center gap-2 px-3 py-2 font-semibold"
                  >
                    <Play className="size-3" aria-hidden />
                    Watch
                    <span className="sr-only"> video testimonial from {testimonial.name}</span>
                  </button>
                ) : null}
              </div>

              {/* Quote large, per the layout brief. */}
              <blockquote className="text-ink text-h3 mt-6 flex-1 font-medium">
                {testimonial.quote}
              </blockquote>

              <footer className="border-surface-border mt-8 flex items-center gap-4 border-t pt-6">
                <Placeholder
                  label={`Headshot ${testimonial.id}`}
                  ratio="1/1"
                  labelVisible={false}
                  className="size-12 shrink-0 rounded-full p-0"
                />

                <div className="min-w-0 flex-1">
                  <p className="text-ink text-small font-semibold">{testimonial.name}</p>
                  <p className="text-ink-muted text-micro">{testimonial.role}</p>
                  <p className="text-ink-muted text-micro">{testimonial.institution}</p>
                </div>

                <Placeholder
                  label={`Institution logo mark ${testimonial.id}`}
                  ratio="3/1"
                  labelVisible={false}
                  className="rounded-tile w-16 shrink-0 p-0"
                />
              </footer>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
