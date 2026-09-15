import postgres, { type Sql } from "postgres";

import type { Env } from "../env.js";

/**
 * Database client.
 *
 * Every query in this application is a tagged template, which means values are
 * always sent as parameters. There is no query string concatenation anywhere in
 * the codebase — that is what makes SQL injection structurally impossible here
 * rather than a matter of vigilance.
 *
 * `sql.unsafe` is used in exactly one place (the migration runner, outside this
 * app) and nowhere in request handling.
 */

export type Database = Sql<Record<string, unknown>>;

export interface DatabaseClient {
  sql: Database;
  close: () => Promise<void>;
}

export function createDatabase(env: Env): DatabaseClient {
  const sql = postgres(env.DATABASE_URL, {
    max: env.NODE_ENV === "production" ? 10 : 4,
    idle_timeout: 20,
    connect_timeout: 10,
    // Postgres notices are useful in development, noise in production.
    onnotice: env.NODE_ENV === "production" ? () => {} : undefined,
    transform: { undefined: null },
  }) as Database;

  return {
    sql,
    close: async () => {
      await sql.end({ timeout: 5 });
    },
  };
}

/** Sets the identity the RLS policies evaluate, for this transaction only. */
export async function withActor<T>(
  sql: Database,
  actorId: string | null,
  work: (tx: Database) => Promise<T>,
): Promise<T> {
  return sql.begin(async (tx) => {
    if (actorId) await tx`select set_config('app.user_id', ${actorId}, true)`;
    return work(tx as unknown as Database);
  }) as Promise<T>;
}
