import Link from 'next/link'

import { Placeholder } from '@/components/common/placeholder'
import { institutions } from '@/config/marketing'

/**
 * Section 2 — Trusted by.
 *
 * Note on the marquee: the spec asks for a continuous horizontal marquee at
 * `sm`, but a seamless marquee requires duplicating the whole track, which
 * collides with the page rule that no text string appears twice in the DOM
 * (and marquees are a reduced-motion liability). This uses a snap-scrolling
 * strip instead — same affordance, single set of nodes. Easy to swap if you
 * want the duplicated track.
 *
 * Proof text is always in the DOM and only revealed visually on hover/focus.
 */
export function TrustedBy() {
  return (
    <section aria-labelledby="trusted-by-heading" className="bg-surface-muted section-y">
      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center">
          <h2 id="trusted-by-heading" className="text-ink text-h2 font-extrabold tracking-tight text-balance">
            Trusted by universities, colleges, institutes and technology companies
          </h2>
          <p className="text-ink-muted text-body mt-6">
            From national institutes to private universities and global training
            providers, institutions rely on TruScholar to issue and verify the
            credentials their learners carry for life.
          </p>
        </div>

        <ul className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 md:grid md:grid-cols-3 md:overflow-visible md:pb-0 lg:grid-cols-6">
          {institutions.map((institution) => (
            <li
              key={institution.id}
              className="group relative w-40 shrink-0 snap-start md:w-auto"
              tabIndex={institution.proof ? 0 : undefined}
            >
              <Placeholder
                label={`Institution logo ${institution.id}`}
                ratio="3/1"
                className="grayscale transition group-hover:grayscale-0 group-focus:grayscale-0"
              />

              {institution.proof ? (
                <p className="text-ink-muted text-small bg-surface border-surface-border rounded-tile pointer-events-none absolute top-full left-0 z-10 mt-2 w-full border p-3 opacity-0 transition-opacity group-hover:opacity-100 group-focus:opacity-100">
                  {institution.proof}
                </p>
              ) : null}
            </li>
          ))}
        </ul>

        <p className="mt-12 text-center">
          <Link
            href="/about"
            className="text-navy text-body font-semibold underline-offset-4 hover:underline"
          >
            Read the case studies &rarr;
          </Link>
        </p>
      </div>
    </section>
  )
}
