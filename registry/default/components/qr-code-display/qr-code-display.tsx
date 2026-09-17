"use client";

import { useState } from "react";
import { QrCode, Copy, Check } from "lucide-react";
import { cn } from "@/lib/cn";

export function QrCodeDisplay({ className }: { className?: string }) {
  const [copied, setCopied] = useState(false);
  const targetUrl = "https://openui.design/r/qr-code-display";

  const copy = () => {
    navigator.clipboard.writeText(targetUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className={cn("p-4 rounded-xl border border-line bg-paper max-w-xs w-full flex flex-col items-center font-sans shadow-sm", className)}>
      <div className="p-3 bg-white rounded-lg border border-line/60 shadow-xs mb-3">
        <div className="w-32 h-32 grid grid-cols-6 gap-1 bg-black p-2 rounded">
          {Array.from({ length: 36 }).map((_, i) => (
            <div
              key={i}
              className={cn(
                "rounded-[1px]",
                (i % 2 === 0 || i % 5 === 0) && i !== 14 ? "bg-white" : "bg-black"
              )}
            />
          ))}
        </div>
      </div>

      <div className="text-xs font-semibold text-ink mb-1">Scan with Camera</div>
      <div className="text-[11px] font-mono text-ink/50 mb-3 text-center truncate max-w-[200px]">{targetUrl}</div>

      <button
        type="button"
        onClick={copy}
        className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg border border-line bg-surface hover:bg-line/40 text-xs font-mono text-ink transition-colors"
      >
        {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
        <span>{copied ? "Link Copied!" : "Copy URL"}</span>
      </button>
    </div>
  );
}
