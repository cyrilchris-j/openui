"use client";

import { useEffect, useId, useState } from "react";

import { cn } from "@/lib/cn";

/**
 * Editorial Navigation
 *
 * A masthead rather than a navbar: a utility strip for secondary links and
 * counts, a ruled wordmark row for identity and primary navigation, and a
 * current-section marker that is a rule, not a pill.
 *
 * Accessibility handled explicitly: a skip link, `aria-expanded` and
 * `aria-controls` on the mobile disclosure, focus returned to the toggle on
 * Escape, and the open panel closing on navigation. The disclosure uses text
 * ("Menu"), because an unlabelled icon is a riddle.
 */

export interface NavLink {
  href: string;
  label: string;
}

export interface EditorialNavigationProps {
  wordmark: React.ReactNode;
  links: readonly NavLink[];
  utilityLinks?: readonly NavLink[];
  currentPath?: string;
  actions?: React.ReactNode;
  className?: string;
}

export function EditorialNavigation({
  wordmark,
  links,
  utilityLinks = [],
  currentPath = "/",
  actions,
  className,
}: EditorialNavigationProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    setOpen(false);
  }, [currentPath]);

  return (
    <header className={cn("border-b border-line bg-paper text-ink", className)}>
      <a
        href="#main"
        className="sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:top-2 focus-visible:left-2 focus-visible:z-50 focus-visible:border focus-visible:border-ink focus-visible:bg-paper focus-visible:px-4 focus-visible:py-2 focus-visible:font-mono focus-visible:text-xs"
      >
        Skip to content
      </a>

      {utilityLinks.length > 0 ? (
        <div className="hidden border-b border-line md:block">
          <div className="mx-auto flex max-w-[96rem] items-center justify-end gap-6 px-6 py-2">
            {utilityLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-mono text-[11px] uppercase tracking-[0.22em] text-graphite transition-colors hover:text-oxide"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      ) : null}

      <div className="mx-auto flex max-w-[96rem] items-center justify-between gap-6 px-6 py-4">
        <a href="/" className="font-[family-name:var(--font-display)] text-xl tracking-tight">
          {wordmark}
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {links.map((link) => {
            const current = isCurrent(link.href, currentPath);
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={current ? "page" : undefined}
                className={cn(
                  "relative py-1 font-mono text-[11px] uppercase tracking-[0.22em] transition-colors",
                  "after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-oxide after:transition-transform hover:after:scale-x-100 motion-reduce:after:transition-none",
                  current ? "text-ink after:scale-x-100" : "text-graphite hover:text-ink",
                )}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          {actions}
          <button
            type="button"
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
            onKeyDown={(event) => {
              if (event.key === "Escape" && open) {
                setOpen(false);
                event.currentTarget.focus();
              }
            }}
            className="border border-ink px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] md:hidden"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      <div id={panelId} hidden={!open} className="border-t border-line md:hidden">
        <nav aria-label="Primary mobile" className="divide-y divide-line">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={isCurrent(link.href, currentPath) ? "page" : undefined}
              className="block px-6 py-4 font-mono text-xs uppercase tracking-[0.2em]"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

function isCurrent(href: string, currentPath: string): boolean {
  if (href === "/") return currentPath === "/";
  return currentPath === href || currentPath.startsWith(`${href}/`);
}

export default EditorialNavigation;
