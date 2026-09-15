import type { Database } from "./db/client.js";
import { loadEnv, type Env } from "./env.js";

/**
 * Test doubles for the API.
 *
 * The API talks to PostgreSQL through one interface — a tagged template
 * function — so a single fake is enough to exercise the whole request pipeline
 * without a live database. Tests that need a real server are gated on
 * `OPENUI_TEST_DATABASE_URL` in the integration suite; these are for everything
 * that is not actually about SQL.
 */

export interface RecordedQuery {
  /** The query text with parameter placeholders, for assertions. */
  text: string;
  values: unknown[];
}

export interface FakeDatabase {
  sql: Database;
  queries: RecordedQuery[];
}

export function createFakeDatabase(
  respond: (query: RecordedQuery) => unknown[] | Promise<unknown[]> = () => [],
): FakeDatabase {
  const queries: RecordedQuery[] = [];

  const tag = (strings: TemplateStringsArray, ...values: unknown[]) => {
    const text = strings.join("$");
    const query = { text, values };
    queries.push(query);
    return Promise.resolve(respond(query));
  };

  const sql = tag as unknown as Record<string, unknown>;
  // A non-template query carries its own text; the fake simply returns it.
  sql["unsafe"] = (value: string) => value;
  sql["json"] = (value: unknown) => value;
  sql["begin"] = (work: (tx: unknown) => Promise<unknown>) => work(sql);
  sql["end"] = async () => {};

  return { sql: sql as unknown as Database, queries };
}

/** A database that answers every query with an empty result set. */
export function emptyDatabase(): FakeDatabase {
  return createFakeDatabase(() => []);
}

const TEST_ENV: Record<string, string> = {
  NODE_ENV: "test",
  DATABASE_URL: "postgres://user:password@localhost:5432/openui_test",
  SUPABASE_JWT_SECRET: "test-secret-that-is-long-enough",
  TELEMETRY_SALT: "test-telemetry-salt",
  CORS_ALLOWED_ORIGINS: "http://localhost:5173",
  RATE_LIMIT_PER_MINUTE: "1000",
  REGISTRY_ARTIFACTS_DIR: "apps/web/public/r",
  REGISTRY_CACHE_TTL: "60",
  LOG_LEVEL: "error",
};

export function testEnv(overrides: Record<string, string> = {}): Env {
  return loadEnv({ ...process.env, ...TEST_ENV, ...overrides } as NodeJS.ProcessEnv);
}
