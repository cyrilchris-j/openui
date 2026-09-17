"use client";

import { cn } from "@/lib/cn";

export interface EditorialMagazineGridProps extends React.HTMLAttributes<HTMLDivElement> {
  headline?: React.ReactNode;
  lede?: React.ReactNode;
  story?: React.ReactNode;
  aside?: React.ReactNode;
}

export function EditorialMagazineGrid({
  headline,
  lede,
  story,
  aside,
  className,
  ...props
}: EditorialMagazineGridProps) {
  return (
    <article className={cn("max-w-5xl mx-auto p-6 bg-paper text-ink font-sans", className)} {...props}>
      {headline && <div className="border-b-2 border-ink pb-6 mb-8 font-serif">{headline}</div>}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {lede && <div className="lg:col-span-4 text-base font-serif leading-relaxed text-ink/80 border-l-2 border-accent pl-4">{lede}</div>}
        {story && <div className="lg:col-span-5 text-sm leading-relaxed text-ink/90 font-serif space-y-4">{story}</div>}
        {aside && <aside className="lg:col-span-3 text-xs font-mono text-ink/60 border-t lg:border-t-0 lg:border-l border-line pt-4 lg:pt-0 lg:pl-6">{aside}</aside>}
      </div>
    </article>
  );
}
