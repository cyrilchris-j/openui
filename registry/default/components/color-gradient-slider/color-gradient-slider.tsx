"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/cn";

export function ColorGradientSlider({ className }: { className?: string }) {
  const [color1, setColor1] = useState("#3b82f6");
  const [color2, setColor2] = useState("#8b5cf6");
  const [angle, setAngle] = useState(90);
  const [copied, setCopied] = useState(false);

  const gradientString = `linear-gradient(${angle}deg, ${color1}, ${color2})`;

  const copyCss = () => {
    navigator.clipboard.writeText(`background: ${gradientString};`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn("p-4 rounded-xl border border-line bg-paper max-w-sm w-full font-sans shadow-sm", className)}>
      <div
        className="w-full h-14 rounded-lg mb-3 border border-line/50 transition-all shadow-inner"
        style={{ background: gradientString }}
      />

      <div className="space-y-2.5 mb-4">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-ink/60">Angle ({angle}°)</span>
          <input
            type="range"
            min="0"
            max="360"
            value={angle}
            onChange={(e) => setAngle(Number(e.target.value))}
            className="w-32 accent-accent cursor-pointer"
          />
        </div>

        <div className="flex items-center gap-3">
          <label className="flex-1 flex items-center gap-2 p-1.5 rounded border border-line bg-surface text-xs font-mono">
            <input
              type="color"
              value={color1}
              onChange={(e) => setColor1(e.target.value)}
              className="w-5 h-5 rounded cursor-pointer border-0 p-0 bg-transparent"
            />
            <span className="text-ink text-[11px]">{color1}</span>
          </label>
          <label className="flex-1 flex items-center gap-2 p-1.5 rounded border border-line bg-surface text-xs font-mono">
            <input
              type="color"
              value={color2}
              onChange={(e) => setColor2(e.target.value)}
              className="w-5 h-5 rounded cursor-pointer border-0 p-0 bg-transparent"
            />
            <span className="text-ink text-[11px]">{color2}</span>
          </label>
        </div>
      </div>

      <button
        type="button"
        onClick={copyCss}
        className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded bg-surface hover:bg-line/40 text-xs font-mono text-ink transition-colors border border-line"
      >
        {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
        <span>{copied ? "Copied CSS!" : "Copy CSS"}</span>
      </button>
    </div>
  );
}
