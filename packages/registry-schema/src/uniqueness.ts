import type { ResourceFingerprint } from "@openui/types";

import { TAG_PATTERN } from "./constants.js";

/**
 * The uniqueness engine.
 *
 * A registry that scales past a handful of items attracts the same failure
 * mode: a contributor (or a first-party author under deadline pressure)
 * resubmits the same idea under a new name — `magnetic-button`,
 * `magnetic-button-v2`, `magnetic-button-blue`. The count contract would
 * happily accept them as three resources. This module is what refuses.
 *
 * Comparison is layered from cheap to expensive, and every layer is
 * deterministic so CI results never reshuffle between runs:
 *
 *  1. **Normalised name** — exact match after stripping variant suffixes
 *     (`-v2`, `-blue`, `-dark`) that exist only to dodge the check.
 *  2. **Fingerprint** — same category plus a shared *mechanism*. Mechanism
 *     axes (interaction / visual / motion) weigh double; context axes
 *     (layout / semantic purpose) weigh one; and vacuous values (`static`,
 *     `none`) don't count at all — otherwise every non-animated resource
 *     shares two axes for free and the engine flags paint techniques that
 *     merely both happen to be still.
 *  3. **Description similarity** — trigram Jaccard over word shingles; the
 *     threshold is low enough to catch paraphrase, high enough that two
 *     genuinely different components which merely use similar vocabulary
 *     (e.g. two things both "magnetic" and "pointer-driven") do not trip it.
 *
 * A pair is a duplicate when it matches the name rule, the fingerprint rule,
 * or both description *and* subcategory overlap. Each rule alone has a
 * different failure mode it catches, so they are reported separately.
 */

/** A registry item reduced to exactly what the engine compares. */
export interface UniquenessSubject {
  name: string;
  title: string;
  description: string;
  category: string;
  subcategory?: string;
  tags?: readonly string[];
  fingerprint?: ResourceFingerprint;
}

export interface DuplicatePair {
  a: string;
  b: string;
  /** Which rules matched — a pair can be caught by more than one. */
  reasons: Array<"name_variant" | "fingerprint_overlap" | "description_similarity">;
  /** Machine-readable detail for CI output. */
  detail: string;
}

/** Suffixes that exist only to differentiate a resubmission of the same idea. */
const VARIANT_SUFFIXES = [
  /^(?:v|version)[-_. ]?\d+$/i,
  /^(?:copy|clone|duplicate|new|fixed|final|final2|test|old|backup)$/,
  /^[a-z]+(?:[-_](?:dark|light|blue|red|green|purple|orange|pink|neon|mono))$/i,
] as const;

/** Names that reduce to the same thing after removing variant noise. */
function normalizedName(name: string): string {
  const parts = name.toLowerCase().split(/[-_.]/);
  const meaningful = parts.filter(
    (part) => !VARIANT_SUFFIXES.some((pattern) => pattern.test(part)),
  );
  return (meaningful.length > 0 ? meaningful : parts).join("-");
}

/**
 * Jaccard similarity over word trigrams.
 *
 * Word trigrams (not character trigrams) because resource descriptions share
 * vocabulary — "pointer", "spring", "scroll" — far more than they share
 * phrasing, and character-level similarity would flag every pair of
 * pointer-driven resources as near-duplicates.
 */
export function descriptionSimilarity(a: string, b: string): number {
  const shingles = (text: string): Set<string> => {
    const words = text
      .toLowerCase()
      .replace(/[^\p{L}\p{N}\s-]/gu, " ")
      .split(/\s+/)
      .filter((word) => word.length > 2 && !STOP_WORDS.has(word));
    const grams = new Set<string>();
    if (words.length <= 3) {
      grams.add(words.join(" "));
      return grams;
    }
    for (let i = 0; i + 3 <= words.length; i++) {
      grams.add(words.slice(i, i + 3).join(" "));
    }
    return grams;
  };

  const aGrams = shingles(a);
  const bGrams = shingles(b);
  if (aGrams.size === 0 || bGrams.size === 0) return 0;

  let intersection = 0;
  for (const gram of aGrams) if (bGrams.has(gram)) intersection++;
  const union = aGrams.size + bGrams.size - intersection;
  return union === 0 ? 0 : intersection / union;
}

const STOP_WORDS = new Set([
  "the", "and", "for", "with", "that", "this", "from", "into", "when", "while",
  "user", "users", "their", "them", "they", "its", "it's", "are", "was", "were",
  "has", "have", "had", "can", "will", "would", "could", "should", "than",
  "then", "there", "here", "over", "under", "between", "through", "without",
]);

const FINGERPRINT_AXES = [
  "interactionModel",
  "visualModel",
  "motionModel",
  "layoutModel",
  "semanticPurpose",
] as const;

/** Axes that describe how a resource behaves, not merely where it sits. */
const MECHANISM_AXES = new Set(["interactionModel", "visualModel", "motionModel"]);

/**
 * Values so generic that sharing them carries no signal. A still resource
 * genuinely has no motion; that must not read as "same idea".
 */
const VACUOUS_AXIS_VALUES = new Set(["", "none", "static", "unknown", "n/a"]);

/** Non-vacuous fingerprint axes shared by two items (0–5). */
export function fingerprintOverlap(
  a: ResourceFingerprint | undefined,
  b: ResourceFingerprint | undefined,
): number {
  if (!a || !b) return 0;
  let shared = 0;
  for (const axis of FINGERPRINT_AXES) {
    const left = a[axis]?.toLowerCase();
    const right = b[axis]?.toLowerCase();
    if (
      left &&
      right &&
      left === right &&
      !VACUOUS_AXIS_VALUES.has(left)
    ) {
      shared++;
    }
  }
  return shared;
}

/**
 * Whether two fingerprints describe the same idea.
 *
 * A duplicate needs a shared mechanism, not merely shared context: mechanism
 * axes weigh double, context axes weigh one, and the pair must share at least
 * three comparable (non-vacuous) axes so under-declared metadata can't flag.
 * Two still paint techniques with different rendering models are distinct;
 * two reveals with the same interaction *and* motion model are not — that is
 * exactly the "100 versions of TextReveal" failure the registry exists to
 * prevent.
 */
export function fingerprintDuplicate(
  a: ResourceFingerprint | undefined,
  b: ResourceFingerprint | undefined,
): boolean {
  if (!a || !b) return false;
  let score = 0;
  let comparable = 0;
  for (const axis of FINGERPRINT_AXES) {
    const left = a[axis]?.toLowerCase();
    const right = b[axis]?.toLowerCase();
    if (!left || !right || VACUOUS_AXIS_VALUES.has(left) || VACUOUS_AXIS_VALUES.has(right)) {
      continue;
    }
    comparable++;
    if (left !== right) continue;
    score += MECHANISM_AXES.has(axis) ? 2 : 1;
  }
  return comparable >= UNIQUENESS_THRESHOLDS.fingerprintComparableAxes && score >= UNIQUENESS_THRESHOLDS.fingerprintDuplicateScore;
}

/** Jaccard overlap of tag sets, 0–1. */
export function tagOverlap(a: readonly string[], b: readonly string[]): number {
  if (a.length === 0 || b.length === 0) return 0;
  const left = new Set(a.map((tag) => tag.toLowerCase()));
  let shared = 0;
  for (const tag of b) if (left.has(tag.toLowerCase())) shared++;
  return shared / (a.length + b.length - shared);
}

/** Thresholds, exported so tests and CI can reference the same numbers. */
export const UNIQUENESS_THRESHOLDS = {
  /** Same normalised name is always a duplicate, regardless of other signals. */
  nameExact: 1,
  /** Mechanism axes weigh double; context axes weigh one (see fingerprintDuplicate). */
  fingerprintMechanismWeight: 2,
  fingerprintContextWeight: 1,
  /** Weighted score at or above which two fingerprints are the same idea.
   *  Five = three shared axes including a visual/motion core (e.g. same
   *  interaction + motion + layout). Sharing only trigger + purpose while
   *  rendering and motion differ (score 4) is a family resemblance, not a
   *  duplicate. */
  fingerprintDuplicateScore: 5,
  /** Comparable (non-vacuous) axes required before the rule can fire. */
  fingerprintComparableAxes: 3,
  /** Description trigram Jaccard above this is suspicious on its own. */
  descriptionJaccard: 0.55,
  /** …but only a duplicate when combined with subcategory or tag overlap. */
  supportingOverlap: 0.34,
} as const;

export function findDuplicates(
  subjects: readonly UniquenessSubject[],
): DuplicatePair[] {
  const pairs: DuplicatePair[] = [];
  const byNormalizedName = new Map<string, UniquenessSubject>();

  for (const subject of subjects) {
    const normalized = normalizedName(subject.name);
    const existing = byNormalizedName.get(normalized);
    if (existing) {
      pairs.push({
        a: existing.name,
        b: subject.name,
        reasons: ["name_variant"],
        detail: `Both normalise to "${normalized}". Variant suffixes do not make a new idea.`,
      });
    } else {
      byNormalizedName.set(normalized, subject);
    }
  }

  // Pairwise pass for the expensive signals. O(n²) is fine here: the registry
  // is capped in the low thousands, and this runs once per build, not per view.
  for (let i = 0; i < subjects.length; i++) {
    for (let j = i + 1; j < subjects.length; j++) {
      const a = subjects[i]!;
      const b = subjects[j]!;
      if (a.name === b.name) continue; // already reported as duplicate_name
      const reasons: DuplicatePair["reasons"] = [];
      let detail = "";

      if (fingerprintDuplicate(a.fingerprint, b.fingerprint) && a.category === b.category) {
        reasons.push("fingerprint_overlap");
        detail = `${fingerprintOverlap(a.fingerprint, b.fingerprint)}/5 comparable fingerprint axes identical in the same category ("${a.category}").`;
      }

      const similarity = descriptionSimilarity(a.description, b.description);
      const support = Math.max(
        a.subcategory && a.subcategory === b.subcategory ? 1 : 0,
        tagOverlap(a.tags ?? [], b.tags ?? []),
      );
      if (
        similarity >= UNIQUENESS_THRESHOLDS.descriptionJaccard &&
        support >= UNIQUENESS_THRESHOLDS.supportingOverlap
      ) {
        reasons.push("description_similarity");
        detail = `${Math.round(similarity * 100)}% description overlap with ${Math.round(support * 100)}% subcategory/tag overlap.`;
      }

      if (reasons.length > 0) {
        pairs.push({ a: a.name, b: b.name, reasons, detail });
      }
    }
  }

  return pairs;
}

/** Whether a proposed name is a legal, distinct registry slug. */
export function isValidResourceName(name: string): boolean {
  return TAG_PATTERN.test(name) && name.length >= 3 && name.length <= 64;
}
