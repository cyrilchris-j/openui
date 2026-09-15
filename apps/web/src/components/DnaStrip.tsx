import * as React from "react";

import type { DesignDna } from "@openui/types";
import { cn } from "@openui/ui";

/**
 * The DNA strip.
 *
 * Six short labels describing a resource's design fingerprint. This is the
 * product's central idea made visible on every tile: you can tell what a
 * resource *looks and feels like* before opening it, in the same way you can
 * tell a serif from a grotesk.
 *
 * Two rules the component enforces:
 *
 *  - **Absent dimensions are shown as absent.** A greyed `—` is information
 *    ("this item makes no claim about motion"), whereas silently dropping the
 *    label makes an incomplete fingerprint look complete.
 *  - **It is text first.** No swatches, no colour-only encoding; each dimension
 *    is named. Colour appears only as a subtle change of weight for the values
 *    that are present.
 */
export interface DnaStripProps {
  dna: Partial<DesignDna> | undefined;
  /** Renders the long form with labels above values, for a detail page. */
  variant?: "inline" | "labelled";
  className?: string;
}

const DIMENSIONS: Array<{ key: keyof DesignDna; label: string; short: string }> = [
  { key: "genre", label: "Genre", short: "GEN" },
  { key: "macrostructure", label: "Macrostructure", short: "MAC" },
  { key: "density", label: "Density", short: "DEN" },
  { key: "shapeLanguage", label: "Shape", short: "SHP" },
  { key: "motionLanguage", label: "Motion", short: "MOT" },
  { key: "typographyStyle", label: "Typography", short: "TYP" },
];

export function DnaStrip({ dna, variant = "inline", className }: DnaStripProps): React.JSX.Element {
  if (variant === "labelled") {
    return (
      <dl className={cn("grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3", className)}>
        {DIMENSIONS.map(({ key, label }) => {
          const value = dna?.[key];
          return (
            <div key={key} className="border-t border-line pt-2">
              <dt className="eyebrow">{label}</dt>
              <dd
                className={cn(
                  "mt-1 font-mono text-[0.78rem]",
                  value ? "text-ink" : "text-graphite/50",
                )}
              >
                {value ?? "—"}
              </dd>
            </div>
          );
        })}
      </dl>
    );
  }

  return (
    <ul className={cn("flex flex-wrap gap-x-3 gap-y-1", className)}>
      {DIMENSIONS.map(({ key, label, short }) => {
        const value = dna?.[key];
        return (
          <li
            key={key}
            className="flex items-baseline gap-1"
            title={value ? `${label}: ${String(value)}` : `${label}: not declared`}
          >
            <span className="font-mono text-[9px] tracking-[0.16em] text-graphite/60">{short}</span>
            <span
              className={cn(
                "font-mono text-[10px] lowercase tracking-[0.06em]",
                value ? "text-graphite" : "text-graphite/35",
              )}
            >
              {value ? String(value) : "—"}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

/**
 * A one-line summary of a fingerprint, for places with no room for the strip.
 * Derived from the same data rather than stored separately, so the two can never
 * disagree.
 */
export function dnaSummary(dna: Partial<DesignDna> | undefined): string {
  if (!dna) return "No design fingerprint declared.";

  // Mapped to a string first, then filtered: a type predicate on the original
  // union would have to enumerate every dimension's value type, which is exactly
  // the coupling this helper exists to avoid.
  const parts = [dna.genre, dna.macrostructure, dna.density, dna.shapeLanguage]
    .map((value) => (value === undefined || value === null ? "" : String(value)))
    .filter((value) => value.length > 0)
    .map((value) => value.replace(/-/g, " "));

  return parts.length > 0 ? parts.join(" · ") : "No design fingerprint declared.";
}
