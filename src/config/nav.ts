import type { Route } from 'next'
import { LayoutDashboard, Settings, ShieldCheck, type LucideIcon } from 'lucide-react'

export type NavItem = {
  title: string
  href: Route
  description?: string
  external?: boolean
}

export type SidebarItem = NavItem & {
  icon: LucideIcon
}

/** Public site navigation. */
export const marketingNav: NavItem[] = [
  { title: 'Home', href: '/' },
  { title: 'Solutions', href: '/solutions' },
  { title: 'About', href: '/about' },
  { title: 'Contact', href: '/contact' },
]

/** Authenticated app navigation. */
export const dashboardNav: SidebarItem[] = [
  { title: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { title: 'Settings', href: '/dashboard/settings', icon: Settings },
]

export const footerNav: { heading: string; items: NavItem[] }[] = [
  {
    heading: 'Product',
    items: [
      { title: 'Overview', href: '/' },
      { title: 'Solutions', href: '/solutions' },
      { title: 'About', href: '/about' },
    ],
  },
  {
    heading: 'Company',
    items: [{ title: 'Contact', href: '/contact' }],
  },
  {
    heading: 'Legal',
    items: [
      { title: 'Privacy', href: '/privacy' },
      { title: 'Terms', href: '/terms' },
    ],
  },
]

export const authNav = {
  login: '/login' as Route,
  register: '/register' as Route,
  afterLogin: '/dashboard' as Route,
  afterLogout: '/' as Route,
}

export const brandIcon = ShieldCheck
