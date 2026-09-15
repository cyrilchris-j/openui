import type { Context, ErrorHandler, MiddlewareHandler } from "hono";

import type { UserRole } from "@openui/types";
import { OpenUIError, toErrorResponse, validationFailed } from "@openui/utils";
import { anonymizeIdentity, createLogger, type Logger } from "@openui/utils/node";
import type { output, ZodTypeAny } from "zod";

import { bearerToken, authenticationFailed, verifyToken, type Principal } from "./auth.js";
import type { Database } from "./db/client.js";
import { allowedOrigins, type Env } from "./env.js";

/**
 * The request pipeline, in the order it runs:
 *
 * ```text
 * request-id → CORS → rate limit → authentication → authorisation → validation
 *   → business logic → database
 * ```
 *
 * Every stage is middleware so that no route can accidentally skip one: a new
 * endpoint is protected by construction, not by remembering.
 */

export interface AppBindings {
  Variables: {
    requestId: string;
    logger: Logger;
    principal: Principal | null;
    env: Env;
    sql: Database;
  };
}

export type AppContext = Context<AppBindings>;

export function requestId(): MiddlewareHandler<AppBindings> {
  return async (c, next) => {
    const provided = c.req.header("x-request-id");
    const id = provided && /^[A-Za-z0-9-_]{8,64}$/.test(provided) ? provided : crypto.randomUUID();
    c.set("requestId", id);
    c.header("x-request-id", id);
    c.set("logger", createLogger({ level: c.get("env").LOG_LEVEL }).child({ requestId: id }));
    await next();
  };
}

export function requestLogger(): MiddlewareHandler<AppBindings> {
  return async (c, next) => {
    const started = Date.now();
    await next();
    const logger = c.get("logger");
    const fields = {
      method: c.req.method,
      path: new URL(c.req.url).pathname,
      status: c.res.status,
      durationMs: Date.now() - started,
    };
    // 5xx is a server problem and gets the error level so alerting can find it.
    if (c.res.status >= 500) logger.error("request.failed", fields);
    else if (c.res.status >= 400) logger.warn("request.rejected", fields);
    else logger.info("request.completed", fields);
  };
}

export function cors(env: Env): MiddlewareHandler<AppBindings> {
  const allowed = new Set(allowedOrigins(env));
  return async (c, next) => {
    const origin = c.req.header("origin");
    if (origin && allowed.has(origin)) {
      c.header("access-control-allow-origin", origin);
      c.header("vary", "origin");
      c.header("access-control-allow-credentials", "true");
      c.header("access-control-allow-methods", "GET,POST,PATCH,DELETE,OPTIONS");
      c.header("access-control-allow-headers", "authorization,content-type,x-request-id");
      c.header("access-control-max-age", "86400");
    }
    if (c.req.method === "OPTIONS") return c.body(null, 204);
    await next();
  };
}

/**
 * Fixed-window rate limiter.
 *
 * Keyed on a *salted digest* of the client address, never the address itself, and
 * the window is held in memory per instance. That is honest about what it is: it
 * stops accidental hammering and scripted abuse of the free tier, not a
 * determined distributed attacker. A shared store (Upstash/Redis) is the upgrade
 * path, and the interface here does not change when that swap happens.
 */
interface Window {
  count: number;
  resetAt: number;
}

export function rateLimit(env: Env) {
  const windows = new Map<string, Window>();
  const limit = env.RATE_LIMIT_PER_MINUTE;
  const windowMs = 60_000;

  return (limitOverride?: number): MiddlewareHandler<AppBindings> =>
    async (c, next) => {
      const header =
        c.req.header("x-forwarded-for")?.split(",")[0]?.trim() ??
        c.req.header("cf-connecting-ip") ??
        c.req.header("x-real-ip") ??
        "unknown";
      const identity = anonymizeIdentity(header, env.TELEMETRY_SALT);
      const now = Date.now();
      const current = windows.get(identity);

      if (!current || current.resetAt <= now) {
        windows.set(identity, { count: 1, resetAt: now + windowMs });
      } else {
        current.count += 1;
      }

      const active = windows.get(identity)!;
      const ceiling = limitOverride ?? limit;
      const remaining = Math.max(0, ceiling - active.count);
      c.header("ratelimit-limit", String(ceiling));
      c.header("ratelimit-remaining", String(remaining));
      c.header("ratelimit-reset", String(Math.ceil((active.resetAt - now) / 1000)));

      // Opportunistic cleanup: keeps the map bounded without a timer.
      if (windows.size > 5_000) {
        for (const [key, value] of windows) if (value.resetAt <= now) windows.delete(key);
      }

      if (active.count > ceiling) {
        c.header("retry-after", String(Math.ceil((active.resetAt - now) / 1000)));
        throw new OpenUIError("rate_limit_exceeded", "Too many requests. Try again in a moment.", {
          status: 429,
        });
      }

      await next();
    };
}

/**
 * Resolves the caller's identity and role.
 *
 * This is deliberately non-blocking: a missing or invalid token produces an
 * anonymous request rather than a 401, because most endpoints are public. Routes
 * that need a principal call `requireAuth`.
 */
export function authenticate(env: Env, sql: Database): MiddlewareHandler<AppBindings> {
  return async (c, next) => {
    c.set("principal", null);
    const token = bearerToken(c.req.header("authorization"));

    if (token && (env.SUPABASE_URL || env.SUPABASE_JWT_SECRET)) {
      try {
        const auth = await verifyToken(env, token);
        const rows = await sql<Array<{ role: UserRole }>>`
          select role from profiles where user_id = ${auth.userId} limit 1
        `;
        // No profile row means the account exists but has not completed signup;
        // treat it as the least privileged role.
        c.set("principal", { auth, role: rows[0]?.role ?? "user" });
      } catch {
        // An invalid token is an anonymous request, not an error — except when
        // the route later demands a principal, which then fails with 401.
        c.set("principal", null);
      }
    }

    await next();
  };
}

export function requirePrincipal(c: AppContext): Principal {
  const principal = c.get("principal");
  if (!principal) authenticationFailed();
  return principal;
}

/**
 * Parses and validates a JSON body, converting Zod issues into a 422.
 *
 * The return type is the schema's *output*, so a field with a `.default()` is
 * typed as present rather than optional — the caller never has to re-check it.
 */
export async function parseJson<S extends ZodTypeAny>(
  c: AppContext,
  schema: S,
): Promise<output<S>> {
  let raw: unknown;
  try {
    raw = await c.req.json();
  } catch {
    throw validationFailed("Request body must be valid JSON.", [{ path: "(body)", message: "Invalid JSON." }]);
  }
  const result = schema.safeParse(raw);
  if (!result.success) {
    throw validationFailed(
      "The request body did not validate.",
      result.error.issues.map((issue) => ({
        path: issue.path.join(".") || "(root)",
        message: issue.message,
      })),
    );
  }
  return result.data;
}

export function parseQuery<S extends ZodTypeAny>(c: AppContext, schema: S): output<S> {
  const params = Object.fromEntries(new URL(c.req.url).searchParams.entries());
  const result = schema.safeParse(params);
  if (!result.success) {
    throw validationFailed(
      "The query string did not validate.",
      result.error.issues.map((issue) => ({
        path: issue.path.join(".") || "(root)",
        message: issue.message,
      })),
    );
  }
  return result.data;
}

/**
 * Converts any throwable into the documented error envelope.
 *
 * Stack traces, SQL text and driver messages never reach the client: an unknown
 * error becomes a generic 500 and is logged with its request id.
 */
export function errorHandler(): ErrorHandler<AppBindings> {
  return (error, c) => {
    const response = toErrorResponse(error);
    const logger = c.get("logger");
    const requestId = c.get("requestId");

    if (response.status >= 500) {
      logger?.error("request.error", {
        code: response.code,
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
      });
    }

    const body = {
      error: {
        code: response.code,
        message: response.message,
        ...(error instanceof OpenUIError && error.details ? { details: error.details } : {}),
        requestId,
      },
    };
    return c.json(body, response.status as 400);
  };
}

/**
 * Cache headers for public reads.
 *
 * Published metadata is safe to cache — but a request that carried a token is
 * not, because its response may be tailored to the caller (favourite state, for
 * example). Those responses are marked `private` and given a short lifetime
 * rather than being dropped into a shared cache.
 */
export function cachePublic(seconds = 60): MiddlewareHandler<AppBindings> {
  return async (c, next) => {
    await next();
    if (c.req.method !== "GET" || c.res.status !== 200) return;

    if (c.req.header("authorization")) {
      c.header("cache-control", "private, no-store");
      c.header("vary", "authorization, origin");
      return;
    }

    c.header(
      "cache-control",
      `public, max-age=${seconds}, s-maxage=${seconds * 4}, stale-while-revalidate=300`,
    );
    c.header("vary", "origin");
  };
}
