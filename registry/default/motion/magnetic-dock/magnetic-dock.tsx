"use client";

import { useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

export interface MagneticDockProps {
  icons: string[];
  /** Radius of the magnetic field, px. */
  influence?: number;
  className?: string;
}

export function MagneticDock({ icons, influence = 90, className }: MagneticDockProps) {
  const dockRef = useRef<HTMLDivElement>(null);
  const iconRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const frame = useRef<number | null>(null);

  const apply = useCallback(
    (clientX: number | null) => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        const dock = dockRef.current;
        if (!dock) return;
        const dockRect = dock.getBoundingClientRect();
        let anyEngaged = false;

        icons.forEach((_, index) => {
          const node = iconRefs.current[index];
          if (!node) return;
          const rect = node.getBoundingClientRect();
          const centre = rect.left + rect.width / 2;

          if (clientX === null) {
            node.style.transform = "translateY(0) scale(1)";
            return;
          }
          const distance = clientX - centre;
          const falloff = Math.max(0, 1 - Math.abs(distance) / influence);
          if (falloff > 0) anyEngaged = true;
          const lift = falloff * falloff * 18;
          node.style.transform = `translateY(-${lift}px) scale(${1 + falloff * 0.25})`;
        });

        dock.style.transform = anyEngaged ? "translateY(-4px)" : "translateY(0)";
      });
    },
    [icons, influence],
  );

  useEffect(
    () => () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    },
    [],
  );

  return (
    <div
      ref={dockRef}
      className={cn("inline-flex items-end gap-3 rounded-2xl border border-line bg-paper/90 p-3 shadow-xl backdrop-blur", className)}
      onPointerMove={(event) => apply(event.clientX)}
      onPointerLeave={() => apply(null)}
      role="toolbar"
      aria-label="Magnetic dock"
    >
      {icons.map((icon, index) => (
        <button
          key={icon}
          ref={(node) => {
            iconRefs.current[index] = node;
          }}
          type="button"
          aria-label={icon}
          className="flex h-12 w-12 items-center justify-center rounded-xl bg-line/40 text-xl transition-transform duration-100 will-change-transform hover:bg-accent/20"
        >
          <span aria-hidden>{icon}</span>
        </button>
      ))}
    </div>
  );
}

export default MagneticDock;
