# `database/functions`

Operational SQL that is **not** a migration: nothing here changes the schema in a
way the application depends on at request time, so it is applied separately and
can be re-run safely.

| File               | Contains                                                      | Run by                                     |
| ------------------ | ------------------------------------------------------------- | ------------------------------------------ |
| `maintenance.sql`  | telemetry anonymisation, audit retention, analytics refresh    | `pnpm db:maintain` or a daily cron job      |

## Why maintenance is separate from migrations

Migrations describe the shape of the data and must be applied in order, exactly
once. Maintenance describes what happens to the data over time and must be
re-runnable. Mixing them means an anonymisation job that runs twice either fails
or silently duplicates work.

## Privacy defaults

`app.anonymize_telemetry()` nulls the client hash used for unique view counting
after 30 days and deletes per-view rows after 180 days. The platform never stores
a raw IP address; see `SECURITY.md` for the full data-handling model.
