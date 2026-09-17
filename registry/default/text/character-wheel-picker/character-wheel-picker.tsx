"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/cn";

const CHARS = " ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("");

export interface CharacterWheelPickerProps {
  length?: number;
  onChange?: (value: string) => void;
  className?: string;
}

export function CharacterWheelPicker({ length = 4, onChange, className }: CharacterWheelPickerProps) {
  const [indices, setIndices] = useState<number[]>(() => Array.from({ length }, () => 0));
  const momentum = useRef<number[]>(Array.from({ length }, () => 0));

  const step = (index: number, delta: number) => {
    setIndices((current) => {
      const next = [...current];
      next[index] = (((next[index] ?? 0) + delta) % CHARS.length + CHARS.length) % CHARS.length;
      onChange?.(next.map((i) => CHARS[i]).join(""));
      return next;
    });
  };

  return (
    <div
      className={cn("inline-flex select-none gap-1", className)}
      role="listbox"
      aria-label="Character wheel"
    >
      {indices.map((value, index) => (
        <div
          key={index}
          role="option"
          aria-selected
          tabIndex={0}
          className="flex h-12 w-10 cursor-ns-resize items-center justify-center rounded-md border border-line bg-paper font-mono text-xl text-ink outline-none focus-visible:ring-2 focus-visible:ring-accent"
          onWheel={(event) => {
            event.preventDefault();
            momentum.current[index] = (momentum.current[index] ?? 0) + (event.deltaY > 0 ? 1 : -1);
            step(index, event.deltaY > 0 ? 1 : -1);
          }}
          onKeyDown={(event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              step(index, 1);
            }
            if (event.key === "ArrowDown") {
              event.preventDefault();
              step(index, -1);
            }
          }}
        >
          <span
            key={value}
            style={{
              display: "inline-block",
              animation: "openui-wheel-tick 120ms ease-out",
            }}
          >
            {CHARS[value] === " " ? "\u00A0" : CHARS[value]}
          </span>
        </div>
      ))}
      <style>{`@keyframes openui-wheel-tick { 0% { transform: translateY(-0.35em); opacity: 0.4 } 100% { transform: translateY(0); opacity: 1 } }`}</style>
    </div>
  );
}

export default CharacterWheelPicker;
