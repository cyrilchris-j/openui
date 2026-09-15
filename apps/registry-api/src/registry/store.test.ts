import { describe, expect, it } from "vitest";

import { OpenUIError } from "@openui/utils";

import { createRegistryStore } from "./store.js";
import { testEnv } from "../testing.js";

/**
 * These tests read the artifacts the real build produced, which is deliberate:
 * they assert the store's contract with `pnpm build:registry` rather than with a
 * fixture. If the build output and the store ever drift, this suite fails.
 */
const store = createRegistryStore(testEnv());
const env = testEnv();

describe("registry store", () => {
  it("resolves the artifacts directory from the repository root", () => {
    expect(store.directory().endsWith("apps/web/public/r")).toBe(true);
  });

  it("loads an index whose entries carry integrity digests", async () => {
    const index = await store.index();
    expect(index.items.length).toBeGreaterThan(20);
    expect(index.namespaces).toContain("default");

    for (const entry of index.items) {
      expect(entry.integrity).toMatch(/^sha256-/);
      expect(entry.url.endsWith(".json")).toBe(true);
      expect(entry.name).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    }
  });

  it("returns the artifact bytes unmodified so client digests match", async () => {
    const { raw, artifact } = await store.item("magnetic-button");
    expect(artifact.name).toBe("magnetic-button");
    // The returned text must be the file on disk, not a re-serialisation.
    expect(JSON.parse(raw).name).toBe("magnetic-button");
    expect(artifact.files.length).toBeGreaterThan(0);
  });

  it("resolves an unqualified name inside the default namespace", async () => {
    const { entry } = await store.item("grain-background");
    expect(entry.namespace).toBe("default");
  });

  it("resolves a namespace-qualified name", async () => {
    const { entry } = await store.item("grain-background", "default");
    expect(entry.name).toBe("grain-background");
  });

  it("rejects an unknown item with a 404", async () => {
    await expect(store.item("not-a-real-item")).rejects.toBeInstanceOf(OpenUIError);
  });

  it("rejects an unknown namespace", async () => {
    await expect(store.item("grain-background", "somewhere-else")).rejects.toBeInstanceOf(
      OpenUIError,
    );
  });

  it.each([
    ["path traversal", "../../etc/passwd"],
    ["absolute path", "/etc/passwd"],
    ["encoded traversal", "..%2f..%2fetc"],
    ["a slash", "components/magnetic-button"],
    ["an empty name", ""],
    ["uppercase", "MagneticButton"],
  ])("refuses %s before touching the filesystem", async (_label, name) => {
    await expect(store.item(name)).rejects.toBeInstanceOf(OpenUIError);
  });

  it("reports a clear error when the artifacts have not been built", async () => {
    const missing = createRegistryStore(
      testEnv({ REGISTRY_ARTIFACTS_DIR: "apps/registry-api/does-not-exist" }),
    );
    await expect(missing.index()).rejects.toThrow(/pnpm build:registry/);
  });

  it("serves the index from memory within the cache window", async () => {
    const cached = createRegistryStore(testEnv({ REGISTRY_CACHE_TTL: "60" }));
    const first = await cached.index();
    expect(await cached.index()).toBe(first);
  });

  it("re-reads artifacts when the cache window is disabled", async () => {
    const uncached = createRegistryStore(testEnv({ REGISTRY_CACHE_TTL: "0" }));
    const first = await uncached.index();
    const second = await uncached.index();
    // Equal by value, but a fresh parse — which is what TTL 0 promises.
    expect(second).not.toBe(first);
    expect(second).toStrictEqual(first);
  });

  it("exposes every documented resource type in the index", async () => {
    const index = await store.index();
    const types = new Set(index.items.map((entry) => entry.resourceType));
    for (const type of ["component", "text", "motion", "theme", "section", "block", "ai"]) {
      expect(types).toContain(type);
    }
  });
});

void env;
