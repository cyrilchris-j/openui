"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/cn";

export function CountdownTimerUnit({ className }: { className?: string }) {
  const [secondsLeft, setSecondsLeft] = useState(3600 * 2 + 14 * 60 + 45);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = Math.floor(secondsLeft / 3600);
  const minutes = Math.floor((secondsLeft % 3600) / 60);
  const seconds = secondsLeft % 60;

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className={cn("p-4 rounded-xl border border-line bg-paper max-w-xs w-full font-mono shadow-sm", className)}>
      <div className="text-xs text-ink/60 mb-3 text-center font-semibold uppercase">Event Commences In</div>
      <div className="flex items-center justify-center gap-2">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-lg bg-surface border border-line flex items-center justify-center text-lg font-bold text-ink">
            {pad(hours)}
          </div>
          <span className="text-[10px] text-ink/50 mt-1 uppercase">Hours</span>
        </div>
        <span className="text-ink/40 font-bold mb-4">:</span>
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-lg bg-surface border border-line flex items-center justify-center text-lg font-bold text-ink">
            {pad(minutes)}
          </div>
          <span className="text-[10px] text-ink/50 mt-1 uppercase">Mins</span>
        </div>
        <span className="text-ink/40 font-bold mb-4">:</span>
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-lg bg-surface border border-line flex items-center justify-center text-lg font-bold text-accent">
            {pad(seconds)}
          </div>
          <span className="text-[10px] text-ink/50 mt-1 uppercase">Secs</span>
        </div>
      </div>
    </div>
  );
}
