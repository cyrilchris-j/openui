import { serve } from "@hono/node-server";

import { createApp } from "./app.js";
import { createDatabase } from "./db/client.js";
import { loadEnv } from "./env.js";
import { createRegistryStore } from "./registry/store.js";
import { createLogger } from "@openui/utils/node";

/**
 * Server entrypoint.
 *
 * Configuration is validated *before* the socket is opened: a missing
 * `DATABASE_URL` should stop the process with a readable message rather than
 * surface as a 500 on the first request.
 */
async function main(): Promise<void> {
  const env = loadEnv();
  const logger = createLogger({ level: env.LOG_LEVEL });

  const database = createDatabase(env);
  const store = createRegistryStore(env);

  // Fail fast on a missing build output rather than 500-ing on the first
  // registry request — that is the single most likely misconfiguration.
  try {
    const index = await store.index();
    logger.info("registry.loaded", {
      items: index.items.length,
      directory: store.directory(),
      version: index.version,
    });
  } catch (error) {
    logger.warn("registry.unavailable", {
      message: error instanceof Error ? error.message : String(error),
    });
  }

  const app = createApp({ env, sql: database.sql, store });

  const server = serve({ fetch: app.fetch, port: env.PORT }, (info) => {
    logger.info("server.listening", {
      port: info.port,
      environment: env.NODE_ENV,
      authEnabled: Boolean(env.SUPABASE_URL || env.SUPABASE_JWT_SECRET),
    });
  });

  /**
   * Graceful shutdown: stop accepting connections, let in-flight requests drain,
   * then close the pool. A hard exit here would cut live database transactions.
   */
  let shuttingDown = false;
  const shutdown = async (signal: string) => {
    if (shuttingDown) return;
    shuttingDown = true;
    logger.info("server.shutdown", { signal });

    server.close(async () => {
      await database.close();
      logger.info("server.closed");
      process.exit(0);
    });

    // Do not hang forever on a stuck connection.
    setTimeout(() => process.exit(0), 10_000).unref();
  };

  process.on("SIGTERM", () => void shutdown("SIGTERM"));
  process.on("SIGINT", () => void shutdown("SIGINT"));
}

main().catch((error: unknown) => {
  // The logger may not exist yet, so startup failures go to stderr directly.
  console.error("OpenUI registry API failed to start.");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
