"use client";

import { cn } from "@/lib/cn";

export interface CTAConversionBillboardProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  description?: string;
}

export function CTAConversionBillboard({
  title = "Ready to build with architectural character?",
  description = "Access 800 verified, unique React resources. Zero placeholders. Zero runtime baggage.",
  className,
  ...props
}: CTAConversionBillboardProps) {
  return (
    <section className={cn("py-16 px-6 max-w-5xl mx-auto font-sans bg-paper text-ink", className)} {...props}>
      <div className="p-8 sm:p-14 rounded-3xl bg-slate-950 text-white text-center space-y-6 shadow-xl">
        <h2 className="text-2xl sm:text-4xl font-bold tracking-tight max-w-2xl mx-auto">{title}</h2>
        <p className="text-xs sm:text-sm text-white/70 max-w-xl mx-auto leading-relaxed">{description}</p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button type="button" className="px-6 py-3 rounded-xl bg-accent text-white font-mono text-xs font-bold hover:bg-accent/90 transition-transform active:scale-95 shadow-md">
            Start Building Free →
          </button>
          <button type="button" className="px-6 py-3 rounded-xl border border-white/20 bg-white/10 text-white font-mono text-xs font-semibold hover:bg-white/20 transition-colors">
            Read Architectural Guide
          </button>
        </div>
      </div>
    </section>
  );
}
