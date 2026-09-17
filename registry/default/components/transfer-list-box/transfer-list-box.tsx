"use client";

import { useState } from "react";
import { ArrowLeftRight, Check, ChevronRight, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/cn";

export interface TransferItem {
  id: string;
  label: string;
}

export interface TransferListBoxProps {
  initialLeft?: TransferItem[];
  initialRight?: TransferItem[];
  className?: string;
}

export function TransferListBox({
  initialLeft = [
    { id: "1", label: "Server US-East-1" },
    { id: "2", label: "Server EU-Central-1" },
    { id: "3", label: "Worker AP-East-2" },
    { id: "4", label: "DB Replica Read-01" },
  ],
  initialRight = [{ id: "5", label: "Edge Proxy Global" }],
  className,
}: TransferListBoxProps) {
  const [left, setLeft] = useState<TransferItem[]>(initialLeft);
  const [right, setRight] = useState<TransferItem[]>(initialRight);
  const [selectedLeft, setSelectedLeft] = useState<string[]>([]);
  const [selectedRight, setSelectedRight] = useState<string[]>([]);

  const moveToRight = () => {
    const moving = left.filter((item) => selectedLeft.includes(item.id));
    setRight((prev) => [...prev, ...moving]);
    setLeft((prev) => prev.filter((item) => !selectedLeft.includes(item.id)));
    setSelectedLeft([]);
  };

  const moveToLeft = () => {
    const moving = right.filter((item) => selectedRight.includes(item.id));
    setLeft((prev) => [...prev, ...moving]);
    setRight((prev) => prev.filter((item) => !selectedRight.includes(item.id)));
    setSelectedRight([]);
  };

  return (
    <div className={cn("flex flex-col sm:flex-row items-center gap-3 p-4 rounded-xl border border-line bg-surface/50 max-w-xl w-full", className)}>
      <div className="flex-1 w-full border border-line rounded-lg p-2 bg-paper">
        <div className="text-xs font-mono text-ink/60 font-semibold mb-2 px-1">Available ({left.length})</div>
        <div className="flex flex-col gap-1 max-h-48 overflow-y-auto">
          {left.map((item) => {
            const isSel = selectedLeft.includes(item.id);
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedLeft((prev) => (isSel ? prev.filter((id) => id !== item.id) : [...prev, item.id]))}
                className={cn(
                  "flex items-center justify-between px-2.5 py-1.5 rounded text-xs text-left transition-colors",
                  isSel ? "bg-accent/15 text-accent font-medium" : "text-ink hover:bg-surface"
                )}
              >
                <span>{item.label}</span>
                {isSel && <Check className="w-3.5 h-3.5" />}
              </button>
            );
          })}
          {left.length === 0 && <div className="text-xs text-ink/40 p-2 text-center">None left</div>}
        </div>
      </div>

      <div className="flex sm:flex-col gap-1.5">
        <button
          type="button"
          onClick={moveToRight}
          disabled={selectedLeft.length === 0}
          className="p-2 rounded border border-line bg-paper disabled:opacity-40 hover:bg-surface text-ink transition-colors"
          aria-label="Move selected right"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={moveToLeft}
          disabled={selectedRight.length === 0}
          className="p-2 rounded border border-line bg-paper disabled:opacity-40 hover:bg-surface text-ink transition-colors"
          aria-label="Move selected left"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 w-full border border-line rounded-lg p-2 bg-paper">
        <div className="text-xs font-mono text-ink/60 font-semibold mb-2 px-1">Assigned ({right.length})</div>
        <div className="flex flex-col gap-1 max-h-48 overflow-y-auto">
          {right.map((item) => {
            const isSel = selectedRight.includes(item.id);
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedRight((prev) => (isSel ? prev.filter((id) => id !== item.id) : [...prev, item.id]))}
                className={cn(
                  "flex items-center justify-between px-2.5 py-1.5 rounded text-xs text-left transition-colors",
                  isSel ? "bg-accent/15 text-accent font-medium" : "text-ink hover:bg-surface"
                )}
              >
                <span>{item.label}</span>
                {isSel && <Check className="w-3.5 h-3.5" />}
              </button>
            );
          })}
          {right.length === 0 && <div className="text-xs text-ink/40 p-2 text-center">None assigned</div>}
        </div>
      </div>
    </div>
  );
}
