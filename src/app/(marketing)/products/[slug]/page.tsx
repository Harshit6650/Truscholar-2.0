import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Check } from 'lucide-react'

import { siteConfig } from '@/config/site'
import { stubbedProducts } from '@/config/products'

/**
 * Product stub pages.
 *
 * Both homepage product options link here, and the rule is that no card points
 * at a route which does not exist. Each page renders only the copy already
 * supplied for that product — nothing invented.
 *
 * TruERP and Brand Ambassador are deliberately absent: they keep the URLs
 * specified in the brief (/university-management-solution and
 * /brand-ambassador) and have their own routes.
 */
function getProduct(slug: string) {
  return stubbedProducts.find((product) => product.slug === slug)
}

export function generateStaticParams() {
  return stubbedProducts.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({
  params,
}: PageProps<'/products/[slug]'>): Promise<Metadata> {
  const { slug } = await params
  const product = getProduct(slug)

  if (!product) return {}

  return {
    title: product.name,
    description: product.lead,
    alternates: { canonical: `/products/${product.slug}` },
  }
}

export default async function ProductPage({ params }: PageProps<'/products/[slug]'>) {
  const { slug } = await params
  const product = getProduct(slug)

  if (!product) notFound()

  const Icon = product.icon

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
      {
        '@type': 'ListItem',
        position: 2,
        name: product.name,
        item: `${siteConfig.url}/products/${product.slug}`,
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
            <li aria-current="page" className="text-ink font-medium">
              {product.name}
            </li>
          </ol>
        </nav>

        <span className="bg-surface-muted rounded-tile grid size-14 place-items-center">
          <Icon className="text-navy size-7" aria-hidden />
        </span>

        <h1 className="text-ink text-h2 mt-6 font-extrabold tracking-tight text-balance">
          {product.name}
        </h1>

        <p className="text-ink-muted text-body mt-6">{product.lead}</p>

        <ul className="mt-10 space-y-3">
          {product.points.map((point) => (
            <li key={point} className="flex items-start gap-3">
              <Check className="text-verified mt-1 size-5 shrink-0" aria-hidden />
              <span className="text-ink text-body">{point}</span>
            </li>
          ))}
        </ul>

        <div className="border-surface-border rounded-card mt-12 border border-dashed p-8">
          <p className="text-ink-muted text-small">
            Full page content for this product is still to be written. Until then this
            page carries only the summary and feature list from the homepage.
          </p>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="bg-primary text-surface rounded-btn text-body inline-flex items-center justify-center px-7 py-3.5 font-semibold transition-opacity hover:opacity-90"
            >
              Book a Free Demo
            </Link>
            <Link
              href="/"
              className="border-navy text-navy rounded-btn text-body hover:bg-surface-muted inline-flex items-center justify-center border-2 px-7 py-3.5 font-semibold transition-colors"
            >
              <ArrowLeft className="mr-2 size-4" aria-hidden />
              Back to all products
            </Link>
          </div>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </section>
  )
}
