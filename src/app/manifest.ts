import type { MetadataRoute } from 'next'

import { siteConfig } from '@/config/site'

/** Inherently static, and required to be marked so for a static export. */
export const dynamic = 'force-static'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: `${siteConfig.basePath}/`,
    display: 'standalone',
    background_color: siteConfig.themeColor.light,
    theme_color: siteConfig.themeColor.light,
    // basePath must be prefixed by hand: Next does not rewrite strings inside
    // the manifest, so a bare '/icon.svg' 404s on a project page.
    icons: [
      {
        src: `${siteConfig.basePath}/icon.svg`,
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  }
}
