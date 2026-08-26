import type { Metadata } from 'next'

import { solutionFaqs, solutions } from '@/config/solutions'
import { siteConfig } from '@/config/site'

import { SolutionsChooser } from './_sections/chooser'
import { SolutionsComparison } from './_sections/comparison'
import { SolutionsFaq } from './_sections/faq'
import { SolutionsFinalCta } from './_sections/final-cta'
import { SolutionsHero } from './_sections/hero'
import { SolutionsMigration } from './_sections/migration'
import { SolutionsRollout } from './_sections/rollout'
import { SolutionsSecurityLine } from './_sections/security-line'
import { SolutionsTestimonials } from './_sections/testimonials'

export const metadata: Metadata = {
  title: { absolute: 'Solutions for Universities, Corporates & EdTech | TruScholar' },
  description:
    'Compare TruScholar solutions across universities, corporates, EdTech, government, events and associations. See what each issues, how it integrates and what rollout takes.',
  alternates: { canonical: '/solutions' },
  openGraph: {
    title: 'TruScholar Solutions — Compare what fits your organisation',
    description:
      'Compare TruScholar solutions across universities, corporates, EdTech, government, events and associations.',
    url: `${siteConfig.url}/solutions`,
  },
}

/**
 * Structured data: FAQPage, ItemList for the seven solutions, BreadcrumbList.
 * All generated from the same sources as the visible copy, so the markup cannot
 * drift from the page.
 */
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      '@id': `${siteConfig.url}/solutions#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Solutions',
          item: `${siteConfig.url}/solutions`,
        },
      ],
    },
    {
      '@type': 'ItemList',
      '@id': `${siteConfig.url}/solutions#solutions`,
      name: 'TruScholar solutions',
      itemListElement: solutions.map((solution, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: solution.title,
        description: solution.work,
        url: `${siteConfig.url}/solutions/${solution.slug}`,
      })),
    },
    {
      '@type': 'FAQPage',
      '@id': `${siteConfig.url}/solutions#faq`,
      mainEntity: solutionFaqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    },
  ],
}

/**
 * /solutions — the hub.
 *
 * Owns one question: which solution fits my organisation, and how would it work
 * here? Nothing here defines a digital credential, restates the six-step
 * journey, or carries a full security section — those are owned by the homepage
 * and the Trust Centre and are linked instead.
 *
 * Backgrounds alternate white / grey so no two filled sections touch, matching
 * the homepage rhythm.
 */
export default function SolutionsPage() {
  return (
    <>
      <SolutionsHero />
      <SolutionsChooser />
      <SolutionsComparison />
      <SolutionsRollout />
      <SolutionsMigration />
      <SolutionsTestimonials />
      <SolutionsFaq />
      <SolutionsSecurityLine />
      <SolutionsFinalCta />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  )
}
