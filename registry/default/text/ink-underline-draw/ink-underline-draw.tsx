"use client";

import { cn } from "@/lib/cn";

export interface InkUnderlineDrawProps {
  children: string;
  href?: string;
  /** Stroke colour. */
  ink?: string;
  className?: string;
}

export function InkUnderlineDraw({ children, href = "#", ink = "#e2624a", className }: InkUnderlineDrawProps) {
  return (
    <a href={href} className={cn("group relative inline-block", className)}>
      <span className="text-ink">{children}</span>
      <svg
        aria-hidden
        className="absolute -bottom-1.5 left-0 w-full"
        height="8"
        viewBox="0 0 100 8"
        preserveAspectRatio="none"
      >
        <path
          d="M1 5 Q 25 2.4 50 4 T 99 3.6"
          fill="none"
          stroke={ink}
          strokeWidth="2.4"
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray={1}
          style={{
            strokeDashoffset: 1,
            transition: "stroke-dashoffset 460ms cubic-bezier(0.2, 0, 0, 1)",
          }}
        />
      </svg>
      <style>{`a:hover svg path, a:focus-visible svg path { stroke-dashoffset: 0 !important } @media (prefers-reduced-motion: reduce) { svg path { transition: none !important; stroke-dashoffset: 0 !important } }`}</style>
    </a>
  );
}

export default InkUnderlineDraw;
