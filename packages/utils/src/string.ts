/** Small, dependency-free string helpers used across the platform. */

export function invariant(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(`Invariant violated: ${message}`);
}

export function assertNever(value: never, message = "Unexpected value"): never {
  throw new Error(`${message}: ${JSON.stringify(value)}`);
}

export function titleCase(value: string): string {
  return value
    .split(/[\s_-]+/)
    .filter(Boolean)
    .map((word) => (word.length <= 2 ? word.toUpperCase() : word[0]!.toUpperCase() + word.slice(1)))
    .join(" ");
}

export function capitalize(value: string): string {
  if (value.length === 0) return value;
  return value[0]!.toUpperCase() + value.slice(1);
}

/**
 * Deterministic slug. Non-latin scripts are preserved rather than dropped so
 * that a Japanese or Arabic resource name still produces a usable slug.
 */
export function slugify(value: string, maxLength = 64): string {
  const normalized = value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/['’"]/g, "")
    .replace(/[^a-z0-9\u00a1-\uffff]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
  return normalized.slice(0, maxLength).replace(/-+$/g, "");
}

export function truncate(value: string, max: number, ellipsis = "…"): string {
  if (value.length <= max) return value;
  return value.slice(0, Math.max(0, max - ellipsis.length)).trimEnd() + ellipsis;
}

export function words(value: string): string[] {
  return value.split(/\s+/).filter(Boolean);
}

/**
 * Splits a title into leading words and a trailing phrase worth emphasising.
 *
 * Used by the editorial heading components: `"Interfaces should have a
 * fingerprint"` becomes lead `"Interfaces should have"` + emphasis
 * `"a fingerprint"`. With a single word nothing is split.
 */
export function splitForEmphasis(value: string, emphasisRatio = 0.4): [string, string] {
  const parts = words(value);
  if (parts.length <= 1) return ["", parts.join(" ")];
  const emphasisWords = Math.min(parts.length - 1, Math.max(1, Math.round(parts.length * emphasisRatio)));
  const pivot = parts.length - emphasisWords;
  return [parts.slice(0, pivot).join(" "), parts.slice(pivot).join(" ")];
}

export function unique<T>(values: readonly T[]): T[] {
  return Array.from(new Set(values));
}

export function uniqueBy<T, K>(values: readonly T[], key: (value: T) => K): T[] {
  const seen = new Set<K>();
  const output: T[] = [];
  for (const value of values) {
    const k = key(value);
    if (seen.has(k)) continue;
    seen.add(k);
    output.push(value);
  }
  return output;
}

export function groupBy<T, K extends string>(values: readonly T[], key: (value: T) => K): Record<K, T[]> {
  const output = {} as Record<K, T[]>;
  for (const value of values) {
    const k = key(value);
    (output[k] ??= []).push(value);
  }
  return output;
}

export function chunk<T>(values: readonly T[], size: number): T[][] {
  if (size <= 0) throw new RangeError("chunk size must be positive");
  const output: T[][] = [];
  for (let index = 0; index < values.length; index += size) {
    output.push(values.slice(index, index + size));
  }
  return output;
}

export function compact<T>(values: readonly (T | null | undefined | false)[]): T[] {
  return values.filter((value): value is T => Boolean(value));
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function pluralize(count: number, singular: string, plural = `${singular}s`): string {
  return count === 1 ? singular : plural;
}
