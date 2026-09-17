"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface CodeSnippetBoxProps {
  code?: string;
  className?: string;
}

export function CodeSnippetBox({
  code = "pnpm add @openui/registry-schema",
  className,
}: CodeSnippetBoxProps) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className={cn("flex w-full max-w-sm items-center justify-between rounded-xl border border-line bg-ink text-paper p-3 font-mono text-xs shadow-md", className)}>
      <span className="truncate pr-3">{code}</span>
      <button
        type="button"
        onClick={copy}
        className="rounded bg-paper/20 px-2 py-1 text-[10px] font-bold hover:bg-paper/30 transition-colors"
      >
        {copied ? "COPIED" : "COPY"}
      </button>
    </div>
  );
}

export default CodeSnippetBox;
