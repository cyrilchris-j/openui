"use client";

import { cn } from "@/lib/cn";

export interface MinimalistFooterSpreadProps extends React.HTMLAttributes<HTMLElement> {
  brand?: string;
}

export function MinimalistFooterSpread({
  brand = "OPENUI DESIGN REGISTRY",
  className,
  ...props
}: MinimalistFooterSpreadProps) {
  return (
    <footer className={cn("border-t border-line py-12 px-6 max-w-5xl mx-auto font-sans bg-paper text-ink text-xs", className)} {...props}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
        <div>
          <div className="font-mono font-bold text-sm mb-3">{brand}</div>
          <p className="text-ink/60 leading-relaxed">Exact 800-resource master catalogue.</p>
        </div>
        <div>
          <div className="font-bold mb-3 font-mono">Domains</div>
          <div className="space-y-1.5 text-ink/60">
            <div>Components</div>
            <div>Text</div>
            <div>Motion</div>
          </div>
        </div>
        <div>
          <div className="font-bold mb-3 font-mono">Architecture</div>
          <div className="space-y-1.5 text-ink/60">
            <div>Design DNA</div>
            <div>Fingerprints</div>
            <div>Validation</div>
          </div>
        </div>
        <div>
          <div className="font-bold mb-3 font-mono">License</div>
          <div className="space-y-1.5 text-ink/60">
            <div>MIT License</div>
            <div>GitHub Repository</div>
          </div>
        </div>
      </div>
      <div className="pt-6 border-t border-line/60 flex flex-col sm:flex-row justify-between text-[11px] font-mono text-ink/50">
        <span>© 2026 OpenUI Project. Built with mathematical rigor.</span>
        <span className="text-emerald-600 font-semibold">● All Systems Nominal</span>
      </div>
    </footer>
  );
}
