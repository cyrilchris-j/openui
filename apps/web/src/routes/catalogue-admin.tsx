import * as React from "react";
import { Link } from "react-router";

import { Badge, Button, EmptyState, Skeleton, StatusPill } from "@openui/ui";
import { formatCount } from "@openui/utils";

import { Section, SectionHeader } from "../components/SectionHeader.js";
import { useDocumentTitle } from "../hooks/use-document-title.js";
import { useRegistryIndex } from "../features/resources/use-catalogue.js";
import { CATALOGUE_CATEGORIES, itemsInCategory } from "../lib/registry.js";

/**
 * The catalogue dashboard.
 *
 * The moderation pages answer "what needs a human decision"; this page answers
 * "is the catalogue healthy" — counts against the published minimums,
 * subcategory coverage, fingerprint coverage and duplicate candidates. It reads
 * only published artifacts, so it needs no authentication and no API: the
 * numbers are the same ones a visitor sees, just organised for maintenance.
 */
const COUNT_MINIMUM = 100;

const COUNTABLE = CATALOGUE_CATEGORIES.filter((category) =>
  [
    "components",
    "text",
    "motion",
    "interactions",
    "backgrounds",
    "layouts",
    "sections",
    "blocks",
  ].includes(category.slug),
);

export default function CatalogueAdminPage(): React.JSX.Element {
  const index = useRegistryIndex();
  useDocumentTitle("Catalogue — Admin — OpenUI");

  const report = React.useMemo(() => {
    if (!index.data) return null;

    const categories = COUNTABLE.map((category) => {
      const items = itemsInCategory(index.data!, category.slug);
      const subcategories = new Map<string, number>();
      let fingerprinted = 0;

      for (const item of items) {
        if (item.subcategory) {
          subcategories.set(item.subcategory, (subcategories.get(item.subcategory) ?? 0) + 1);
        }
        if (item.fingerprint && Object.keys(item.fingerprint).length >= 3) fingerprinted++;
      }

      return {
        ...category,
        count: items.length,
        minimum: COUNT_MINIMUM,
        ok: items.length >= COUNT_MINIMUM,
        subcategories: [...subcategories.entries()].sort((a, b) => b[1] - a[1]),
        subcategoryGaps: items.filter((item) => !item.subcategory).length,
        fingerprintGaps: items.length - fingerprinted,
      };
    });

    const total = categories.reduce((sum, category) => sum + category.count, 0);
    const itemsBySlug = new Map(index.data.items.map((item) => [item.name, item]));

    // Duplicate candidates are computed here from the same signals the CI
    // engine enforces (normalised name + fingerprint axes), as a *diagnostic*:
    // CI blocks publication, this panel is where a maintainer sees what tripped.
    const candidates: Array<{ a: string; b: string; shared: number }> = [];
    const countableItems = index.data.items.filter((item) =>
      categories.some((category) => category.slug === item.category),
    );
    for (let i = 0; i < countableItems.length; i++) {
      for (let j = i + 1; j < countableItems.length; j++) {
        const a = countableItems[i]!;
        const b = countableItems[j]!;
        if (a.category !== b.category) continue;
        const axes = ["interactionModel", "visualModel", "motionModel", "layoutModel", "semanticPurpose"] as const;
        const shared = axes.filter(
          (axis) => a.fingerprint?.[axis] && a.fingerprint[axis] === b.fingerprint?.[axis],
        ).length;
        if (shared >= 3) candidates.push({ a: a.name, b: b.name, shared });
      }
    }

    return {
      categories,
      total,
      metadataGaps: index.data.items.filter(
        (item) =>
          categories.some((category) => category.slug === item.category) &&
          (!item.subcategory || !item.fingerprint),
      ),
      candidates,
      itemsBySlug,
    };
  }, [index.data]);

  if (index.isLoading) {
    return (
      <div className="shell py-10">
        <Skeleton lines={10} />
      </div>
    );
  }

  if (index.error || !report) {
    return (
      <div className="shell py-20">
        <EmptyState
          eyebrow="Unavailable"
          title="The registry index could not be loaded."
          description={index.error?.message ?? "No index."}
        />
      </div>
    );
  }

  const healthy = report.categories.filter((category) => category.ok).length;

  return (
    <div className="py-10">
      <SectionHeader
        eyebrow="Catalogue health"
        title="The 800-resource contract, measured live."
        description="Counts are read from the published registry index — the same artifacts the CLI serves — so this panel cannot drift from what users receive. Categories below their minimum block the build via pnpm validate:catalog; this page is where you see why."
        actions={
          <Button variant="ghost" size="sm" asChild>
            <Link to="/admin">Back to moderation</Link>
          </Button>
        }
      />

      <dl className="mt-10 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
        {[
          ["Total countable resources", formatCount(report.total), "against a minimum of 800"],
          ["Categories at minimum", `${healthy} of ${report.categories.length}`, "100 resources each"],
          ["Missing metadata", formatCount(report.metadataGaps.length), "subcategory or fingerprint absent"],
          ["Duplicate candidates", formatCount(report.candidates.length), "3+ shared fingerprint axes"],
        ].map(([label, value, note]) => (
          <div key={String(label)} className="flex flex-col gap-1 border-t border-line py-5">
            <dt className="eyebrow">{label}</dt>
            <dd className="font-display text-step-4 tracking-tight text-ink">{value}</dd>
            <dd className="text-[0.8rem] text-graphite">{note}</dd>
          </div>
        ))}
      </dl>

      <Section label="Categories" className="mt-14">
        <ul className="flex flex-col">
          {report.categories.map((category) => (
            <li key={category.slug} className="border-b border-line py-5">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <Link
                  to={`/${category.slug}`}
                  className="font-display text-step-2 tracking-tight text-ink transition-colors hover:text-oxide"
                >
                  {category.title}
                </Link>
                <span className="flex items-center gap-3">
                  <span className="font-mono text-[0.85rem] text-ink">
                    {category.count}/{category.minimum}
                  </span>
                  <StatusPill tone={category.ok ? "positive" : "warning"}>
                    {category.ok ? "complete" : "in progress"}
                  </StatusPill>
                </span>
              </div>

              <div
                role="progressbar"
                aria-valuenow={category.count}
                aria-valuemin={0}
                aria-valuemax={category.minimum}
                aria-label={`${category.title} progress to ${category.minimum}`}
                className="mt-3 h-1 w-full bg-ink/[0.06]"
              >
                <div
                  className={category.ok ? "h-full bg-moss" : "h-full bg-oxide"}
                  style={{ width: `${Math.min(100, (category.count / category.minimum) * 100)}%` }}
                />
              </div>

              {category.subcategories.length > 0 ? (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {category.subcategories.map(([name, count]) => (
                    <Badge key={name}>
                      {name} · {count}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="mt-3 text-[0.8rem] text-graphite">No subcategories declared yet.</p>
              )}

              {category.subcategoryGaps > 0 || category.fingerprintGaps > 0 ? (
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-oxide">
                  {category.subcategoryGaps > 0 ? `${category.subcategoryGaps} missing subcategory` : ""}
                  {category.subcategoryGaps > 0 && category.fingerprintGaps > 0 ? " · " : ""}
                  {category.fingerprintGaps > 0 ? `${category.fingerprintGaps} missing fingerprint` : ""}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      </Section>

      {report.candidates.length > 0 ? (
        <Section label="Duplicate candidates" className="mt-14">
          <ul className="flex flex-col">
            {report.candidates.map((candidate) => (
              <li
                key={`${candidate.a}~${candidate.b}`}
                className="flex flex-wrap items-baseline justify-between gap-3 border-b border-line py-4"
              >
                <span className="font-mono text-[0.85rem] text-ink">
                  {candidate.a} ↔ {candidate.b}
                </span>
                <span className="eyebrow">{candidate.shared} shared fingerprint axes</span>
              </li>
            ))}
          </ul>
        </Section>
      ) : (
        <Section label="Duplicate candidates" className="mt-14">
          <p className="flex items-center gap-2 text-[0.9rem] text-graphite">
            <StatusPill tone="positive" bare>
              none
            </StatusPill>
            No two resources share three or more fingerprint axes. The uniqueness engine also checks
            name variants and description similarity at build time.
          </p>
        </Section>
      )}
    </div>
  );
}
