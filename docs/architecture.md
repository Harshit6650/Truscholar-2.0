# Architecture notes

## Request flow

```
request
  └─ proxy.ts                 cheap gate: redirect unauthenticated /dashboard/*
      └─ app/**/layout.tsx    shell (server component)
          └─ app/**/page.tsx  server component; may await a service
              └─ service      validates input, applies business rules
                  └─ repo     data access behind an interface
```

Mutations reach the same service from either direction:

```
form  ──▶ Server Action (src/server/actions/*)  ──┐
                                                  ├──▶ service ──▶ repository
fetch ──▶ Route Handler (src/app/api/**/route.ts) ┘
```

Because both entry points share one service, validation, logging and business
rules cannot drift between the form and the API.

## Why the repository interface

Committing to an ORM before the data model is settled is the expensive kind of
early decision. `Repositories` is a plain interface; the in-memory
implementation keeps the app runnable and the shape honest. Swapping in Drizzle
or Prisma is one new file plus the factory in
`src/server/repositories/index.ts`.

The in-memory store is kept on `globalThis` in development so state survives hot
reloads. It resets on restart and is not shared across serverless instances — a
development aid, never a production store.

## Caching

`cacheComponents` — Next.js 16's unified flag covering PPR, `use cache` and
dynamic IO — is left commented out in `next.config.ts`. Enabling it changes
caching semantics across the whole app, so it belongs in a deliberate migration
where the `use cache` directives get added at the same time, not switched on by
default.

## Route groups

`(marketing)`, `(auth)` and `(dashboard)` are groups, so they do not appear in
URLs. Each owns its own chrome: public header/footer, a centred card shell, and
a sidebar shell respectively. Group layouts take a plain `children` prop rather
than the generated `LayoutProps` helper, since all three groups sit at the `/`
path and the helper cannot tell them apart.

## Naming

- Files: kebab-case (`site-header.tsx`, `use-media-query.ts`)
- Components: PascalCase, one primary export per file
- Hooks: `use-*.ts`, always `'use client'`
- Server-only modules: under `src/server/` or `src/lib/auth/`
