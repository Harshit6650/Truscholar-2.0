import { Quote } from 'lucide-react'

import { Placeholder } from '@/components/common/placeholder'
import { solutionTestimonials } from '@/config/solutions'

/**
 * Section 6 — Testimonials.
 *
 * Each carries the SOLUTION IN USE as a tag, which is what distinguishes this
 * section from the homepage testimonials. Rendered once each — the audited page
 * rendered three testimonials nine times.
 *
 * Roles and one organisation name are bracketed placeholders, carried through
 * from the source copy: a quote without a role carries much less weight.
 */
export function SolutionsTestimonials() {
  return (
    <section
      aria-labelledby="solutions-testimonials-heading"
      className="bg-surface-muted section-y"
    >
      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="solutions-testimonials-heading"
            className="text-ink text-h2 font-extrabold tracking-tight text-balance"
          >
            Organisations already running this
          </h2>
        </div>

        <ul className="mt-12 grid gap-6 lg:grid-cols-3">
          {solutionTestimonials.map((testimonial) => (
            <li
              key={testimonial.name}
              className="bg-surface border-surface-border rounded-card flex flex-col border p-8"
            >
              <p className="bg-surface-muted text-navy text-micro rounded-tile inline-block self-start px-3 py-1 font-semibold">
                {testimonial.solution}
              </p>

              <Quote className="text-surface-border mt-6 size-8" aria-hidden />

              <blockquote className="text-ink text-body mt-4 flex-1 font-medium">
                {testimonial.quote}
              </blockquote>

              <footer className="border-surface-border mt-8 flex items-center gap-4 border-t pt-6">
                <Placeholder
                  label={`Headshot of ${testimonial.name}`}
                  ratio="1/1"
                  labelVisible={false}
                  className="size-12 shrink-0 rounded-full p-0"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-ink text-small font-semibold">{testimonial.name}</p>
                  <p className="text-ink-muted text-micro">{testimonial.role}</p>
                  <p className="text-ink-muted text-micro">{testimonial.organisation}</p>
                </div>
              </footer>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
