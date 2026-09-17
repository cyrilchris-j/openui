"use client";

import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/cn";

export interface ThermalPrintTypeProps {
  children: string;
  /** Total print duration in ms. */
  durationMs?: number;
  className?: string;
}

export function ThermalPrintType({ children, durationMs = 1400, className }: ThermalPrintTypeProps) {
  const { ref, inView } = useInView<HTMLSpanElement>({ once: true });
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const printed = inView || Boolean(reduced);

  return (
    <span ref={ref} className={cn("block", className)} role="text" aria-label={children}>
      <style>{`@keyframes openui-head-jitter { 0%, 100% { transform: translateX(0) } 25% { transform: translateX(-1px) } 60% { transform: translateX(1px) } } @media (prefers-reduced-motion: reduce) { .openui-thermal { animation: none !important; clip-path: inset(0 0 0 0) !important } }`}</style>
      <span
        aria-hidden
        className="openui-thermal relative block font-mono"
        style={{
          clipPath: printed ? "inset(0 0 0 0)" : "inset(0 100% 0 0)",
          transition: `clip-path ${durationMs}ms steps(24, end)`,
          animation: printed ? "openui-head-jitter 120ms linear 6" : undefined,
        }}
      >
        <span
          className="block"
          style={{
            backgroundImage:
              "radial-gradient(rgba(0,0,0,0.28) 1px, transparent 1.4px)",
            backgroundSize: "3px 3px",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            WebkitTextStroke: "0.5px currentColor",
            opacity: printed ? 1 : 0,
            transition: `opacity ${durationMs * 0.6}ms ease ${durationMs * 0.4}ms`,
          }}
        >
          {children}
        </span>
      </span>
    </span>
  );
}

export default ThermalPrintType;
