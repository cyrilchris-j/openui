import { cn } from "@/lib/cn";

export interface VerticalKernTextProps {
  children: string;
  /** Letter spacing in em. */
  tracking?: number;
  /** Rotate 180° so the text reads bottom-to-top. */
  flip?: boolean;
  className?: string;
}

/**
 * Vertical Kern Text
 *
 * `text-orientation: mixed` keeps Latin upright while genuinely vertical
 * scripts keep their native behaviour; `upright` would break CJK readers'
 * expectations. The flip variant is a rotation, not a different writing
 * direction, so the reading order in the DOM stays correct.
 */
export function VerticalKernText({
  children,
  tracking = 0.32,
  flip = false,
  className,
}: VerticalKernTextProps) {
  return (
    <span
      className={cn("select-none font-mono text-[0.72rem] uppercase text-graphite", className)}
      style={{
        writingMode: "vertical-rl",
        letterSpacing: `${tracking}em`,
        transform: flip ? "rotate(180deg)" : undefined,
      }}
      role="text"
    >
      {children}
    </span>
  );
}

export default VerticalKernText;
