# `database/schema`

The applied schema lives in `database/migrations` — those files are the source of
truth and are applied in lexical order by `scripts/migrate.ts`.

This directory exists for generated artifacts:

```bash
# Full schema dump, useful for review and for spinning up a scratch database.
pnpm db:migrate --dump > database/schema/schema.sql

# Applied-migration ledger, to see what a given environment is missing.
psql "$DATABASE_URL" -c 'select * from schema_migrations order by applied_at'
```

`schema.sql` is not committed: a checked-in dump drifts from the migrations
within one pull request and then gets trusted anyway. Generate it when you need
it.

## Applying migrations

```bash
pnpm db:migrate          # apply everything outstanding
pnpm db:migrate --dry    # list what would be applied
pnpm db:seed             # reference data + registry resources
pnpm db:maintain         # telemetry anonymisation, analytics refresh
```

Each migration runs in its own transaction and is recorded in
`schema_migrations`. A failed migration rolls back entirely and stops the run —
there is no "partially applied" state.
