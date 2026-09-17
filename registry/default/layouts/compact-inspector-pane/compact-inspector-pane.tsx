"use client";

import { cn } from "@/lib/cn";

export interface CompactInspectorPaneProps extends React.HTMLAttributes<HTMLDivElement> {
  sceneTree?: React.ReactNode;
  viewport?: React.ReactNode;
  inspector?: React.ReactNode;
}

export function CompactInspectorPane({
  sceneTree,
  viewport,
  inspector,
  className,
  ...props
}: CompactInspectorPaneProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-12 min-h-[360px] w-full border border-line rounded-xl overflow-hidden font-mono text-xs", className)} {...props}>
      <div className="md:col-span-3 border-r border-line p-3 bg-surface/30 hidden md:block">{sceneTree}</div>
      <div className="md:col-span-6 p-4 flex items-center justify-center bg-paper">{viewport}</div>
      <div className="md:col-span-3 border-l border-line p-3 bg-surface/30 hidden lg:block">{inspector}</div>
    </div>
  );
}
