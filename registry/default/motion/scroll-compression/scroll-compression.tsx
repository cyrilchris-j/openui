"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export interface ScrollCompressionProps {
  panels: Array<{ title: string; body: string }>;
  className?: string;
}

export function ScrollCompression({ panels, className }: ScrollCompressionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const measure = () => {
      const rect = node.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      setProgress(Math.max(0, Math.min(1, -rect.top / Math.max(total, 1))));
    };
    measure();
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, []);

  const gap = (1 - progress) * 48; // px between panels
  const scaleStep = 0.04 * progress;

  return (
    <div ref={sectionRef} className={cn("relative", className)} style={{ minHeight: "220vh" }}>
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center">
        <div
          className="flex flex-col will-change-transform"
          style={{ gap: `${gap}px`, transition: "gap 80ms linear" }}
        >
          {panels.map((panel, index) => (
            <div
              key={index}
              className="w-72 rounded-xl border border-line bg-paper p-5 shadow-lg"
              style={{
                transform: `scale(${1 - index * scaleStep})`,
                zIndex: panels.length - index,
              }}
            >
              <p className="font-display text-lg text-ink">{panel.title}</p>
              <p className="mt-1 text-sm text-ink/70">{panel.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 font-mono text-xs text-ink/50">scroll progress: {(progress * 100).toFixed(0)}%</p>
      </div>
    </div>
  );
}

export default ScrollCompression;
