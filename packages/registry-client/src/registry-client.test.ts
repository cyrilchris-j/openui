import { describe, expect, it } from "vitest";

import { RegistryClient } from "./client.js";
import { assertItemIntegrity, digestInput, verifyItemIntegrity } from "./integrity.js";
import { buildInstallPlan, destinationFor, DEFAULT_ALIASES, importPathFor } from "./plan.js";
import {
  assertResolvable,
  describeDependencyConflict,
  describePulledIn,
  mergeNpmDependencies,
  resolveRegistryClosure,
} from "./resolve.js";
import { jsonResponse, makeBuiltItem, makeIndex, makeIndexEntry } from "./testing.js";

describe("resolveRegistryClosure", () => {
  const index = [
    makeIndexEntry("magnetic-button", { registryDependencies: ["motion-primitives"] }),
    makeIndexEntry("motion-primitives"),
    makeIndexEntry("editorial-hero", { registryDependencies: ["magnetic-button"] }),
  ];

  const load = async (name: string) =>
    makeBuiltItem({
      name,
      registryDependencies:
        index.find((entry) => entry.name === name)?.registryDependencies ?? [],
    });

  it("resolves transitively and orders dependencies first", async () => {
    const resolved = await resolveRegistryClosure(["editorial-hero"], { index, load });
    expect(resolved.order.map((item) => item.name)).toEqual([
      "motion-primitives",
      "magnetic-button",
      "editorial-hero",
    ]);
    expect([...resolved.pulledIn].sort()).toEqual(["magnetic-button", "motion-primitives"]);
  });

  it("reports missing resources instead of throwing", async () => {
    const resolved = await resolveRegistryClosure(["does-not-exist"], { index, load });
    expect(resolved.missing).toEqual(["does-not-exist"]);
    expect(resolved.order).toEqual([]);
  });

  it("reports a missing transitive dependency", async () => {
    const partial = [makeIndexEntry("broken", { registryDependencies: ["ghost"] })];
    const resolved = await resolveRegistryClosure(["broken"], {
      index: partial,
      load: async (name) => makeBuiltItem({ name, registryDependencies: ["ghost"] }),
    });
    expect(resolved.missing).toContain("ghost");
    // The item that *can* be resolved is still installed, minus the ghost.
    expect(resolved.order.map((item) => item.name)).toEqual(["broken"]);
  });

  it("refuses to loop on a cycle", async () => {
    const cyclic = [
      makeIndexEntry("a", { registryDependencies: ["b"] }),
      makeIndexEntry("b", { registryDependencies: ["a"] }),
    ];
    await expect(
      resolveRegistryClosure(["a"], {
        index: cyclic,
        load: async (name) =>
          makeBuiltItem({ name, registryDependencies: name === "a" ? ["b"] : ["a"] }),
      }),
    ).rejects.toThrowError(/cycle/i);
  });

  it("deduplicates shared dependencies", async () => {
    const resolved = await resolveRegistryClosure(["a", "b"], {
      index: [
        makeIndexEntry("a", { registryDependencies: ["shared"] }),
        makeIndexEntry("b", { registryDependencies: ["shared"] }),
        makeIndexEntry("shared"),
      ],
      load: async (name) =>
        makeBuiltItem({
          name,
          registryDependencies:
            name === "a" || name === "b" ? ["shared"] : [],
        }),
    });
    expect(resolved.order.filter((item) => item.name === "shared")).toHaveLength(1);
  });

  it("assertResolvable throws a typed not-found error", async () => {
    const resolved = await resolveRegistryClosure(["nope"], { index, load });
    expect(() => assertResolvable(resolved)).toThrowError(/not found/i);
  });

  it("describes pulled-in dependencies", async () => {
    const resolved = await resolveRegistryClosure(["editorial-hero"], { index, load });
    expect(describePulledIn(["editorial-hero"], resolved)).toEqual(["motion-primitives", "magnetic-button"]);
  });
});

describe("mergeNpmDependencies", () => {
  it("merges compatible ranges", () => {
    const merged = mergeNpmDependencies([
      makeBuiltItem({ name: "a", dependencies: ["motion@^12.0.0"] }),
      makeBuiltItem({ name: "b", dependencies: ["motion@^12.0.0", "clsx"] }),
    ]);
    expect(merged.resolved.get("motion")).toBe("^12.0.0");
    expect(merged.resolved.get("clsx")).toBe("latest");
    expect(merged.conflicts).toEqual([]);
  });

  it("reports incompatible ranges", () => {
    const merged = mergeNpmDependencies([
      makeBuiltItem({ name: "a", dependencies: ["motion@^11.0.0"] }),
      makeBuiltItem({ name: "b", dependencies: ["motion@^12.0.0"] }),
    ]);
    expect(merged.conflicts).toHaveLength(1);
    expect(describeDependencyConflict(merged.conflicts[0]!)).toContain("incompatible ranges");
  });
});

describe("buildInstallPlan", () => {
  const item = makeBuiltItem({
    name: "magnetic-button",
    dependencies: ["motion@^12.0.0"],
    files: [
      {
        path: "magnetic-button.tsx",
        type: "registry:component",
        content: "export const A = 1;\n",
        contentHash: "h1",
        sizeBytes: 20,
      },
    ],
  });

  it("maps files into the alias folders", () => {
    const plan = buildInstallPlan([item]);
    expect(plan.files).toHaveLength(1);
    expect(plan.files[0]!.destination).toBe("src/components/magnetic-button.tsx");
    expect(plan.files[0]!.status).toBe("new");
  });

  it("honours custom aliases", () => {
    const plan = buildInstallPlan([item], { aliases: { components: "./app/ui" } });
    expect(plan.files[0]!.destination).toBe("app/ui/magnetic-button.tsx");
  });

  it("routes themes to the styles alias", () => {
    const theme = makeBuiltItem({
      name: "swiss-editorial",
      type: "registry:theme",
      category: "design-systems",
      dependencies: [],
      files: [
        { path: "swiss.css", type: "registry:theme", content: ":root{}", contentHash: "h", sizeBytes: 8 },
      ],
    });
    const plan = buildInstallPlan([theme]);
    expect(plan.files[0]!.destination).toBe("src/styles/swiss.css");
    expect(plan.requiredStylesheets).toEqual(["src/styles/swiss.css"]);
  });

  it("protects existing files that differ", () => {
    const existing = new Map([["src/components/magnetic-button.tsx", "// user edited\n"]]);
    const plan = buildInstallPlan([item], { existing });
    expect(plan.files).toHaveLength(0);
    expect(plan.protectedFiles).toHaveLength(1);
    expect(plan.protectedFiles[0]!.status).toBe("modified");
  });

  it("overwrites when explicitly allowed", () => {
    const existing = new Map([["src/components/magnetic-button.tsx", "// user edited\n"]]);
    const plan = buildInstallPlan([item], { existing, overwrite: true });
    expect(plan.files).toHaveLength(1);
    expect(plan.protectedFiles).toHaveLength(0);
  });

  it("recognises an identical file", () => {
    const existing = new Map([["src/components/magnetic-button.tsx", "export const A = 1;\n"]]);
    const plan = buildInstallPlan([item], { existing });
    expect(plan.files[0]!.status).toBe("identical");
  });

  it("collects packages with the items that require them", () => {
    const plan = buildInstallPlan([item]);
    expect(plan.packages).toEqual([
      { name: "motion", range: "^12.0.0", requiredBy: ["magnetic-button"] },
    ]);
  });

  it("warns when two items write the same destination", () => {
    const duplicate = makeBuiltItem({ name: "other", dependencies: [], files: item.files });
    const plan = buildInstallPlan([item, duplicate]);
    expect(plan.warnings.some((warning) => warning.includes("also provides"))).toBe(true);
  });

  it("never plans a path outside the alias folder", () => {
    expect(() =>
      destinationFor(
        makeBuiltItem(),
        { path: "../escape.tsx", type: "registry:component", content: "", contentHash: "h", sizeBytes: 0 },
        DEFAULT_ALIASES,
      ),
    ).toThrowError(/Unsafe registry path/);
  });

  it("derives import paths", () => {
    expect(importPathFor("src/components/button.tsx")).toBe("@/src/components/button.tsx");
  });
});

describe("integrity", () => {
  const item = makeBuiltItem({
    files: [
      { path: "b.tsx", type: "registry:component", content: "b", contentHash: "h", sizeBytes: 1 },
      { path: "a.tsx", type: "registry:component", content: "a", contentHash: "h", sizeBytes: 1 },
    ],
  });

  const hasher = (files: Array<{ path: string; content: string }>) =>
    files.map((file) => `${file.path}=${file.content}`).join("|");

  it("hashes files in a stable, order-independent way", () => {
    expect(digestInput(item.files).map((file) => file.path)).toEqual(["a.tsx", "b.tsx"]);
  });

  it("verifies a matching digest", async () => {
    const expected = await (async () => hasher(digestInput(item.files)))();
    await expect(assertItemIntegrity(item, expected, hasher)).resolves.toBeUndefined();
    expect((await verifyItemIntegrity(item, expected, hasher)).ok).toBe(true);
  });

  it("rejects a mismatch", async () => {
    await expect(assertItemIntegrity(item, "tampered", hasher)).rejects.toThrowError(/Integrity check failed/);
  });

  it("treats a missing digest as unverified rather than failing", async () => {
    const result = await verifyItemIntegrity(item, null, hasher);
    expect(result.ok).toBe(true);
    expect(result.expected).toBeNull();
  });
});

describe("RegistryClient", () => {
  const index = makeIndex([makeIndexEntry("magnetic-button"), makeIndexEntry("editorial-hero")]);
  const item = makeBuiltItem();

  function createClient(handler: (url: string) => Response) {
    return new RegistryClient({
      baseUrl: "https://openui.dev/r",
      fetchImpl: async (input) => handler(String(input)),
    });
  }

  it("fetches and caches the index", async () => {
    let calls = 0;
    const client = createClient(() => {
      calls += 1;
      return jsonResponse(index);
    });
    await client.getIndex();
    await client.getIndex();
    expect(calls).toBe(1);
    expect(client.indexUrl()).toBe("https://openui.dev/r/registry.json");
  });

  it("builds artifact URLs per namespace", () => {
    const client = createClient(() => jsonResponse(index));
    expect(client.itemUrl("magnetic-button")).toBe("https://openui.dev/r/magnetic-button.json");
    expect(client.itemUrl("button", "studio")).toBe("https://openui.dev/r/studio/button.json");
  });

  it("validates artifacts on arrival", async () => {
    const client = createClient((url) =>
      url.endsWith("registry.json") ? jsonResponse(index) : jsonResponse({ ...item, files: [{ path: "../x.tsx", type: "registry:component", content: "", contentHash: "h", sizeBytes: 0 }] }),
    );
    await expect(client.getItem("magnetic-button")).rejects.toThrow();
  });

  it("resolves a full closure through the index", async () => {
    const hero = makeBuiltItem({ name: "editorial-hero", registryDependencies: ["magnetic-button"] });
    const client = createClient((url) =>
      url.endsWith("registry.json")
        ? jsonResponse(index)
        : url.includes("editorial-hero")
          ? jsonResponse(hero)
          : jsonResponse(item),
    );
    const resolved = await client.resolve(["editorial-hero"]);
    expect(resolved.order.map((entry) => entry.name)).toEqual(["magnetic-button", "editorial-hero"]);
  });

  it("maps a 404 to a typed not-found error", async () => {
    const client = createClient((url) =>
      url.endsWith("registry.json") ? jsonResponse(index) : new Response("not found", { status: 404 }),
    );
    await expect(client.getItem("magnetic-button")).rejects.toThrowError(/not found/i);
  });

  it("retries a server error then gives up with a clear message", async () => {
    const client = new RegistryClient({
      baseUrl: "https://openui.dev/r",
      retries: 1,
      fetchImpl: async () => new Response("boom", { status: 503 }),
    });
    await expect(client.getIndex()).rejects.toThrowError(/Registry index request failed/);
  });
});
