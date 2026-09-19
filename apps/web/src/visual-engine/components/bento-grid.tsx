import * as React from "react";
import { SpotlightCard } from "../hover/surface-hover.js";

export interface BentoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  badge?: string;
  colSpan?: 1 | 2 | 3;
  rowSpan?: 1 | 2;
  action?: React.ReactNode;
  graphic?: React.ReactNode;
}

export function BentoCard({
  title,
  description,
  badge,
  colSpan = 1,
  rowSpan = 1,
  action,
  graphic,
  className = "",
  children,
  ...rest
}: BentoCardProps): React.JSX.Element {
  const colClass =
    colSpan === 3
      ? "md:col-span-3"
      : colSpan === 2
      ? "md:col-span-2"
      : "md:col-span-1";

  const rowClass = rowSpan === 2 ? "md:row-span-2" : "md:row-span-1";

  return (
    <SpotlightCard
      className={`group flex flex-col justify-between p-6 sm:p-7 border border-line/30 bg-paper dark:bg-[#141413] rounded-2xl shadow-xs transition-all duration-normal hover:shadow-md hover:border-ink/40 ${colClass} ${rowClass} ${className}`}
      {...rest}
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          {badge && (
            <span className="font-mono text-[10px] uppercase tracking-widest px-2 py-0.5 rounded border border-line/30 bg-surface/50 text-graphite">
              {badge}
            </span>
          )}
          {action}
        </div>
        <h3 className="font-display text-2xl tracking-tight text-ink leading-snug">
          {title}
        </h3>
        <p className="mt-2 text-xs sm:text-[0.85rem] text-graphite leading-relaxed">
          {description}
        </p>
      </div>

      {graphic && <div className="my-4 overflow-hidden rounded-lg">{graphic}</div>}
      {children}
    </SpotlightCard>
  );
}

export interface BentoGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function BentoGrid({
  children,
  className = "",
  ...rest
}: BentoGridProps): React.JSX.Element {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 w-full ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
