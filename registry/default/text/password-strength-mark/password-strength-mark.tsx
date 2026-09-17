"use client";

import { cn } from "@/lib/cn";

export interface PasswordStrengthMarkProps {
  /** Score 0–4. */
  score: number;
  /** The word sliced into 5 reveal units. */
  word?: string;
  className?: string;
}

const LEVEL_LABELS = ["empty", "weak", "fair", "good", "strong"] as const;

export function PasswordStrengthMark({ score, word = "STRENGTH", className }: PasswordStrengthMarkProps) {
  const units = [...word];
  const litCount = Math.round((score / 4) * units.length);

  return (
    <span
      className={cn("inline-flex select-none items-baseline gap-3 font-mono", className)}
      role="meter"
      aria-valuenow={score}
      aria-valuemin={0}
      aria-valuemax={4}
      aria-label={`Password strength: ${LEVEL_LABELS[score]}`}
    >
      {units.map((char, index) => (
        <span
          key={index}
          aria-hidden
          style={{
            color: index < litCount ? "currentColor" : "color-mix(in oklab, currentColor, transparent 78%)",
            transition: "color 220ms ease",
          }}
        >
          {char}
        </span>
      ))}
      <span className="text-xs uppercase tracking-widest opacity-70">{LEVEL_LABELS[score]}</span>
    </span>
  );
}

export default PasswordStrengthMark;
