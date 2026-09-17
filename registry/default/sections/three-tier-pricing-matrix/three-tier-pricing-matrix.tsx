"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface ThreeTierPricingMatrixProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  subtitle?: string;
}

export function ThreeTierPricingMatrix({
  title = "Transparent, Predictable Plans",
  subtitle = "Start for free with open source components, upgrade for team synchronization.",
  className,
  ...props
}: ThreeTierPricingMatrixProps) {
  const [annual, setAnnual] = useState(true);

  return (
    <section className={cn("py-16 px-6 max-w-5xl mx-auto font-sans bg-paper text-ink", className)} {...props}>
      <div className="text-center max-w-xl mx-auto mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink">{title}</h2>
        <p className="text-xs sm:text-sm text-ink/60 mt-2">{subtitle}</p>
        <div className="inline-flex items-center gap-2 p-1 mt-6 rounded-full border border-line bg-surface text-xs font-mono">
          <button
            type="button"
            onClick={() => setAnnual(false)}
            className={cn("px-3 py-1 rounded-full transition-colors", !annual ? "bg-accent text-white font-bold" : "text-ink/70")}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setAnnual(true)}
            className={cn("px-3 py-1 rounded-full transition-colors", annual ? "bg-accent text-white font-bold" : "text-ink/70")}
          >
            Yearly (Save 20%)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        <div className="p-6 rounded-2xl border border-line bg-paper shadow-xs">
          <div className="font-bold text-sm text-ink">Community</div>
          <div className="text-2xl font-bold font-mono text-ink my-3">$0</div>
          <p className="text-xs text-ink/60 mb-4">Complete 800 open-source resources with MIT license.</p>
          <button type="button" className="w-full py-2 rounded-xl border border-line bg-surface text-xs font-mono font-semibold">Start Free</button>
        </div>

        <div className="p-8 rounded-3xl border-2 border-accent bg-paper shadow-xl relative">
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-accent text-white text-[10px] font-mono font-bold uppercase">
            Recommended
          </span>
          <div className="font-bold text-base text-ink">Pro Architect</div>
          <div className="text-3xl font-bold font-mono text-ink my-3">
            {annual ? "$24" : "$29"}<span className="text-xs font-normal text-ink/60">/mo</span>
          </div>
          <p className="text-xs text-ink/60 mb-6">Automated design token pipelines and private registry hosting.</p>
          <button type="button" className="w-full py-2.5 rounded-xl bg-accent text-white text-xs font-mono font-bold hover:bg-accent/90 shadow-sm">
            Upgrade to Pro
          </button>
        </div>

        <div className="p-6 rounded-2xl border border-line bg-paper shadow-xs">
          <div className="font-bold text-sm text-ink">Enterprise</div>
          <div className="text-2xl font-bold font-mono text-ink my-3">Custom</div>
          <p className="text-xs text-ink/60 mb-4">Dedicated VPC instances and bespoke design DNA governance.</p>
          <button type="button" className="w-full py-2 rounded-xl border border-line bg-surface text-xs font-mono font-semibold">Contact Sales</button>
        </div>
      </div>
    </section>
  );
}
