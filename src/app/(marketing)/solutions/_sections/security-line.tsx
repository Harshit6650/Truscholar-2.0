import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { Placeholder } from '@/components/common/placeholder'
import { complianceMarks } from '@/config/marketing'

/**
 * Section 8 — Security, in one line.
 *
 * Deliberately one sentence and a link. The homepage and the Trust Centre both
 * carry the full security section; four blocks of certification copy here
 * would be duplication for no gain.
 */
export function SolutionsSecurityLine() {
  return (
    <section
      aria-labelledby="solutions-security-heading"
      className="bg-surface-muted py-12 md:py-16"
    >
      <div className="container-page">
        <div className="lg:flex lg:items-center lg:gap-12">
          <div className="lg:flex-1">
            <h2
              id="solutions-security-heading"
              className="text-ink text-h3 font-bold tracking-tight"
            >
              Security and compliance
            </h2>
            <p className="text-ink-muted text-small mt-3">
              CMMI Level 5, ISO/IEC 27001 and SOC 2 Type II certified, with patented
              issuance technology and DPDP-aligned data processing. The full detail,
              including documentation available during procurement, is on the Trust
              Centre.
            </p>
            <p className="mt-4">
              <Link
                href="/privacy"
                className="text-navy text-small inline-flex items-center gap-2 font-semibold underline-offset-4 hover:underline"
              >
                Visit the Trust Centre
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </p>
          </div>

          <ul className="mt-8 grid grid-cols-2 gap-4 lg:mt-0 lg:w-1/2 lg:grid-cols-4">
            {complianceMarks.map((mark) => (
              <li key={mark}>
                <Placeholder label={mark} ratio="3/1" className="bg-surface" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
