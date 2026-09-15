import { createHash } from "node:crypto";

/** Hex-encoded SHA-256, the canonical `resource_files.content_hash` format. */
export function sha256Hex(content: string | Uint8Array): string {
  return createHash("sha256").update(content).digest("hex");
}

/** Subresource-Integrity style digest used in registry index entries. */
export function sha256Integrity(content: string | Uint8Array): string {
  return `sha256-${createHash("sha256").update(content).digest("base64")}`;
}

/** Stable hash of a set of named files, order-independent. */
export function hashFiles(files: Array<{ path: string; content: string }>): string {
  const hash = createHash("sha256");
  for (const file of [...files].sort((a, b) => (a.path < b.path ? -1 : a.path > b.path ? 1 : 0))) {
    hash.update(file.path);
    hash.update("\u0000");
    hash.update(file.content);
    hash.update("\u0000");
  }
  return hash.digest("hex");
}

/**
 * Anonymised client identifier for rate limiting.
 *
 * Raw IP addresses are never stored or logged; only a salted digest that is
 * useless outside this process.
 */
export function anonymizeIdentity(value: string, salt: string): string {
  return createHash("sha256").update(`${salt}:${value}`).digest("hex").slice(0, 32);
}
