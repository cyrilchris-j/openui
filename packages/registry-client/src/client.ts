import type { BuiltRegistryItem, RegistryIndex, RegistryIndexEntry } from "@openui/types";
import { parseBuiltRegistryItem, parseRegistryIndex } from "@openui/registry-schema";
import { OpenUIError } from "@openui/utils";

import { resolveRegistryClosure, type ResolvedRegistry } from "./resolve.js";

/**
 * Registry client.
 *
 * Design decisions worth stating:
 *
 *  - **Validate on arrival.** Every artifact is parsed with the same Zod schema
 *    the repository build uses. A compromised or stale CDN cannot make the CLI
 *    write `../../.ssh/authorized_keys` or inline an unreviewed dependency.
 *  - **Bounded retries with backoff.** Registry reads are idempotent, so
 *    retrying is safe; the timeout uses `AbortSignal` so a hanging CDN cannot
 *    hang a developer's terminal.
 *  - **Cache per invocation.** The index is fetched once, each item at most once.
 */

export type FetchLike = (input: string, init?: RequestInit) => Promise<Response>;

export interface RegistryClientOptions {
  /** Base URL of the registry, e.g. `https://openui.dev/r`. */
  baseUrl: string;
  /** Namespace applied to unqualified names. */
  defaultNamespace?: string;
  fetchImpl?: FetchLike;
  timeoutMs?: number;
  retries?: number;
  /** Progress reporting; defaults to silence so the client stays test-friendly. */
  logger?: (message: string) => void;
}

export class RegistryClient {
  readonly baseUrl: string;
  readonly defaultNamespace: string;
  private readonly fetchImpl: FetchLike;
  private readonly timeoutMs: number;
  private readonly retries: number;
  private readonly logger: (message: string) => void;
  private indexCache: RegistryIndex | null = null;
  private readonly itemCache = new Map<string, BuiltRegistryItem>();

  constructor(options: RegistryClientOptions) {
    this.baseUrl = options.baseUrl.replace(/\/+$/, "");
    this.defaultNamespace = options.defaultNamespace ?? "default";
    this.fetchImpl = options.fetchImpl ?? ((input, init) => fetch(input, init));
    this.timeoutMs = options.timeoutMs ?? 10_000;
    this.retries = options.retries ?? 2;
    this.logger = options.logger ?? (() => {});
  }

  indexUrl(): string {
    return `${this.baseUrl}/registry.json`;
  }

  /** Artifact URL. The default namespace is served from the registry root. */
  itemUrl(name: string, namespace?: string): string {
    const space = namespace ?? this.defaultNamespace;
    return space && space !== "default"
      ? `${this.baseUrl}/${space}/${name}.json`
      : `${this.baseUrl}/${name}.json`;
  }

  private async request(url: string): Promise<Response> {
    let lastError: unknown;
    for (let attempt = 0; attempt <= this.retries; attempt += 1) {
      try {
        const response = await this.fetchImpl(url, {
          headers: { accept: "application/json, text/plain;q=0.8" },
          signal: AbortSignal.timeout(this.timeoutMs),
        });
        if (response.status >= 500 && attempt < this.retries) {
          lastError = new Error(`Registry responded ${response.status}`);
          await delay(150 * 2 ** attempt);
          continue;
        }
        return response;
      } catch (error) {
        lastError = error;
        if (attempt === this.retries) break;
        await delay(150 * 2 ** attempt);
      }
    }
    throw new OpenUIError("internal_error", `Could not reach the registry at ${this.baseUrl}.`, {
      cause: lastError,
      status: 502,
    });
  }

  async getIndex(options: { force?: boolean } = {}): Promise<RegistryIndex> {
    if (this.indexCache && !options.force) return this.indexCache;
    this.logger(`Fetching registry index from ${this.indexUrl()}`);
    const response = await this.request(this.indexUrl());
    if (response.status === 404) {
      throw new OpenUIError("not_found", "The registry index was not found. Check the registry URL.");
    }
    if (!response.ok) {
      throw new OpenUIError("internal_error", `Registry index request failed (${response.status}).`, {
        status: 502,
      });
    }
    const raw: unknown = await response.json();
    const index = parseRegistryIndex(raw);
    this.indexCache = index;
    return index;
  }

  async getItem(name: string, namespace?: string): Promise<BuiltRegistryItem> {
    const url = this.itemUrl(name, namespace);
    const cached = this.itemCache.get(url);
    if (cached) return cached;

    const response = await this.request(url);
    if (response.status === 404) {
      throw new OpenUIError("not_found", `Resource "${name}" was not found in the registry.`);
    }
    if (!response.ok) {
      throw new OpenUIError("internal_error", `Could not fetch "${name}" (${response.status}).`, {
        status: 502,
      });
    }
    const raw: unknown = await response.json();
    const item = parseBuiltRegistryItem(raw);
    this.itemCache.set(url, item);
    return item;
  }

  /** Looks an entry up in the index, which also yields its namespace. */
  async findEntry(name: string): Promise<RegistryIndexEntry | null> {
    const index = await this.getIndex();
    return index.items.find((entry) => entry.name === name) ?? null;
  }

  /** Resolves the full closure for the requested resources. */
  async resolve(requests: readonly string[]): Promise<ResolvedRegistry> {
    const index = await this.getIndex();
    const namespaceByName = new Map(index.items.map((entry) => [entry.name, entry.namespace]));
    return resolveRegistryClosure(
      requests,
      {
        index: index.items,
        load: (name) => this.getItem(name, namespaceByName.get(name) ?? this.defaultNamespace),
      },
      this.defaultNamespace,
    );
  }

  /** Every resource in the index, filtered by type and category. */
  async list(options: { resourceType?: string; category?: string } = {}): Promise<RegistryIndexEntry[]> {
    const index = await this.getIndex();
    return index.items.filter(
      (entry) =>
        (!options.resourceType || entry.resourceType === options.resourceType) &&
        (!options.category || entry.category === options.category),
    );
  }
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
