import type { MetadataRoute } from 'next'

import { siteConfig } from '@/config/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Never expose authenticated surfaces or API routes to crawlers.
        disallow: ['/dashboard', '/api', '/login', '/register'],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  }
}
