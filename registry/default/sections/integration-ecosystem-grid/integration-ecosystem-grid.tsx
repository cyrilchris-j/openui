"use client";

import { cn } from "@/lib/cn";

export interface IntegrationEcosystemGridProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
}

export function IntegrationEcosystemGrid({
  title = "Seamless Native Toolchain Integrations",
  className,
  ...props
}: IntegrationEcosystemGridProps) {
  const tools = [
    { name: "Next.js 15+", status: "App Router Native" },
    { name: "Vite 6+", status: "HMR Optimized" },
    { name: "Tailwind CSS", status: "Token Compatible" },
    { name: "Figma Sync", status: "Variables API" },
    { name: "TypeScript", status: "Zero Any Types" },
    { name: "Vitest", status: "100% Suite Pass" },
  ];

  return (
    <section className={cn("py-16 px-6 max-w-5xl mx-auto font-sans bg-paper text-ink text-center", className)} {...props}>
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink mb-10">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {tools.map((t) => (
          <div key={t.name} className="p-4 rounded-xl border border-line bg-surface/30 text-left font-mono">
            <div className="font-bold text-xs text-ink">{t.name}</div>
            <div className="text-[10px] text-accent mt-1">● {t.status}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
