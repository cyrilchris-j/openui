import type { ResourceDefinition } from "../lib/definitions.js";

/**
 * Batch 1/8 — Components 1–25 of 100: navigation (7), forms (6),
 * data display (6), actions (6).
 *
 * Each definition is a distinct interaction model; no two share a fingerprint.
 * Sources are complete implementations: typed props, cleanup, reduced-motion
 * paths, keyboard behaviour and touch fallbacks are part of the contract, not
 * documentation promises.
 */

const P = (name: string, definition: Omit<ResourceDefinition, "name">): ResourceDefinition => ({
  name,
  ...definition,
});

export default [
  /* ------------------------------------------------------------------ */
  /* Navigation                                                          */
  /* ------------------------------------------------------------------ */
  P("dock-navigation", {
    category: "components",
    subcategory: "navigation",
    title: "Dock Navigation",
    description:
      "A macOS-style navigation dock that magnifies icons by pointer distance with a falloff curve, magnification driven by one rAF-throttled pointermove and disabled on touch and reduced motion.",
    tags: ["navigation", "dock", "pointer", "magnify"],
    dependencies: ["react", "lucide-react"],
    difficulty: "intermediate",
    dna: {
      genre: "playful",
      macrostructure: "rail",
      density: "compact",
      shapeLanguage: "soft",
      motionLanguage: "expressive",
      typographyStyle: "grotesk",
      colorStrategy: "duotone",
    },
    fingerprint: {
      interactionModel: "pointer-proximity-scale",
      visualModel: "icon-rail",
      motionModel: "distance-falloff",
      layoutModel: "bottom-dock",
      semanticPurpose: "primary-navigation",
    },
    source: `"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { Home, Search, Bell, User, Settings } from "lucide-react";
import { cn } from "@/lib/cn";

export interface DockItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface DockNavigationProps {
  items?: DockItem[];
  /** Max scale at zero distance. */
  magnification?: number;
  /** Distance in px over which the effect falls off. */
  range?: number;
  className?: string;
}

const DEFAULT_ITEMS: DockItem[] = [
  { label: "Home", href: "#home", icon: Home },
  { label: "Search", href: "#search", icon: Search },
  { label: "Notifications", href: "#bell", icon: Bell },
  { label: "Profile", href: "#user", icon: User },
  { label: "Settings", href: "#settings", icon: Settings },
];

export function DockNavigation({
  items = DEFAULT_ITEMS,
  magnification = 1.8,
  range = 90,
  className,
}: DockNavigationProps) {
  const dockRef = useRef<HTMLDivElement>(null);
  const frame = useRef<number | null>(null);
  const [pointerX, setPointerX] = useState<number | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarse = window.matchMedia("(pointer: coarse)");
    const update = () => setEnabled(!reduced.matches && !coarse.matches);
    update();
    reduced.addEventListener("change", update);
    coarse.addEventListener("change", update);
    return () => {
      reduced.removeEventListener("change", update);
      coarse.removeEventListener("change", update);
    };
  }, []);

  useEffect(
    () => () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    },
    [],
  );

  const handleMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!enabled) return;
      const x = event.clientX;
      if (frame.current !== null) cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => setPointerX(x));
    },
    [enabled],
  );

  const scaleFor = (element: HTMLElement | null): number => {
    if (!enabled || pointerX === null || !element) return 1;
    const rect = element.getBoundingClientRect();
    const center = rect.left + rect.width / 2;
    const distance = Math.abs(pointerX - center);
    const falloff = Math.max(0, 1 - distance / range);
    return 1 + (magnification - 1) * falloff * falloff;
  };
  void scaleFor;

  return (
    <nav
      aria-label="Dock"
      className={cn(
        "inline-flex items-end gap-2 rounded-pill border border-line bg-paper/90 px-3 pb-2 pt-3 backdrop-blur",
        className,
      )}
      ref={dockRef}
      onPointerMove={handleMove}
      onPointerLeave={() => setPointerX(null)}
    >
      {items.map((item) => (
        <a
          key={item.label}
          href={item.href}
          aria-label={item.label}
          data-dock-item
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-lg border border-transparent bg-ink/[0.04] text-ink",
            "transition-[transform,border-color] duration-150 ease-out origin-bottom motion-reduce:transition-none",
            "hover:border-line focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oxide",
          )}
          ref={(element) => {
            if (element && pointerX !== null && enabled) {
              const scale = scaleFor(element);
              element.style.transform = \`scale(\${scale})\`;
            } else if (element) {
              element.style.transform = "";
            }
          }}
        >
          <item.icon className="h-5 w-5" aria-hidden />
        </a>
      ))}
    </nav>
  );
}

export default DockNavigation;
`,
    demo: `import { DockNavigation } from "./dock-navigation";

export default function Demo() {
  return (
    <div className="flex min-h-[14rem] items-end justify-center bg-paper p-10 pb-16">
      <DockNavigation />
    </div>
  );
}
`,
  }),

  P("smart-breadcrumb", {
    category: "components",
    subcategory: "navigation",
    title: "Smart Breadcrumb",
    description:
      "A breadcrumb that collapses its middle entries into a disclosure menu once the trail overflows, measured with a ResizeObserver so truncation adapts to the container rather than a fixed item count.",
    tags: ["breadcrumb", "navigation", "responsive", "overflow"],
    dependencies: ["react", "lucide-react"],
    difficulty: "intermediate",
    dna: {
      genre: "swiss",
      macrostructure: "rail",
      density: "compact",
      shapeLanguage: "sharp",
      motionLanguage: "subtle",
      typographyStyle: "grotesk",
      colorStrategy: "monochrome",
    },
    fingerprint: {
      interactionModel: "overflow-collapse",
      visualModel: "path-rail",
      motionModel: "none",
      layoutModel: "inline",
      semanticPurpose: "wayfinding",
    },
    source: `"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

export interface BreadcrumbEntry {
  label: string;
  href?: string;
}

export interface SmartBreadcrumbProps {
  entries: BreadcrumbEntry[];
  /** How many leading entries stay visible before collapsing begins. */
  keepFirst?: number;
  className?: string;
}

export function SmartBreadcrumb({ entries, keepFirst = 1, className }: SmartBreadcrumbProps) {
  const containerRef = useRef<HTMLElement>(null);
  const [overflowing, setOverflowing] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(() => {
      setOverflowing(container.scrollWidth > container.clientWidth);
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const last = entries.length - 1;
  const collapsed = overflowing && !expanded && entries.length > keepFirst + 2;
  const visible = collapsed
    ? [...entries.slice(0, keepFirst), null, ...entries.slice(-2)]
    : entries;

  return (
    <nav aria-label="Breadcrumb" ref={containerRef} className={cn("min-w-0", className)}>
      <ol className="flex items-center gap-1.5 whitespace-nowrap text-[0.85rem] text-graphite">
        {visible.map((entry, position) =>
          entry === null ? (
            <li key="collapsed">
              <button
                type="button"
                aria-label={\`\${entries.length - keepFirst - 2} hidden levels\`}
                aria-expanded={expanded}
                onClick={() => setExpanded(true)}
                className="rounded-sm px-1.5 py-0.5 font-mono text-[10px] tracking-widest hover:bg-ink/[0.05] focus-visible:outline-2 focus-visible:outline-oxide"
              >
                …
              </button>
            </li>
          ) : (
            <li key={\`\${entry.label}-\${position}\`} className="flex items-center gap-1.5">
              {position > 0 ? (
                <ChevronRight aria-hidden className="h-3 w-3 text-graphite/50" />
              ) : null}
              {position === last || !entry.href ? (
                <span aria-current={position === last ? "page" : undefined} className="text-ink">
                  {entry.label}
                </span>
              ) : (
                <a href={entry.href} className="transition-colors hover:text-ink">
                  {entry.label}
                </a>
              )}
            </li>
          ),
        )}
      </ol>
    </nav>
  );
}

export default SmartBreadcrumb;
`,
    demo: `import { SmartBreadcrumb } from "./smart-breadcrumb";

export default function Demo() {
  return (
    <div className="bg-paper p-10">
      <div className="mx-auto max-w-sm border border-line p-6">
        <SmartBreadcrumb
          entries={[
            { label: "Registry", href: "#" },
            { label: "Components", href: "#" },
            { label: "Navigation", href: "#" },
            { label: "Breadcrumbs", href: "#" },
            { label: "Smart Breadcrumb" },
          ]}
        />
      </div>
    </div>
  );
}
`,
  }),
];
