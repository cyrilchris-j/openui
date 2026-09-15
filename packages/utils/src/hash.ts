/**
 * Browser-safe deterministic hashing.
 *
 * These are *not* cryptographic. They exist for stable React keys, cache
 * busting and content fingerprints in the UI. Source integrity uses SHA-256
 * from `@openui/utils/node`.
 */

export function fnv1a(value: string): number {
  let hash = 0x811c9dc5;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return hash >>> 0;
}

export function fnv1aHex(value: string): string {
  return fnv1a(value).toString(16).padStart(8, "0");
}

/** Short, stable, human-readable fingerprint of any string content. */
export function contentFingerprint(value: string, length = 8): string {
  const first = fnv1aHex(value);
  const second = fnv1aHex(`${value.length}:${value}`);
  return `${first}${second}`.slice(0, length);
}

/** Deterministic index into a collection, used for but not limited to avatars. */
export function stableIndex(seed: string, buckets: number): number {
  if (buckets <= 0) return 0;
  return fnv1a(seed) % buckets;
}

const ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyz";

/** Deterministic pseudo-random id (no crypto dependency, safe in browsers). */
export function stableId(seed: string, length = 12): string {
  let hash = fnv1a(seed);
  let output = "";
  for (let index = 0; index < length; index += 1) {
    output += ALPHABET[hash % ALPHABET.length] ?? "0";
    hash = Math.imul(hash ^ (hash >>> 7), 0x9e3779b1) >>> 0;
  }
  return output;
}
