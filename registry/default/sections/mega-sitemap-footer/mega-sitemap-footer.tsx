"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

export interface MegaSitemapFooterProps extends React.HTMLAttributes<HTMLElement> {
  columns?: FooterColumn[];
}

const DEFAULT_COLUMNS: FooterColumn[] = [
  {
    title: "Registry",
    links: [
      { label: "Components (100)", href: "/components" },
      { label: "Text (100)", href: "/text" },
      { label: "Motion (100)", href: "/motion" },
      { label: "Interactions (100)", href: "/interactions" },
    ],
  },
  {
    title: "Architecture",
    links: [
      { label: "Backgrounds (100)", href: "/backgrounds" },
      { label: "Layouts (100)", href: "/layouts" },
      { label: "Sections (100)", href: "/sections" },
      { label: "Blocks (100)", href: "/blocks" },
    ],
  },
  {
    title: "Developers",
    links: [
      { label: "CLI Documentation", href: "/docs" },
      { label: "GitHub Repository", href: "https://github.com/cyrilchris-j/openui" },
      { label: "Discord Community", href: "/community" },
      { label: "System Telemetry", href: "/status" },
    ],
  },
  {
    title: "Legal & Trust",
    links: [
      { label: "MIT License", href: "/license" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Security Disclosures", href: "/security" },
      { label: "SOC2 Compliance", href: "/trust" },
    ],
  },
];

export function MegaSitemapFooter({
  columns = DEFAULT_COLUMNS,
  className,
  ...props
}: MegaSitemapFooterProps) {
  return (
    <footer className={cn("w-full border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 py-16 px-4 md:px-8", className)} {...props}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-12 border-b border-neutral-200 dark:border-neutral-800">
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-400 font-bold mb-4">
                {col.title}
              </h4>
              <ul className="space-y-2.5 text-xs">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
          <div>© {new Date().getFullYear()} OpenUI Open Source Project. MIT Licensed.</div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span>All systems nominal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
