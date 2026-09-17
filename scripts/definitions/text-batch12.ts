import type { ResourceDefinition } from "../lib/definitions.js";

/**
 * Text batch 12 — the acrostic: initials column spelling a hidden word,
 * highlighted on hover, with the body text flowing horizontally.
 */

const P = (name: string, definition: Omit<ResourceDefinition, "name">): ResourceDefinition => ({
  name,
  ...definition,
});

export default [
  P("acrostic-column", {
    category: "text",
    subcategory: "editorial",
    title: "Acrostic Column",
    description:
      "A poem whose initial letters spell a hidden word down the left edge: the initials column is emphasised, hovering it lights the full acrostic, and a reveal toggle confirms the message — a medieval device implemented as a responsive layout.",
    tags: ["acrostic", "hidden", "initials", "poetry"],
    dependencies: ["react"],
    difficulty: "intermediate",
    dna: {
      genre: "editorial",
      macrostructure: "asymmetric",
      density: "medium",
      shapeLanguage: "sharp",
      motionLanguage: "subtle",
      typographyStyle: "serif-display",
      colorStrategy: "accent-only",
    },
    fingerprint: {
      interactionModel: "hover-reveal-message",
      visualModel: "initials-column-lockup",
      motionModel: "column-illumination",
      layoutModel: "two-column-margins",
      semanticPurpose: "hidden-message",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface AcrosticColumnProps {
  /** The hidden word; each letter heads one line. */
  hidden: string;
  /** Line bodies; lines[i] follows hidden[i]. Extra lines allowed. */
  lines: string[];
  className?: string;
}

export function AcrosticColumn({ hidden, lines, className }: AcrosticColumnProps) {
  const [lit, setLit] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const letters = [...hidden.toUpperCase()];

  return (
    <figure className={cn("flex max-w-md flex-col gap-3", className)}>
      <div
        className="grid gap-y-1.5"
        style={{ gridTemplateColumns: "2rem 1fr" }}
        onMouseEnter={() => setLit(true)}
        onMouseLeave={() => setLit(false)}
        role="group"
        aria-label={\`Acrostic poem. Hidden word: \${hidden}.\`}
      >
        {lines.map((line, index) => {
          const initial = letters[index];
          return (
            <FragmentRow key={index} row={index + 1}>
              <span
                aria-hidden
                className="select-none text-right font-display text-lg font-semibold transition-colors duration-300"
                style={{
                  gridColumn: 1,
                  color: lit && initial ? "#e2624a" : initial ? "var(--openui-ink, #1c1c1e)" : "transparent",
                }}
              >
                {initial ?? ""}
              </span>
              <span className="font-display text-lg leading-relaxed text-ink/85" style={{ gridColumn: 2 }}>
                {line || "\\u00A0"}
              </span>
            </FragmentRow>
          );
        })}
      </div>
      <figcaption className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setRevealed((value) => !value)}
          aria-pressed={revealed}
          className="rounded border border-line px-2 py-1 font-mono text-xs text-ink/70 hover:bg-line/20"
        >
          {revealed ? \`message: \${hidden}\` : "reveal message"}
        </button>
      </figcaption>
    </figure>
  );
}

function FragmentRow({ row, children }: { row: number; children: React.ReactNode }) {
  return (
    <div className="contents" style={{ gridRow: row }}>
      {children}
    </div>
  );
}

export default AcrosticColumn;
`,
    demo: `import { AcrosticColumn } from "./acrostic-column";

export default function Demo() {
  return (
    <div className="flex min-h-[18rem] items-center justify-center bg-paper p-10">
      <AcrosticColumn
        hidden="REGISTRY"
        lines={[
          "Records what frameworks abandon,",
          "Entries with names, not vibes,",
          "Guarded by a schema's firm handshake,",
          "Indexed so search can find the truth,",
          "Signed by contributors across the world,",
          "Trusted because the machine checked it,",
          "Reusable by anyone, forever,",
          "Yours to fork, break, and mend.",
        ]}
      />
    </div>
  );
}
`,
  }),
];
