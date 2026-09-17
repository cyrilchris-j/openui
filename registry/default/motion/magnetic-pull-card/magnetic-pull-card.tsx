"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export interface MagneticPullCardProps {
  title?: string;
  category?: string;
  description?: string;
  className?: string;
}

export function MagneticPullCard({
  title = "Rotational Inertia",
  category = "Kinematics 04",
  description = "A surface behaving as if suspended by high-tension micro-springs.",
  className,
}: MagneticPullCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("translate3d(0, 0, 0) rotateX(0deg) rotateY(0deg)");
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let currentRotX = 0;
    let currentRotY = 0;
    let rafId: number;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      const radius = 260;

      if (dist < radius) {
        const pull = (1 - dist / radius) * 28;
        targetX = (dx / dist) * pull;
        targetY = (dy / dist) * pull;
      } else {
        targetX = 0;
        targetY = 0;
      }
    };

    const loop = () => {
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      currentRotX += (-currentY * 0.6 - currentRotX) * 0.1;
      currentRotY += (currentX * 0.6 - currentRotY) * 0.1;

      setTransform(`translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0) rotateX(${currentRotX.toFixed(2)}deg) rotateY(${currentRotY.toFixed(2)}deg)`);
      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", handlePointerMove);
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ transform, transformStyle: "preserve-3d" }}
      className={cn(
        "relative max-w-sm rounded border border-line bg-paper p-6 shadow-sm transition-colors duration-200",
        isHovered && "border-ink shadow-md",
        className,
      )}
    >
      <span className="font-mono text-[0.7rem] uppercase tracking-wider text-graphite">
        {category}
      </span>
      <h3 className="mt-2 font-serif text-lg font-bold text-ink">{title}</h3>
      <p className="mt-2 text-xs leading-relaxed text-graphite">{description}</p>
      <div className="mt-6 flex items-center justify-between border-t border-line/60 pt-3 text-[0.75rem] font-mono text-ink">
        <span>Spring Damping: 0.88</span>
        <span className="font-bold">→ Inspect</span>
      </div>
    </div>
  );
}
