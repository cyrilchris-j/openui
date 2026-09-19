import * as React from "react";
import { stepSpring, type SpringConfig, type SpringState } from "./spring-physics.js";
import { useReducedMotion } from "../core/device.js";

/**
 * Hook for animated spring values with rAF loop
 */
export function useSpringValue(
  targetValue: number,
  config: SpringConfig = {},
): number {
  const reduced = useReducedMotion();
  const [value, setValue] = React.useState(targetValue);
  const stateRef = React.useRef<SpringState>({
    current: targetValue,
    target: targetValue,
    velocity: 0,
  });
  const lastTimeRef = React.useRef<number | null>(null);
  const rafIdRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    stateRef.current.target = targetValue;
    if (reduced) {
      stateRef.current.current = targetValue;
      stateRef.current.velocity = 0;
      setValue(targetValue);
      return;
    }

    const animate = (time: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = time;
      }
      const delta = Math.min((time - lastTimeRef.current) / 1000, 0.064); // cap at ~15fps jump
      lastTimeRef.current = time;

      const next = stepSpring(stateRef.current, config, delta);
      stateRef.current = next;
      setValue(next.current);

      if (next.current !== next.target || Math.abs(next.velocity) > 0.001) {
        rafIdRef.current = requestAnimationFrame(animate);
      } else {
        rafIdRef.current = null;
        lastTimeRef.current = null;
      }
    };

    if (rafIdRef.current === null) {
      rafIdRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [targetValue, reduced, config.stiffness, config.damping, config.mass]);

  return reduced ? targetValue : value;
}

/**
 * Hook tracking pointer velocity (pixels per second)
 */
export function usePointerVelocity(): { vx: number; vy: number; speed: number } {
  const [velocity, setVelocity] = React.useState({ vx: 0, vy: 0, speed: 0 });
  const lastPosRef = React.useRef<{ x: number; y: number; time: number } | null>(null);

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const handlePointerMove = (e: PointerEvent) => {
      const now = performance.now();
      if (!lastPosRef.current) {
        lastPosRef.current = { x: e.clientX, y: e.clientY, time: now };
        return;
      }

      const dt = Math.max((now - lastPosRef.current.time) / 1000, 0.001);
      const dx = e.clientX - lastPosRef.current.x;
      const dy = e.clientY - lastPosRef.current.y;

      const vx = dx / dt;
      const vy = dy / dt;
      const speed = Math.sqrt(vx * vx + vy * vy);

      setVelocity({ vx, vy, speed });
      lastPosRef.current = { x: e.clientX, y: e.clientY, time: now };
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  return velocity;
}
