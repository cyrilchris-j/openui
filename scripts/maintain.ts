#!/usr/bin/env tsx
/**
 * `pnpm db:maintain`
 *
 * Applies `database/functions/maintenance.sql`, then runs the scheduled jobs:
 * telemetry anonymisation, audit-log retention, analytics and contributor
 * aggregates.
 *
 * Safe to run repeatedly, and safe to run concurrently with the API: every job
 * is a single statement inside its own transaction.
 */
import { readFile } from "node:fs/promises";
import { join } from "node:path";

import postgres from "postgres";

import { DATABASE_DIR } from "./lib/paths.js";

const connectionString = process.env["DATABASE_URL"];
if (!connectionString) {
  process.stderr.write("DATABASE_URL is not set; nothing to maintain.\n");
  process.exit(1);
}

const sql = postgres(connectionString, { max: 1, onnotice: () => {} });
const started = Date.now();

try {
  const maintenance = await readFile(join(DATABASE_DIR, "functions", "maintenance.sql"), "utf8");
  await sql.unsafe(maintenance);
  process.stdout.write("Applied database/functions/maintenance.sql\n");

  const [telemetry] = await sql<Array<{ views_anonymized: string; downloads_anonymized: string }>>`
    select * from app.anonymize_telemetry('30 days')
  `;
  process.stdout.write(
    `Anonymised ${telemetry?.views_anonymized ?? 0} views, ${telemetry?.downloads_anonymized ?? 0} downloads\n`,
  );

  const [pruned] = await sql<Array<{ prune_audit_logs: string }>>`
    select app.prune_audit_logs('2 years')
  `;
  process.stdout.write(`Pruned ${pruned?.prune_audit_logs ?? 0} audit log rows\n`);

  await sql`select app.refresh_analytics()`;
  const [contributors] = await sql<Array<{ refresh_contributor_stats: string }>>`
    select app.refresh_contributor_stats()
  `;
  process.stdout.write(`Refreshed analytics and ${contributors?.refresh_contributor_stats ?? 0} contributor rows\n`);

  process.stdout.write(`Maintenance complete in ${Date.now() - started}ms\n`);
} catch (error) {
  process.stderr.write(`Maintenance failed: ${(error as Error).message}\n`);
  process.exitCode = 1;
} finally {
  await sql.end({ timeout: 5 });
}
