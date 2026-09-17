"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export type Segment =
  | { kind: "text"; text: string }
  | { kind: "change"; id: string; insert: string; remove: string };

export interface TrackedChangesAcceptProps {
  segments: Segment[];
  className?: string;
}

type Decision = "pending" | "accepted" | "rejected";

export function TrackedChangesAccept({ segments, className }: TrackedChangesAcceptProps) {
  const [decisions, setDecisions] = useState<Record<string, Decision>>({});

  return (
    <div className={cn("flex max-w-prose flex-col gap-5", className)}>
      <p className="text-lg leading-loose text-ink">
        {segments.map((segment, index) => {
          if (segment.kind === "text") return <span key={index}>{segment.text} </span>;
          const decision = decisions[segment.id] ?? "pending";
          return (
            <span key={index} className="whitespace-nowrap">
              {decision !== "accepted" && (
                <span
                  className="text-red-600 line-through decoration-red-400/70"
                  style={{ opacity: decision === "rejected" ? 0.45 : 1 }}
                >
                  {segment.remove}
                </span>
              )}
              {decision !== "rejected" && (
                <span
                  className="text-emerald-700 underline decoration-emerald-400/70"
                  style={{ opacity: decision === "accepted" ? 1 : 0.85, transition: "opacity 400ms ease" }}
                >
                  {segment.insert}
                </span>
              )}{" "}
            </span>
          );
        })}
      </p>
      <div className="flex flex-wrap gap-2">
        {segments.filter((segment) => segment.kind === "change").map((segment) => {
          if (segment.kind !== "change") return null;
          const decision = decisions[segment.id] ?? "pending";
          return (
            <span key={segment.id} className="inline-flex items-center gap-1 rounded border border-line px-2 py-1 font-mono text-xs">
              <span className="max-w-[9rem] truncate text-ink/60">{segment.insert}</span>
              <button
                type="button"
                onClick={() => setDecisions((current) => ({ ...current, [segment.id]: "accepted" }))}
                aria-label={`Accept ${segment.insert}`}
                className={cn("rounded px-1 hover:bg-emerald-500/10", decision === "accepted" && "text-emerald-600")}
              >
                ✓
              </button>
              <button
                type="button"
                onClick={() => setDecisions((current) => ({ ...current, [segment.id]: "rejected" }))}
                aria-label={`Reject ${segment.insert}`}
                className={cn("rounded px-1 hover:bg-red-500/10", decision === "rejected" && "text-red-600")}
              >
                ✗
              </button>
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default TrackedChangesAccept;
