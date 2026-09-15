"use client";

import { cn } from "@/lib/cn";

/**
 * Sticky Stack
 *
 * The stacking effect is `position: sticky` plus a per-card offset. No scroll
 * listener, no `requestAnimationFrame`, no transform maths — which means it
 * cannot jank, it works with scroll anchoring, and it degrades to a plain list
 * in browsers without sticky support (there are none left, but the point is the
 * cost model: zero JavaScript per frame).
 *
 * Each card pins at a slightly larger offset so the previous card's edge stays
 * visible — that edge is what makes the stack read as a stack.
 */

export interface StickyStackProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Vertical offset of the first card. */
  offset?: number;
  /** Additional offset per card, in px. */
  step?: number;
  /** Space between cards. */
  gap?: number;
}

export function StickyStack({
  offset = 96,
  step = 14,
  gap = 24,
  className,
  children,
  ...props
}: StickyStackProps) {
  const items = Array.isArray(children) ? children : [children];
  return (
    <div
      className={cn("relative", className)}
      style={{ "--stack-offset": `${offset}px`, "--stack-step": `${step}px`, "--stack-gap": `${gap}px` } as React.CSSProperties}
      {...props}
    >
      {items.map((child, index) => (
        <div
          key={index}
          data-stack-card=""
          style={{ "--stack-index": index, marginBottom: "var(--stack-gap)" } as React.CSSProperties}
        >
          {child}
        </div>
      ))}
      <style>{`[data-stack-card]{position:sticky;top:calc(var(--stack-offset,96px) + var(--stack-index,0) * var(--stack-step,14px))}@media (max-width: 640px){[data-stack-card]{position:relative;top:auto}}@media (prefers-reduced-motion: reduce){[data-stack-card]{position:relative;top:auto}}`}</style>
    </div>
  );
}

export function StickyStackCard({
  label,
  title,
  children,
  className,
}: {
  label?: string;
  title: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <article className={cn("border border-ink bg-paper p-6 shadow-[0_18px_40px_-32px_rgba(16,15,13,0.55)]", className)}>
      {label ? <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em] text-graphite">{label}</p> : null}
      <h3 className="font-[family-name:var(--font-display)] text-2xl leading-tight">{title}</h3>
      {children ? <div className="mt-3 text-sm leading-relaxed text-graphite">{children}</div> : null}
    </article>
  );
}

export default StickyStack;
