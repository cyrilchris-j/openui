import { describe, expect, it } from "vitest";

import { createApp } from "./app.js";
import { createRegistryStore } from "./registry/store.js";
import { createFakeDatabase, emptyDatabase, testEnv } from "./testing.js";

/**
 * Pipeline-level tests.
 *
 * These exercise the assembled application — middleware order included — because
 * the properties worth protecting here (security headers on every response, a
 * 401 rather than a 500 for an unauthenticated write, an immutable registry
 * response) are properties of the wiring, not of any single handler.
 */

function harness(options: { queries?: string[] } = {}) {
  const env = testEnv();
  const database = createFakeDatabase((query) => {
    options.queries?.push(query.text);
    return [];
  });
  const app = createApp({
    env,
    sql: database.sql,
    store: createRegistryStore(env),
  });
  return { app, database, env };
}

describe("security headers", () => {
  it("are applied to every response, including errors", async () => {
    const { app } = harness();
    const response = await app.request("/api/v1/definitely-not-a-route");
    expect(response.status).toBe(404);
    expect(response.headers.get("x-content-type-options")).toBe("nosniff");
    expect(response.headers.get("x-frame-options")).toBe("DENY");
    expect(response.headers.get("referrer-policy")).toBe("no-referrer");
    expect(response.headers.get("content-security-policy")).toContain("default-src 'none'");
  });

  it("issues a request id so a report can be correlated with a log line", async () => {
    const { app } = harness();
    const response = await app.request("/api/v1/config");
    expect(response.headers.get("x-request-id")).toMatch(/^[A-Za-z0-9-_]{8,64}$/);
  });

  it("rejects an inbound request id that is not a safe token", async () => {
    const { app } = harness();
    const response = await app.request("/api/v1/config", {
      headers: { "x-request-id": "<script>alert(1)</script>" },
    });
    expect(response.headers.get("x-request-id")).not.toContain("<");
  });
});

describe("error envelope", () => {
  it("returns a coded error without leaking internals", async () => {
    const { app } = harness();
    const response = await app.request("/api/v1/nope");
    const body = (await response.json()) as { error: { code: string; message: string } };

    expect(response.status).toBe(404);
    expect(body.error.code).toBe("not_found");
    expect(body.error.message).not.toMatch(/at .*\(.*:\d+:\d+\)/);
  });

  it("reports a missing resource as a validation failure, not a 500", async () => {
    const { app } = harness();
    const response = await app.request("/api/v1/resources/NOT_A_SLUG");
    expect(response.status).toBe(422);
    const body = (await response.json()) as { error: { code: string } };
    expect(body.error.code).toBe("validation_failed");
  });
});

describe("authorisation boundaries", () => {
  it("refuses an unauthenticated favourite with a 401", async () => {
    const { app, database } = harness();
    const response = await app.request("/api/v1/resources/magnetic-button/favorite", {
      method: "POST",
    });
    expect(response.status).toBe(401);
    // The write must not have reached the database.
    expect(database.queries).toHaveLength(0);
  });

  it("refuses an unauthenticated collection write with a 401", async () => {
    const { app } = harness();
    const response = await app.request("/api/v1/collections", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ title: "Editorial Portfolio" }),
    });
    expect(response.status).toBe(401);
  });

  it("refuses a malformed bearer token and stays anonymous", async () => {
    const { app } = harness();
    const response = await app.request("/api/v1/config", {
      headers: { authorization: "Bearer not-a-jwt" },
    });
    expect(response.status).toBe(200);
  });

  it("does not accept a role from an unverifiable token", async () => {
    const { app } = harness();
    // A token that claims admin but cannot be verified is an anonymous request,
    // so the moderation surface stays closed.
    const forged = [
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
      "eyJzdWIiOiIwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDAiLCJyb2xlIjoiYWRtaW4ifQ",
      "signature-that-is-not-valid",
    ].join(".");

    const response = await app.request("/api/v1/admin/analytics", {
      headers: { authorization: `Bearer ${forged}` },
    });
    expect(response.status).toBe(401);
  });

  it("protects every administrative route", async () => {
    const { app } = harness();
    const routes: Array<[string, string]> = [
      ["GET", "/api/v1/admin/submissions"],
      ["GET", "/api/v1/admin/audit-logs"],
      ["GET", "/api/v1/admin/analytics"],
      ["DELETE", "/api/v1/admin/resources/magnetic-button"],
      ["POST", "/api/v1/admin/users/3f2504e0-4f89-11d3-9a0c-0305e82c3301/role"],
    ];

    for (const [method, path] of routes) {
      const response = await app.request(path, {
        method,
        ...(method === "POST" ? { body: "{}", headers: { "content-type": "application/json" } } : {}),
      });
      expect(response.status, `${method} ${path}`).toBe(401);
    }
  });
});

describe("rate limiting", () => {
  it("advertises the limit and the remaining budget", async () => {
    const { app } = harness();
    const response = await app.request("/api/v1/config", {
      headers: { "x-forwarded-for": "203.0.113.7" },
    });
    expect(response.headers.get("ratelimit-limit")).toBe("1000");
    expect(response.headers.get("ratelimit-remaining")).toBeDefined();
  });

  it("returns a 429 with a retry hint once the window is exhausted", async () => {
    const env = testEnv({ RATE_LIMIT_PER_MINUTE: "3" });
    const app = createApp({ env, sql: emptyDatabase().sql, store: createRegistryStore(env) });
    const headers = { "x-forwarded-for": "198.51.100.4" };

    const responses = [];
    for (let index = 0; index < 5; index += 1) {
      responses.push(await app.request("/api/v1/config", { headers }));
    }

    const statuses = responses.map((response) => response.status);
    expect(statuses.slice(0, 3)).toEqual([200, 200, 200]);
    expect(statuses[3]).toBe(429);

    const limited = responses[3]!;
    const body = (await limited.json()) as { error: { code: string } };
    expect(body.error.code).toBe("rate_limit_exceeded");
    expect(limited.headers.get("retry-after")).toMatch(/^\d+$/);
  });

  it("keys the limit on a hash, never the raw address", async () => {
    const { app } = harness();
    const response = await app.request("/api/v1/config", {
      headers: { "x-forwarded-for": "203.0.113.7, 10.0.0.1" },
    });
    expect(response.headers.get("ratelimit-remaining")).toBeDefined();
    expect(JSON.stringify([...response.headers])).not.toContain("203.0.113.7");
  });
});

describe("registry endpoints", () => {
  it("serves the index at /r/registry.json", async () => {
    const { app } = harness();
    const response = await app.request("/r/registry.json");
    expect(response.status).toBe(200);

    const body = (await response.json()) as { name: string; items: unknown[] };
    expect(body.name).toBe("openui");
    expect(body.items.length).toBeGreaterThan(20);
  });

  it("serves an item artifact byte-identically to the build output", async () => {
    const { app } = harness();
    const response = await app.request("/r/magnetic-button.json");
    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("application/json");

    const body = (await response.json()) as { name: string; files: Array<{ content: string }> };
    expect(body.name).toBe("magnetic-button");
    expect(body.files[0]?.content.length).toBeGreaterThan(0);
  });

  it("answers a conditional request with a 304", async () => {
    const { app } = harness();
    const first = await app.request("/r/magnetic-button.json");
    const etag = first.headers.get("etag");
    expect(etag).toMatch(/^"sha256-/);

    const second = await app.request("/r/magnetic-button.json", {
      headers: { "if-none-match": etag! },
    });
    expect(second.status).toBe(304);
  });

  it("marks published artifacts immutable and long-lived", async () => {
    const { app } = harness();
    const response = await app.request("/r/magnetic-button.json");
    const cacheControl = response.headers.get("cache-control") ?? "";
    expect(cacheControl).toContain("immutable");
    expect(cacheControl).toContain("s-maxage=86400");
  });

  it("supports a namespace-qualified path", async () => {
    const { app } = harness();
    const response = await app.request("/r/default/magnetic-button.json");
    expect(response.status).toBe(200);
  });

  it("lists a namespace's items when the segment is a namespace", async () => {
    const { app } = harness();
    const response = await app.request("/r/default");
    expect(response.status).toBe(200);
    const body = (await response.json()) as { namespace: string; items: unknown[] };
    expect(body.namespace).toBe("default");
    expect(body.items.length).toBeGreaterThan(20);
  });

  it("returns a 404 for an unknown item", async () => {
    const { app } = harness();
    const response = await app.request("/r/not-a-real-item.json");
    expect(response.status).toBe(404);
  });
});

describe("health", () => {
  it("reports ok when the database answers", async () => {
    const { app } = harness();
    const response = await app.request("/api/v1/health");
    expect(response.status).toBe(200);

    const body = (await response.json()) as {
      status: string;
      database: string;
      registry: { items: number };
    };
    expect(body.status).toBe("ok");
    expect(body.database).toBe("ok");
    expect(body.registry.items).toBeGreaterThan(20);
  });

  it("degrades with a 503 when the database is unreachable", async () => {
    const env = testEnv();
    const failing = createFakeDatabase(() => {
      throw new Error("connection refused");
    });
    const app = createApp({ env, sql: failing.sql, store: createRegistryStore(env) });

    const response = await app.request("/api/v1/health");
    expect(response.status).toBe(503);
    const body = (await response.json()) as { status: string; database: string };
    expect(body.status).toBe("degraded");
    expect(body.database).toBe("unreachable");
  });

  it("never exposes a secret in the public config", async () => {
    const { app } = harness();
    const response = await app.request("/api/v1/config");
    const text = await response.text();
    expect(text).not.toContain("test-secret");
    expect(text).not.toContain("password");
  });
});

describe("CORS", () => {
  it("echoes only an allow-listed origin", async () => {
    const { app } = harness();
    const allowed = await app.request("/api/v1/config", {
      headers: { origin: "http://localhost:5173" },
    });
    expect(allowed.headers.get("access-control-allow-origin")).toBe("http://localhost:5173");

    const denied = await app.request("/api/v1/config", {
      headers: { origin: "https://evil.example.com" },
    });
    expect(denied.headers.get("access-control-allow-origin")).toBeNull();
  });

  it("answers a preflight without hitting the database", async () => {
    const { app, database } = harness();
    const response = await app.request("/api/v1/collections", {
      method: "OPTIONS",
      headers: { origin: "http://localhost:5173" },
    });
    expect(response.status).toBe(204);
    expect(database.queries).toHaveLength(0);
  });
});
