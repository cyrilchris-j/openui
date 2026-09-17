import { cn } from "@/lib/cn";

export interface LiquidShapeMorphProps {
  children?: React.ReactNode;
  /** Seconds per morph cycle. */
  cycleSeconds?: number;
  /** Blob fill colour. */
  fill?: string;
  className?: string;
}

export function LiquidShapeMorph({
  children,
  cycleSeconds = 9,
  fill = "#e2624a",
  className,
}: LiquidShapeMorphProps) {
  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <div
        aria-hidden
        className="absolute inset-0 will-change-[border-radius]"
        style={{
          background: `linear-gradient(135deg, ${fill}, color-mix(in oklab, ${fill}, #4a6fa5 45%))`,
          borderRadius: "42% 58% 61% 39% / 45% 42% 58% 55%",
          animation: `openui-blob ${cycleSeconds}s ease-in-out infinite alternate`,
        }}
      />
      <div className="relative z-10 p-10">{children}</div>
      <style>{`@keyframes openui-blob {
        0% { border-radius: 42% 58% 61% 39% / 45% 42% 58% 55% }
        33% { border-radius: 58% 42% 39% 61% / 52% 58% 42% 48% }
        66% { border-radius: 39% 61% 55% 45% / 58% 39% 61% 42% }
        100% { border-radius: 61% 39% 45% 55% / 39% 55% 45% 61% }
      } @media (prefers-reduced-motion: reduce) { div { animation: none !important } }`}</style>
    </div>
  );
}

export default LiquidShapeMorph;
