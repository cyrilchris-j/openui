import {
  COLOR_STRATEGIES,
  DESIGN_GENRES,
  DENSITIES,
  MACROSTRUCTURES,
  MOTION_LANGUAGES,
  SHAPE_LANGUAGES,
  TYPOGRAPHY_STYLES,
  type ColorStrategy,
  type Density,
  type DesignDna,
  type DesignGenre,
  type DesignRules,
  type Macrostructure,
  type MotionLanguage,
  type ShapeLanguage,
  type TypographyStyle,
} from "@openui/types";

/**
 * `design.md` is a first-class artefact, not decoration.
 *
 * It is written by the resource author, committed next to the source, inlined
 * into the published registry artifact and consumed by the builder, the audit
 * and by AI agents. It therefore has a deliberately small, strict grammar:
 *
 * ```md
 * # Design System
 *
 * Genre: Editorial
 * Macrostructure: Asymmetric
 * Density: Medium
 * Shape: Sharp
 * Motion: Subtle
 * Typography: Serif Display
 * Color: Accent Only
 *
 * ## Typography
 *
 * Heading: Instrument Serif
 * Body: Inter
 * Mono: Geist Mono
 *
 * ## Motion
 *
 * Fast: 180ms
 * Normal: 320ms
 * Slow: 600ms
 *
 * ## Rules
 *
 * - Avoid generic SaaS gradients.
 * - Prefer asymmetric composition.
 *
 * ## Avoid
 *
 * - Centered three-column card grids.
 * ```
 *
 * The parser never throws: a malformed file degrades to defaults and reports
 * warnings that CI prints, so a bad `design.md` cannot block the build.
 */

export const DEFAULT_DESIGN_DNA: DesignDna = {
  genre: "editorial",
  macrostructure: "asymmetric",
  density: "medium",
  shapeLanguage: "sharp",
  motionLanguage: "subtle",
  typographyStyle: "grotesk",
  colorStrategy: "accent-only",
};

export interface ParsedDesignMarkdown {
  rules: DesignRules;
  warnings: string[];
}

/** Normalises `"Serif Display"`, `"serif-display"`, `"SERIF_DISPLAY"`. */
function normalizeValue(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[_\s]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function pickEnum<T extends string>(values: readonly T[], raw: string): T | null {
  const normalized = normalizeValue(raw);
  const direct = values.find((value) => normalizeValue(value) === normalized);
  if (direct) return direct;
  // Tolerate the two-token forms used in prose (`serif display`).
  const collapsed = normalized.replace(/-/g, "");
  return values.find((value) => normalizeValue(value).replace(/-/g, "") === collapsed) ?? null;
}

/** Header synonyms, so authors can write the axis in prose. */
const DNA_HEADER_KEYS: Record<string, keyof DesignDna> = {
  genre: "genre",
  family: "genre",
  macrostructure: "macrostructure",
  structure: "macrostructure",
  density: "density",
  shape: "shapeLanguage",
  "shape-language": "shapeLanguage",
  motion: "motionLanguage",
  "motion-language": "motionLanguage",
  typography: "typographyStyle",
  "typography-style": "typographyStyle",
  type: "typographyStyle",
  color: "colorStrategy",
  colour: "colorStrategy",
  "color-strategy": "colorStrategy",
};

/** `180ms`, `0.18s`, `180` → milliseconds. */
export function parseDurationMs(raw: string): number | null {
  const match = /(-?\d+(?:\.\d+)?)\s*(ms|s)?/i.exec(raw.trim());
  if (!match) return null;
  const amount = Number.parseFloat(match[1]!);
  if (!Number.isFinite(amount)) return null;
  const unit = (match[2] ?? "ms").toLowerCase();
  const ms = unit === "s" ? amount * 1000 : amount;
  if (ms < 0 || ms > 10_000) return null;
  return Math.round(ms);
}

function bullets(lines: readonly string[]): string[] {
  const output: string[] = [];
  for (const line of lines) {
    const match = /^\s*(?:[-*+]|\d+\.)\s+(.*\S)\s*$/.exec(line);
    if (match) output.push(match[1]!);
  }
  return output;
}

export function parseDesignMarkdown(markdown: string): ParsedDesignMarkdown {
  const warnings: string[] = [];
  const lines = markdown.split(/\r?\n/);

  const dna: DesignDna = { ...DEFAULT_DESIGN_DNA };
  const fonts: Record<string, string> = {};
  const motion: Record<string, number> = {};
  const rules: string[] = [];
  const avoid: string[] = [];

  let section = "header";
  const sectionLines = new Map<string, string[]>();

  for (const line of lines) {
    const heading = /^(#{1,6})\s+(.*\S)\s*$/.exec(line);
    if (heading) {
      const level = heading[1]!.length;
      // A level-1 heading is the document title; everything before the first
      // `##` heading (including the title line) is the DNA header block.
      if (level === 1) continue;
      section = normalizeValue(heading[2]!);
      if (!sectionLines.has(section)) sectionLines.set(section, []);
      continue;
    }
    const bucket = sectionLines.get(section);
    if (bucket) bucket.push(line);
    else sectionLines.set(section, [line]);
  }

  // Header block: `Axis: Value` pairs listed above the first `##` section.
  const headerText = sectionLines.get("header") ?? [];

  for (const line of headerText) {
    const pair = /^\s*([A-Za-z][A-Za-z _-]{1,24}?)\s*:\s*(.+?)\s*$/.exec(line);
    if (!pair) continue;
    const key = normalizeValue(pair[1]!).replace(/_/g, "-");
    const axis = DNA_HEADER_KEYS[key];
    if (!axis) continue;

    const value = pair[2]!.trim();
    switch (axis) {
      case "genre": {
        const picked = pickEnum(DESIGN_GENRES, value);
        if (picked) {
          dna.genre = picked as DesignGenre;
        } else warnUnknown("genre", value, DESIGN_GENRES, warnings);
        break;
      }
      case "macrostructure": {
        const picked = pickEnum(MACROSTRUCTURES, value);
        if (picked) {
          dna.macrostructure = picked as Macrostructure;
        } else warnUnknown("macrostructure", value, MACROSTRUCTURES, warnings);
        break;
      }
      case "density": {
        const picked = pickEnum(DENSITIES, value);
        if (picked) {
          dna.density = picked as Density;
        } else warnUnknown("density", value, DENSITIES, warnings);
        break;
      }
      case "shapeLanguage": {
        const picked = pickEnum(SHAPE_LANGUAGES, value);
        if (picked) {
          dna.shapeLanguage = picked as ShapeLanguage;
        } else warnUnknown("shape", value, SHAPE_LANGUAGES, warnings);
        break;
      }
      case "motionLanguage": {
        const picked = pickEnum(MOTION_LANGUAGES, value);
        if (picked) {
          dna.motionLanguage = picked as MotionLanguage;
        } else warnUnknown("motion", value, MOTION_LANGUAGES, warnings);
        break;
      }
      case "typographyStyle": {
        const picked = pickEnum(TYPOGRAPHY_STYLES, value);
        if (picked) {
          dna.typographyStyle = picked as TypographyStyle;
        } else warnUnknown("typography", value, TYPOGRAPHY_STYLES, warnings);
        break;
      }
      case "colorStrategy": {
        const picked = pickEnum(COLOR_STRATEGIES, value);
        if (picked) {
          dna.colorStrategy = picked as ColorStrategy;
        } else warnUnknown("color", value, COLOR_STRATEGIES, warnings);
        break;
      }
    }
  }

  // `## Typography` → Heading/Body/Mono
  for (const line of sectionLines.get("typography") ?? []) {
    const pair = /^\s*([A-Za-z][A-Za-z _-]{0,20}?)\s*:\s*(.+?)\s*$/.exec(line);
    if (!pair) continue;
    const key = normalizeValue(pair[1]!);
    if (!["heading", "body", "mono", "display", "code"].includes(key)) continue;
    const normalizedKey = key === "display" ? "heading" : key === "code" ? "mono" : key;
    fonts[normalizedKey] = pair[2]!.trim();
  }

  // `## Motion` → Fast/Normal/Slow
  for (const line of sectionLines.get("motion") ?? []) {
    const pair = /^\s*([A-Za-z][A-Za-z _-]{0,20}?)\s*:\s*(.+?)\s*$/.exec(line);
    if (!pair) continue;
    const key = normalizeValue(pair[1]!);
    if (!["fast", "normal", "slow", "base"].includes(key)) continue;
    const ms = parseDurationMs(pair[2]!);
    if (ms === null) {
      warnings.push(`Could not parse motion duration "${pair[2]!.trim()}" for "${key}".`);
      continue;
    }
    motion[key] = ms;
  }

  for (const key of ["rules", "rules-", "design-rules", "guidelines"]) {
    for (const bullet of bullets(sectionLines.get(key) ?? [])) {
      if (/^avoid\b/i.test(bullet)) avoid.push(bullet.replace(/^avoid\s*[:-]?\s*/i, "").trim());
      else rules.push(bullet);
    }
  }

  for (const key of ["avoid", "anti-patterns", "anti-pattern", "dont", "do-not"]) {
    avoid.push(...bullets(sectionLines.get(key) ?? []));
  }

  return {
    warnings,
    rules: {
      dna,
      fonts: {
        ...(fonts["heading"] ? { heading: fonts["heading"] } : {}),
        ...(fonts["body"] ? { body: fonts["body"] } : {}),
        ...(fonts["mono"] ? { mono: fonts["mono"] } : {}),
      },
      motion: {
        ...(motion["fast"] !== undefined ? { fast: motion["fast"] } : {}),
        ...(motion["normal"] !== undefined ? { normal: motion["normal"] } : {}),
        ...(motion["slow"] !== undefined ? { slow: motion["slow"] } : {}),
      },
      rules,
      avoid,
      raw: markdown,
    },
  };
}

function warnUnknown(axis: string, value: string, allowed: readonly string[], warnings: string[]): void {
  warnings.push(`Unknown ${axis} value "${value}". Expected one of: ${allowed.join(", ")}.`);
}

/** Serialises DNA back into the header form, used by the builder and by AI prompts. */
export function formatDesignDnaHeader(dna: DesignDna): string {
  return [
    `Genre: ${titleFromSlug(dna.genre)}`,
    `Macrostructure: ${titleFromSlug(dna.macrostructure)}`,
    `Density: ${titleFromSlug(dna.density)}`,
    `Shape: ${titleFromSlug(dna.shapeLanguage)}`,
    `Motion: ${titleFromSlug(dna.motionLanguage)}`,
    `Typography: ${titleFromSlug(dna.typographyStyle)}`,
    `Color: ${titleFromSlug(dna.colorStrategy)}`,
  ].join("\n");
}

export function titleFromSlug(value: string): string {
  return value
    .split(/[-_]/)
    .filter(Boolean)
    .map((part) => part[0]!.toUpperCase() + part.slice(1))
    .join(" ");
}
