#!/usr/bin/env tsx
/**
 * `pnpm db:migrate [--dry] [--dump] [--maintain]`
 *
 * Applies `database/migrations/*.sql` in lexical order inside one transaction
 * per file, recording each in `schema_migrations`.
 *
 * Why a hand-written runner instead of a framework: the platform's migrations are
 * plain SQL that must also apply inside the Supabase SQL editor, and the runner's
 * job is small enough that a dependency would obscure more than it saves.
 */
import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";

import postgres from "postgres";

import { MIGRATIONS_DIR, SEEDS_DIR } from "./lib/paths.js";

const args = new Set(process.argv.slice(2));
const dryRun = args.has("--dry");
const dumpOnly = args.has("--dump");

const connectionString = process.env["DATABASE_URL"];
if (!connectionString) {
  process.stderr.write(
    "DATABASE_URL is not set.\n\n" +
      "Point it at a local Postgres (`postgresql://postgres:postgres@127.0.0.1:54322/postgres`)\n" +
      "or at your Supabase connection string, then re-run.\n",
  );
  process.exit(1);
}

const sql = postgres(connectionString, { max: 1, onnotice: () => {} });

const LEDGER = `
  create table if not exists schema_migrations (
    name        text primary key,
    checksum    text not null,
    applied_at  timestamptz not null default now(),
    duration_ms integer not null default 0
  );
`;

async function checksum(content: string): Promise<string> {
  const { sha256Hex } = await import("@openui/utils/node");
  return sha256Hex(content);
}

async function listSql(directory: string): Promise<string[]> {
  try {
    const entries = await readdir(directory);
    return entries.filter((entry) => entry.endsWith(".sql")).sort();
  } catch {
    return [];
  }
}

async function apply(directory: string, pendingOnly: boolean): Promise<void> {
  const files = await listSql(directory);
  const applied = new Map<string, string>(
    (await sql<Array<{ name: string; checksum: string }>>`select name, checksum from schema_migrations`).map(
      (row) => [row.name, row.checksum],
    ),
  );

  for (const file of files) {
    const path = join(directory, file);
    const content = await readFile(path, "utf8");
    const hash = await checksum(content);
    const previous = applied.get(file);

    if (previous === hash) continue;
    if (previous && previous !== hash) {
      process.stderr.write(
        `\nRefusing to apply ${file}: it changed after being applied.\n` +
          "Migrations are immutable once applied. Add a new migration instead.\n",
      );
      process.exitCode = 1;
      return;
    }
    if (pendingOnly && previous) continue;

    if (dryRun) {
      process.stdout.write(`  would apply ${file}\n`);
      continue;
    }

    const started = Date.now();
    process.stdout.write(`  applying ${file} ... `);
    try {
      // One transaction per migration: a failure rolls the whole file back.
      await sql.begin(async (tx) => {
        await tx.unsafe(content);
        await tx`
          insert into schema_migrations (name, checksum, duration_ms)
          values (${file}, ${hash}, ${Date.now() - started})
          on conflict (name) do update set checksum = excluded.checksum, duration_ms = excluded.duration_ms
        `;
      });
      process.stdout.write(`ok (${Date.now() - started}ms)\n`);
    } catch (error) {
      process.stdout.write("failed\n");
      process.stderr.write(`\n${(error as Error).message}\n`);
      process.exitCode = 1;
      return;
    }
  }
}

try {
  if (dumpOnly) {
    const rows = await sql<Array<{ name: string }>>`select name from schema_migrations order by name`;
    process.stdout.write(`${rows.map((row) => row.name).join("\n")}\n`);
  } else {
    await sql.unsafe(LEDGER);
    process.stdout.write(`Migrations from ${MIGRATIONS_DIR}\n`);
    await apply(MIGRATIONS_DIR, false);
    if (process.exitCode !== 1) {
      process.stdout.write(`Seeds from ${SEEDS_DIR}\n`);
      await apply(SEEDS_DIR, false);
      // Seeds live in the same ledger so a changed seed is re-applied and a
      // rewritten historical seed is refused, exactly like a migration.
    }
  }
} finally {
  await sql.end({ timeout: 5 });
}
