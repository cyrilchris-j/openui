"use client";

import { cn } from "@/lib/cn";

export interface ColorPaletteStripProps {
  className?: string;
}

export function ColorPaletteStrip({ className }: ColorPaletteStripProps) {
  const colors = ["#000000", "#4B5563", "#9CA3AF", "#E5E7EB"];

  return (
    <div className={cn("flex w-full max-w-xs overflow-hidden rounded-xl border border-line shadow-sm", className)}>
      {colors.map((c) => (
        <div key={c} className="h-10 flex-1 flex items-center justify-center" style={{ backgroundColor: c }}>
          <span className="font-mono text-[9px] text-white/80">{c.slice(1)}</span>
        </div>
      ))}
    </div>
  );
}

export default ColorPaletteStrip;
