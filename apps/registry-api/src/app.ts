import { Hono } from "hono";
import { secureHeaders } from "hono/secure-headers";

import { API_PREFIX } from "@openui/types";

import type { Database } from "./db/client.js";
import type { Env } from "./env.js";
import {
  authenticate,
  cachePublic,
  cors,
  errorHandler,
  rateLimit,
  requestId,
  requestLogger,
  type AppBindings,
} from "./middleware.js";
import { createRegistryStore, type RegistryStore } from "./registry/store.js";
import { accountRoutes } from "./routes/account.js";
import { collectionRoutes } from "./routes/collections.js";
import { catalogRoutes, resourceRoutes } from "./routes/resources.js";
import { healthRoutes, registryRoutes } from "./routes/registry.js";
import { staffRoutes } from "./routes/staff.js";

export interface AppDependencies {
  env: Env;
  sql: Database;
  /** Injectable so tests can supply a fixture store instead of reading disk. */
  store?: RegistryStore;
}

/**
 * Application assembly.
 *
 * The middleware order is the security model, and it is applied globally rather
 * than per route so a new endpoint is protected by construction:
 *
 * ```text
 * request-id → secure headers → CORS → rate limit → authentication
 *   → route (authorisation → validation → business logic → database)
 * ```
 *
 * Routes below never re-implement any of those stages; they call the helpers in
 * `middleware.ts`, which is why a reviewer can check the security posture of the
 * whole API by reading one file.
 */
export function createApp({ env, sql, store }: AppDependencies): Hono<AppBindings> {
  const artifacts = store ?? createRegistryStore(env);

  const app = new Hono<AppBindings>();

  // Bindings first: every later middleware and route may rely on them.
  app.use("*", async (c, next) => {
    c.set("env", env);
    c.set("sql", sql);
    c.set("principal", null);
    await next();
  });

  app.use("*", requestId());
  app.use(
    "*",
    secureHeaders({
      // The API serves JSON and raw artifacts, never HTML, so no script or frame
      // policy can be relaxed accidentally by a future response.
      contentSecurityPolicy: {
        defaultSrc: ["'none'"],
        frameAncestors: ["'none'"],
        baseUri: ["'none'"],
      },
      crossOriginResourcePolicy: "cross-origin",
      xFrameOptions: "DENY",
      referrerPolicy: "no-referrer",
      xContentTypeOptions: "nosniff",
    }),
  );
  app.use("*", cors(env));
  // Structured request logs are for deployed environments; the test suite reads
  // assertions, not logs, so mounting the logger there would only add noise.
  if (env.NODE_ENV !== "test") app.use("*", requestLogger());

  const limit = rateLimit(env);
  app.use(`${API_PREFIX}/*`, limit());

  app.use(`${API_PREFIX}/*`, authenticate(env, sql));
  app.use("/r/*", limit(env.RATE_LIMIT_PER_MINUTE * 4));

  // Public reads are cached at the edge; anything authenticated is not, because
  // the response varies by principal and must not land in a shared cache.
  app.use(`${API_PREFIX}/*`, cachePublic(60));

  app.onError(errorHandler());

  app.get("/", (c) => c.redirect(`${API_PREFIX}/`));
  app.notFound((c) =>
    c.json(
      { error: { code: "not_found", message: `No route matches ${new URL(c.req.url).pathname}.` } },
      404,
    ),
  );

  // Machine-facing surface: `/r/registry.json`, `/r/:name.json`.
  app.route("/r", registryRoutes(artifacts));

  // Human-facing API.
  const v1 = new Hono<AppBindings>();
  // Health, config and the endpoint index live at the API root.
  v1.route("/", healthRoutes(artifacts));
  v1.route("/resources", resourceRoutes());
  v1.route("/", catalogRoutes());
  v1.route("/collections", collectionRoutes());
  v1.route("/", accountRoutes());
  v1.route("/admin", staffRoutes());

  app.route(API_PREFIX, v1);

  return app;
}

export type App = ReturnType<typeof createApp>;
