"use client";

import { cn } from "@/lib/cn";

export interface SocialProofLogoCloudProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  brands?: string[];
}

export function SocialProofLogoCloud({
  title = "TRUSTED BY LEADING AUTONOMOUS ENGINEERING TEAMS",
  brands = ["DeepMind", "Google AGY", "Vercel", "Supabase", "Linear", "Raycast"],
  className,
  ...props
}: SocialProofLogoCloudProps) {
  return (
    <section className={cn("py-12 px-6 max-w-5xl mx-auto font-sans text-center bg-paper text-ink", className)} {...props}>
      <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-ink/50 mb-8">{title}</p>
      <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 opacity-60">
        {brands.map((brand) => (
          <span key={brand} className="font-mono text-sm font-bold tracking-tight text-ink/80 hover:opacity-100 transition-opacity">
            {brand}
          </span>
        ))}
      </div>
    </section>
  );
}
