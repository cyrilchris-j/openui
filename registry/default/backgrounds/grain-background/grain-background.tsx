import { cn } from "@/lib/cn";

/**
 * Grain Background
 *
 * Grain fixes the single biggest problem with flat digital surfaces: they have
 * no tooth, so large fields of colour read as unfinished. This generates it from
 * an inline `feTurbulence` filter — no image request, no base64 payload, and it
 * scales to any viewport without tiling seams.
 *
 * Two custom properties drive it: `--grain-opacity` (default 0.06) and
 * `--grain-scale` (default 1). Above ~0.12 the surface stops reading as paper
 * and starts reading as noise, which is why the default is deliberately low.
 */

export interface GrainBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Grain strength, 0–0.25. */
  opacity?: number;
  /** Base frequency; higher is finer. */
  scale?: number;
  /** Blend mode for the grain layer. */
  blend?: "overlay" | "soft-light" | "multiply" | "screen";
  children?: React.ReactNode;
}

export function GrainBackground({
  opacity = 0.06,
  scale = 1,
  blend = "overlay",
  className,
  children,
  ...props
}: GrainBackgroundProps) {
  const frequency = 0.9 * scale;

  return (
    <div
      className={cn("relative isolate overflow-hidden bg-paper text-ink", className)}
      style={
        {
          "--grain-opacity": opacity,
          "--grain-blend": blend,
        } as React.CSSProperties
      }
      {...props}
    >
      <svg
        aria-hidden="true"
        focusable="false"
        className="pointer-events-none absolute inset-0 -z-10 size-full opacity-[var(--grain-opacity)] mix-blend-[var(--grain-blend)]"
      >
        <filter id="openui-grain" x="0" y="0" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency={frequency}
            numOctaves={3}
            stitchTiles="stitch"
            result="noise"
          />
          <feColorMatrix type="saturate" values="0" in="noise" result="desaturated" />
          <feComponentTransfer in="desaturated">
            <feFuncA type="linear" slope="0.85" intercept="0" />
          </feComponentTransfer>
        </filter>
        <rect width="100%" height="100%" filter="url(#openui-grain)" />
      </svg>
      {children}
    </div>
  );
}

export default GrainBackground;
