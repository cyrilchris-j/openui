/**
 * WCAG 2.1 contrast maths.
 *
 * Kept dependency-free and pure so it can run in the browser (live token
 * editing) and in CI (auditing every theme token pair).
 */

export interface Rgb {
  r: number;
  g: number;
  b: number;
}

export function parseHex(value: string): Rgb | null {
  const normalized = value.trim().replace(/^#/, "");
  const expanded =
    normalized.length === 3 || normalized.length === 4
      ? normalized
          .split("")
          .map((character) => character + character)
          .join("")
      : normalized;
  if (!/^[0-9a-fA-F]{6}([0-9a-fA-F]{2})?$/.test(expanded)) return null;
  return {
    r: Number.parseInt(expanded.slice(0, 2), 16),
    g: Number.parseInt(expanded.slice(2, 4), 16),
    b: Number.parseInt(expanded.slice(4, 6), 16),
  };
}

function channelLuminance(channel: number): number {
  const value = channel / 255;
  return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
}

export function relativeLuminance(color: Rgb): number {
  return (
    0.2126 * channelLuminance(color.r) +
    0.7152 * channelLuminance(color.g) +
    0.0722 * channelLuminance(color.b)
  );
}

/** Contrast ratio between 1 and 21. Returns 1 for unparseable input. */
export function contrastRatio(foreground: string, background: string): number {
  const fg = parseHex(foreground);
  const bg = parseHex(background);
  if (!fg || !bg) return 1;
  const l1 = relativeLuminance(fg);
  const l2 = relativeLuminance(bg);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

export function roundRatio(ratio: number): number {
  return Math.round(ratio * 100) / 100;
}

export type WcagLevel = "fail" | "AA-large" | "AA" | "AAA";

export function wcagLevel(ratio: number, largeText = false): WcagLevel {
  const minimum = largeText ? 3 : 4.5;
  if (ratio >= 7 && !largeText) return "AAA";
  if (ratio >= 4.5) return "AA";
  if (ratio >= minimum) return "AA-large";
  return "fail";
}

export function meetsWcagAA(ratio: number, largeText = false): boolean {
  return ratio >= (largeText ? 3 : 4.5);
}

/** Relative luminance of a colour, used to decide black-on-white vs the inverse. */
export function isDark(color: string): boolean {
  const rgb = parseHex(color);
  if (!rgb) return false;
  return relativeLuminance(rgb) < 0.5;
}

/** Picks the more legible of two candidate foregrounds for a background. */
export function bestForeground(background: string, candidates: [string, string] = ["#100F0D", "#F3F0E9"]): string {
  const [first, second] = candidates;
  return contrastRatio(first, background) >= contrastRatio(second, background) ? first : second;
}
