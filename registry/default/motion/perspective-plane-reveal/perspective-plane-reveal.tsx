"use client";

import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/cn";

export interface PerspectivePlaneRevealProps {
  children: React.ReactNode;
  /** Start angle below the horizon. */
  fromAngle?: number;
  className?: string;
}

export function PerspectivePlaneReveal({ children, fromAngle = -75, className }: PerspectivePlaneRevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>({ once: true });
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const revealed = inView || Boolean(reduced);

  return (
    <div ref={ref} style={{ perspective: 1200 }}>
      <div
        className={cn("origin-bottom will-change-transform", className)}
        style={{
          transform: revealed ? "rotateX(0deg)" : `rotateX(${fromAngle}deg)`,
          opacity: revealed ? 1 : 0,
          transition: "transform 780ms cubic-bezier(0.2, 0, 0, 1), opacity 400ms ease",
          transformStyle: "preserve-3d",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default PerspectivePlaneReveal;
