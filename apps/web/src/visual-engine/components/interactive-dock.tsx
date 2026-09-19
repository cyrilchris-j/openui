import * as React from "react";
import { useReducedMotion } from "../core/device.js";

export interface DockItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
}

export interface InteractiveDockProps extends React.HTMLAttributes<HTMLDivElement> {
  items: DockItem[];
  baseSize?: number;
  maxScale?: number;
  magnificationRadius?: number;
}

/**
 * OpenUI Interactive Dock
 *
 * Parabolic proximity magnification dock.
 * Calculates Gaussian distance curves to smoothly scale icons under pointer.
 */
export function InteractiveDock({
  items,
  baseSize = 44,
  maxScale = 1.55,
  magnificationRadius = 140,
  className = "",
  ...rest
}: InteractiveDockProps): React.JSX.Element {
  const reduced = useReducedMotion();
  const [mouseX, setMouseX] = React.useState<number | null>(null);
  const dockRef = React.useRef<HTMLDivElement>(null);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduced) return;
    setMouseX(e.clientX);
  };

  const handlePointerLeave = () => {
    setMouseX(null);
  };

  return (
    <div
      ref={dockRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`inline-flex items-end gap-2 px-3 py-2 border border-line/40 rounded-2xl bg-paper/90 dark:bg-[#121211]/90 backdrop-blur-md shadow-lg ${className}`}
      {...rest}
    >
      {items.map((item) => (
        <DockButton
          key={item.id}
          item={item}
          baseSize={baseSize}
          maxScale={maxScale}
          radius={magnificationRadius}
          mouseX={mouseX}
          reduced={reduced}
        />
      ))}
    </div>
  );
}

interface DockButtonProps {
  item: DockItem;
  baseSize: number;
  maxScale: number;
  radius: number;
  mouseX: number | null;
  reduced: boolean;
}

function DockButton({
  item,
  baseSize,
  maxScale,
  radius,
  mouseX,
  reduced,
}: DockButtonProps): React.JSX.Element {
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  let scale = 1;
  if (!reduced && mouseX !== null && buttonRef.current) {
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const dist = Math.abs(mouseX - centerX);

    if (dist < radius) {
      const factor = Math.cos((dist / radius) * (Math.PI / 2));
      scale = 1 + factor * (maxScale - 1);
    }
  }

  const currentSize = baseSize * scale;

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={item.onClick}
      title={item.label}
      aria-label={item.label}
      className={`group relative flex items-center justify-center rounded-xl border border-line/30 transition-colors ${
        item.active ? "bg-ink text-paper border-ink" : "bg-surface hover:bg-surface/80 text-ink"
      }`}
      style={{
        width: `${currentSize}px`,
        height: `${currentSize}px`,
        transitionProperty: "width, height, background-color, border-color",
        transitionDuration: "140ms",
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <div className="flex items-center justify-center w-5 h-5 pointer-events-none">
        {item.icon}
      </div>
      {/* Tooltip */}
      <span className="pointer-events-none absolute -top-9 px-2 py-0.5 rounded font-mono text-[10px] tracking-wider uppercase bg-ink text-paper opacity-0 group-hover:opacity-100 transition-opacity duration-fast whitespace-nowrap shadow-xs">
        {item.label}
      </span>
    </button>
  );
}
