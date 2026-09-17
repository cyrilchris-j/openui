import { cn } from "@/lib/cn";

export interface CircularTypeProps {
  children: string;
  /** Ring radius in px. */
  radius?: number;
  /** Seconds per full revolution. */
  rotationSeconds?: number;
  reverse?: boolean;
  className?: string;
}

export function CircularType({
  children,
  radius = 72,
  rotationSeconds = 24,
  reverse = false,
  className,
}: CircularTypeProps) {
  const size = radius * 2 + 40;
  const centre = size / 2;
  const pathId = `ring-${radius}-${reverse ? "r" : "f"}`;

  return (
    <span className={cn("relative inline-block", className)} role="text" aria-label={children}>
      <svg
        aria-hidden
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={
          rotationSeconds > 0
            ? {
                animation: `openui-ring-spin ${rotationSeconds}s linear infinite`,
                animationDirection: reverse ? "reverse" : "normal",
              }
            : undefined
        }
      >
        <defs>
          <path
            id={pathId}
            d={`M ${centre}, ${centre} m -${radius}, 0 a ${radius},${radius} 0 1,1 ${radius * 2},0 a ${radius},${radius} 0 1,1 -${radius * 2},0`}
            fill="none"
          />
        </defs>
        <text className="fill-current" style={{ fontSize: radius / 4.6, letterSpacing: "0.18em" }}>
          <textPath href={`#${pathId}`} startOffset="0%">
            {children}
          </textPath>
        </text>
      </svg>
      <style>{`@keyframes openui-ring-spin { to { transform: rotate(360deg) } } @media (prefers-reduced-motion: reduce) { svg { animation: none !important } }`}</style>
    </span>
  );
}

export default CircularType;
