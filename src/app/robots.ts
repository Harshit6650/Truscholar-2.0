import type { MetadataRoute } from 'next'

import { siteConfig } from '@/config/site'

/** Inherently static, and required to be marked so for a static export. */
export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Never expose authenticated surfaces or API routes to crawlers.
        disallow: [
          `${siteConfig.basePath}/dashboard`,
          `${siteConfig.basePath}/login`,
          `${siteConfig.basePath}/register`,
        ],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  }
}
