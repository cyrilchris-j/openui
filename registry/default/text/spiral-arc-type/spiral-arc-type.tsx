import { cn } from "@/lib/cn";

export interface SpiralArcTypeProps {
  children: string;
  /** Outer radius in px. */
  radius?: number;
  /** Gap between successive turns, px. */
  gap?: number;
  className?: string;
}

export function SpiralArcType({ children, radius = 80, gap = 16, className }: SpiralArcTypeProps) {
  const chars = [...children];
  const size = (radius + gap * 2) * 2 + 40;
  const centre = size / 2;
  // Arc length budget: distribute glyphs along the spiral from outside in.
  const totalTurns = 2.2;

  return (
    <span className={cn("relative inline-block", className)} role="text" aria-label={children}>
      <svg aria-hidden width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
        {chars.map((char, index) => {
          const t = index / Math.max(chars.length - 1, 1);
          const angle = t * totalTurns * Math.PI * 2;
          const r = radius - t * gap * totalTurns;
          const x = centre + Math.cos(angle) * r;
          const y = centre + Math.sin(angle) * r;
          const fontSize = 15 - t * 4;
          return (
            <text
              key={index}
              x={x}
              y={y}
              fill="currentColor"
              fontSize={fontSize}
              fontWeight={700}
              textAnchor="middle"
              dominantBaseline="central"
              transform={`rotate(${(angle * 180) / Math.PI + 90}, ${x}, ${y})`}
            >
              {char}
            </text>
          );
        })}
      </svg>
      <span className="sr-only">{children}</span>
    </span>
  );
}

export default SpiralArcType;
