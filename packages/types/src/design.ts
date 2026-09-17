/**
 * Design DNA vocabulary.
 *
 * These axes are the backbone of the platform: they are what makes a resource
 * distinguishable from generic output, they power faceted search, and they are
 * what AI tools read before generating anything. Every axis is a closed set so
 * that filtering, fingerprinting and auditing stay deterministic.
 */

export const DESIGN_GENRES = [
  "editorial",
  "brutalist",
  "swiss",
  "industrial",
  "organic",
  "retro",
  "technical",
  "luxury",
  "playful",
  "minimal",
] as const;
export type DesignGenre = (typeof DESIGN_GENRES)[number];

export const MACROSTRUCTURES = [
  "symmetric",
  "asymmetric",
  "split",
  "stack",
  "mosaic",
  "rail",
  "scatter",
  "full-bleed",
] as const;
export type Macrostructure = (typeof MACROSTRUCTURES)[number];

export const DENSITIES = ["airy", "medium", "compact", "dense"] as const;
export type Density = (typeof DENSITIES)[number];

export const SHAPE_LANGUAGES = ["sharp", "soft", "rounded", "cut", "pill", "mixed"] as const;
export type ShapeLanguage = (typeof SHAPE_LANGUAGES)[number];

export const MOTION_LANGUAGES = ["none", "subtle", "expressive", "kinetic", "mechanical"] as const;
export type MotionLanguage = (typeof MOTION_LANGUAGES)[number];

export const TYPOGRAPHY_STYLES = [
  "grotesk",
  "serif-display",
  "monospace",
  "humanist",
  "geometric",
  "condensed",
  "variable-poster",
] as const;
export type TypographyStyle = (typeof TYPOGRAPHY_STYLES)[number];

export const COLOR_STRATEGIES = [
  "monochrome",
  "duotone",
  "accent-only",
  "high-contrast",
  "muted-earth",
  "neon-on-dark",
  "pastel",
] as const;
export type ColorStrategy = (typeof COLOR_STRATEGIES)[number];

export const DESIGN_TOKEN_TYPES = [
  "font",
  "color",
  "spacing",
  "radius",
  "shadow",
  "motion",
  "breakpoint",
] as const;
export type DesignTokenType = (typeof DESIGN_TOKEN_TYPES)[number];

/** The eight axes that together describe a design system's identity. */
export const DESIGN_DNA_AXES = [
  "genre",
  "macrostructure",
  "density",
  "shapeLanguage",
  "motionLanguage",
  "typographyStyle",
  "colorStrategy",
] as const;
export type DesignDnaAxis = (typeof DESIGN_DNA_AXES)[number];

export interface DesignDna {
  genre: DesignGenre;
  macrostructure: Macrostructure;
  density: Density;
  shapeLanguage: ShapeLanguage;
  motionLanguage: MotionLanguage;
  typographyStyle: TypographyStyle;
  colorStrategy: ColorStrategy;
}

/**
 * The behavioural fingerprint of a resource.
 *
 * Where the DNA axes describe *how a resource looks*, the fingerprint describes
 * *how it behaves and is built*: its interaction model, its rendering
 * technique, its motion mechanism, its layout strategy and its semantic job.
 * Two resources with the same DNA but different fingerprints are genuinely
 * different resources; two that share both are duplicate ideas.
 *
 * Every field is a lowercase slug so the uniqueness engine can compare
 * fingerprints deterministically.
 */
export interface ResourceFingerprint {
  /** How the user engages with it, e.g. `pointer-attraction`, `scroll-linked`. */
  interactionModel?: string;
  /** The rendering/composition technique, e.g. `canvas-particles`, `css-grid`. */
  visualModel?: string;
  /** The animation mechanism, e.g. `spring-follow`, `intersection-stagger`. */
  motionModel?: string;
  /** Structural strategy, e.g. `inline`, `overlay-stack`, `split-ratio`. */
  layoutModel?: string;
  /** The job it does in an interface, e.g. `primary-cta`, `data-scan`. */
  semanticPurpose?: string;
}

/** The fingerprint fields that participate in uniqueness comparison. */
export const FINGERPRINT_AXES = [
  "interactionModel",
  "visualModel",
  "motionModel",
  "layoutModel",
  "semanticPurpose",
] as const;
export type FingerprintAxis = (typeof FINGERPRINT_AXES)[number];

/**
 * Machine-readable form of a `design.md` file. `rules` are prose instructions
 * that AI tools are expected to obey; `avoid` lists the specific patterns the
 * design system considers slop.
 */
export interface DesignRules {
  readonly dna: DesignDna;
  readonly fonts: {
    heading?: string;
    body?: string;
    mono?: string;
  };
  readonly motion: {
    fast?: number;
    normal?: number;
    slow?: number;
  };
  readonly rules: readonly string[];
  readonly avoid: readonly string[];
  readonly raw: string;
}

export interface DesignToken {
  id: string;
  designSystemId: string;
  tokenType: DesignTokenType;
  name: string;
  value: string;
  /** Optional dark-mode override; null means "same as light". */
  darkValue: string | null;
  description: string | null;
  sortOrder: number;
}

export interface DesignFingerprint {
  dna: DesignDna;
  strengths: string[];
  risks: string[];
  /** 0–100, deterministic and derived only from the DNA axes. */
  distinctiveness: number;
}

export interface AuditCheckResult {
  id: string;
  label: string;
  /** 0–100. */
  score: number;
  weight: number;
  findings: string[];
  passed: boolean;
}

export const AUDIT_CATEGORIES = [
  "structure",
  "typography",
  "motion",
  "composition",
  "originality",
  "accessibility",
] as const;
export type AuditCategory = (typeof AUDIT_CATEGORIES)[number];

export interface AuditReport {
  generatedAt: string;
  /** 0–100 overall design-quality score. */
  overall: number;
  categories: Record<AuditCategory, number>;
  checks: AuditCheckResult[];
  issues: string[];
  recommendations: string[];
}

/** Static facets exposed by the search UI, ordered as they appear. */
export const FACET_AXES = [
  { key: "category", label: "Category" },
  { key: "type", label: "Type" },
  { key: "genre", label: "Genre" },
  { key: "macrostructure", label: "Macrostructure" },
  { key: "density", label: "Density" },
  { key: "shape", label: "Shape" },
  { key: "motion", label: "Motion" },
  { key: "typography", label: "Typography" },
  { key: "license", label: "License" },
  { key: "difficulty", label: "Difficulty" },
] as const;

export type FacetKey = (typeof FACET_AXES)[number]["key"];
