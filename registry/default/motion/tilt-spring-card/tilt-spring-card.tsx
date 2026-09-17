"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

export interface TiltSpringCardProps {
  children: React.ReactNode;
  /** Max tilt in degrees. */
  maxTilt?: number;
  stiffness?: number;
  className?: string;
}

export function TiltSpringCard({ children, maxTilt = 12, stiffness = 120, className }: TiltSpringCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const state = useRef({ rx: 0, ry: 0, vx: 0, vy: 0, tx: 0, ty: 0, raf: null as number | null, running: false });

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia?.("(pointer: coarse)").matches) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const s = state.current;

    const tick = () => {
      const forceX = -stiffness * (s.rx - s.tx);
      const forceY = -stiffness * (s.ry - s.ty);
      s.vx += forceX * 0.016;
      s.vy += forceY * 0.016;
      s.vx *= 0.86;
      s.vy *= 0.86;
      s.rx += s.vx * 0.016;
      s.ry += s.vy * 0.016;

      node.style.transform = `rotateX(${s.rx.toFixed(2)}deg) rotateY(${s.ry.toFixed(2)}deg)`;

      if (Math.abs(s.rx - s.tx) > 0.05 || Math.abs(s.ry - s.ty) > 0.05 || Math.abs(s.vx) > 0.5 || Math.abs(s.vy) > 0.5) {
        s.raf = requestAnimationFrame(tick);
      } else {
        s.running = false;
      }
    };

    const kick = () => {
      if (!s.running) {
        s.running = true;
        s.raf = requestAnimationFrame(tick);
      }
    };

    const onMove = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      s.ty = px * maxTilt * 2;
      s.tx = -py * maxTilt * 2;
      kick();
    };
    const onLeave = () => {
      s.tx = 0;
      s.ty = 0;
      kick();
    };

    node.addEventListener("pointermove", onMove);
    node.addEventListener("pointerleave", onLeave);
    return () => {
      node.removeEventListener("pointermove", onMove);
      node.removeEventListener("pointerleave", onLeave);
      if (s.raf !== null) cancelAnimationFrame(s.raf);
    };
  }, [maxTilt, stiffness]);

  return (
    <div style={{ perspective: 900 }}>
      <div
        ref={ref}
        className={cn("rounded-xl border border-line bg-paper shadow-xl will-change-transform", className)}
        style={{ transformStyle: "preserve-3d" }}
      >
        {children}
      </div>
    </div>
  );
}

export default TiltSpringCard;
