import { readFile } from "node:fs/promises";
import { isAbsolute, resolve } from "node:path";

import { builtRegistryItemSchema, parseRegistryIndex } from "@openui/registry-schema";

import type { BuiltRegistryItem, RegistryIndex, RegistryIndexEntry } from "@openui/types";
import { notFound } from "@openui/utils";

import type { Env } from "../env.js";
import { artifactsDirectory } from "../paths.js";

/**
 * Registry artifact store.
 *
 * The registry is the product's distribution contract, and it is *immutable*:
 * artifacts are written by `pnpm build:registry` and never mutated at runtime.
 * That makes them ideal to serve straight from disk, which is what this module
 * does — with two deliberate properties:
 *
 *  - **Read once, serve many.** Artifacts are parsed at most once per TTL and
 *    held in memory, so a burst of `openui add` calls costs one file read.
 *  - **Bytes, not re-serialisation.** The item endpoint returns the artifact's
 *    original text, so what a client hashes matches what the build wrote.
 *
 * Path traversal is impossible by construction: a requested item name must
 * match an entry already in the index, and an index entry's artifact path is
 * reduced to its basename before it is joined to the artifacts directory.
 */

export interface RegistryItemRecord {
  entry: RegistryIndexEntry;
  artifact: BuiltRegistryItem;
  /** The exact bytes the build wrote, for integrity-preserving responses. */
  raw: string;
}

export interface RegistryStore {
  index: () => Promise<RegistryIndex>;
  item: (name: string, namespace?: string) => Promise<RegistryItemRecord>;
  /** Absolute directory the store reads from, surfaced for diagnostics. */
  directory: () => string;
}

const NAME_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function createRegistryStore(env: Env): RegistryStore {
  const directory = artifactsDirectory(env);

  let indexCache: { value: RegistryIndex; loadedAt: number } | null = null;
  const itemCache = new Map<string, { value: RegistryItemRecord; loadedAt: number }>();

  const ttlMs = env.REGISTRY_CACHE_TTL * 1000;
  const fresh = (loadedAt: number) => Date.now() - loadedAt < ttlMs;

  async function loadIndex(): Promise<RegistryIndex> {
    if (indexCache && fresh(indexCache.loadedAt)) return indexCache.value;
    const file = resolve(directory, "index.json");

    let raw: string;
    try {
      raw = await readFile(file, "utf8");
    } catch (error) {
      // An unbuilt registry is a deployment problem, not a user error, and the
      // message names the command that fixes it.
      throw new Error(
        `Registry index not found at ${file}. Run \`pnpm build:registry\` before starting the API.`,
        { cause: error },
      );
    }

    const value = parseRegistryIndex(JSON.parse(raw));
    indexCache = { value, loadedAt: Date.now() };
    return value;
  }

  async function loadItem(entry: RegistryIndexEntry): Promise<RegistryItemRecord> {
    const key = `${entry.namespace}/${entry.name}`;
    const cached = itemCache.get(key);
    if (cached && fresh(cached.loadedAt)) return cached.value;

    const basename = entry.url.split("/").pop();
    if (!basename || !basename.endsWith(".json") || basename.includes("..")) {
      throw new Error(`Registry index entry "${entry.name}" has an invalid artifact url.`);
    }

    const raw = await readFile(resolve(directory, basename), "utf8");
    const parsed = builtRegistryItemSchema.safeParse(JSON.parse(raw));

    // A stale or hand-edited build output would let metadata misrepresent the
    // source it ships. Fail loudly rather than serve either half.
    if (!parsed.success || parsed.data.name !== entry.name) {
      throw new Error(
        `Registry artifact for "${entry.name}" does not match its index entry. Re-run \`pnpm build:registry\`.`,
      );
    }

    const value: RegistryItemRecord = { entry, artifact: parsed.data as unknown as BuiltRegistryItem, raw };
    itemCache.set(key, { value, loadedAt: Date.now() });
    return value;
  }

  return {
    directory: () => directory,
    index: loadIndex,
    async item(name, namespace) {
      if (!NAME_PATTERN.test(name)) {
        throw notFound(`Registry item "${name}" was not found.`);
      }

      const index = await loadIndex();
      const entry = index.items.find(
        (candidate) =>
          candidate.name === name && (!namespace || candidate.namespace === namespace),
      );
      if (!entry) {
        throw notFound(
          namespace
            ? `Registry item "${namespace}/${name}" was not found.`
            : `Registry item "${name}" was not found.`,
        );
      }

      return loadItem(entry);
    },
  };
}
