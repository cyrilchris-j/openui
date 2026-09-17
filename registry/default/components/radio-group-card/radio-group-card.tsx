"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface RadioGroupCardProps {
  className?: string;
}

export function RadioGroupCard({ className }: RadioGroupCardProps) {
  const [selected, setSelected] = useState("pro");
  const tiers = [
    { id: "starter", title: "Starter Spec", price: "Free" },
    { id: "pro", title: "Enterprise Registry", price: "$29/mo" },
  ];

  return (
    <div className={cn("w-full max-w-sm space-y-2 font-mono text-xs", className)}>
      {tiers.map((t) => {
        const isSel = selected === t.id;
        return (
          <div
            key={t.id}
            onClick={() => setSelected(t.id)}
            className={cn(
              "flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all",
              isSel ? "border-ink bg-line/10 shadow-sm" : "border-line bg-paper hover:border-ink/60"
            )}
          >
            <div>
              <span className="font-bold text-ink">{t.title}</span>
              <span className="text-ink/60 block text-[10px] mt-0.5">{t.price}</span>
            </div>
            <div className={cn("h-4 w-4 rounded-full border flex items-center justify-center", isSel ? "border-ink bg-ink" : "border-line")}>
              {isSel && <div className="h-1.5 w-1.5 rounded-full bg-paper" />}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default RadioGroupCard;
