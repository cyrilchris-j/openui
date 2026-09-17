"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/cn";

export interface FireworkPopGlyphsProps {
  children: string;
  className?: string;
}

export function FireworkPopGlyphs({ children, className }: FireworkPopGlyphsProps) {
  const [burst, setBurst] = useState(0);
  const reduced = useRef(
    typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches,
  );

  return (
    <button
      type="button"
      onClick={() => setBurst((value) => value + 1)}
      className={cn("inline-block cursor-pointer select-none border-0 bg-transparent p-0", className)}
      aria-label={`${children} (fire)`}
    >
      {[...children].map((char, index) => (
        <span key={index} aria-hidden className="relative inline-block">
          <span
            key={burst}
            className="inline-block"
            style={{
              animation:
                burst > 0 && !reduced.current
                  ? `openui-pop 620ms cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 45}ms`
                  : undefined,
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
          <span
            key={`spark-${burst}-${index}`}
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-1 w-1 rounded-full bg-accent"
            style={{
              animation:
                burst > 0 && !reduced.current
                  ? `openui-spark 520ms ease-out ${index * 45}ms`
                  : undefined,
              opacity: 0,
            }}
          />
        </span>
      ))}
      <style>{`
        @keyframes openui-pop { 0% { transform: translateY(0) } 30% { transform: translateY(-14px) rotate(6deg) } 100% { transform: translateY(0) rotate(0) } }
        @keyframes openui-spark { 0% { opacity: 1; transform: translate(-50%, -50%) scale(1) } 100% { opacity: 0; transform: translate(calc(-50% + 22px), -260%) scale(0.4) } }
        @media (prefers-reduced-motion: reduce) { * { animation: none !important } }
      `}</style>
    </button>
  );
}

export default FireworkPopGlyphs;
