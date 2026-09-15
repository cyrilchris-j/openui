import { DESIGN_TOKEN_TYPES, type DesignToken, type DesignTokenType } from "@openui/types";

/**
 * Design tokens.
 *
 * Tokens are the bridge between a design system and the code a consumer
 * installs: the same token names are used by the themes under
 * `registry/<namespace>/themes`, by the web application itself, and by the
 * theme editor. Renaming a token is a breaking change for published themes.
 */

export const TOKEN_TYPE_LABELS: Record<DesignTokenType, string> = {
  font: "Typography",
  color: "Colour",
  spacing: "Spacing",
  radius: "Radius",
  shadow: "Shadow",
  motion: "Motion",
  breakpoint: "Breakpoint",
};

export const TOKEN_TYPE_PREFIX: Record<DesignTokenType, string> = {
  font: "--font",
  color: "--color",
  spacing: "--space",
  radius: "--radius",
  shadow: "--shadow",
  motion: "--motion",
  breakpoint: "--breakpoint",
};

/** CSS custom property name for a token, e.g. `--color-oxide`. */
export function tokenVariableName(tokenType: DesignTokenType, name: string): string {
  return `${TOKEN_TYPE_PREFIX[tokenType]}-${name}`;
}

export interface ThemeTokenSeed {
  type: DesignTokenType;
  name: string;
  value: string;
  darkValue?: string;
  description?: string;
}

/**
 * The token set of the OpenUI default design system.
 *
 * Values are declared here (not in CSS only) so that themes, the audit and the
 * CLI can reason about them without parsing a stylesheet.
 */
export const DEFAULT_THEME_TOKENS: readonly ThemeTokenSeed[] = [
  { type: "color", name: "paper", value: "#F3F0E9", darkValue: "#0C0C0B", description: "Page background." },
  { type: "color", name: "ink", value: "#100F0D", darkValue: "#F2EFE7", description: "Primary text." },
  { type: "color", name: "graphite", value: "#565452", darkValue: "#A5A19A", description: "Secondary text." },
  { type: "color", name: "line", value: "rgba(16,15,13,0.16)", darkValue: "rgba(242,239,231,0.18)", description: "Hairline rules." },
  {
    type: "color",
    name: "oxide",
    value: "#B33F26",
    darkValue: "#E4614A",
    description: "Signal accent. Rated for 4.5:1 against `paper`.",
  },
  { type: "color", name: "moss", value: "#3C5A44", darkValue: "#7FA089", description: "Secondary accent." },
  { type: "font", name: "display", value: '"Instrument Serif", Georgia, serif', description: "Editorial display face." },
  { type: "font", name: "sans", value: '"Inter", system-ui, sans-serif', description: "Interface and body text." },
  { type: "font", name: "mono", value: '"JetBrains Mono", ui-monospace, monospace', description: "Metadata, code, labels." },
  { type: "spacing", name: "1", value: "0.25rem" },
  { type: "spacing", name: "2", value: "0.5rem" },
  { type: "spacing", name: "3", value: "0.75rem" },
  { type: "spacing", name: "4", value: "1rem" },
  { type: "spacing", name: "6", value: "1.5rem" },
  { type: "spacing", name: "8", value: "2rem" },
  { type: "spacing", name: "12", value: "3rem" },
  { type: "spacing", name: "16", value: "4rem" },
  { type: "spacing", name: "24", value: "6rem" },
  { type: "radius", name: "none", value: "0px" },
  { type: "radius", name: "sm", value: "2px" },
  { type: "radius", name: "md", value: "4px" },
  { type: "radius", name: "lg", value: "10px" },
  { type: "radius", name: "full", value: "9999px" },
  { type: "shadow", name: "line", value: "0 1px 0 0 rgba(16,15,13,0.08)" },
  { type: "shadow", name: "lift", value: "0 12px 32px -18px rgba(16,15,13,0.45)" },
  { type: "motion", name: "fast", value: "180ms" },
  { type: "motion", name: "normal", value: "320ms" },
  { type: "motion", name: "slow", value: "600ms" },
  { type: "motion", name: "ease", value: "cubic-bezier(0.2, 0, 0, 1)" },
  { type: "breakpoint", name: "sm", value: "640px" },
  { type: "breakpoint", name: "md", value: "768px" },
  { type: "breakpoint", name: "lg", value: "1024px" },
  { type: "breakpoint", name: "xl", value: "1440px" },
] as const;

export function groupTokensByType(tokens: readonly ThemeTokenSeed[]): Record<DesignTokenType, ThemeTokenSeed[]> {
  const output = {} as Record<DesignTokenType, ThemeTokenSeed[]>;
  for (const type of DESIGN_TOKEN_TYPES) output[type] = [];
  for (const token of tokens) output[token.type].push(token);
  return output;
}

/** `Record<cssVarName, value>` for light mode (or dark when `mode === "dark"`). */
export function tokensToCssVariables(
  tokens: readonly ThemeTokenSeed[],
  mode: "light" | "dark" = "light",
): Record<string, string> {
  const output: Record<string, string> = {};
  for (const token of tokens) {
    const value = mode === "dark" ? (token.darkValue ?? token.value) : token.value;
    output[tokenVariableName(token.type, token.name)] = value;
  }
  return output;
}

export function cssVariablesToBlock(variables: Record<string, string>, selector = ":root"): string {
  const lines = Object.entries(variables).map(([name, value]) => `  ${name}: ${value};`);
  return `${selector} {\n${lines.join("\n")}\n}`;
}

/** Tokens shaped like database rows, for the design system detail view. */
export function tokensToRows(designSystemId: string, tokens: readonly ThemeTokenSeed[]): DesignToken[] {
  return tokens.map((token, index) => ({
    id: `${designSystemId}:${token.type}:${token.name}`,
    designSystemId,
    tokenType: token.type,
    name: token.name,
    value: token.value,
    darkValue: token.darkValue ?? null,
    description: token.description ?? null,
    sortOrder: index,
  }));
}
