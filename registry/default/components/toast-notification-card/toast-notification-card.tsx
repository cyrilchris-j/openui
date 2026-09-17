"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface ToastNotificationCardProps {
  message?: string;
  className?: string;
}

export function ToastNotificationCard({
  message = "Registry package index rebuilt successfully.",
  className,
}: ToastNotificationCardProps) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div className={cn("flex w-full max-w-sm items-center justify-between rounded-xl border border-line bg-paper p-4 shadow-lg font-mono text-xs", className)}>
      <div className="flex items-center gap-2 text-ink">
        <span className="text-emerald-600 font-bold">✓</span>
        <span>{message}</span>
      </div>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        className="text-ink/40 hover:text-ink ml-3 font-bold"
      >
        ✕
      </button>
    </div>
  );
}

export default ToastNotificationCard;
