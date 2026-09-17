"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface MirrorInputTextProps {
  placeholder?: string;
  /** Mask input as a password field while still mirroring length. */
  mask?: boolean;
  className?: string;
}

export function MirrorInputText({ placeholder = "Type something…", mask = false, className }: MirrorInputTextProps) {
  const [value, setValue] = useState("");

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <input
        type={mask ? "password" : "text"}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-md border border-line bg-paper px-3 py-2 font-mono text-sm text-ink outline-none focus-visible:ring-2 focus-visible:ring-accent"
      />
      <p className="font-mono text-step-2 text-ink" role="status" aria-label={`You typed: ${value}`} aria-live="polite">
        <span aria-hidden>{mask ? "\u2022".repeat(value.length) : value}</span>
        <span
          aria-hidden
          className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.15em] bg-accent"
          style={{ animation: "openui-mirror-caret 1.1s steps(1) infinite" }}
        />
      </p>
      <style>{`@keyframes openui-mirror-caret { 0%, 49% { opacity: 1 } 50%, 100% { opacity: 0 } } @media (prefers-reduced-motion: reduce) { span { animation: none !important } }`}</style>
    </div>
  );
}

export default MirrorInputText;
