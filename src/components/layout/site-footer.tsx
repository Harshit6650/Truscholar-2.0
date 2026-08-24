import Link from 'next/link'

import { Logo } from '@/components/common/logo'
import { footerNav } from '@/config/nav'

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="container-page py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-3">
            <Logo />
          </div>

          {footerNav.map((group) => (
            <nav key={group.heading} aria-label={group.heading} className="space-y-3">
              <p className="text-sm font-semibold">{group.heading}</p>
              <ul className="space-y-2">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <p className="text-muted-foreground mt-10 border-t pt-6 text-xs">
          &copy; {new Date().getFullYear()} Asset Chain Techlligence Pvt. Ltd. All rights
          reserved.
        </p>
      </div>
    </footer>
  )
}
