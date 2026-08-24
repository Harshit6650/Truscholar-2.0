# Features

One folder per business capability. A feature owns its own UI, hooks, schemas
and types, and exposes a small public surface through `index.ts`.

```
src/features/credentials/
├── components/          # feature-specific UI
├── hooks/               # feature-specific client hooks
├── schemas.ts           # Zod schemas for this feature
├── types.ts
└── index.ts             # the only file other features import from
```

Rules that keep this from turning back into a pile of shared folders:

- Features never import from another feature's internals — only its `index.ts`.
- Anything used by two or more features moves up into `src/components`,
  `src/lib` or `src/hooks`.
- Data access stays in `src/server/repositories`; features call services, not
  the database.
