"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface InteractiveCalculatorSectionProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
}

export function InteractiveCalculatorSection({
  title = "Calculate Engineering Hours Saved",
  className,
  ...props
}: InteractiveCalculatorSectionProps) {
  const [engineers, setEngineers] = useState(8);

  const hoursSaved = engineers * 140;
  const dollarSaved = hoursSaved * 125;

  return (
    <section className={cn("py-16 px-6 max-w-4xl mx-auto font-sans bg-paper text-ink", className)} {...props}>
      <h2 className="text-2xl font-bold text-center text-ink mb-10">{title}</h2>
      <div className="p-8 rounded-3xl border border-line bg-surface/30 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <div className="flex justify-between font-mono text-xs">
            <span className="text-ink/60">Frontend Engineers</span>
            <span className="font-bold text-ink">{engineers} devs</span>
          </div>
          <input
            type="range"
            min="1"
            max="50"
            value={engineers}
            onChange={(e) => setEngineers(Number(e.target.value))}
            className="w-full accent-accent cursor-pointer"
          />
          <p className="text-xs text-ink/60">Based on standard design system implementation velocity metrics.</p>
        </div>

        <div className="p-6 rounded-2xl border border-line bg-paper text-center font-mono">
          <div className="text-xs text-ink/60">Annual Estimated Value</div>
          <div className="text-3xl font-bold text-accent my-2">${dollarSaved.toLocaleString()}</div>
          <div className="text-xs text-emerald-600 font-semibold">{hoursSaved.toLocaleString()} hours saved</div>
        </div>
      </div>
    </section>
  );
}
