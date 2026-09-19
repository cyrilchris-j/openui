import * as React from "react";
import { useCursor } from "./cursor-provider.js";
import { damp } from "../motion/spring-physics.js";

/* -------------------------------------------------------------------------- */
/* Glow Cursor                                                                */
/* -------------------------------------------------------------------------- */
export interface GlowCursorProps {
  size?: number;
  glowColor?: string;
  mixBlendMode?: React.CSSProperties["mixBlendMode"];
}

export function GlowCursor({
  size = 32,
  glowColor = "rgba(186, 68, 44, 0.4)", // OpenUI oxide tone
  mixBlendMode = "normal",
}: GlowCursorProps): React.JSX.Element | null {
  const cursor = useCursor();
  const currentPosRef = React.useRef({ x: -100, y: -100 });
  const cursorDotRef = React.useRef<HTMLDivElement>(null);
  const rafRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    if (!cursor?.visible) return;

    let lastTime = performance.now();

    const loop = (time: number) => {
      const delta = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;

      // Smooth lag dampening
      currentPosRef.current.x = damp(currentPosRef.current.x, cursor.x, 24, delta);
      currentPosRef.current.y = damp(currentPosRef.current.y, cursor.y, 24, delta);

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${currentPosRef.current.x - size / 2}px, ${currentPosRef.current.y - size / 2}px, 0)`;
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [cursor?.visible, cursor?.x, cursor?.y, size]);

  if (!cursor?.visible) return null;

  return (
    <div
      ref={cursorDotRef}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[9999] will-change-transform rounded-full"
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
        mixBlendMode,
      }}
    />
  );
}

/* -------------------------------------------------------------------------- */
/* Cursor Spotlight                                                           */
/* -------------------------------------------------------------------------- */
export interface CursorSpotlightProps {
  radius?: number;
  color?: string;
}

export function CursorSpotlight({
  radius = 350,
  color = "rgba(186, 68, 44, 0.07)",
}: CursorSpotlightProps): React.JSX.Element | null {
  const cursor = useCursor();
  if (!cursor?.visible) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-10 transition-opacity duration-normal"
      style={{
        background: `radial-gradient(${radius}px circle at ${cursor.x}px ${cursor.y}px, ${color}, transparent 80%)`,
      }}
    />
  );
}
