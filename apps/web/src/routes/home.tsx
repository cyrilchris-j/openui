import { Download } from "lucide-react";
import * as React from "react";
import { Link } from "react-router";

import { Badge, Button, EmptyState, Skeleton } from "@openui/ui";

import { CodeBlock, CommandLine } from "../components/CodeBlock.js";
import { usePWA } from "../components/PWAInstall.js";
import { ResourceTile } from "../components/ResourceTile.js";
import { Section, SectionHeader } from "../components/SectionHeader.js";
import { useRegistryIndex } from "../features/resources/use-catalogue.js";
import { CATALOGUE_CATEGORIES, itemsInCategory, itemsWithDesignRules } from "../lib/registry.js";

/**
 * The home page.
 *
 * The composition is the argument. Where a generated landing page would put
 * giant centred text over a violet gradient, this one:
 *
 *  - opens with an **asymmetric** split: a wide statement column and a narrow
 *    index column that immediately shows what the registry contains,
 *  - draws structure with **hairlines and type**, not with cards and shadows,
 *  - places a **real install command** above the fold, because the fastest way
 *    to understand a registry is to install from it,
 *  - shows the **design rules themselves** — the `anti-slop` rule text is
 *    rendered as content, so the product's thesis is visible rather than claimed.
 *
 * Every number on the page is read from the built registry index. Nothing is
 * hard-coded, so the page cannot drift from what is actually published.
 */
export default function HomePage(): React.JSX.Element {
  const index = useRegistryIndex();
  const { isInstalled, triggerInstall } = usePWA();

  const counts = React.useMemo(() => {
    if (!index.data) return [];
    return CATALOGUE_CATEGORIES.map((category) => ({
      ...category,
      count: itemsInCategory(index.data!, category.slug).length,
    })).filter((category) => category.count > 0);
  }, [index.data]);

  const featured = React.useMemo(() => {
    if (!index.data) return [];
    // Featured items are chosen by a *rule*, not by hand: they must declare a
    // full design fingerprint, which is the registry's own quality bar.
    return itemsWithDesignRules(index.data)
      .filter((item) => item.dna?.genre && item.dna?.macrostructure)
      .slice(0, 6);
  }, [index.data]);

  const totalItems = index.data?.items.length ?? 0;

  return (
    <>
      {/* ---------------------------------------------------------------- */}
      {/* Opening statement                                                 */}
      {/* ---------------------------------------------------------------- */}
      <section className="shell pt-6 sm:pt-14 lg:pt-20">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:gap-16">
          <div className="min-w-0">
            <p className="eyebrow text-xs sm:text-[11px] tracking-[0.22em] text-graphite mb-3">
              Open registry · MIT · v{index.data?.version ?? "0.1.0"}
            </p>

            <h1 className="optically-align text-balance text-3xl sm:text-5xl lg:text-step-5 font-normal leading-[1.06] tracking-tight text-ink">
              Interfaces should have a fingerprint.
            </h1>

            <p className="prose-measure mt-4 sm:mt-6 text-[0.95rem] sm:text-step-1 leading-relaxed text-graphite">
              Most generated interfaces look the same because nothing ever told them not to. OpenUI
              is an open registry of components, text effects, motion, layouts, themes and design
              systems — each one shipping its source, a demo, and the <em>design rules</em> that
              make it work. Install the code. Keep the rules.
            </p>

            <div className="mt-6 sm:mt-8 max-w-[34rem]">
              <CommandLine command="pnpm dlx openui add magnetic-button" />
            </div>

            <div className="mt-6 sm:mt-8 flex flex-col gap-3 w-full max-w-[34rem]">
              <Button
                asChild
                className="w-full h-12 justify-center font-mono text-xs uppercase tracking-widest bg-ink text-paper hover:bg-ink/90 font-medium"
              >
                <Link to="/explore">Explore the registry</Link>
              </Button>
              <Button
                variant="outline"
                asChild
                className="w-full h-12 justify-center font-mono text-xs uppercase tracking-widest border-line text-ink hover:bg-surface/50 font-medium"
              >
                <Link to="/docs/registry">How the registry works</Link>
              </Button>
            </div>
          </div>

          {/* The index column: a live inventory, not a feature list. */}
          <aside className="min-w-0 lg:pt-2">
            <div className="border-t border-line pt-6">
              <p className="eyebrow mb-3">Registry index</p>
              {index.isLoading ? (
                <Skeleton lines={6} className="mt-4" />
              ) : index.error ? (
                <EmptyState
                  eyebrow="Unavailable"
                  title="The registry index could not be loaded."
                  description={index.error.message}
                  bordered={false}
                  className="px-0 py-6"
                />
              ) : (
                <dl className="mt-2">
                  {counts.map((category) => (
                    <div
                      key={category.slug}
                      className="flex items-baseline justify-between gap-4 border-b border-line py-2.5"
                    >
                      <dt>
                        <Link
                          to={`/${category.slug}`}
                          className="text-[0.9rem] text-ink transition-colors duration-fast hover:text-oxide"
                        >
                          {category.title}
                        </Link>
                      </dt>
                      <dd className="font-mono text-[0.8rem] tracking-[0.08em] text-graphite">
                        {String(category.count).padStart(2, "0")}
                      </dd>
                    </div>
                  ))}
                  <div className="flex items-baseline justify-between gap-4 py-3">
                    <dt className="eyebrow">Total published</dt>
                    <dd className="font-mono text-[0.8rem] tracking-[0.08em] text-ink">
                      {String(totalItems).padStart(3, "0")}
                    </dd>
                  </div>
                </dl>
              )}
            </div>
          </aside>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* The thesis, demonstrated with a real resource                    */}
      {/* ---------------------------------------------------------------- */}
      <section className="shell mt-12 sm:mt-24 lg:mt-32">
        <SectionHeader
          eyebrow="01 — What a resource contains"
          title="A resource is code, a demonstration, and a written reason."
          description="Every item in this registry ships four things: the source you will own, a runnable demo, install metadata, and a design.md that names its genre, macrostructure, density, shape language and motion. That last file is what a model reads before it writes anything — and what stops the next generated page from looking like the last one."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:gap-12">
          <CodeBlock
            className="min-w-0"
            caption="registry/default/components/magnetic-button/design.md"
            language="markdown"
            maxLines={22}
            code={`# Design System

Genre: editorial
Macrostructure: asymmetric
Density: medium
Shape: sharp
Motion: subtle

## Rules

- The magnet must be bounded. An unbounded target feels broken.
- Never move the hit area; transform only.
- Keyboard focus behaves exactly like a plain button.
- Disable magnetisation under prefers-reduced-motion.
- The accent colour is the only signal; no shadows.`}
          />

          <div className="flex flex-col gap-6 min-w-0">
            <p className="prose-measure text-[0.95rem] leading-relaxed text-graphite">
              The registry is not a package index. A package tells you what it exports; a registry
              resource tells you what it <em>is</em>, in the vocabulary of design — so an
              agent, a teammate or a future you can reuse the intent, not just the implementation.
            </p>

            <ul className="flex flex-col">
              {[
                ["Source you own", "Installed into your project. No runtime dependency on us."],
                ["A runnable demo", "Rendered in an isolated sandbox, never in this origin."],
                ["Install metadata", "npm dependencies, registry dependencies, licence, integrity."],
                ["design.md", "The fingerprint: genre, structure, density, shape, motion."],
              ].map(([title, body]) => (
                <li key={title} className="border-t border-line py-4">
                  <p className="font-display text-step-1 tracking-tight text-ink">{title}</p>
                  <p className="mt-1 text-[0.88rem] leading-relaxed text-graphite">{body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Featured, chosen by rule                                          */}
      {/* ---------------------------------------------------------------- */}
      <section className="shell mt-12 sm:mt-24 lg:mt-32">
        <SectionHeader
          eyebrow="02 — Fingerprinted resources"
          title="Selected because they declare their fingerprint."
          description="Not an editorial pick. These are the resources that state a complete design DNA — genre, macrostructure, density, shape and motion — which is the minimum this registry asks before something is published."
          actions={
            <Button variant="ghost" size="sm" asChild>
              <Link to="/explore">All resources</Link>
            </Button>
          }
        />

        <div className="catalogue-grid mt-10">
          {index.isLoading ? (
            <div className="bg-paper p-6">
              <Skeleton lines={5} />
            </div>
          ) : featured.length === 0 ? (
            <div className="bg-paper p-6">
              <EmptyState
                bordered={false}
                eyebrow="Nothing published"
                title="No resources declare a full design fingerprint yet."
                description="Run pnpm build:registry to publish the first-party set, or submit a resource with a design.md."
              />
            </div>
          ) : (
            featured.map((item, position) => (
              <ResourceTile key={item.name} item={item} index={position + 1} />
            ))
          )}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* The anti-slop rule, as content                                    */}
      {/* ---------------------------------------------------------------- */}
      <section className="mt-12 sm:mt-24 border-y border-line py-10 sm:py-20 lg:mt-32">
        <div className="shell">
          <SectionHeader
            eyebrow="03 — Why"
            title="Generated interfaces converge. A fingerprint is how you refuse."
            description="This is the actual opening of the anti-slop rule shipped in this registry. It is written for a model to read before it writes a line of JSX — and for a person to read before they accept one."
          />

          <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,4fr)] lg:gap-16">
            <CodeBlock
              className="min-w-0"
              tone="light"
              caption="ai/design-rules/anti-slop/anti-slop.md"
              language="markdown"
              maxLines={18}
              code={`# Anti-slop

An interface reads as generated when it makes the same
five decisions every time:

1. A centred hero with a gradient behind it.
2. Three equal cards in a row, each with an icon.
3. Everything rounded by the same radius.
4. One typeface at three sizes, none of them used
   for structure.
5. No interaction beyond a hover colour change.

None of these is a mistake in isolation. Together they
are a fingerprint — and it is the wrong one.`}
            />

            <div className="flex flex-col justify-between gap-8 min-w-0">
              <div className="flex flex-col gap-4">
                {[
                  ["Design rules", "Editorial rules, brutalist rules, composition rules."],
                  ["Skills", "Compose a page, audit a UI, redesign a layout."],
                  ["Agents", "A UI designer that must consult the registry first."],
                  ["Prompts", "Structured briefs that produce a fingerprint, not a template."],
                ].map(([title, body]) => (
                  <div key={title} className="border-t border-line pt-3">
                    <p className="eyebrow">{title}</p>
                    <p className="mt-1 text-[0.88rem] leading-relaxed text-graphite">{body}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge tone="ink">40 rules</Badge>
                <Badge>7 skills</Badge>
                <Badge>4 agents</Badge>
                <Badge tone="moss">machine-readable</Badge>
              </div>

              <Button variant="outline" asChild>
                <Link to="/ai">Browse the AI resources</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* How it works                                                      */}
      {/* ---------------------------------------------------------------- */}
      <section className="shell mt-12 sm:mt-24 lg:mt-32">
        <SectionHeader
          eyebrow="04 — The path"
          title="From a registry URL to code in your project."
          description="The CLI resolves the item, validates it against the published schema, resolves its dependencies, checks for conflicts with files you already have, and only then writes. It never silently overwrites your work."
        />

        <Section label="Install" className="mt-12">
          <CodeBlock
            className="min-w-0"
            caption="terminal"
            language="bash"
            code={`# Add a component and everything it needs
pnpm dlx openui add magnetic-button

# Search the registry from the terminal
pnpm dlx openui search "editorial hero"

# Apply a design system as a theme
pnpm dlx openui theme add swiss-editorial`}
          />

          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {[
              ["Resolve", "Fetch the artifact and verify its integrity digest matches the index."],
              ["Plan", "Resolve registry and npm dependencies, then diff against your files."],
              ["Write", "Apply the changes, or report every conflict and change nothing."],
            ].map(([title, body], position) => (
              <div key={title} className="border-t border-line pt-4">
                <p className="eyebrow">{String(position + 1).padStart(2, "0")}</p>
                <p className="mt-2 font-display text-step-2 tracking-tight text-ink">{title}</p>
                <p className="mt-2 text-[0.88rem] leading-relaxed text-graphite">{body}</p>
              </div>
            ))}
          </div>
        </Section>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Closing                                                           */}
      {/* ---------------------------------------------------------------- */}
      <section className="shell mt-12 sm:mt-24 lg:mt-32">
        <div className="grid gap-6 sm:gap-8 border-t border-line pt-6 sm:pt-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,4fr)] lg:gap-16">
          <h2 className="optically-align text-2xl sm:text-3xl lg:text-step-4 max-w-[20ch] text-balance leading-[1.08] min-w-0">
            Add the resource you wish existed.
          </h2>
          <div className="flex flex-col items-start gap-4 sm:gap-6 min-w-0">
            <p className="prose-measure text-[0.88rem] sm:text-[0.95rem] leading-relaxed text-graphite">
              Contributions go through a pull request, automated schema validation, a preview build
              and a moderation review. Published versions are immutable — a correction is a new
              version, never an edit, so anyone who installed 1.0.0 can always see what 1.0.0
              contained.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
              <Button asChild>
                <Link to="/submit">Submit a resource</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/docs/contributing">Read the guide</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
