import type { BuiltRegistryItem } from "@openui/types";
import { OpenUIError } from "@openui/utils";

/**
 * Artifact integrity.
 *
 * The registry index publishes a digest per item. The CLI recomputes the digest
 * of the bytes it actually received and refuses to continue on a mismatch, so a
 * tampered artifact, a truncated download or a stale CDN cache is caught before
 * a single file is written.
 *
 * The hasher is injected because the same check runs in Node (node:crypto) and
 * in the browser (WebCrypto), and both must produce the same digest algorithm.
 */

export type ContentHasher = (files: Array<{ path: string; content: string }>) => string | Promise<string>;

/** Canonical byte sequence that gets hashed: sorted paths, NUL separated. */
export function digestInput(files: Array<{ path: string; content: string }>): Array<{ path: string; content: string }> {
  return [...files]
    .map((file) => ({ path: file.path, content: file.content }))
    .sort((a, b) => (a.path < b.path ? -1 : a.path > b.path ? 1 : 0));
}

export async function computeItemDigest(
  item: Pick<BuiltRegistryItem, "files">,
  hasher: ContentHasher,
): Promise<string> {
  return hasher(digestInput(item.files.map((file) => ({ path: file.path, content: file.content }))));
}

export interface IntegrityResult {
  ok: boolean;
  expected: string | null;
  actual: string;
}

/**
 * Verifies an artifact against the digest published in the index.
 *
 * When the index has no digest (hand-written or pre-1.0 registries) the check
 * reports `ok: true` with `expected: null` rather than failing: the caller
 * decides whether an unverified artifact is acceptable, and the CLI surfaces it
 * as a warning.
 */
export async function verifyItemIntegrity(
  item: BuiltRegistryItem,
  expected: string | null,
  hasher: ContentHasher,
): Promise<IntegrityResult> {
  const actual = await computeItemDigest(item, hasher);
  if (expected === null) return { ok: true, expected: null, actual };
  return { ok: actual === expected, expected, actual };
}

export async function assertItemIntegrity(
  item: BuiltRegistryItem,
  expected: string | null,
  hasher: ContentHasher,
): Promise<void> {
  const result = await verifyItemIntegrity(item, expected, hasher);
  if (!result.ok) {
    throw new OpenUIError(
      "conflict",
      `Integrity check failed for "${item.name}". The artifact does not match the digest published in the registry index.`,
    );
  }
}
