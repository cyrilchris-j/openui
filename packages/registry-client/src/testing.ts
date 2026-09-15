import type { BuiltRegistryItem, RegistryIndex, RegistryIndexEntry } from "@openui/types";

export function makeBuiltItem(overrides: Partial<BuiltRegistryItem> = {}): BuiltRegistryItem {
  const name = overrides.name ?? "magnetic-button";
  const files = overrides.files ?? [
    {
      path: `${name}.tsx`,
      type: "registry:component" as const,
      content: `export function ${name.replace(/-(\w)/g, (_, c: string) => c.toUpperCase())}() {\n  return null;\n}\n`,
      contentHash: "hash-0001",
      sizeBytes: 42,
    },
  ];
  return {
    name,
    type: overrides.type ?? "registry:component",
    title: overrides.title ?? "Magnetic Button",
    description: overrides.description ?? "A physics-inspired button that leans toward the pointer.",
    category: overrides.category ?? "components",
    dependencies: overrides.dependencies ?? ["motion"],
    registryDependencies: overrides.registryDependencies ?? [],
    files,
    url: overrides.url ?? `https://openui.dev/r/${name}.json`,
    license: overrides.license ?? "MIT",
    ...(overrides.tags ? { tags: overrides.tags } : {}),
    ...(overrides.designSystem ? { designSystem: overrides.designSystem } : {}),
    ...(overrides.meta ? { meta: overrides.meta } : {}),
  };
}

export function makeIndexEntry(
  name: string,
  overrides: Partial<RegistryIndexEntry> = {},
): RegistryIndexEntry {
  return {
    name,
    namespace: overrides.namespace ?? "default",
    type: overrides.type ?? "registry:component",
    title: overrides.title ?? name,
    description: overrides.description ?? "A resource used in tests.",
    category: overrides.category ?? "components",
    resourceType: overrides.resourceType ?? "component",
    tags: overrides.tags ?? [],
    dependencies: overrides.dependencies ?? [],
    registryDependencies: overrides.registryDependencies ?? [],
    url: overrides.url ?? `components/${name}.json`,
    integrity: overrides.integrity ?? "sha256-test",
    ...(overrides.license ? { license: overrides.license } : {}),
    ...(overrides.designSystem ? { designSystem: overrides.designSystem } : {}),
    ...(overrides.difficulty ? { difficulty: overrides.difficulty } : {}),
  };
}

export function makeIndex(entries: RegistryIndexEntry[]): RegistryIndex {
  return {
    $schema: "https://openui.dev/schema/registry.json",
    name: "openui",
    homepage: "https://openui.dev",
    version: "0.1.0",
    generatedAt: "2026-01-01T00:00:00.000Z",
    namespaces: ["default"],
    items: entries,
  };
}

/** Minimal `Response` stub so the client can be tested without a server. */
export function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}
