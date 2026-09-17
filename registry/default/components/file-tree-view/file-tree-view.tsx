"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface FileTreeViewProps {
  className?: string;
}

export function FileTreeView({ className }: FileTreeViewProps) {
  const [open, setOpen] = useState(true);

  return (
    <div className={cn("w-full max-w-xs rounded-xl border border-line bg-paper p-4 font-mono text-xs shadow-sm", className)}>
      <span className="text-ink/60 uppercase mb-3 block text-[10px]">WORKSPACE TREE</span>
      <div className="space-y-1">
        <div
          onClick={() => setOpen((o) => !o)}
          className="flex items-center gap-1.5 cursor-pointer text-ink font-bold hover:text-black"
        >
          <span>{open ? "▾" : "▸"}</span>
          <span>📁 packages/</span>
        </div>
        {open && (
          <div className="ml-4 border-l border-line pl-3 space-y-1 text-ink/70">
            <div>📄 registry-schema/</div>
            <div>📄 search/</div>
            <div>📄 types/</div>
          </div>
        )}
        <div className="pl-4 text-ink/70">📄 package.json</div>
      </div>
    </div>
  );
}

export default FileTreeView;
