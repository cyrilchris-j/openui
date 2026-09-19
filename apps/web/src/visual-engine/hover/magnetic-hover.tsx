import * as React from "react";
import { useReducedMotion } from "../core/device.js";
import { stepSpring, type SpringState } from "../motion/spring-physics.js";

export interface MagneticHoverProps extends React.HTMLAttributes<HTMLDivElement> {
  strength?: number; // attraction distance multiplier (0 to 1)
  maxDistance?: number;
  damping?: number;
  stiffness?: number;
  children: React.ReactNode;
}

/**
 * OpenUI Magnetic Field
 *
 * Independently calibrated magnetic attraction primitive.
 * Attracts content towards pointer position with spring physics and returns
 * with high-fidelity damping on mouse leave.
 */
export function MagneticHover({
  strength = 0.35,
  maxDistance = 24,
  damping = 18,
  stiffness = 240,
  className = "",
  style,
  children,
  ...rest
}: MagneticHoverProps): React.JSX.Element {
  const reduced = useReducedMotion();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [offset, setOffset] = React.useState({ x: 0, y: 0 });

  const stateX = React.useRef<SpringState>({ current: 0, target: 0, velocity: 0 });
  const stateY = React.useRef<SpringState>({ current: 0, target: 0, velocity: 0 });
  const rafRef = React.useRef<number | null>(null);
  const lastTimeRef = React.useRef<number | null>(null);

  const startLoop = () => {
    if (rafRef.current !== null) return;

    const loop = (time: number) => {
      if (lastTimeRef.current === null) lastTimeRef.current = time;
      const dt = Math.min((time - lastTimeRef.current) / 1000, 0.05);
      lastTimeRef.current = time;

      const nextX = stepSpring(stateX.current, { damping, stiffness }, dt);
      const nextY = stepSpring(stateY.current, { damping, stiffness }, dt);

      stateX.current = nextX;
      stateY.current = nextY;

      setOffset({ x: nextX.current, y: nextY.current });

      const settling =
        Math.abs(nextX.current - nextX.target) < 0.05 &&
        Math.abs(nextY.current - nextY.target) < 0.05 &&
        Math.abs(nextX.velocity) < 0.05 &&
        Math.abs(nextY.velocity) < 0.05;

      if (!settling) {
        rafRef.current = requestAnimationFrame(loop);
      } else {
        rafRef.current = null;
        lastTimeRef.current = null;
      }
    };

    rafRef.current = requestAnimationFrame(loop);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduced || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distX = (e.clientX - centerX) * strength;
    const distY = (e.clientY - centerY) * strength;

    stateX.current.target = Math.max(Math.min(distX, maxDistance), -maxDistance);
    stateY.current.target = Math.max(Math.min(distY, maxDistance), -maxDistance);
    startLoop();
  };

  const handlePointerLeave = () => {
    stateX.current.target = 0;
    stateY.current.target = 0;
    startLoop();
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`inline-block will-change-transform ${className}`}
      style={{
        ...style,
        transform: reduced ? "none" : `translate3d(${offset.x.toFixed(2)}px, ${offset.y.toFixed(2)}px, 0)`,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
