import {
  DESIGN_GENRES,
  DENSITIES,
  MACROSTRUCTURES,
  MOTION_LANGUAGES,
  SHAPE_LANGUAGES,
  TYPOGRAPHY_STYLES,
  COLOR_STRATEGIES,
  type DesignDna,
  type DesignFingerprint,
} from "@openui/types";
import { clamp } from "@openui/utils";

import { DEFAULT_DESIGN_DNA } from "@openui/registry-schema";

/**
 * Design fingerprint.
 *
 * The registry's whole thesis is that interfaces should have a fingerprint.
 * This module turns the seven DNA axes into a deterministic 0–100
 * distinctiveness score plus human-readable strengths and risks.
 *
 * The per-axis weights encode a position, and the position is deliberately
 * stated in the open: *the defaults of every UI kit are the least distinctive
 * choice*. Rounded corners, plain grotesk type, symmetric stacks and a missing
 * motion language are not neutral — they are the reason so much generated
 * interface work looks the same. A minimal design is not penalised for being
 * minimal; it is penalised when it is minimal *by default* — which is why
 * `minimal` still scores through typography, shape and colour.
 */

type AxisWeights = Record<string, number>;

export const GENRE_WEIGHTS: AxisWeights = {
  editorial: 0.8,
  brutalist: 1.0,
  swiss: 0.72,
  industrial: 0.78,
  organic: 0.62,
  retro: 0.6,
  technical: 0.64,
  luxury: 0.55,
  playful: 0.66,
  minimal: 0.3,
};

export const MACROSTRUCTURE_WEIGHTS: AxisWeights = {
  symmetric: 0.12,
  stack: 0.22,
  split: 0.62,
  asymmetric: 1.0,
  mosaic: 0.86,
  rail: 0.8,
  scatter: 0.9,
  "full-bleed": 0.7,
};

export const DENSITY_WEIGHTS: AxisWeights = {
  airy: 0.7,
  medium: 0.5,
  compact: 0.6,
  dense: 0.78,
};

export const SHAPE_WEIGHTS: AxisWeights = {
  sharp: 0.82,
  soft: 0.46,
  rounded: 0.18,
  cut: 0.92,
  pill: 0.5,
  mixed: 0.72,
};

export const MOTION_WEIGHTS: AxisWeights = {
  none: 0.16,
  subtle: 0.42,
  expressive: 0.82,
  kinetic: 1.0,
  mechanical: 0.88,
};

export const TYPOGRAPHY_WEIGHTS: AxisWeights = {
  grotesk: 0.3,
  "serif-display": 0.86,
  monospace: 0.62,
  humanist: 0.42,
  geometric: 0.36,
  condensed: 0.72,
  "variable-poster": 0.96,
};

export const COLOR_WEIGHTS: AxisWeights = {
  monochrome: 0.58,
  duotone: 0.86,
  "accent-only": 0.5,
  "high-contrast": 0.76,
  "muted-earth": 0.7,
  "neon-on-dark": 0.8,
  pastel: 0.34,
};

/** Axis weights, each normalised so the scores stay comparable. */
export const DNA_AXIS_WEIGHTS: Record<keyof DesignDna, AxisWeights> = {
  genre: GENRE_WEIGHTS,
  macrostructure: MACROSTRUCTURE_WEIGHTS,
  density: DENSITY_WEIGHTS,
  shapeLanguage: SHAPE_WEIGHTS,
  motionLanguage: MOTION_WEIGHTS,
  typographyStyle: TYPOGRAPHY_WEIGHTS,
  colorStrategy: COLOR_WEIGHTS,
};

/**
 * How much each axis contributes to the overall fingerprint. Composition and
 * shape carry the most weight because they are what a visitor reads first.
 */
const AXIS_INFLUENCE: Record<keyof DesignDna, number> = {
  macrostructure: 1.25,
  shapeLanguage: 1.15,
  typographyStyle: 1.1,
  motionLanguage: 1.05,
  genre: 1,
  colorStrategy: 0.9,
  density: 0.75,
};

export function axisScore(axis: keyof DesignDna, value: string): number {
  const weights = DNA_AXIS_WEIGHTS[axis];
  return weights[value] ?? 0.5;
}

/** All valid values for an axis, used by editors and validation messages. */
export const DNA_AXIS_OPTIONS: Record<keyof DesignDna, readonly string[]> = {
  genre: DESIGN_GENRES,
  macrostructure: MACROSTRUCTURES,
  density: DENSITIES,
  shapeLanguage: SHAPE_LANGUAGES,
  motionLanguage: MOTION_LANGUAGES,
  typographyStyle: TYPOGRAPHY_STYLES,
  colorStrategy: COLOR_STRATEGIES,
};

const STRENGTH_THRESHOLD = 0.7;
const RISK_THRESHOLD = 0.34;

const RISK_MESSAGES: Record<keyof DesignDna, Partial<Record<string, string>>> = {
  genre: {
    minimal: "A minimal genre only reads as intentional when typography and shape carry it.",
  },
  macrostructure: {
    symmetric: "A fully symmetric composition is the default layout of every template library.",
    stack: "Stacked blocks in a single column leave the widest axis of the page unused.",
  },
  density: {},
  shapeLanguage: {
    rounded: "Rounded corners are the single most reliable signal of a default UI kit.",
    soft: "Soft radii plus soft shadows reproduce the generic dashboard look.",
  },
  motionLanguage: {
    none: "No motion language: nothing on the page communicates hierarchy through movement.",
    subtle: "Subtle motion is safe; make sure at least one transition carries meaning.",
  },
  typographyStyle: {
    grotesk: "A single neutral grotesk is the default of every generated interface.",
    geometric: "Geometric sans with default tracking reads as a template.",
    humanist: "Humanist sans alone rarely creates a recognisable voice.",
  },
  colorStrategy: {
    pastel: "Pastel palettes are the most common way to look friendly and forgettable.",
  },
};

const STRENGTH_MESSAGES: Record<keyof DesignDna, Partial<Record<string, string>>> = {
  genre: {
    editorial: "Editorial genre gives the work a publication voice rather than a product voice.",
    brutalist: "Brutalist genre commits to structure over decoration.",
    industrial: "Industrial genre reads as engineered rather than marketed.",
  },
  macrostructure: {
    asymmetric: "Asymmetric macrostructure keeps the eye moving off the centre line.",
    scatter: "Scattered composition avoids a predictable reading order.",
    mosaic: "Mosaic composition creates rhythm across the full width.",
  },
  shapeLanguage: {
    cut: "Cut corners give every container a deliberate silhouette.",
    sharp: "Sharp geometry holds up next to editorial typography.",
  },
  motionLanguage: {
    kinetic: "Kinetic motion makes the interface itself the subject.",
    mechanical: "Mechanical motion reads as precise and engineered.",
    expressive: "Expressive motion gives the interface a point of view.",
  },
  typographyStyle: {
    "serif-display": "Display serif at scale is a strong differentiator.",
    "variable-poster": "Variable poster type creates hierarchy within a single family.",
    condensed: "Condensed type creates density without shrinking the type size.",
  },
  colorStrategy: {
    duotone: "Duotone palettes are hard to produce by accident.",
    "high-contrast": "High-contrast palettes read as deliberate.",
    "muted-earth": "Muted earth palettes read as considered rather than defaulted.",
    "neon-on-dark": "Neon on dark creates an unmistakable atmosphere.",
  },
  density: {
    airy: "Airy density lets typography carry the composition.",
    dense: "Dense composition reads as information-rich rather than empty.",
  },
};

/** The axes with the most influence, in the order they are presented. */
export const FINGERPRINT_AXIS_ORDER: Array<keyof DesignDna> = [
  "genre",
  "macrostructure",
  "typographyStyle",
  "shapeLanguage",
  "motionLanguage",
  "colorStrategy",
  "density",
];

export function computeFingerprint(dna: Partial<DesignDna> | null | undefined): DesignFingerprint {
  const resolved: DesignDna = { ...DEFAULT_DESIGN_DNA, ...(dna ?? {}) };

  let weighted = 0;
  let totalInfluence = 0;
  const scored = FINGERPRINT_AXIS_ORDER.map((axis) => {
    const score = axisScore(axis, resolved[axis]);
    const influence = AXIS_INFLUENCE[axis];
    weighted += score * influence;
    totalInfluence += influence;
    return { axis, value: resolved[axis], score };
  });

  const distinctiveness = clamp(Math.round((weighted / totalInfluence) * 100), 0, 100);

  const strengths = scored
    .filter((entry) => entry.score >= STRENGTH_THRESHOLD)
    .sort((a, b) => b.score - a.score)
    .map(
      (entry) =>
        STRENGTH_MESSAGES[entry.axis][entry.value] ??
        `${entry.axis} "${entry.value}" is a strong, specific choice.`,
    );

  const risks = scored
    .filter((entry) => entry.score <= RISK_THRESHOLD)
    .sort((a, b) => a.score - b.score)
    .map(
      (entry) =>
        RISK_MESSAGES[entry.axis][entry.value] ??
        `${entry.axis} "${entry.value}" is close to the default of most UI kits.`,
    );

  return {
    dna: resolved,
    strengths: strengths.slice(0, 4),
    risks: risks.slice(0, 4),
    distinctiveness,
  };
}

/**
 * Distance between two fingerprints (0 = identical, 1 = maximally different).
 * Used to surface "similar resources" and to warn that a new contribution is
 * a near-duplicate of something already published.
 */
export function dnaDistance(a: Partial<DesignDna>, b: Partial<DesignDna>): number {
  const axes = Object.keys(DNA_AXIS_WEIGHTS) as Array<keyof DesignDna>;
  let difference = 0;
  for (const axis of axes) {
    const left = axisScore(axis, (a[axis] ?? DEFAULT_DESIGN_DNA[axis]) as string);
    const right = axisScore(axis, (b[axis] ?? DEFAULT_DESIGN_DNA[axis]) as string);
    difference += Math.abs(left - right);
  }
  return Math.round((difference / axes.length) * 1000) / 1000;
}

export function describeDna(dna: Partial<DesignDna>): string {
  const resolved = { ...DEFAULT_DESIGN_DNA, ...dna };
  return `${resolved.genre} · ${resolved.macrostructure} · ${resolved.density} · ${resolved.shapeLanguage} shape · ${resolved.motionLanguage} motion · ${resolved.typographyStyle} · ${resolved.colorStrategy} colour`;
}
