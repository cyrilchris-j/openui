import type { DesignDna } from "@openui/types";

import { DEFAULT_DESIGN_DNA } from "@openui/registry-schema";

import { cssVariablesToBlock, tokensToCssVariables, type ThemeTokenSeed } from "./tokens.js";

/**
 * Theme generation.
 *
 * A theme is the smallest unit of visual identity that a consumer can adopt
 * without changing their code: it is DNA + tokens, compiled to a stylesheet.
 */

export interface ThemeInput {
  name: string;
  dna?: Partial<DesignDna>;
  tokens: readonly ThemeTokenSeed[];
  /** Emit a `prefers-color-scheme` block as well as the explicit `.dark` class. */
  systemPreference?: boolean;
}

/** Motion tokens derived from the DNA motion language. */
export function motionTokensFor(dna: DesignDna): ThemeTokenSeed[] {
  switch (dna.motionLanguage) {
    case "none":
      return [
        { type: "motion", name: "fast", value: "0ms" },
        { type: "motion", name: "normal", value: "0ms" },
        { type: "motion", name: "slow", value: "0ms" },
      ];
    case "kinetic":
      return [
        { type: "motion", name: "fast", value: "120ms" },
        { type: "motion", name: "normal", value: "280ms" },
        { type: "motion", name: "slow", value: "680ms" },
      ];
    case "mechanical":
      return [
        { type: "motion", name: "fast", value: "140ms" },
        { type: "motion", name: "normal", value: "240ms" },
        { type: "motion", name: "slow", value: "420ms" },
      ];
    default:
      return [
        { type: "motion", name: "fast", value: "180ms" },
        { type: "motion", name: "normal", value: "320ms" },
        { type: "motion", name: "slow", value: "600ms" },
      ];
  }
}

/** Radius tokens derived from the shape language. */
export function radiusTokensFor(dna: DesignDna): ThemeTokenSeed[] {
  switch (dna.shapeLanguage) {
    case "rounded":
      return [
        { type: "radius", name: "sm", value: "8px" },
        { type: "radius", name: "md", value: "14px" },
        { type: "radius", name: "lg", value: "24px" },
      ];
    case "soft":
      return [
        { type: "radius", name: "sm", value: "6px" },
        { type: "radius", name: "md", value: "10px" },
        { type: "radius", name: "lg", value: "16px" },
      ];
    case "pill":
      return [
        { type: "radius", name: "sm", value: "9999px" },
        { type: "radius", name: "md", value: "9999px" },
        { type: "radius", name: "lg", value: "9999px" },
      ];
    case "cut":
      return [
        { type: "radius", name: "sm", value: "0px" },
        { type: "radius", name: "md", value: "0px" },
        { type: "radius", name: "lg", value: "2px" },
      ];
    default:
      return [
        { type: "radius", name: "sm", value: "2px" },
        { type: "radius", name: "md", value: "4px" },
        { type: "radius", name: "lg", value: "8px" },
      ];
  }
}

/** Replaces the token seeds that the DNA should own. */
export function applyDnaToTokens(
  tokens: readonly ThemeTokenSeed[],
  dna: DesignDna,
): ThemeTokenSeed[] {
  const overrides = new Map<string, string>();
  for (const token of [...motionTokensFor(dna), ...radiusTokensFor(dna)]) {
    overrides.set(`${token.type}:${token.name}`, token.value);
  }
  return tokens.map((token) => {
    const override = overrides.get(`${token.type}:${token.name}`);
    return override === undefined ? { ...token } : { ...token, value: override };
  });
}

/** A complete, installable theme stylesheet. */
export function generateThemeStylesheet(input: ThemeInput): string {
  const dna: DesignDna = { ...DEFAULT_DESIGN_DNA, ...(input.dna ?? {}) };
  const tokens = applyDnaToTokens(input.tokens, dna);
  const light = tokensToCssVariables(tokens, "light");
  const dark = tokensToCssVariables(tokens, "dark");

  const blocks = [
    `/* ${input.name} — generated from design DNA (${dna.genre} · ${dna.macrostructure} · ${dna.shapeLanguage}) */`,
    cssVariablesToBlock(light, ":root"),
    cssVariablesToBlock(dark, ".dark"),
  ];

  if (input.systemPreference) {
    const inner = Object.entries(dark)
      .map(([name, value]) => `    ${name}: ${value};`)
      .join("\n");
    blocks.push(`@media (prefers-color-scheme: dark) {\n  :root:not(.light) {\n${inner}\n  }\n}`);
  }

  return `${blocks.join("\n\n")}\n`;
}

/** Inline style object for a live preview swatch. */
export function dnaSwatches(dna: DesignDna, tokens: readonly ThemeTokenSeed[]): Array<{ label: string; value: string }> {
  const byName = new Map(tokens.filter((token) => token.type === "color").map((token) => [token.name, token.value]));
  const pick = (name: string, fallback: string) => byName.get(name) ?? fallback;
  return [
    { label: dna.colorStrategy, value: pick("oxide", "#B33F26") },
    { label: "ink", value: pick("ink", "#100F0D") },
    { label: "paper", value: pick("paper", "#F3F0E9") },
    { label: "graphite", value: pick("graphite", "#565452") },
  ];
}
