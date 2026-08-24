import type { MetadataRoute } from 'next'

import { siteConfig } from '@/config/site'

/** Inherently static, and required to be marked so for a static export. */
export const dynamic = 'force-static'

type SitemapEntry = MetadataRoute.Sitemap[number]

/** Public routes only. Add dynamic entries by fetching them here. */
const routes: {
  path: string
  changeFrequency: SitemapEntry['changeFrequency']
  priority: number
}[] = [
  { path: '', changeFrequency: 'weekly', priority: 1 },
  { path: '/about', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/contact', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/privacy', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/terms', changeFrequency: 'yearly', priority: 0.3 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return routes.map(({ path, changeFrequency, priority }) => ({
    url: `${siteConfig.url}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }))
}
