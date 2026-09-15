import * as React from "react";
import { Link, useSearchParams } from "react-router";

import { Button, EmptyState, SegmentedControl, Skeleton } from "@openui/ui";

import { ResourceTile } from "../components/ResourceTile.js";
import { SectionHeader } from "../components/SectionHeader.js";
import { useCategoryItems } from "../features/resources/use-catalogue.js";
import { CATALOGUE_CATEGORIES, categoryBySlug } from "../lib/registry.js";

/**
 * A catalogue category, e.g. `/themes` or `/motion`.
 *
 * One component serves every category because they differ only in copy and
 * filter — duplicating thirteen near-identical pages is how a catalogue becomes
 * unmaintainable. The category is resolved from the *router path*, not from a
 * query parameter, so each category is a real, linkable route with its own
 * metadata.
 *
 * The DNA filters are generated from what is actually present in this category.
 * A filter for a facet nobody uses would be a ghost control.
 */
export interface CategoryPageProps {
  /** The catalogue slug, injected by the route definition. */
  category: string;
}

export default function CategoryPage({ category }: CategoryPageProps): React.JSX.Element {
  const definition = categoryBySlug(category);
  const { state, items } = useCategoryItems(category);
  const [params, setParams] = useSearchParams();

  const [facet, setFacet] = React.useState<"none" | "genre" | "density" | "shape" | "motion">(
    "none",
  );
  const filterValue = params.get("filter");

  const facets = React.useMemo(() => {
    if (facet === "none") return [];
    const counts = new Map<string, number>();
    for (const item of items) {
      const value = item.dna?.[facet];
      if (value) counts.set(String(value), (counts.get(String(value)) ?? 0) + 1);
    }
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([value, count]) => ({ value, label: `${value} (${count})` }));
  }, [items, facet]);

  const visible = React.useMemo(() => {
    if (!filterValue || facet === "none") return items;
    return items.filter((item) => String(item.dna?.[facet] ?? "") === filterValue);
  }, [items, facet, filterValue]);

  if (!definition) {
    return (
      <div className="shell py-20">
        <EmptyState
          eyebrow="Unknown category"
          title={`There is no “${category}” category.`}
          description="The catalogue taxonomy is fixed. Pick one of the categories listed below."
          action={
            <Button variant="outline" asChild>
              <Link to="/explore">See everything</Link>
            </Button>
          }
        />
      </div>
    );
  }

  const counts = visible.length;

  return (
    <div className="shell py-16">
      <SectionHeader
        as="h1"
        eyebrow={`Catalogue · ${definition.resourceType ?? "system"}`}
        title={definition.title}
        description={definition.description}
        actions={
          <Button variant="ghost" size="sm" asChild>
            <Link to="/explore">All categories</Link>
          </Button>
        }
      />

      <div className="mt-10 flex flex-wrap items-end justify-between gap-6 border-t border-line pt-5">
        <SegmentedControl
          label="Fingerprint dimension"
          value={facet}
          onValueChange={(value) => {
            setFacet(value as typeof facet);
            const next = new URLSearchParams(params);
            next.delete("filter");
            setParams(next, { replace: true });
          }}
          options={[
            { value: "none", label: "All" },
            { value: "genre", label: "Genre" },
            { value: "density", label: "Density" },
            { value: "shape", label: "Shape" },
            { value: "motion", label: "Motion" },
          ]}
        />
        <p className="eyebrow">
          {counts} {counts === 1 ? definition.noun : `${definition.noun}s`}
        </p>
      </div>

      {facet !== "none" && facets.length > 0 ? (
        <div className="mt-5">
          <SegmentedControl
            label={`Filter by ${facet}`}
            value={filterValue ?? "__all__"}
            onValueChange={(value) => {
              const next = new URLSearchParams(params);
              if (value === "__all__") next.delete("filter");
              else next.set("filter", value);
              setParams(next, { replace: true });
            }}
            options={[{ value: "__all__", label: "Any" }, ...facets]}
          />
        </div>
      ) : null}

      {state.isLoading ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }, (_, position) => (
            <Skeleton key={position} lines={5} />
          ))}
        </div>
      ) : state.error ? (
        <EmptyState
          className="mt-10"
          eyebrow="Unavailable"
          title="The registry index could not be loaded."
          description={state.error.message}
        />
      ) : visible.length === 0 ? (
        <EmptyState
          className="mt-10"
          eyebrow="Nothing published"
          title={`No ${definition.noun}s match yet.`}
          description={
            <>
              Nothing in <span className="font-mono text-ink">{definition.title}</span> matches the
              current filter. This category is part of the taxonomy even when empty — clearing the
              filter shows the rest of the catalogue.
            </>
          }
          action={
            <Button
              variant="outline"
              onClick={() => {
                setFacet("none");
                setParams(new URLSearchParams(), { replace: true });
              }}
            >
              Clear filters
            </Button>
          }
        />
      ) : (
        <div className="catalogue-grid mt-10">
          {visible.map((item, position) => (
            <ResourceTile key={item.name} item={item} index={position + 1} />
          ))}
        </div>
      )}

      <nav aria-label="Other categories" className="mt-20 border-t border-line pt-6">
        <p className="eyebrow mb-4">Also in the registry</p>
        <ul className="flex flex-wrap gap-x-6 gap-y-3">
          {CATALOGUE_CATEGORIES.filter((candidate) => candidate.slug !== category).map(
            (candidate) => (
              <li key={candidate.slug}>
                <Link
                  to={`/${candidate.slug}`}
                  className="text-[0.9rem] text-graphite transition-colors duration-fast hover:text-ink"
                >
                  {candidate.title}
                </Link>
              </li>
            ),
          )}
        </ul>
      </nav>
    </div>
  );
}
