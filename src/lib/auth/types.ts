export const ROLES = ['admin', 'issuer', 'verifier', 'learner'] as const

export type Role = (typeof ROLES)[number]

export type SessionUser = {
  id: string
  /** Display name only — never store or log more PII than a screen needs. */
  name: string
  role: Role
}

export type Session = {
  user: SessionUser
  expiresAt: Date
}
