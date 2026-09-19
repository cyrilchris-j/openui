import * as React from "react";
import { useReducedMotion } from "../core/device.js";

/* -------------------------------------------------------------------------- */
/* Spring Button Primitive                                                    */
/* -------------------------------------------------------------------------- */
export interface SpringButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  scaleDown?: number;
  children: React.ReactNode;
}

export function SpringButton({
  scaleDown = 0.96,
  className = "",
  style,
  children,
  ...rest
}: SpringButtonProps): React.JSX.Element {
  const reduced = useReducedMotion();
  const [pressed, setPressed] = React.useState(false);

  return (
    <button
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      className={`inline-flex items-center justify-center select-none outline-none focus-visible:ring-2 focus-visible:ring-oxide ${className}`}
      style={{
        ...style,
        transform: !reduced && pressed ? `scale(${scaleDown})` : "scale(1)",
        transition: "transform 160ms cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      {...rest}
    >
      {children}
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/* Hold Action Button                                                         */
/* -------------------------------------------------------------------------- */
export interface HoldActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  holdDurationMs?: number;
  onHoldComplete?: () => void;
  actionLabel: string;
  holdingLabel?: string;
  completeLabel?: string;
}

export function HoldActionButton({
  holdDurationMs = 1200,
  onHoldComplete,
  actionLabel,
  holdingLabel = "Keep holding…",
  completeLabel = "Confirmed ✓",
  className = "",
  style,
  ...rest
}: HoldActionButtonProps): React.JSX.Element {
  const [progress, setProgress] = React.useState(0);
  const [isHolding, setIsHolding] = React.useState(false);
  const [completed, setCompleted] = React.useState(false);

  const startTimeRef = React.useRef<number | null>(null);
  const rafRef = React.useRef<number | null>(null);

  const startHold = () => {
    if (completed) return;
    setIsHolding(true);
    startTimeRef.current = performance.now();

    const update = (time: number) => {
      if (!startTimeRef.current) return;
      const elapsed = time - startTimeRef.current;
      const p = Math.min(elapsed / holdDurationMs, 1);
      setProgress(p);

      if (p < 1) {
        rafRef.current = requestAnimationFrame(update);
      } else {
        setCompleted(true);
        setIsHolding(false);
        onHoldComplete?.();
      }
    };

    rafRef.current = requestAnimationFrame(update);
  };

  const cancelHold = () => {
    if (completed) return;
    setIsHolding(false);
    setProgress(0);
    startTimeRef.current = null;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  };

  return (
    <button
      onPointerDown={startHold}
      onPointerUp={cancelHold}
      onPointerLeave={cancelHold}
      className={`relative overflow-hidden inline-flex items-center justify-center px-5 py-2.5 font-mono text-xs uppercase tracking-widest border border-line rounded-md transition-colors select-none ${
        completed ? "bg-moss text-paper border-moss" : "bg-surface hover:bg-surface/80 text-ink"
      } ${className}`}
      style={style}
      {...rest}
    >
      {/* Fill bar */}
      <span
        aria-hidden
        className="absolute inset-0 bg-oxide/20 pointer-events-none transition-[width] duration-75"
        style={{
          width: `${progress * 100}%`,
        }}
      />
      <span className="relative z-10 font-medium">
        {completed ? completeLabel : isHolding ? holdingLabel : actionLabel}
      </span>
    </button>
  );
}
