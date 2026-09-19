import * as React from "react";

export interface RubberButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
}

/**
 * OpenUI Rubber Snap Button
 *
 * Squishy jelly button that undergoes non-linear viscoelastic deformation
 * and oscillatory spring recoil when pressed and released.
 */
export function RubberButton({
  label = "Snap Rebound",
  className = "",
  onClick,
  ...rest
}: RubberButtonProps): React.JSX.Element {
  const [pressed, setPressed] = React.useState(false);
  const [snapping, setSnapping] = React.useState(false);

  const handlePointerDown = () => {
    setPressed(true);
    setSnapping(false);
  };

  const handlePointerUp = (e: React.MouseEvent<HTMLButtonElement>) => {
    setPressed(false);
    setSnapping(true);
    setTimeout(() => setSnapping(false), 600);
    onClick?.(e);
  };

  return (
    <button
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      className={`relative px-6 py-3 rounded-xl bg-ink text-paper font-mono text-xs uppercase tracking-wider font-semibold shadow-sm select-none transition-transform duration-100 ${
        pressed
          ? "scale-x-125 scale-y-75"
          : snapping
          ? "animate-bounce scale-x-95 scale-y-110"
          : "hover:scale-105"
      } ${className}`}
      {...rest}
    >
      <span className="relative z-10 flex items-center gap-2">
        <span>⚡</span>
        {label}
      </span>
      {/* Jelly reflection */}
      <div className="absolute inset-x-2 top-1 h-2 rounded-t-lg bg-white/20 pointer-events-none" />
    </button>
  );
}
