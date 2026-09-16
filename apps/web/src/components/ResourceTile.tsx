import { ArrowUpRight } from "lucide-react";
import * as React from "react";
import { Link } from "react-router";

import type { RegistryIndexEntry } from "@openui/types";
import { cn } from "@openui/ui";

import { DnaStrip } from "./DnaStrip.js";

/**
 * A catalogue tile.
 *
 * Square, hairline-bordered, and part of a 1px-gap grid so the tiles read as
 * cells of one plate rather than as separate floating cards — the grid's own
 * rules do the separating.
 *
 * The whole tile is a link, and the link wraps the *heading* rather than the
 * tile: this keeps one tab stop per tile, keeps the target size large, and keeps
 * the accessible name equal to the resource title. A tile that contains three
 * links plus a favourite button is four tab stops for one destination.
 */
export interface ResourceTileProps {
  item: RegistryIndexEntry;
  /** Catalogue position, rendered as a monospace index. */
  index?: number;
  className?: string;
}

export function ResourceTile({ item, index, className }: ResourceTileProps): React.JSX.Element {
  const href = `/${categorySegmentFor(item.category)}/${item.name}`;
  const dependencies = item.dependencies.filter((name) => name !== "react");

  return (
    <article
      className={cn(
        "group relative flex flex-col bg-paper p-4 sm:p-5",
        "transition-colors duration-fast ease-editorial hover:bg-ink/[0.02]",
        "focus-within:bg-ink/[0.02]",
        className,
      )}
    >
      {index !== undefined ? (
        <span
          aria-hidden
          className="absolute right-3.5 top-3.5 sm:right-4 sm:top-4 font-mono text-[10px] tracking-[0.2em] text-graphite"
        >
          {String(index).padStart(2, "0")}
        </span>
      ) : null}

      <div className="flex items-center gap-2">
        <span className="eyebrow text-[10px] sm:text-[11px]">{item.type.replace("registry:", "")}</span>
        {item.license ? (
          <>
            <span aria-hidden className="text-graphite/50">
              ·
            </span>
            <span className="eyebrow text-[10px] sm:text-[11px]">{item.license}</span>
          </>
        ) : null}
      </div>

      <h3 className="mt-2.5 sm:mt-3 max-w-[22ch] font-display text-xl sm:text-step-2 leading-tight sm:leading-[1.1] tracking-tight text-ink">
        <Link
          to={href}
          className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
        >
          {item.title}
        </Link>
      </h3>

      <p className="mt-2 sm:mt-3 max-w-[42ch] text-[0.82rem] sm:text-[0.88rem] leading-relaxed text-graphite line-clamp-2 sm:line-clamp-none">
        {item.description}
      </p>

      <div className="mt-auto pt-4 sm:pt-6">
        <DnaStrip dna={item.dna} />
        <div className="mt-2.5 sm:mt-3 flex items-center justify-between gap-3">
          <p className="font-mono text-[9.5px] sm:text-[10px] uppercase tracking-[0.14em] text-graphite truncate">
            {dependencies.length === 0 ? "zero dependencies" : dependencies.length === 1 ? dependencies[0] : `${dependencies.length} deps`}
          </p>
          <span className="flex items-center gap-1 font-mono text-[9.5px] sm:text-[10px] uppercase tracking-[0.14em] text-graphite transition-colors duration-fast group-hover:text-oxide shrink-0">
            Open
            <ArrowUpRight aria-hidden className="h-3 w-3" />
          </span>
        </div>
      </div>
    </article>
  );
}

/**
 * The URL segment for a catalogue category, derived from the category name the
 * build normalised.
 */
export function categorySegmentFor(category: string): string {
  const known = new Set([
    "components",
    "text",
    "motion",
    "interactions",
    "backgrounds",
    "layouts",
    "sections",
    "blocks",
    "themes",
    "patterns",
    "templates",
    "design-systems",
    "ai",
  ]);
  return known.has(category) ? category : "components";
}

/** A compact row used in lists (search results, collections) rather than tiles. */
export function ResourceRow({ item }: { item: RegistryIndexEntry }): React.JSX.Element {
  return (
    <li className="group relative border-b border-line">
      <Link
        to={`/${categorySegmentFor(item.category)}/${item.name}`}
        className="flex flex-col gap-1 py-4 transition-colors duration-fast ease-editorial hover:bg-ink/[0.02] sm:flex-row sm:items-baseline sm:gap-6"
      >
        <span className="eyebrow w-[7.5rem] shrink-0">{item.type.replace("registry:", "")}</span>
        <span className="font-display text-step-1 tracking-tight text-ink">{item.title}</span>
        <span className="hidden flex-1 truncate text-[0.85rem] text-graphite md:block">
          {item.description}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-graphite">
          {item.tags.slice(0, 2).join(" · ")}
        </span>
      </Link>
    </li>
  );
}
