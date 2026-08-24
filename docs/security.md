# Security notes

Alignment target: OWASP Top 10 and OWASP LLM Top 10; India's DPDP Act 2023 for
personal data.

## Already in place

**Security headers** — set in `next.config.ts` for every response: CSP,
`X-Content-Type-Options`, `X-Frame-Options: DENY`, `Referrer-Policy`,
`Permissions-Policy`, `Cross-Origin-Opener-Policy` and HSTS.
`poweredByHeader` is off.

The CSP still allows `'unsafe-inline'` for scripts because Next.js emits an
inline bootstrap. Before production, move to a nonce-based CSP set in `proxy.ts`
and drop `'unsafe-inline'`.

**Environment validation** — `src/lib/env.ts` parses server and client variables
through Zod and throws on startup if anything is missing or malformed. Secrets
live only in server variables; anything `NEXT_PUBLIC_*` is inlined into the
browser bundle and must be treated as public.

**No hardcoded credentials** — nothing in this repo contains a secret.
`.env.local` is git-ignored; `.env.example` documents keys with empty values.

**Log redaction** — `src/lib/logger.ts` redacts a keyword list (passwords,
tokens, cookies, email, phone) and emits structured JSON. Log identifiers you
can join against, never payloads.

**Validation at the service boundary** — Zod schemas in `src/server/services/*`
run on every entry point. Route handlers return field-level errors without
echoing submitted values back.

**Explicit consent capture** — the contact form requires an explicit consent
checkbox rather than inferring consent from submission. Extend this to every
form collecting personal data: state the purpose, capture consent, retain only
what the purpose needs.

## Required before anything ships

- [ ] Nonce-based CSP; remove `'unsafe-inline'` from `script-src`
- [ ] Real auth: session verification in `src/lib/auth/session.ts`, secure
      cookie flags (`httpOnly`, `secure`, `sameSite: 'lax'`), rotation on login
- [ ] Authorization checks inside every protected page, Server Action and route
      handler — not only in `proxy.ts`
- [ ] Rate limiting on `/api/*` and on auth endpoints
- [ ] Parameterized queries only, once a database is added — no string-built SQL
- [ ] Audit logging for credential issue / revoke / verify; never disable it
- [ ] Retention and deletion policy for personal data (DPDP Act 2023)
- [ ] Reviewed privacy policy, including grievance officer details
- [ ] Dependency and secret scanning in CI

## Rules of thumb

- Never put personal data or secrets in URLs or query strings.
- Never log student, client or employee personal data. Use synthetic data in
  examples, fixtures and tests.
- A leaked credential is rotated first and discussed second.
- Public-facing content (marketing copy, docs, posts) must not reveal internal
  architecture, security findings, client names or unreleased features without
  approval.
- Production changes follow change management and review.
