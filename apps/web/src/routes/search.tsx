import { Search as SearchIcon, X } from "lucide-react";
import * as React from "react";
import { Link, useSearchParams } from "react-router";

import { Badge, Button, EmptyState, SegmentedControl, Skeleton, StatusPill } from "@openui/ui";

import { DnaStrip } from "../components/DnaStrip.js";
import { SectionHeader } from "../components/SectionHeader.js";
import { useSearch, facetValues } from "../features/search/use-search.js";
import { useRegistryIndex } from "../features/resources/use-catalogue.js";
import { categorySegmentFor } from "../components/ResourceTile.js";
import { useDocumentTitle } from "../hooks/use-document-title.js";
import { CATALOGUE_CATEGORIES } from "../lib/registry.js";

/**
 * Search.
 *
 * The filter rail is generated from the registry index rather than hard-coded, so
 * a facet appears only when something in the registry actually has that value.
 * Facets come from the *index*, not from the current result set, for one
 * specific reason: a count that drops to zero as soon as you filter is a control
 * that erases itself while you use it.
 *
 * The query string is the single source of truth. Every filter, the sort and the
 * page live in the URL, which makes any result a shareable link and makes the
 * browser's Back button behave exactly as a user expects it to.
 */
export default function SearchPage(): React.JSX.Element {
  const [params, setParams] = useSearchParams();
  const search = useSearch({ search: params.toString() });
  const index = useRegistryIndex();

  const query = params.get("q") ?? "";
  const [draft, setDraft] = React.useState(query);

  useDocumentTitle(query ? `Search: ${query} — OpenUI` : "Search — OpenUI Design Registry");

  // Keep the field in step when the URL changes from elsewhere (a tag link,
  // Back, a shared link) without fighting the user's typing.
  React.useEffect(() => setDraft(query), [query]);

  const activeFilters = React.useMemo(
    () =>
      ["type", "category", "tag", "difficulty", "genre", "density", "shape", "motion"].flatMap(
        (key) => params.getAll(key).map((value) => ({ key, value })),
      ),
    [params],
  );

  const update = (mutate: (next: URLSearchParams) => void) => {
    const next = new URLSearchParams(params);
    mutate(next);
    // Any filter change resets pagination; page 4 of a new query is usually empty.
    next.delete("page");
    setParams(next, { replace: true });
  };

  const toggle = (key: string, value: string) => {
    update((next) => {
      const current = next.getAll(key);
      next.delete(key);
      const remaining = current.filter((entry) => entry !== value);
      if (remaining.length === current.length) next.append(key, value);
      for (const entry of remaining) next.append(key, entry);
    });
  };

  const results = search.result?.items ?? [];
  const facets = React.useMemo(() => {
    if (!index.data) return {};
    return {
      type: facetValues(index.data.items, "type"),
      category: facetValues(index.data.items, "category"),
      difficulty: facetValues(index.data.items, "difficulty"),
      genre: facetValues(index.data.items, "genre"),
      density: facetValues(index.data.items, "density"),
      shape: facetValues(index.data.items, "shape"),
      motion: facetValues(index.data.items, "motion"),
    };
  }, [index.data]);

  return (
    <div className="shell py-16">
      <SectionHeader
        as="h1"
        eyebrow="Search"
        title={query ? `Results for “${query}”` : "Search the registry"}
        description="Full-text search over names, descriptions, tags and design fingerprints, with a fuzzy fallback. Every filter is part of the URL, so a result set can be shared or bookmarked."
      />

      <form
        role="search"
        className="mt-10 flex items-end gap-3 border-t border-line pt-6"
        onSubmit={(event) => {
          event.preventDefault();
          update((next) => {
            if (draft.trim()) next.set("q", draft.trim());
            else next.delete("q");
          });
        }}
      >
        <div className="flex flex-1 items-center gap-3 border-b border-line">
          <SearchIcon aria-hidden className="h-4 w-4 text-graphite" />
          <label htmlFor="search-input" className="sr-only">
            Search the registry
          </label>
          <input
            id="search-input"
            type="search"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="editorial hero, magnetic, grain…"
            className="h-11 w-full bg-transparent text-step-1 text-ink placeholder:text-graphite/60 focus:outline-none"
          />
        </div>
        <Button type="submit">Search</Button>
      </form>

      <div className="mt-10 grid gap-12 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-16">
        {/* ---------------------------------------------------------- */}
        {/* Filter rail                                                */}
        {/* ---------------------------------------------------------- */}
        <aside aria-label="Filters">
          <div className="flex items-center justify-between">
            <p className="eyebrow">Filters</p>
            {activeFilters.length > 0 ? (
              <button
                type="button"
                onClick={() => setParams(new URLSearchParams(query ? { q: query } : {}), { replace: true })}
                className="eyebrow flex items-center gap-1 transition-colors hover:text-ink"
              >
                <X aria-hidden className="h-3 w-3" />
                Clear
              </button>
            ) : null}
          </div>

          {activeFilters.length > 0 ? (
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {activeFilters.map((filter) => (
                <li key={`${filter.key}:${filter.value}`}>
                  <button
                    type="button"
                    onClick={() => toggle(filter.key, filter.value)}
                    className="flex items-center gap-1 border border-ink px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink"
                  >
                    {filter.value}
                    <X aria-hidden className="h-2.5 w-2.5" />
                    <span className="sr-only">Remove filter</span>
                  </button>
                </li>
              ))}
            </ul>
          ) : null}

          {(
            [
              ["category", "Category"],
              ["type", "Resource type"],
              ["difficulty", "Difficulty"],
              ["genre", "Genre"],
              ["density", "Density"],
              ["shape", "Shape"],
              ["motion", "Motion"],
            ] as const
          ).map(([key, label]) => {
            const values = facets[key] ?? [];
            if (values.length === 0) return null;
            return (
              <fieldset key={key} className="mt-8 border-t border-line pt-3">
                <legend className="eyebrow">{label}</legend>
                <ul className="mt-2 flex flex-col gap-1">
                  {values.map((value) => {
                    const checked = params.getAll(key).includes(value.value);
                    const id = `${key}-${value.value}`;
                    return (
                      <li key={value.value}>
                        <label
                          htmlFor={id}
                          className="flex cursor-pointer items-baseline justify-between gap-2 py-0.5"
                        >
                          <span className="flex items-baseline gap-2">
                            <input
                              id={id}
                              type="checkbox"
                              checked={checked}
                              onChange={() => toggle(key, value.value)}
                              className="mt-0.5 h-3 w-3 shrink-0 accent-oxide"
                            />
                            <span className="text-[0.82rem] text-graphite">{value.value}</span>
                          </span>
                          <span className="font-mono text-[10px] text-graphite/70">
                            {value.count}
                          </span>
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </fieldset>
            );
          })}
        </aside>

        {/* ---------------------------------------------------------- */}
        {/* Results                                                    */}
        {/* ---------------------------------------------------------- */}
        <div>
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4">
            <p className="eyebrow" role="status" aria-live="polite">
              {search.isLoading
                ? "Searching…"
                : `${search.result?.total ?? 0} ${search.result?.total === 1 ? "result" : "results"}`}
              {search.result ? ` · ${search.result.tookMs}ms` : ""}
            </p>

            <div className="flex items-center gap-3">
              {search.strategy ? (
                <StatusPill tone={search.strategy === "trigram" ? "warning" : "neutral"} bare>
                  {search.strategy === "trigram" ? "fuzzy match" : search.strategy}
                </StatusPill>
              ) : null}
              <SegmentedControl
                label="Sort"
                hideLabel
                value={params.get("sort") ?? "relevance"}
                onValueChange={(value) => update((next) => next.set("sort", value))}
                options={[
                  { value: "relevance", label: "Relevance" },
                  { value: "recent", label: "Recent" },
                  { value: "popular", label: "Popular" },
                  { value: "name", label: "A–Z" },
                ]}
              />
            </div>
          </div>

          {search.error && !search.result ? (
            <EmptyState
              className="mt-8"
              eyebrow="Search unavailable"
              title="The search service could not be reached."
              description={
                <>
                  {search.error.message} The catalogue itself reads published artifacts and is
                  unaffected — browse it directly instead.
                </>
              }
              action={
                <div className="flex gap-2">
                  <Button asChild>
                    <Link to="/explore">Browse the catalogue</Link>
                  </Button>
                  <Button variant="outline" onClick={search.reload}>
                    Try again
                  </Button>
                </div>
              }
            />
          ) : search.isLoading && results.length === 0 ? (
            <div className="mt-8 flex flex-col gap-8">
              {Array.from({ length: 4 }, (_, position) => (
                <Skeleton key={position} lines={4} />
              ))}
            </div>
          ) : results.length === 0 ? (
            <EmptyState
              className="mt-8"
              eyebrow="No results"
              title={query ? `Nothing matches “${query}”.` : "Nothing matches those filters."}
              description="Search covers names, descriptions, tags and design fingerprints. Try a shorter term, or browse a category — the index is small enough to scan."
              action={
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" asChild>
                    <Link to="/explore">Browse everything</Link>
                  </Button>
                  {activeFilters.length > 0 ? (
                    <Button
                      variant="ghost"
                      onClick={() =>
                        setParams(new URLSearchParams(query ? { q: query } : {}), { replace: true })
                      }
                    >
                      Clear filters
                    </Button>
                  ) : null}
                </div>
              }
            />
          ) : (
            <ul className="mt-2">
              {results.map((result) => (
                <li key={result.id} className="border-b border-line">
                  <Link
                    to={`/${categorySegmentFor(result.categorySlug ?? "components")}/${result.slug}`}
                    className="group flex flex-col gap-2 py-6 transition-colors duration-fast ease-editorial hover:bg-ink/[0.02]"
                  >
                    <div className="flex flex-wrap items-baseline gap-3">
                      <span className="eyebrow">{result.resourceType}</span>
                      <h2 className="font-display text-step-2 leading-tight tracking-tight text-ink">
                        {result.title}
                      </h2>
                      {result.difficulty ? <Badge>{result.difficulty}</Badge> : null}
                    </div>
                    <p className="max-w-[68ch] text-[0.9rem] leading-relaxed text-graphite">
                      {result.description}
                    </p>
                    <div className="mt-1 flex flex-wrap items-center gap-x-6 gap-y-2">
                      <DnaStrip
                        dna={
                          result.design
                            ? ({
                                genre: (result.design.genre as any) ?? undefined,
                                macrostructure: (result.design.macrostructure as any) ?? undefined,
                                density: (result.design.density as any) ?? undefined,
                                shapeLanguage: (result.design.shapeLanguage as any) ?? undefined,
                                motionLanguage: (result.design.motionLanguage as any) ?? undefined,
                                typographyStyle: (result.design.typographyStyle as any) ?? undefined,
                              })
                            : undefined
                        }
                      />
                      {result.tags.length > 0 ? (
                        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-graphite/70">
                          {result.tags.slice(0, 4).join(" · ")}
                        </span>
                      ) : null}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {/* Pagination is a plain list of links: crawlable, shareable and
              usable with a keyboard without any JavaScript. */}
          {search.result && search.result.total > search.result.perPage ? (
            <nav aria-label="Pagination" className="mt-8 flex items-center justify-between">
              <Button
                variant="outline"
                disabled={(search.result.page ?? 1) <= 1}
                onClick={() =>
                  update((next) =>
                    next.set("page", String(Math.max(1, (search.result?.page ?? 1) - 1))),
                  )
                }
              >
                Previous
              </Button>
              <p className="eyebrow">
                Page {search.result.page} of{" "}
                {Math.max(1, Math.ceil(search.result.total / search.result.perPage))}
              </p>
              <Button
                variant="outline"
                disabled={!search.result.hasMore}
                onClick={() => update((next) => next.set("page", String((search.result?.page ?? 1) + 1)))}
              >
                Next
              </Button>
            </nav>
          ) : null}

          {search.strategy === "trigram" ? (
            <p className="mt-6 text-[0.8rem] text-graphite">
              No exact matches, so these are fuzzy matches on partial terms. Try spelling the term
              slightly differently for exact results.
            </p>
          ) : null}
        </div>
      </div>

      <nav aria-label="Browse by category" className="mt-20 border-t border-line pt-6">
        <p className="eyebrow mb-4">Not sure what to search for?</p>
        <ul className="flex flex-wrap gap-x-6 gap-y-3">
          {CATALOGUE_CATEGORIES.map((category) => (
            <li key={category.slug}>
              <Link
                to={`/${category.slug}`}
                className="text-[0.9rem] text-graphite transition-colors duration-fast hover:text-ink"
              >
                {category.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
