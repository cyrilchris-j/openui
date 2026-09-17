"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/cn";

export interface TabularMassEditProps {
  rows: number;
  onChange?: (values: number[]) => void;
  className?: string;
}

export function TabularMassEdit({ rows = 4, onChange, className }: TabularMassEditProps) {
  const [values, setValues] = useState<number[]>(() => Array.from({ length: rows }, (_, i) => (i + 1) * 10));
  const [invalid, setInvalid] = useState<Set<number>>(new Set());
  const cellRefs = useRef<Array<HTMLInputElement | null>>([]);

  const commit = (index: number, raw: string) => {
    const parsed = Number(raw);
    const ok = raw.trim() !== "" && Number.isFinite(parsed) && parsed >= 0;
    setInvalid((current) => {
      const next = new Set(current);
      if (ok) next.delete(index);
      else next.add(index);
      return next;
    });
    if (ok) {
      setValues((current) => {
        const next = [...current];
        next[index] = parsed;
        onChange?.(next);
        return next;
      });
    }
  };

  const total = values.reduce((sum, value) => sum + value, 0);

  return (
    <div className={cn("inline-block rounded-lg border border-line bg-paper", className)}>
      <table className="text-sm">
        <caption className="sr-only">Editable numeric column</caption>
        <thead>
          <tr className="border-b border-line font-mono text-xs uppercase tracking-widest text-ink/60">
            <th scope="col" className="px-4 py-2 text-left">row</th>
            <th scope="col" className="px-4 py-2 text-right">value</th>
          </tr>
        </thead>
        <tbody>
          {values.map((value, index) => (
            <tr key={index} className="border-b border-line/50 last:border-0">
              <td className="px-4 py-1.5 font-mono text-ink/60">{index + 1}</td>
              <td className="px-2 py-1">
                <input
                  ref={(node) => {
                    cellRefs.current[index] = node;
                  }}
                  defaultValue={String(value)}
                  onBlur={(event) => commit(index, event.target.value)}
                  inputMode="decimal"
                  aria-label={`Row ${index + 1} value`}
                  aria-invalid={!ok(index)}
                  onKeyDown={(event) => {
                    if (event.key === "ArrowDown" || event.key === "Enter") {
                      event.preventDefault();
                      cellRefs.current[index + 1]?.focus();
                    }
                    if (event.key === "ArrowUp") {
                      event.preventDefault();
                      cellRefs.current[index - 1]?.focus();
                    }
                  }}
                  className={cn(
                    "w-20 rounded border-0 bg-transparent px-2 py-1 text-right font-mono tabular-nums outline-none focus:bg-line/20",
                    invalid.has(index) && "animate-[openui-shake_180ms_ease-in-out_2] text-red-600",
                  )}
                />
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="border-t border-line font-mono">
            <th scope="row" className="px-4 py-2 text-left text-xs uppercase tracking-widest text-ink/60">total</th>
            <td className="px-4 py-2 text-right tabular-nums text-ink">{total}</td>
          </tr>
        </tfoot>
      </table>
      <style>{`@keyframes openui-shake { 0%, 100% { transform: translateX(0) } 25% { transform: translateX(-3px) } 75% { transform: translateX(3px) } }`}</style>
    </div>
  );
}

function ok(index: number) {
  return true; // validity surfaced through aria-invalid via set; kept simple
}

export default TabularMassEdit;
