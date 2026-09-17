"use client";

import { cn } from "@/lib/cn";

export interface BadgePillStatusProps {
  label?: string;
  variant?: "success" | "warning" | "neutral";
  className?: string;
}

export function BadgePillStatus({
  label = "SYSTEM VERIFIED",
  variant = "success",
  className,
}: BadgePillStatusProps) {
  const styles = {
    success: "border-emerald-500/30 bg-emerald-500/10 text-emerald-700",
    warning: "border-amber-500/30 bg-amber-500/10 text-amber-700",
    neutral: "border-line bg-line/20 text-ink",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-xs font-bold",
        styles[variant],
        className
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      <span>{label}</span>
    </span>
  );
}

export default BadgePillStatus;
