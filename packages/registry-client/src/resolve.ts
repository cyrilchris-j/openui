import type { BuiltRegistryItem, RegistryIndexEntry } from "@openui/types";
import { packageNameOnly, parseRegistryName } from "@openui/registry-schema";
import { conflict, notFound } from "@openui/utils";

/**
 * Dependency resolution.
 *
 * Two graphs are resolved at once, and they fail differently:
 *
 *  - **registry dependencies** (other registry items) must all exist, and must
 *    not form a cycle; a cycle is a hard error because an install would either
 *    loop or silently drop a file.
 *  - **npm dependencies** are merged across the whole closure. When two items
 *    ask for different ranges of the same package the install is refused rather
 *    than silently picking one — a consumer's lockfile should change for a
 *    reason they can see.
 */

export interface ResolvedRegistry {
  /** Topologically sorted: index 0 has no registry dependencies. */
  order: BuiltRegistryItem[];
  /** Requests that could not be satisfied, in request order. */
  missing: string[];
  /** One entry per registry item that was pulled in transitively. */
  pulledIn: Set<string>;
}

export interface NpmDependency {
  name: string;
  /** Ranges requested, with the item that asked for each. */
  requested: Array<{ range: string | null; by: string }>;
}

export interface MergedDependencies {
  /** Package name → single agreed range (or `latest` when unspecified). */
  resolved: Map<string, string>;
  /** Packages that could not be agreed on. */
  conflicts: Array<{ name: string; ranges: string[] }>;
}

interface ResolverInput {
  /** Fetch one item by name (already namespaced). */
  load: (name: string) => Promise<BuiltRegistryItem>;
  /** Names that exist, used to fail fast with a helpful message. */
  index: RegistryIndexEntry[];
}

/**
 * Resolves the full closure for `requests`.
 *
 * `requests` may be bare (`magnetic-button`) or namespaced
 * (`default/magnetic-button`); `defaultNamespace` is applied to bare names.
 */
export async function resolveRegistryClosure(
  requests: readonly string[],
  input: ResolverInput,
  defaultNamespace: string | null = "default",
): Promise<ResolvedRegistry> {
  const known = new Map(input.index.map((entry) => [entry.name, entry]));
  const byName = new Map<string, BuiltRegistryItem>();
  const missing: string[] = [];
  const visiting = new Set<string>();
  const order: BuiltRegistryItem[] = [];
  const pulledIn = new Set<string>();

  async function visit(name: string, trail: string[]): Promise<void> {
    const bare = parseRegistryName(name, defaultNamespace ?? undefined).name;
    if (byName.has(bare)) return;

    if (visiting.has(bare)) {
      throw conflict(`Registry dependency cycle: ${[...trail, bare].join(" → ")}.`);
    }
    if (!known.has(bare)) {
      if (!missing.includes(bare)) missing.push(bare);
      return;
    }

    visiting.add(bare);
    const item = await input.load(bare);
    for (const dependency of item.registryDependencies) {
      const dependencyName = parseRegistryName(dependency, defaultNamespace ?? undefined).name;
      if (known.has(dependencyName)) pulledIn.add(dependencyName);
      await visit(dependency, [...trail, bare]);
    }
    visiting.delete(bare);
    byName.set(bare, item);
    order.push(item);
  }

  for (const request of requests) {
    const bare = parseRegistryName(request, defaultNamespace ?? undefined).name;
    if (!known.has(bare) && !missing.includes(bare)) {
      missing.push(bare);
      continue;
    }
    await visit(request, []);
  }

  return { order, missing, pulledIn };
}

/**
 * Merges npm dependencies across a resolved closure.
 *
 * `null` range means "no range was declared"; that is treated as compatible
 * with anything, because the registry item will import the package the
 * consumer already has.
 */
export function mergeNpmDependencies(items: readonly BuiltRegistryItem[]): MergedDependencies {
  const requested = new Map<string, Array<{ range: string | null; by: string }>>();

  for (const item of items) {
    for (const specifier of item.dependencies) {
      const name = packageNameOnly(specifier);
      const at = specifier.lastIndexOf("@");
      const range = at > 0 ? specifier.slice(at + 1) : null;
      const list = requested.get(name) ?? [];
      list.push({ range, by: item.name });
      requested.set(name, list);
    }
  }

  const resolved = new Map<string, string>();
  const conflicts: Array<{ name: string; ranges: string[] }> = [];

  for (const [name, entries] of requested) {
    const ranges = [...new Set(entries.map((entry) => entry.range).filter((range): range is string => Boolean(range)))];
    if (ranges.length > 1) {
      conflicts.push({ name, ranges });
      continue;
    }
    const requestedRange = ranges[0];
    resolved.set(name, requestedRange ?? "latest");
  }

  return { resolved, conflicts };
}

/** Human-readable explanation of a conflict, used by the CLI and the API. */
export function describeDependencyConflict(conflictEntry: { name: string; ranges: string[] }): string {
  return `"${conflictEntry.name}" is required at incompatible ranges: ${conflictEntry.ranges.join(", ")}.`;
}

/**
 * Which items in the closure the user did not ask for. Used to print
 * "also installing …" before writing anything.
 */
export function describePulledIn(
  requests: readonly string[],
  resolved: ResolvedRegistry,
  defaultNamespace: string | null = "default",
): string[] {
  const requested = new Set(requests.map((name) => parseRegistryName(name, defaultNamespace ?? undefined).name));
  return resolved.order
    .map((item) => item.name)
    .filter((name) => !requested.has(name));
}

/** Guards against a request for something the registry does not have. */
export function assertResolvable(resolved: ResolvedRegistry): void {
  if (resolved.missing.length > 0) {
    const list = resolved.missing.join(", ");
    throw notFound(
      resolved.missing.length === 1
        ? `Resource "${list}" was not found in the registry.`
        : `Resources not found in the registry: ${list}.`,
    );
  }
}
