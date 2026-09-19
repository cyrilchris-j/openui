import * as React from "react";
import { useReducedMotion } from "../core/device.js";

/* -------------------------------------------------------------------------- */
/* Border Energy Primitive                                                    */
/* -------------------------------------------------------------------------- */
export interface BorderEnergyProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
  glowWidth?: number;
  durationSeconds?: number;
  borderRadius?: string;
  children: React.ReactNode;
}

export function BorderEnergy({
  color = "hsl(var(--oxide))",
  glowWidth = 2,
  durationSeconds = 6,
  borderRadius = "calc(var(--radius-md, 2px) + 2px)",
  className = "",
  style,
  children,
  ...rest
}: BorderEnergyProps): React.JSX.Element {
  const reduced = useReducedMotion();

  return (
    <div
      className={`relative p-[1px] overflow-hidden group ${className}`}
      style={{
        ...style,
        borderRadius,
      }}
      {...rest}
    >
      {!reduced && (
        <div
          aria-hidden
          className="absolute -inset-[100%] opacity-0 group-hover:opacity-100 transition-opacity duration-normal pointer-events-none"
          style={{
            background: `conic-gradient(from 0deg at 50% 50%, transparent 0deg, ${color} 60deg, transparent 120deg)`,
            animation: `openui-spin ${durationSeconds}s linear infinite`,
          }}
        />
      )}
      <div
        className="relative z-10 w-full h-full bg-paper rounded-[inherit]"
      >
        {children}
      </div>
      <style>{`
        @keyframes openui-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Spotlight Card Primitive                                                   */
/* -------------------------------------------------------------------------- */
export interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  spotlightColor?: string;
  spotlightRadius?: number;
  children: React.ReactNode;
}

export function SpotlightCard({
  spotlightColor = "rgba(186, 68, 44, 0.12)",
  spotlightRadius = 280,
  className = "",
  style,
  children,
  ...rest
}: SpotlightCardProps): React.JSX.Element {
  const reduced = useReducedMotion();
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [spotlight, setSpotlight] = React.useState({ x: 0, y: 0, opacity: 0 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduced || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setSpotlight({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      opacity: 1,
    });
  };

  const handlePointerLeave = () => {
    setSpotlight((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`relative overflow-hidden ${className}`}
      style={style}
      {...rest}
    >
      {!reduced && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 transition-opacity duration-fast"
          style={{
            opacity: spotlight.opacity,
            background: `radial-gradient(${spotlightRadius}px circle at ${spotlight.x}px ${spotlight.y}px, ${spotlightColor}, transparent 80%)`,
          }}
        />
      )}
      {children}
    </div>
  );
}
