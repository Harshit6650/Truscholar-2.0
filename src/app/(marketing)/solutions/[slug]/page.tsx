import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'

import { siteConfig } from '@/config/site'
import { solutions } from '@/config/solutions'

/**
 * Child pages for the seven hub cards.
 *
 * The hub rule is "do not ship a card whose child page does not exist", so all
 * seven exist. Each renders only the copy already supplied for that solution —
 * nothing invented.
 *
 * `/solutions/universities` and `/solutions/students` are the highest-intent
 * pages and get real copy first; the other five are honest stubs until theirs
 * is written. India-specific material (NEP 2020, NAD, ABC, NAAC) belongs on
 * `/solutions/universities`, not on the hub.
 */
function getSolution(slug: string) {
  return solutions.find((solution) => solution.slug === slug)
}

export function generateStaticParams() {
  return solutions.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({
  params,
}: PageProps<'/solutions/[slug]'>): Promise<Metadata> {
  const { slug } = await params
  const solution = getSolution(slug)

  if (!solution) return {}

  return {
    title: `${solution.title} — Solutions`,
    description: solution.work,
    alternates: { canonical: `/solutions/${solution.slug}` },
  }
}

export default async function SolutionPage({ params }: PageProps<'/solutions/[slug]'>) {
  const { slug } = await params
  const solution = getSolution(slug)

  if (!solution) notFound()

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Solutions',
        item: `${siteConfig.url}/solutions`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: solution.title,
        item: `${siteConfig.url}/solutions/${solution.slug}`,
      },
    ],
  }

  return (
    <section className="section-y">
      <div className="container-page max-w-3xl">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="text-ink-muted text-small flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-navy underline-offset-4 hover:underline">
                Home
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link
                href="/solutions"
                className="hover:text-navy underline-offset-4 hover:underline"
              >
                Solutions
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="text-ink font-medium">
              {solution.title}
            </li>
          </ol>
        </nav>

        <h1 className="text-ink text-h2 font-extrabold tracking-tight text-balance">
          {solution.title}
        </h1>

        <p className="text-ink-muted text-body mt-6">
          <span className="text-ink font-semibold">The work: </span>
          {solution.work}
        </p>

        <ul className="mt-10 space-y-3">
          {solution.points.map((point) => (
            <li key={point} className="flex items-start gap-3">
              <Check className="text-verified mt-1 size-5 shrink-0" aria-hidden />
              <span className="text-ink text-body">{point}</span>
            </li>
          ))}
        </ul>

        <div className="border-surface-border rounded-card mt-12 border border-dashed p-8">
          <p className="text-ink-muted text-small">
            Full page content for this solution is still to be written. Until then this
            page carries only the summary and workflow points from the Solutions hub.
          </p>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="bg-primary text-surface rounded-btn text-body inline-flex items-center justify-center px-7 py-3.5 font-semibold transition-opacity hover:opacity-90"
            >
              Get a scoping call
            </Link>
            <Link
              href="/solutions"
              className="border-navy text-navy rounded-btn text-body hover:bg-surface-muted inline-flex items-center justify-center border-2 px-7 py-3.5 font-semibold transition-colors"
            >
              <ArrowLeft className="mr-2 size-4" aria-hidden />
              Back to all solutions
            </Link>
          </div>
        </div>

        <p className="mt-10">
          <Link
            href="/solutions"
            className="text-navy text-body inline-flex items-center gap-2 font-semibold underline-offset-4 hover:underline"
          >
            Compare this against the other solutions
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </p>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </section>
  )
}
