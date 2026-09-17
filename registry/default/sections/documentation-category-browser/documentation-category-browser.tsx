"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export interface DocCategory {
  title: string;
  description: string;
  articlesCount: number;
  topics: string[];
}

export interface DocumentationCategoryBrowserProps extends React.HTMLAttributes<HTMLElement> {
  categories?: DocCategory[];
}

const DEFAULT_CATEGORIES: DocCategory[] = [
  {
    title: "Getting Started",
    description: "Install instructions, configuration files, and quickstart boilerplates.",
    articlesCount: 8,
    topics: ["Installation", "CLI Configuration", "Folder Structure", "TypeScript Setup"],
  },
  {
    title: "Registry Architecture",
    description: "Learn how the decentralized schema and registry packaging format operates.",
    articlesCount: 14,
    topics: ["Design DNA Tokens", "Schema Validation", "Materialization", "Air-gapped Installs"],
  },
  {
    title: "Component Primitives",
    description: "Accessibility guidelines, ARIA attributes, and keyboard navigation contracts.",
    articlesCount: 22,
    topics: ["Focus Management", "Reduced Motion", "Screen Readers", "Slots & Polymorphism"],
  },
  {
    title: "Deployment & CI",
    description: "Automate build-time verification with GitHub Actions and edge proxies.",
    articlesCount: 6,
    topics: ["Vercel Integration", "Docker Containers", "S3 Backed Registries", "Version Bumps"],
  },
];

export function DocumentationCategoryBrowser({
  categories = DEFAULT_CATEGORIES,
  className,
  ...props
}: DocumentationCategoryBrowserProps) {
  const [query, setQuery] = React.useState("");

  const filtered = categories.filter((c) =>
    c.title.toLowerCase().includes(query.toLowerCase()) ||
    c.description.toLowerCase().includes(query.toLowerCase()) ||
    c.topics.some((t) => t.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <section className={cn("w-full py-16 px-4 md:px-8 max-w-6xl mx-auto", className)} {...props}>
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-bold">
            Knowledge Base
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mt-1">
            Explore Documentation
          </h2>
        </div>
        <div className="w-full md:w-72">
          <input
            type="text"
            placeholder="Filter guides & topics..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((cat) => (
          <div
            key={cat.title}
            className="p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                {cat.title}
              </h3>
              <span className="text-xs font-mono text-neutral-400">
                {cat.articlesCount} guides
              </span>
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-2">
              {cat.description}
            </p>
            <div className="mt-4 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex flex-wrap gap-2">
              {cat.topics.map((topic) => (
                <span
                  key={topic}
                  className="text-[11px] font-mono px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
