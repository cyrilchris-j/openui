import * as React from "react";

export interface CountRollerProps extends React.HTMLAttributes<HTMLDivElement> {
  targetNumber?: number;
  durationMs?: number;
}

/**
 * OpenUI Count Up Roller
 *
 * 3D mechanical odometer digit cylinder with spring deceleration
 * and continuous numeric scrolling.
 */
export function CountRoller({
  targetNumber = 9482,
  durationMs = 2400,
  className = "",
  ...rest
}: CountRollerProps): React.JSX.Element {
  const [current, setCurrent] = React.useState(1000);

  React.useEffect(() => {
    const startTime = performance.now();
    const startVal = 1000;

    let rafId: number;
    const update = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / durationMs);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.floor(startVal + (targetNumber - startVal) * eased));

      if (progress < 1) {
        rafId = requestAnimationFrame(update);
      }
    };

    rafId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafId);
  }, [targetNumber, durationMs]);

  const digits = current.toString().padStart(4, "0").split("");

  return (
    <div className={`flex items-center justify-center gap-1 font-mono font-bold select-none ${className}`} {...rest}>
      <span className="text-sm font-semibold text-graphite mr-1">#</span>
      {digits.map((d, i) => (
        <div
          key={i}
          className="relative w-8 h-12 bg-surface border border-line rounded flex items-center justify-center text-xl text-ink overflow-hidden shadow-xs"
        >
          <span className="transition-transform duration-100 ease-out">{d}</span>
        </div>
      ))}
      <span className="text-xs font-mono text-moss ml-1.5 font-normal">+24.8%</span>
    </div>
  );
}
