"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface SpringToastStackProps {
  className?: string;
}

export function SpringToastStack({ className }: SpringToastStackProps) {
  const [toasts, setToasts] = useState([
    { id: 1, title: "Deployment successful", time: "just now" },
    { id: 2, title: "Registry cache cleared", time: "2m ago" },
    { id: 3, title: "New access key provisioned", time: "5m ago" },
  ]);

  const dismiss = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className={cn("relative h-64 w-full max-w-sm rounded-xl border border-line bg-paper p-6", className)}>
      <div className="relative h-full flex flex-col justify-end">
        {toasts.map((toast, idx) => {
          const revIdx = toasts.length - 1 - idx;
          return (
            <div
              key={toast.id}
              className="absolute inset-x-0 bottom-0 flex items-center justify-between rounded-xl border border-line bg-paper p-4 shadow-lg transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
              style={{
                transform: `translateY(-${revIdx * 14}px) scale(${1 - revIdx * 0.05})`,
                zIndex: idx,
              }}
            >
              <div>
                <p className="text-xs font-semibold text-ink">{toast.title}</p>
                <p className="font-mono text-[10px] text-ink/50">{toast.time}</p>
              </div>
              <button
                type="button"
                onClick={() => dismiss(toast.id)}
                className="font-mono text-xs text-ink/40 hover:text-ink"
              >
                ✕
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SpringToastStack;
