import { cn } from "@/lib/cn";

export interface LiquidMergeHeadingProps {
  left: string;
  right: string;
  /** Seconds for a full merge and release. */
  cycleSeconds?: number;
  className?: string;
}

export function LiquidMergeHeading({ left, right, cycleSeconds = 5, className }: LiquidMergeHeadingProps) {
  return (
    <span className={cn("inline-block", className)} role="text" aria-label={`${left} ${right}`}>
      <svg aria-hidden width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <filter id="openui-gooey">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>
      <span
        aria-hidden
        className="flex items-center justify-center gap-8 font-display text-step-4 text-ink"
        style={{ filter: "url(#openui-gooey)" }}
      >
        <span
          className="inline-block"
          style={{ animation: `openui-merge-l ${cycleSeconds}s ease-in-out infinite alternate` }}
        >
          {left}
        </span>
        <span
          className="inline-block"
          style={{ animation: `openui-merge-r ${cycleSeconds}s ease-in-out infinite alternate` }}
        >
          {right}
        </span>
      </span>
      <style>{`
        @keyframes openui-merge-l { from { transform: translateX(0) } to { transform: translateX(0.9em) } }
        @keyframes openui-merge-r { from { transform: translateX(0) } to { transform: translateX(-0.9em) } }
        @media (prefers-reduced-motion: reduce) { span { animation: none !important } }
      `}</style>
      <span className="sr-only">{left} {right}</span>
    </span>
  );
}

export default LiquidMergeHeading;
