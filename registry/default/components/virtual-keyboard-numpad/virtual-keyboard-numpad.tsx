"use client";

import { useState } from "react";
import { Delete, Check } from "lucide-react";
import { cn } from "@/lib/cn";

export function VirtualKeyboardNumpad({ className }: { className?: string }) {
  const [pin, setPin] = useState("");

  const press = (digit: string) => {
    if (pin.length < 6) setPin((prev) => prev + digit);
  };

  const backspace = () => setPin((prev) => prev.slice(0, -1));

  return (
    <div className={cn("p-4 rounded-xl border border-line bg-paper max-w-xs w-full font-mono shadow-sm", className)}>
      <div className="flex items-center justify-center gap-2 h-10 mb-4 bg-surface rounded-lg border border-line/60">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className={cn(
              "w-2.5 h-2.5 rounded-full transition-all",
              i < pin.length ? "bg-accent scale-110" : "bg-line"
            )}
          />
        ))}
      </div>

      <div className="grid grid-cols-3 gap-2">
        {["1", "2", "3", "4", "5", "6", "7", "8", "9", "C", "0", "DEL"].map((k) => {
          const isDel = k === "DEL";
          const isClear = k === "C";
          return (
            <button
              key={k}
              type="button"
              onClick={() => {
                if (isDel) backspace();
                else if (isClear) setPin("");
                else press(k);
              }}
              className="h-11 rounded-lg border border-line bg-paper hover:bg-surface text-ink text-sm font-semibold flex items-center justify-center active:scale-95 transition-all"
            >
              {isDel ? <Delete className="w-4 h-4 text-ink/60" /> : k}
            </button>
          );
        })}
      </div>
    </div>
  );
}
