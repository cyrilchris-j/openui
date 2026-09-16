import { Menu, Search, X } from "lucide-react";
import * as React from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router";

import { cn } from "@openui/ui";

import { CATALOGUE_CATEGORIES } from "../lib/registry.js";
import { useAuth } from "../lib/auth.js";
import { AccountMenu } from "./AccountMenu.js";
import { ThemeToggle } from "./ThemeToggle.js";

/**
 * The masthead.
 *
 * A sticky rule with the wordmark on the left and an index of the catalogue
 * immediately beside it — the navigation is the taxonomy, visible rather than
 * hidden behind a "Products" dropdown. That is the archival device the whole
 * site is built on: you can always see what this registry contains.
 *
 * Small screens do not get the desktop navigation narrowed; they get a
 * full-height index panel, because a horizontal scroller of links is unusable
 * with a thumb.
 */
export function Masthead(): React.JSX.Element {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [term, setTerm] = React.useState("");

  // Any navigation closes the panel; leaving it open over a new page is the
  // single most common mobile-navigation bug.
  React.useEffect(() => setMenuOpen(false), [location.pathname]);

  // Escape closes the panel, and the body is locked while it is open so the
  // page behind does not scroll under a fixed overlay.
  React.useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  return (
    <header className="masthead">
      <div className="shell flex h-14 sm:h-16 items-center gap-3 sm:gap-6">
        <Link
          to="/"
          className="shrink-0 font-display text-xl sm:text-step-2 leading-none tracking-tight text-ink"
        >
          OpenUI
        </Link>

        <nav aria-label="Catalogue" className="hidden flex-1 lg:block">
          <ul className="flex items-center gap-5">
            {CATALOGUE_CATEGORIES.slice(0, 8).map((category) => (
              <li key={category.slug}>
                <NavLink
                  to={`/${category.slug}`}
                  className={({ isActive }) =>
                    cn(
                      "eyebrow whitespace-nowrap transition-colors duration-fast ease-editorial hover:text-ink",
                      isActive && "text-ink",
                    )
                  }
                >
                  {category.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
          <form
            role="search"
            onSubmit={(event) => {
              event.preventDefault();
              const trimmed = term.trim();
              navigate(trimmed ? `/search?q=${encodeURIComponent(trimmed)}` : "/search");
            }}
            className="hidden items-center gap-2 border-b border-line md:flex"
          >
            <Search aria-hidden className="h-3.5 w-3.5 text-graphite" />
            <label htmlFor="masthead-search" className="sr-only">
              Search the registry
            </label>
            <input
              id="masthead-search"
              type="search"
              value={term}
              onChange={(event) => setTerm(event.target.value)}
              placeholder="Search"
              className="h-9 w-32 bg-transparent font-mono text-[11px] tracking-[0.12em] text-ink placeholder:text-graphite/70 focus:w-44 focus:outline-none"
              style={{ transition: "width var(--motion-normal) var(--motion-ease)" }}
            />
          </form>

          <ThemeToggle />
          <AccountMenu />

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-index"
            className="grid h-8 w-8 sm:h-9 sm:w-9 place-items-center border border-line text-graphite transition-colors duration-fast hover:border-ink hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oxide lg:hidden"
          >
            {menuOpen ? (
              <X aria-hidden="true" className="h-4 w-4" />
            ) : (
              <Menu aria-hidden="true" className="h-4 w-4" />
            )}
            <span className="sr-only">{menuOpen ? "Close index" : "Open index"}</span>
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div
          id="mobile-index"
          className="fixed inset-x-0 bottom-0 top-14 sm:top-16 z-30 overflow-y-auto border-t border-line bg-paper lg:hidden"
        >
          <nav aria-label="Catalogue" className="shell py-6">
            <p className="eyebrow mb-4">Index</p>
            <ul className="grid grid-cols-1 sm:grid-cols-2">
              {CATALOGUE_CATEGORIES.map((category) => (
                <li key={category.slug} className="border-b border-line">
                  <NavLink
                    to={`/${category.slug}`}
                    className="flex items-baseline justify-between py-3"
                  >
                    <span className="font-display text-step-2 tracking-tight text-ink">
                      {category.title}
                    </span>
                    <span className="eyebrow">{category.resourceType ?? "system"}</span>
                  </NavLink>
                </li>
              ))}
            </ul>

            <p className="eyebrow mb-3 mt-8">More</p>
            <ul className="flex flex-wrap gap-x-6 gap-y-3">
              {[
                ["/explore", "Explore"],
                ["/playground", "Playground"],
                ["/builder", "Builder"],
                ["/collections", "Collections"],
                ["/contributors", "Contributors"],
                ["/docs", "Docs"],
                ["/submit", "Submit"],
              ].map(([to, label]) => (
                <li key={to}>
                  <Link to={to!} className="eyebrow">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

export { useAuth };
