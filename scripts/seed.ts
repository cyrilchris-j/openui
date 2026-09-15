#!/usr/bin/env tsx
/**
 * `pnpm db:seed`
 *
 * Seeds the database from the **registry itself**: the build pipeline runs, then
 * every item becomes a resource with one immutable version and its files.
 *
 * This is deliberate. Hand-written seed data drifts from the registry, and a
 * drifted seed produces a website that shows resources nobody can install. Using
 * the build output means the database and the published artifacts are the same
 * content by construction.
 */
import postgres from "postgres";

import { publishResource, upsertResourceFromItem } from "./lib/seed-registry.js";
import { buildRegistry } from "./lib/build.js";
import { REGISTRY_ROOT } from "./lib/paths.js";

const connectionString = process.env["DATABASE_URL"];
if (!connectionString) {
  process.stderr.write("DATABASE_URL is not set; nothing to seed.\n");
  process.exit(1);
}

const sql = postgres(connectionString, { max: 4, onnotice: () => {} });
const started = Date.now();

try {
  const built = await buildRegistry({ registryRoot: REGISTRY_ROOT, requireScreenshot: false });
  let created = 0;
  let published = 0;

  for (const item of built.items) {
    const result = await upsertResourceFromItem(sql, item, built.namespaceOf.get(item.name) ?? "default");
    if (result.created) created += 1;
    const version = await publishResource(sql, result.resourceId, item, built.index.version, {
      expectedLatest: result.latestVersion,
    });
    if (version) published += 1;
  }

  await sql`select app.refresh_contributor_stats()`;

  process.stdout.write(
    `Seeded ${built.items.length} registry items (${created} new resources, ${published} new versions) in ${Date.now() - started}ms\n`,
  );
} catch (error) {
  process.stderr.write(`Seeding failed: ${(error as Error).message}\n`);
  process.exitCode = 1;
} finally {
  await sql.end({ timeout: 5 });
}
