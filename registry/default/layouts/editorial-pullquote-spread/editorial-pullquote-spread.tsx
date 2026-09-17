"use client";

import { cn } from "@/lib/cn";

export interface EditorialPullquoteSpreadProps extends React.HTMLAttributes<HTMLDivElement> {
  quote?: string;
  children?: React.ReactNode;
}

export function EditorialPullquoteSpread({
  quote = "“Interfaces should have a fingerprint; code without character is merely arithmetic.”",
  children,
  className,
  ...props
}: EditorialPullquoteSpreadProps) {
  return (
    <article className={cn("max-w-4xl mx-auto p-8 font-serif text-ink space-y-8", className)} {...props}>
      <blockquote className="text-2xl lg:text-3xl font-bold leading-tight text-accent border-y-2 border-accent py-6 my-8 text-center">
        {quote}
      </blockquote>
      <div className="columns-1 md:columns-2 gap-8 text-sm leading-relaxed text-ink/80 space-y-4">
        {children}
      </div>
    </article>
  );
}
