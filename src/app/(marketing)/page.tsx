import type { Metadata } from 'next'

import { allFaqs } from '@/config/faq'
import { serviceCards } from '@/config/services'
import { siteConfig } from '@/config/site'

import { Faq } from './_sections/faq'
import { FinalCta } from './_sections/final-cta'
import { Hero } from './_sections/hero'
import { Impact } from './_sections/impact'
import { Journey } from './_sections/journey'
import { ProductsOptionA } from './_sections/products-option-a'
import { ProductsOptionB } from './_sections/products-option-b'
import { Resources } from './_sections/resources'
import { ReviewRatings } from './_sections/review-ratings'
import { SecurityStandards } from './_sections/security-standards'
import { Services } from './_sections/services'
import { Testimonials } from './_sections/testimonials'
import { TrustedBy } from './_sections/trusted-by'
import { WhoItsFor } from './_sections/who-its-for'

export const metadata: Metadata = {
  // `absolute` opts out of the `%s · TruScholar` template from the root layout.
  title: { absolute: siteConfig.metaTitle },
  description: siteConfig.description,
  alternates: { canonical: '/' },
}

/**
 * Structured data. Generated from the same sources as the visible copy, so the
 * markup cannot drift from the page — mismatched markup is penalised.
 */
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${siteConfig.url}/#organization`,
      name: siteConfig.name,
      legalName: 'Asset Chain Techlligence Pvt. Ltd.',
      url: siteConfig.url,
      description: siteConfig.description,
      logo: `${siteConfig.url}/icon.svg`,
    },
    {
      '@type': 'FAQPage',
      '@id': `${siteConfig.url}/#faq`,
      mainEntity: allFaqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    },
    {
      '@type': 'ItemList',
      '@id': `${siteConfig.url}/#services`,
      name: 'TruScholar services',
      itemListElement: serviceCards.map((card, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: card.title,
        description: card.lead,
        url: `${siteConfig.url}/services/${card.slug}`,
      })),
    },
  ],
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <Services />
      {/*
        Two competing product sections, built side by side for review.
        Both REPLACE <Services /> above — all three carry the heading "The tools
        behind every step", so the page deliberately repeats it while a choice
        is made. Before ship: delete Services plus the losing option.
      */}
      <ProductsOptionA />
      <ProductsOptionB />
      <Impact />
      <Journey />
      <WhoItsFor />
      <SecurityStandards />
      <Testimonials />
      <ReviewRatings />
      <Resources />
      <Faq />
      <FinalCta />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  )
}
