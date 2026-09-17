"use client";

import { cn } from "@/lib/cn";

export interface TwoColumnSpecsSheetProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  specs?: Array<{ key: string; value: string }>;
}

export function TwoColumnSpecsSheet({
  title = "Technical Specifications",
  specs = [
    { key: "Architecture", value: "x86_64 / ARM64 Unified" },
    { key: "Memory Bandwidth", value: "800 GB/s LPDDR5X" },
    { key: "Thermal Design", value: "35W Passive Radiator" },
  ],
  className,
  ...props
}: TwoColumnSpecsSheetProps) {
  return (
    <div className={cn("max-w-xl mx-auto p-6 rounded-2xl border border-line bg-paper font-mono text-xs shadow-sm", className)} {...props}>
      <div className="font-bold text-sm text-ink mb-4 pb-2 border-b border-line">{title}</div>
      <dl className="divide-y divide-line/60">
        {specs.map((s) => (
          <div key={s.key} className="grid grid-cols-2 py-2">
            <dt className="text-ink/60">{s.key}</dt>
            <dd className="font-semibold text-ink text-right">{s.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
