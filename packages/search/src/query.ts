/**
 * Query normalisation.
 *
 * The same query string is used by three consumers:
 *
 *   1. PostgreSQL full-text search (`websearch_to_tsquery`)
 *   2. the `pg_trgm` fuzzy fallback (`ILIKE %..%` / `similarity()`)
 *   3. the in-browser instant filter (which has no database at all)
 *
 * Everything funnels through `normalizeQuery` so all three agree on what the
 * user typed. Nothing user-supplied is ever interpolated into SQL text: the
 * API passes values as parameters, and these helpers only produce *values*.
 */

const STOP_WORDS = new Set([
  "a",
  "an",
  "and",
  "the",
  "for",
  "with",
  "of",
  "to",
  "in",
  "on",
  "at",
  "by",
  "or",
  "my",
  "me",
]);

export function normalizeQuery(value: string): string {
  return value
    .normalize("NFKC")
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 200);
}

/** Query tokens, lowercased, stop-words removed, original order preserved. */
export function tokenize(value: string, options: { keepStopWords?: boolean } = {}): string[] {
  const normalized = normalizeQuery(value).toLowerCase();
  if (normalized.length === 0) return [];
  const tokens = normalized
    .split(/[^\p{L}\p{N}_-]+/u)
    .map((token) => token.replace(/^-+|-+$/g, ""))
    .filter((token) => token.length > 0)
    .filter((token) => options.keepStopWords || !STOP_WORDS.has(token));
  return tokens.slice(0, 16);
}

/**
 * Sanitised input for `websearch_to_tsquery`.
 *
 * `websearch_to_tsquery` is used precisely because it does not throw on
 * "clever" input, but we still strip the quote and colon characters that
 * change its meaning so a query cannot be used to widen a search
 * unintentionally.
 */
export function toWebSearchQuery(value: string): string {
  return normalizeQuery(value)
    .replace(/["'`:!]/g, " ")
    .replace(/[()]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Escapes LIKE/ILIKE wildcards so user input cannot become a pattern. */
export function escapeLike(value: string, escapeChar = "\\"): string {
  return value.replace(new RegExp(`[${escapeChar}%_]`, "g"), (match) => `${escapeChar}${match}`);
}

/** Trigram-friendly pattern, e.g. `%magnetic%but%`. */
export function toTrigramPattern(value: string, escapeChar = "\\"): string {
  const cleaned = normalizeQuery(value)
    .replace(/[%_]/g, " ")
    .trim();
  if (cleaned.length === 0) return "%";
  return `%${escapeLike(cleaned, escapeChar).replace(/\s+/g, "%")}%`;
}

/**
 * Splits a query into a prefix term plus free terms, used by the
 * `pg_trgm` fallback so the last (incomplete) word still matches.
 */
export function splitPartialQuery(value: string): { terms: string[]; prefix: string } {
  // Trailing whitespace must be read before normalisation trims it: the user
  // typing `"grain "` has finished a term, `"grain"` is still completing one.
  const endsWithSpace = /\s$/.test(value);
  const tokens = tokenize(value, { keepStopWords: true });
  if (tokens.length === 0) return { terms: [], prefix: "" };
  if (endsWithSpace) return { terms: tokens, prefix: "" };
  const prefix = tokens[tokens.length - 1] ?? "";
  return { terms: tokens.slice(0, -1), prefix };
}

/** Marks the matched span in a title for highlighted rendering. */
export interface HighlightSpan {
  text: string;
  match: boolean;
}

export function highlightMatches(value: string, query: string): HighlightSpan[] {
  const tokens = tokenize(query, { keepStopWords: true });
  if (tokens.length === 0) return [{ text: value, match: false }];
  const wanted = new Set(tokens);
  const pattern = new RegExp(`(${tokens.map(escapeRegExp).join("|")})`, "gi");
  return value
    .split(pattern)
    .filter((part) => part.length > 0)
    .map((part) => ({ text: part, match: wanted.has(part.toLowerCase()) }));
}

export function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
