"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export type ScriptLine =
  | { kind: "speech"; character: string; text: string }
  | { kind: "direction"; text: string; involves?: string };

export interface WhisperStageDirectionProps {
  script: ScriptLine[];
  className?: string;
}

export function WhisperStageDirection({ script, className }: WhisperStageDirectionProps) {
  const [focus, setFocus] = useState<string | null>(null);

  return (
    <div className={cn("max-w-prose space-y-4", className)}>
      {script.map((line, index) =>
        line.kind === "direction" ? (
          <button
            key={index}
            type="button"
            onClick={() => setFocus((current) => (current === line.involves ? null : line.involves ?? null))}
            className={cn(
              "block w-full cursor-pointer border-0 bg-transparent p-0 pl-10 text-left text-sm italic transition-colors",
              focus && line.involves === focus ? "text-accent" : "text-ink/55",
            )}
          >
            ({line.text})
          </button>
        ) : (
          <div key={index} className={cn("transition-opacity", focus && line.character !== focus ? "opacity-50" : "opacity-100")}>
            <p className="pl-10 font-mono text-xs uppercase tracking-[0.24em] text-ink">{line.character}</p>
            <p className="pl-4 text-base leading-relaxed text-ink/90">{line.text}</p>
          </div>
        ),
      )}
    </div>
  );
}

export default WhisperStageDirection;
