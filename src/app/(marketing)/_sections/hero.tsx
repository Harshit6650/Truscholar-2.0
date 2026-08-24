import type { Route } from 'next'
import Link from 'next/link'
import { Check } from 'lucide-react'

import { Placeholder } from '@/components/common/placeholder'

/**
 * Micro-links. Only /register and /contact exist so far, so the three without
 * a home point at /contact.
 * TODO: repoint at /verify, /coaches and /partners once those pages exist.
 */
const microLinks: { label: string; href: Route }[] = [
  { label: "I'm a student", href: '/register' },
  { label: 'Verify a Credential', href: '/contact' },
  { label: 'Become a Career Coach', href: '/contact' },
  { label: 'Partner with Us', href: '/contact' },
]

const trustPoints = [
  'Blockchain-anchored',
  'ISO/IEC 27001 & SOC 2 Type II certified',
  'Patented credential issuance',
  'Verified in seconds',
]

export function Hero() {
  return (
    <section className="section-y pt-16 lg:pt-24">
      <div className="container-page">
        {/*
          One tree, one set of strings. 55/45 split at lg, single column below
          with the visual after the content — no duplicated markup.
        */}
        <div className="grid items-center gap-12 lg:grid-cols-[55fr_45fr] lg:gap-16">
          <div>
            <p className="text-ink-muted text-small font-semibold tracking-widest uppercase">
              Trusted Credentials. Connected Careers.
            </p>

            <h1 className="text-ink text-h1 mt-6 font-extrabold tracking-tight text-balance">
              One Platform from Issuing Credentials to Getting Hired
            </h1>

            <p className="text-ink-muted text-body mt-6 max-w-lede">
              Institutions issue credentials that verify in seconds. Learners keep them
              for life, turn them into a verified resume, get career guidance, and
              connect with employers hiring right now. One platform, from first
              certificate to first job.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="bg-primary text-surface rounded-btn text-body focus-visible:ring-ring inline-flex items-center justify-center px-7 py-3.5 font-semibold transition-opacity hover:opacity-90"
              >
                Book a Free Demo
              </Link>
              <Link
                href="/about"
                className="border-navy text-navy rounded-btn text-body focus-visible:ring-ring hover:bg-surface-muted inline-flex items-center justify-center border-2 bg-transparent px-7 py-3.5 font-semibold transition-colors"
              >
                Explore Our Platform
              </Link>
            </div>

            {/* Micro-links, middot separated. The separators are decorative. */}
            <ul className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2">
              {microLinks.map((link, index) => (
                <li key={link.label} className="flex items-center gap-x-3">
                  {index > 0 ? (
                    <span aria-hidden className="text-ink-muted">
                      &middot;
                    </span>
                  ) : null}
                  <Link
                    href={link.href}
                    className="text-ink-muted text-small hover:text-navy underline-offset-4 transition-colors hover:underline"
                  >
                    {link.label} &rarr;
                  </Link>
                </li>
              ))}
            </ul>

            <p className="text-ink-muted text-small mt-8 flex flex-wrap items-center gap-x-4 gap-y-2">
              {trustPoints.map((point, index) => (
                <span key={point} className="flex items-center gap-x-4">
                  {index > 0 ? (
                    <span aria-hidden className="text-ink-muted">
                      &middot;
                    </span>
                  ) : null}
                  <span className="flex items-center gap-2">
                    <Check className="text-verified size-4 shrink-0" aria-hidden />
                    {point}
                  </span>
                </span>
              ))}
            </p>
          </div>

          <Placeholder label="Credential → wallet → resume, connected by one line" ratio="4/3" />
        </div>
      </div>
    </section>
  )
}
