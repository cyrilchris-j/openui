import type {
  AuditCategory,
  AuditCheckResult,
  AuditReport,
  DesignDna,
} from "@openui/types";
import { clamp, unique } from "@openui/utils";

import { contrastRatio, roundRatio } from "./contrast.js";
import { computeFingerprint, describeDna } from "./dna.js";

/**
 * Anti-slop audit.
 *
 * This is not a syntax linter — it is a **design-quality report**. It takes a
 * structural description of an interface and scores it against the failure
 * modes that make generated UI recognisable: the centred three-column hero,
 * the repeated card grid, the softly rounded container, the missing
 * interaction, the single neutral grotesk.
 *
 * Why a structure description instead of parsing source? Two reasons:
 *
 *  1. The same engine has to run on a saved design fingerprint, on a live
 *     page in the browser and inside CI. None of those agree on a DOM.
 *  2. Parsing Tailwind classes is guesswork. Asking for the structure makes
 *     the audit honest about what it actually knows.
 *
 * Adding a check means adding one object to `DEFAULT_CHECKS`. Categories and
 * weights are data, not control flow, so the model stays extensible.
 */

export interface UiSectionDescription {
  id: string;
  /** `hero`, `features`, `pricing`, `gallery`, `footer`, `nav`, `cta`, ... */
  role: string;
  columns?: number;
  alignment?: "center" | "left" | "right" | "split" | "offset";
  /** 1–5 visual weight. Used to detect flat hierarchy. */
  emphasis?: number;
}

export interface UiStructure {
  sections: UiSectionDescription[];
  typography: {
    /** Font families actually loaded, in order of use. */
    families: string[];
    /** Font weights used, e.g. `[400, 500, 700]`. */
    weights: number[];
    /** Type sizes in px, as rendered. */
    sizes: number[];
    /** Heading tags present, e.g. `[1, 2, 2, 3, 3]`. */
    headingLevels: number[];
  };
  surface: {
    /** Border radii in px. */
    radii: number[];
    gradientCount: number;
    shadowCount: number;
    colors: string[];
    /** Foreground/background pairs that must be legible. */
    colorPairs?: Array<{ foreground: string; background: string; label?: string }>;
  };
  motion: {
    /** Transition/animation durations in ms. */
    durations: number[];
    easings: string[];
    /** Whether every animated element is wrapped in a reduced-motion guard. */
    reducedMotionCovered: boolean;
  };
  /** Stable identifiers of interactions present, e.g. `["pointer-magnet"]`. */
  interactions: string[];
  /** Spacing steps in px. */
  spacing: number[];
}

export interface AuditCheck {
  id: string;
  label: string;
  category: AuditCategory;
  /** Relative weight inside its category. */
  weight: number;
  /** 0–100 plus human-readable findings. */
  run: (structure: UiStructure) => { score: number; findings: string[] };
  /** Shown when the check does not pass. */
  recommendation?: string;
}

const CATEGORY_WEIGHTS: Record<AuditCategory, number> = {
  originality: 1.3,
  structure: 1.15,
  typography: 1.1,
  composition: 1.0,
  motion: 1.0,
  accessibility: 0.9,
};

export const AUDIT_CATEGORY_LABELS: Record<AuditCategory, string> = {
  structure: "Structure",
  typography: "Typography",
  motion: "Motion",
  composition: "Composition",
  originality: "Originality",
  accessibility: "Accessibility",
};

function ratio(part: number, whole: number): number {
  if (whole <= 0) return 0;
  return part / whole;
}

function share(radii: number[], predicate: (value: number) => boolean): number {
  return ratio(radii.filter(predicate).length, radii.length);
}

/** 100 when `value` is inside `[min, max]`, otherwise decays linearly. */
function band(value: number, min: number, max: number, decay = 25): number {
  if (value >= min && value <= max) return 100;
  const distance = value < min ? min - value : value - max;
  return clamp(Math.round(100 - distance * decay), 0, 100);
}

export const DEFAULT_CHECKS: AuditCheck[] = [
  {
    id: "hero_structure",
    label: "Hero structure",
    category: "structure",
    weight: 1.2,
    recommendation:
      "Replace the centred hero stack with an asymmetric or split composition where type and content share the axis.",
    run: ({ sections }) => {
      const hero = sections.find((section) => section.role === "hero");
      if (!hero) return { score: 90, findings: [] };
      const findings: string[] = [];
      let score = 100;
      if (hero.alignment === "center" && (hero.columns ?? 1) >= 3) {
        score = 20;
        findings.push("Centred hero with three or more columns — the default generated hero.");
      } else if (hero.alignment === "center") {
        score = 62;
        findings.push("Centred hero; nothing pulls the eye off the centre line.");
      } else if (hero.alignment === "offset" || hero.alignment === "split") {
        score = 100;
      }
      if (sections.filter((section) => section.role === "hero").length > 1) {
        score = Math.min(score, 55);
        findings.push("More than one hero-weight section competes for the first impression.");
      }
      return { score, findings };
    },
  },
  {
    id: "grid_repetition",
    label: "Repeated card grids",
    category: "structure",
    weight: 1.0,
    recommendation: "Vary section composition; do not repeat the same three-column card grid down the page.",
    run: ({ sections }) => {
      const grids = sections.filter((section) => (section.columns ?? 1) >= 3);
      const signatures = grids.map((section) => `${section.columns}c-${section.alignment ?? "left"}`);
      const counts = new Map<string, number>();
      for (const signature of signatures) counts.set(signature, (counts.get(signature) ?? 0) + 1);
      const worst = Math.max(0, ...counts.values());
      if (worst >= 4) {
        return { score: 25, findings: [`${worst} sections share an identical multi-column grid.`] };
      }
      if (worst === 3) {
        return { score: 60, findings: ["Three sections share an identical multi-column grid."] };
      }
      return { score: 100, findings: [] };
    },
  },
  {
    id: "layout_variety",
    label: "Layout variety",
    category: "structure",
    weight: 0.9,
    recommendation: "Give each section its own compositional idea instead of restacking the same shell.",
    run: ({ sections }) => {
      if (sections.length < 3) return { score: 100, findings: [] };
      const signatures = new Set(sections.map((section) => `${section.columns ?? 1}:${section.alignment ?? "left"}`));
      const score = band(signatures.size, 3, 12, 30);
      return {
        score,
        findings:
          signatures.size <= 2
            ? [`Only ${signatures.size} distinct section compositions across ${sections.length} sections.`]
            : [],
      };
    },
  },
  {
    id: "type_scale",
    label: "Type scale range",
    category: "typography",
    weight: 1.0,
    recommendation: "Widen the type scale; editorial work needs a display size well above body size.",
    run: ({ typography }) => {
      const sizes = [...typography.sizes].filter((size) => size > 0).sort((a, b) => a - b);
      if (sizes.length < 2) return { score: 45, findings: ["Fewer than two distinct type sizes."] };
      const smallest = sizes[0]!;
      const largest = sizes[sizes.length - 1]!;
      const spread = largest / Math.max(1, smallest);
      const findings: string[] = [];
      let score = 100;
      if (sizes.length < 5) {
        score -= 20;
        findings.push(`Only ${sizes.length} distinct type sizes; hierarchy is under-specified.`);
      }
      if (spread < 3) {
        score -= 35;
        findings.push(`Display size is only ${roundRatio(spread)}× body size; raise the contrast.`);
      }
      return { score: clamp(score, 0, 100), findings };
    },
  },
  {
    id: "font_variety",
    label: "Typographic voice",
    category: "typography",
    weight: 0.9,
    recommendation: "Pair a display face with a text face (or a mono) so the page has a voice.",
    run: ({ typography }) => {
      const families = unique(typography.families.map((family) => family.trim().toLowerCase()));
      if (families.length === 0) return { score: 50, findings: ["No font families declared."] };
      if (families.length === 1) {
        return {
          score: 45,
          findings: [`A single family (${families[0]}) carries the whole interface.`],
        };
      }
      if (families.length > 4) {
        return { score: 62, findings: ["More than four families; the voice fragments."] };
      }
      if (unique(typography.weights).length < 2) {
        return { score: 70, findings: ["Multiple families but a single weight; weight is unused as hierarchy."] };
      }
      return { score: 100, findings: [] };
    },
  },
  {
    id: "heading_hierarchy",
    label: "Heading hierarchy",
    category: "typography",
    weight: 1.1,
    recommendation: "Use exactly one h1 and descend without skipping levels.",
    run: ({ typography }) => {
      const levels = typography.headingLevels;
      const findings: string[] = [];
      let score = 100;
      const h1Count = levels.filter((level) => level === 1).length;
      if (h1Count === 0) {
        score -= 30;
        findings.push("No h1 on the page.");
      } else if (h1Count > 1) {
        score -= 25;
        findings.push(`${h1Count} h1 elements; the document outline is ambiguous.`);
      }
      const sorted = [...levels].sort((a, b) => a - b);
      let previous = sorted[0] ?? 1;
      for (const level of sorted) {
        if (level > previous + 1) {
          score -= 15;
          findings.push(`Heading level jumps from h${previous} to h${level}.`);
          break;
        }
        previous = level;
      }
      return { score: clamp(score, 0, 100), findings };
    },
  },
  {
    id: "radius_discipline",
    label: "Shape language",
    category: "composition",
    weight: 1.1,
    recommendation:
      "Pick a shape language deliberately. Widespread large radii are the default look of a UI kit.",
    run: ({ surface }) => {
      if (surface.radii.length === 0) return { score: 80, findings: [] };
      const softShare = share(surface.radii, (radius) => radius >= 12);
      const sharpShare = share(surface.radii, (radius) => radius <= 4);
      const findings: string[] = [];
      let score = 100;
      if (softShare >= 0.8) {
        score = 22;
        findings.push(`${Math.round(softShare * 100)}% of containers use a radius of 12px or more.`);
      } else if (softShare >= 0.5) {
        score = 58;
        findings.push(`${Math.round(softShare * 100)}% of containers are softly rounded.`);
      }
      if (sharpShare >= 0.6) score = Math.max(score, 88);
      return { score, findings };
    },
  },
  {
    id: "spacing_rhythm",
    label: "Spacing rhythm",
    category: "composition",
    weight: 0.8,
    recommendation: "Work from a spacing scale with four to eight steps, applied consistently.",
    run: ({ spacing }) => {
      const steps = unique(spacing);
      if (steps.length === 0) return { score: 70, findings: [] };
      const findings: string[] = [];
      if (steps.length <= 2) {
        findings.push(`Only ${steps.length} spacing values; every gap looks the same.`);
      }
      if (steps.length > 12) {
        findings.push(`${steps.length} distinct spacing values; the rhythm is arbitrary.`);
      }
      return { score: band(steps.length, 3, 9, 14), findings };
    },
  },
  {
    id: "gradient_restraint",
    label: "Gradient restraint",
    category: "originality",
    weight: 1.2,
    recommendation: "Remove decorative gradients. If a gradient stays, it should carry a design purpose.",
    run: ({ surface }) => {
      const count = surface.gradientCount;
      if (count >= 5) {
        return { score: 18, findings: [`${count} gradients on one page.`] };
      }
      if (count >= 3) {
        return { score: 48, findings: [`${count} gradients; decoration is doing the work of design.`] };
      }
      return { score: 100, findings: [] };
    },
  },
  {
    id: "surface_restraint",
    label: "Surface restraint",
    category: "originality",
    weight: 0.9,
    recommendation: "Reduce elevated card surfaces; not every block needs a shadow.",
    run: ({ surface }) => {
      if (surface.shadowCount >= 8) {
        return { score: 32, findings: [`${surface.shadowCount} elevated surfaces; the page reads as a dashboard.`] };
      }
      if (surface.shadowCount >= 5) {
        return { score: 65, findings: [`${surface.shadowCount} elevated surfaces.`] };
      }
      return { score: 100, findings: [] };
    },
  },
  {
    id: "interaction_variety",
    label: "Interaction presence",
    category: "motion",
    weight: 1.1,
    recommendation: "Add at least one deliberate interaction: pointer, scroll or gesture driven.",
    run: ({ interactions }) => {
      const count = unique(interactions).length;
      if (count === 0) return { score: 25, findings: ["No interaction beyond default browser behaviour."] };
      if (count === 1) return { score: 58, findings: ["A single interaction; the page is largely static."] };
      if (count >= 4) return { score: 100, findings: [] };
      return { score: 82, findings: [] };
    },
  },
  {
    id: "motion_consistency",
    label: "Motion consistency",
    category: "motion",
    weight: 1.0,
    recommendation: "Use two to four named durations; anything above 600ms should earn its place.",
    run: ({ motion }) => {
      const durations = unique(motion.durations);
      const findings: string[] = [];
      let score = 100;
      if (durations.length === 0) {
        score = 60;
        findings.push("No motion declared; transitions fall back to browser defaults.");
      } else if (durations.length > 5) {
        score = 55;
        findings.push(`${durations.length} distinct durations; motion timings are ad hoc.`);
      } else if (durations.length === 1) {
        score = 78;
        findings.push("One duration for every transition; motion cannot express hierarchy.");
      }
      const slow = durations.filter((duration) => duration > 800);
      if (slow.length > 0) {
        score = Math.min(score, 65);
        findings.push(`Motion slower than 800ms (${slow.join("ms, ")}ms) delays the interface.`);
      }
      const easings = unique(motion.easings).length;
      if (durations.length > 0 && easings > 4) {
        score = Math.min(score, 70);
        findings.push(`${easings} easing curves; motion does not feel like one system.`);
      }
      return { score: clamp(score, 0, 100), findings };
    },
  },
  {
    id: "reduced_motion",
    label: "Reduced motion support",
    category: "accessibility",
    weight: 1.2,
    recommendation: "Honour prefers-reduced-motion for every animation, not only the large ones.",
    run: ({ motion }) => {
      if (motion.durations.length === 0) return { score: 100, findings: [] };
      if (motion.reducedMotionCovered) return { score: 100, findings: [] };
      return { score: 25, findings: ["Animated elements are not guarded by prefers-reduced-motion."] };
    },
  },
  {
    id: "color_contrast",
    label: "Colour contrast",
    category: "accessibility",
    weight: 1.3,
    recommendation: "Raise contrast to at least 4.5:1 for body text and 3:1 for large display type.",
    run: ({ surface }) => {
      const pairs = surface.colorPairs ?? [];
      if (pairs.length === 0) {
        return { score: 62, findings: ["No foreground/background pairs supplied; contrast was not checked."] };
      }
      const results = pairs.map((pair) => ({
        label: pair.label ?? `${pair.foreground} on ${pair.background}`,
        ratio: contrastRatio(pair.foreground, pair.background),
      }));
      const failing = results.filter((result) => result.ratio < 4.5);
      if (failing.length === 0) return { score: 100, findings: [] };
      const worst = failing.reduce((acc, item) => (item.ratio < acc.ratio ? item : acc));
      const score = worst.ratio < 3 ? 20 : 55;
      return {
        score,
        findings: failing.map((result) => `${result.label} is ${roundRatio(result.ratio)}:1 (needs 4.5:1).`),
      };
    },
  },
];

export interface AuditOptions {
  checks?: AuditCheck[];
  /** Injected clock so reports are deterministic in tests. */
  now?: Date;
}

export function runAudit(structure: UiStructure, options: AuditOptions = {}): AuditReport {
  const checks = options.checks ?? DEFAULT_CHECKS;
  const results: AuditCheckResult[] = checks.map((check) => {
    const outcome = check.run(structure);
    const score = clamp(Math.round(outcome.score), 0, 100);
    return {
      id: check.id,
      label: check.label,
      score,
      weight: check.weight,
      findings: outcome.findings,
      passed: score >= 80,
    };
  });

  // Aggregate per category: each check contributes score * weight.
  const buckets = new Map<AuditCategory, { score: number; weight: number }>();
  for (const check of checks) {
    const result = results.find((entry) => entry.id === check.id);
    if (!result) continue;
    const bucket = buckets.get(check.category) ?? { score: 0, weight: 0 };
    bucket.score += result.score * check.weight;
    bucket.weight += check.weight;
    buckets.set(check.category, bucket);
  }

  const categoryScores = {} as Record<AuditCategory, number>;
  let overallWeighted = 0;
  let overallWeight = 0;
  for (const [category, bucket] of buckets) {
    const score = bucket.weight > 0 ? Math.round(bucket.score / bucket.weight) : 0;
    categoryScores[category] = score;
    overallWeighted += score * (CATEGORY_WEIGHTS[category] ?? 1);
    overallWeight += CATEGORY_WEIGHTS[category] ?? 1;
  }

  const issues = unique(results.filter((result) => !result.passed).flatMap((result) => result.findings));
  const recommendations = unique(
    results
      .filter((result) => !result.passed)
      .map((result) => checks.find((check) => check.id === result.id)?.recommendation)
      .filter((value): value is string => Boolean(value)),
  );

  return {
    generatedAt: (options.now ?? new Date()).toISOString(),
    overall: overallWeight > 0 ? Math.round(overallWeighted / overallWeight) : 0,
    categories: categoryScores,
    checks: results,
    issues,
    recommendations,
  };
}

/**
 * DNA-only audit: used on resource pages and in the CLI, where a full DOM
 * structure is not available but the design fingerprint is.
 */
export function auditDna(dna: Partial<DesignDna>, options: AuditOptions = {}): AuditReport {
  const fingerprint = computeFingerprint(dna);
  const resolved = fingerprint.dna;

  const structure: UiStructure = {
    sections: [
      {
        id: "hero",
        role: "hero",
        alignment: resolved.macrostructure === "symmetric" ? "center" : "split",
        columns: resolved.macrostructure === "mosaic" ? 4 : 2,
      },
    ],
    typography: {
      families:
        resolved.typographyStyle === "serif-display"
          ? ["Instrument Serif", "Inter"]
          : resolved.typographyStyle === "monospace"
            ? ["JetBrains Mono", "Inter"]
            : ["Inter"],
      weights: [400, 600],
      sizes: resolved.typographyStyle === "variable-poster" ? [14, 18, 32, 72, 120] : [14, 16, 24, 40, 64],
      headingLevels: [1, 2, 3],
    },
    surface: {
      radii: resolved.shapeLanguage === "rounded" ? [16, 16, 16, 16] : [0, 0, 2, 2],
      gradientCount: resolved.colorStrategy === "duotone" ? 1 : resolved.colorStrategy === "neon-on-dark" ? 2 : 0,
      shadowCount: resolved.shapeLanguage === "soft" ? 6 : 1,
      colors: [],
    },
    motion: {
      durations:
        resolved.motionLanguage === "none"
          ? []
          : resolved.motionLanguage === "kinetic"
            ? [120, 320, 600]
            : resolved.motionLanguage === "mechanical"
              ? [140, 240]
              : [180, 320, 600],
      easings: ["cubic-bezier(0.2,0,0,1)"],
      reducedMotionCovered: resolved.motionLanguage !== "kinetic",
    },
    interactions: resolved.motionLanguage === "none" ? [] : ["hover", "scroll"],
    spacing: resolved.density === "airy" ? [8, 16, 32, 64, 96] : [4, 8, 16, 24, 40],
  };

  const report = runAudit(structure, options);

  // Fold the DNA fingerprint into originality so a resource's score reflects
  // its actual design language, not just the placeholder structure above.
  const originality = Math.round(report.categories.originality * 0.45 + fingerprint.distinctiveness * 0.55);
  const categories = { ...report.categories, originality };

  const overallWeights = CATEGORY_WEIGHTS;
  let weighted = 0;
  let total = 0;
  for (const [category, score] of Object.entries(categories) as Array<[AuditCategory, number]>) {
    const weight = overallWeights[category] ?? 1;
    weighted += score * weight;
    total += weight;
  }

  return {
    ...report,
    categories,
    overall: total > 0 ? Math.round(weighted / total) : 0,
    issues: unique([...report.issues, ...fingerprint.risks]),
    recommendations: unique([
      ...report.recommendations,
      ...(fingerprint.distinctiveness < 60
        ? [`Fingerprint ${fingerprint.distinctiveness}/100 — ${describeDna(resolved)} is close to the default look.`]
        : []),
    ]),
  };
}

/** Compact textual report, used by the CLI and by AI tools as context. */
export function formatAuditReport(report: AuditReport): string {
  const lines = ["AI UI AUDIT", ""];
  const order: AuditCategory[] = ["structure", "typography", "motion", "composition", "originality", "accessibility"];
  const width = Math.max(...Object.values(AUDIT_CATEGORY_LABELS).map((label) => label.length));
  for (const category of order) {
    const score = report.categories[category] ?? 0;
    lines.push(`${AUDIT_CATEGORY_LABELS[category].padEnd(width)}  ${String(score).padStart(3)}/100`);
  }
  lines.push("", `Overall    ${report.overall}/100`);
  if (report.issues.length > 0) {
    lines.push("", "Potential issues:");
    for (const issue of report.issues.slice(0, 8)) lines.push(`- ${issue}`);
  }
  return lines.join("\n");
}
