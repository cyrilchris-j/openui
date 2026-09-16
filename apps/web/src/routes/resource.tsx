import { BookMarked, Download, ExternalLink, Heart, PackageSearch, ShieldCheck } from "lucide-react";
import * as React from "react";
import { Link, useParams, useSearchParams } from "react-router";

import {
  Badge,
  Button,
  CopyButton,
  EmptyState,
  SegmentedControl,
  Skeleton,
  StatusPill,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@openui/ui";

import { CodeBlock, CommandLine } from "../components/CodeBlock.js";
import { DnaStrip, dnaSummary } from "../components/DnaStrip.js";
import { MetaRow } from "../components/SectionHeader.js";
import { ResourceTile, categorySegmentFor } from "../components/ResourceTile.js";
import { SandboxSkeleton } from "../features/playground/Sandbox.js";
import { useIndexEntry, useRegistryItem, useRelatedItems } from "../features/resources/use-catalogue.js";
import { useAuth } from "../lib/auth.js";
import * as api from "../lib/api.js";
import { useDocumentTitle, useMetaDescription } from "../hooks/use-document-title.js";

/**
 * The sandbox is split out of the main bundle.
 *
 * It carries a bundler (esbuild-wasm) and an editor, which is most of the
 * JavaScript on this site. A visitor who reads the metadata and the install
 * command never downloads it; only opening the preview does.
 */
const Sandbox = React.lazy(() =>
  import("../features/playground/Sandbox.js").then((module) => ({ default: module.Sandbox })),
);

/**
 * The resource page.
 *
 * Seven things in a fixed order, because a developer reads them in a fixed
 * order: what it is, what it looks like, how to install it, what the source is,
 * what it pulls in, what it fingerprints, and what its licence is.
 *
 * Two decisions worth stating:
 *
 *  - **Installation comes before the source.** The primary action is the CLI
 *    command; the source is available but is not the first thing offered, since
 *    copying it by hand is the thing the CLI exists to replace.
 *  - **The preview runs in the isolation sandbox** (see `features/playground`),
 *    not in this document. The `Sandbox` component is loaded lazily, so reading
 *    a page without opening the preview costs nothing.
 */
export default function ResourcePage(): React.JSX.Element {
  const params = useParams<{ category: string; slug: string }>();
  const slug = params.slug ?? "";
  const [searchParams, setSearchParams] = useSearchParams();

  const { entry, state: indexState } = useIndexEntry(slug);
  const itemState = useRegistryItem(slug);
  const related = useRelatedItems(entry);

  const { token, user } = useAuth();
  const [favorited, setFavorited] = React.useState(false);
  const [favoriteError, setFavoriteError] = React.useState<string | null>(null);
  const [favoritePending, setFavoritePending] = React.useState(false);
  const [downloaded, setDownloaded] = React.useState(false);

  const activeTab = searchParams.get("tab") ?? "preview";
  const previewView = searchParams.get("view") === "code" ? "code" : "preview";

  useDocumentTitle(entry ? `${entry.title} — OpenUI Design Registry` : "Resource — OpenUI");
  useMetaDescription(entry?.description);

  // Record the download once, when the page is opened, so the counter measures
  // interest in the resource rather than clicks on a particular button.
  React.useEffect(() => {
    if (!entry || downloaded) return;
    setDownloaded(true);
    void api.recordDownload(entry.name, token).catch(() => {
      // A counter is not worth showing an error for.
    });
  }, [entry, token, downloaded]);

  const toggleFavorite = async () => {
    if (!token) {
      setFavoriteError("Sign in to save a resource to your favourites.");
      return;
    }
    setFavoritePending(true);
    setFavoriteError(null);
    try {
      const result = favorited
        ? await api.unfavorite(slug, token)
        : await api.favorite(slug, token);
      setFavorited(result.favorited);
    } catch (cause) {
      setFavoriteError(cause instanceof Error ? cause.message : "Could not update your favourites.");
    } finally {
      setFavoritePending(false);
    }
  };

  const setTab = (value: string) => {
    const next = new URLSearchParams(searchParams);
    if (value === "preview") next.delete("tab");
    else next.set("tab", value);
    setSearchParams(next, { replace: true });
  };

  if (indexState.isLoading) {
    return (
      <div className="shell grid gap-12 py-16 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)]">
        <Skeleton lines={10} />
        <Skeleton lines={8} />
      </div>
    );
  }

  if (indexState.error) {
    return (
      <div className="shell py-20">
        <EmptyState
          eyebrow="Unavailable"
          title="The registry index could not be loaded."
          description={indexState.error.message}
        />
      </div>
    );
  }

  if (!entry) {
    return (
      <div className="shell py-20">
        <EmptyState
          eyebrow="404 — Not in the registry"
          title={`No resource named “${slug}”.`}
          description="The registry index lists everything currently published. The slug may have changed, or the item may have been deprecated."
          action={
            <Button asChild>
              <Link to="/explore">Browse the catalogue</Link>
            </Button>
          }
        />
      </div>
    );
  }

  const dependencies = entry.dependencies.filter((name) => name !== "react");

  return (
    <article className="pb-16">
      {/* ------------------------------------------------------------ */}
      {/* Header                                                        */}
      {/* ------------------------------------------------------------ */}
      <header className="shell pt-12">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2">
          <Link to="/explore" className="eyebrow transition-colors hover:text-ink">
            Registry
          </Link>
          <span aria-hidden className="text-graphite/50">
            /
          </span>
          <Link
            to={`/${categorySegmentFor(entry.category)}`}
            className="eyebrow transition-colors hover:text-ink"
          >
            {entry.category}
          </Link>
          <span aria-hidden className="text-graphite/50">
            /
          </span>
          <span className="eyebrow text-ink">{entry.name}</span>
        </nav>

        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:gap-16">
          <div>
            <h1 className="optically-align max-w-[20ch] text-balance">{entry.title}</h1>
            <p className="prose-measure mt-6 text-step-1 leading-relaxed text-graphite">
              {entry.description}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              <Badge tone="ink">{entry.type.replace("registry:", "")}</Badge>
              {entry.difficulty ? <Badge>{entry.difficulty}</Badge> : null}
              {entry.license ? <Badge tone="moss">{entry.license}</Badge> : null}
              <StatusPill tone="positive" bare>
                published
              </StatusPill>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-2">
              <Button
                variant={favorited ? "primary" : "outline"}
                onClick={() => void toggleFavorite()}
                loading={favoritePending}
                aria-pressed={favorited}
              >
                <Heart aria-hidden className="h-3.5 w-3.5" />
                {favorited ? "Saved" : "Save"}
              </Button>

              <TooltipProvider delayDuration={400}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" asChild>
                      <Link to={`/playground?item=${entry.name}`}>
                        <PackageSearch aria-hidden className="h-3.5 w-3.5" />
                        Open in playground
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    Edit the source live with the isolated sandbox and a full editor
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <Button variant="ghost" asChild>
                <Link to="/submit">
                  <BookMarked aria-hidden className="h-3.5 w-3.5" />
                  Report a problem
                </Link>
              </Button>
            </div>

            {favoriteError ? (
              <p role="alert" className="mt-3 text-[0.8rem] text-oxide">
                {favoriteError}
              </p>
            ) : null}
            {!user ? (
              <p className="mt-3 text-[0.8rem] text-graphite">
                Saving requires an account. Installing never does.
              </p>
            ) : null}
          </div>

          {/* Metadata rail */}
          <aside>
            <div className="border-t border-line pt-4">
              <p className="eyebrow mb-2">Metadata</p>
              <dl>
                <MetaRow label="Registry name">
                  <span className="font-mono">{entry.namespace}/{entry.name}</span>
                </MetaRow>
                <MetaRow label="Type">
                  <span className="font-mono">{entry.type}</span>
                </MetaRow>
                <MetaRow label="Licence">{entry.license ?? "Not declared"}</MetaRow>
                {entry.designSystem ? (
                  <MetaRow label="Design system">
                    <Link to={`/design-systems/${entry.designSystem}`} className="text-oxide">
                      {entry.designSystem}
                    </Link>
                  </MetaRow>
                ) : null}
                <MetaRow label="Integrity">
                  <span className="break-all font-mono text-[0.72rem]">{entry.integrity}</span>
                </MetaRow>
                <MetaRow label="Fingerprint">
                  <span className="text-graphite">{dnaSummary(entry.dna)}</span>
                </MetaRow>
              </dl>

              {entry.tags.length > 0 ? (
                <>
                  <p className="eyebrow mb-3 mt-6">Tags</p>
                  <ul className="flex flex-wrap gap-1.5">
                    {entry.tags.map((tag) => (
                      <li key={tag}>
                        <Link to={`/search?tag=${encodeURIComponent(tag)}`}>
                          <Badge className="transition-colors hover:border-ink hover:text-ink">
                            {tag}
                          </Badge>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}
            </div>
          </aside>
        </div>
      </header>

      {/* ------------------------------------------------------------ */}
      {/* Tabs                                                          */}
      {/* ------------------------------------------------------------ */}
      <div className="shell mt-16">
        <Tabs value={activeTab} onValueChange={setTab}>
          <TabsList>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="install">Installation</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
            <TabsTrigger value="dependencies">Dependencies</TabsTrigger>
            <TabsTrigger value="design">Design</TabsTrigger>
          </TabsList>

          {/* Preview -------------------------------------------------- */}
          <TabsContent value="preview">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <p className="prose-measure text-[0.9rem] text-graphite">
                The resource runs in an isolated document. Nothing it does can reach this page, your
                session or your files.
              </p>
              <SegmentedControl
                label="Preview mode"
                hideLabel
                value={previewView}
                onValueChange={(value) => {
                  const next = new URLSearchParams(searchParams);
                  if (value === "preview") next.delete("view");
                  else next.set("view", value);
                  setSearchParams(next, { replace: true });
                }}
                options={[
                  { value: "preview", label: "Preview" },
                  { value: "code", label: "Code + preview" },
                ]}
              />
            </div>

            <React.Suspense fallback={<SandboxSkeleton />}>
              {itemState.data ? (
                <Sandbox item={itemState.data} view={previewView === "code" ? "split" : "preview"} />
              ) : itemState.error ? (
                <EmptyState
                  eyebrow="Preview unavailable"
                  title="The built artifact could not be loaded."
                  description={itemState.error.message}
                />
              ) : (
                <SandboxSkeleton />
              )}
            </React.Suspense>
          </TabsContent>

          {/* Installation --------------------------------------------- */}
          <TabsContent value="install">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,4fr)] lg:gap-16">
              <div>
                <h2 className="font-display text-step-3 tracking-tight">Install with the CLI</h2>
                <p className="prose-measure mt-4 text-[0.92rem] leading-relaxed text-graphite">
                  The CLI resolves this item and its registry dependencies, verifies the integrity
                  digest, checks your project for conflicts, and only then writes. It never
                  overwrites a file you have edited without telling you.
                </p>

                <div className="mt-6">
                  <CommandLine command={`openui add ${entry.name}`} />
                </div>

                <h3 className="mt-10 font-display text-step-2 tracking-tight">
                  Add npm dependencies
                </h3>
                {dependencies.length === 0 ? (
                  <p className="mt-3 flex items-center gap-2 text-[0.9rem] text-moss">
                    <ShieldCheck aria-hidden className="h-4 w-4" />
                    This resource has no npm dependencies beyond React.
                  </p>
                ) : (
                  <>
                    <p className="mt-3 text-[0.9rem] text-graphite">
                      The CLI runs this for you. It is shown so you can review it first.
                    </p>
                    <div className="mt-4">
                      <CommandLine
                        command={`pnpm add ${dependencies.join(" ")}`}
                      />
                    </div>
                  </>
                )}

                <h3 className="mt-10 font-display text-step-2 tracking-tight">
                  Or install manually
                </h3>
                <p className="prose-measure mt-3 text-[0.9rem] leading-relaxed text-graphite">
                  Copy the source from the Code tab into your project, then add the npm
                  dependencies above. The source imports <code className="font-mono">@/lib/cn</code>
                  ; the CLI rewrites that alias to match your project's configuration.
                </p>
              </div>

              <aside>
                <div className="border-t border-line pt-4">
                  <p className="eyebrow mb-3">What the CLI does</p>
                  <ol className="flex flex-col">
                    {[
                      "Reads openui.json for your registry and aliases.",
                      "Fetches the artifact and verifies its integrity digest.",
                      "Resolves registry dependencies first, depth-first.",
                      "Diffs every target path against your project.",
                      "Writes only when there is no conflict, or asks.",
                    ].map((step, position) => (
                      <li key={step} className="flex gap-3 border-b border-line py-3">
                        <span className="font-mono text-[10px] tracking-[0.2em] text-graphite">
                          {String(position + 1).padStart(2, "0")}
                        </span>
                        <span className="text-[0.86rem] leading-relaxed text-graphite">{step}</span>
                      </li>
                    ))}
                  </ol>

                  <p className="eyebrow mb-3 mt-6">Registry dependencies</p>
                  {entry.registryDependencies.length === 0 ? (
                    <p className="text-[0.86rem] text-graphite">None.</p>
                  ) : (
                    <ul className="flex flex-wrap gap-1.5">
                      {entry.registryDependencies.map((name) => (
                        <li key={name}>
                          <Link to={`/components/${name}`}>
                            <Badge className="transition-colors hover:border-ink hover:text-ink">
                              {name}
                            </Badge>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </aside>
            </div>
          </TabsContent>

          {/* Code ------------------------------------------------------ */}
          <TabsContent value="code">
            {itemState.data ? (
              <div className="flex flex-col gap-6">
                {itemState.data.files
                  .filter((file) => !file.path.endsWith("registry.json"))
                  .map((file) => (
                    <CodeBlock
                      key={file.path}
                      caption={file.path}
                      language={languageFor(file.path)}
                      code={file.content}
                      showLineNumbers
                      maxLines={40}
                    />
                  ))}
              </div>
            ) : (
              <Skeleton lines={12} />
            )}
          </TabsContent>

          {/* Dependencies --------------------------------------------- */}
          <TabsContent value="dependencies">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
              <div>
                <h2 className="font-display text-step-2 tracking-tight">npm dependencies</h2>
                {dependencies.length === 0 ? (
                  <p className="mt-3 text-[0.9rem] text-graphite">
                    None. This resource depends only on React.
                  </p>
                ) : (
                  <ul className="mt-4">
                    {dependencies.map((name) => (
                      <li
                        key={name}
                        className="flex items-center justify-between border-b border-line py-3"
                      >
                        <span className="font-mono text-[0.85rem] text-ink">{name}</span>
                        <a
                          href={`https://www.npmjs.com/package/${encodeURIComponent(name)}`}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="eyebrow flex items-center gap-1 transition-colors hover:text-ink"
                        >
                          npm
                          <ExternalLink aria-hidden className="h-3 w-3" />
                          <span className="sr-only">(opens in a new tab)</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div>
                <h2 className="font-display text-step-2 tracking-tight">Registry dependencies</h2>
                {entry.registryDependencies.length === 0 ? (
                  <p className="mt-3 text-[0.9rem] text-graphite">
                    None. This resource installs on its own.
                  </p>
                ) : (
                  <p className="mt-3 text-[0.9rem] leading-relaxed text-graphite">
                    These are other registry resources the CLI installs first, in order.
                  </p>
                )}
                <ul className="mt-4">
                  {entry.registryDependencies.map((name) => (
                    <li key={name} className="border-b border-line py-3">
                      <Link
                        to={`/components/${name}`}
                        className="font-mono text-[0.85rem] text-ink transition-colors hover:text-oxide"
                      >
                        {name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </TabsContent>

          {/* Design ---------------------------------------------------- */}
          <TabsContent value="design">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,4fr)] lg:gap-16">
              <div>
                <h2 className="font-display text-step-2 tracking-tight">Design fingerprint</h2>
                <p className="prose-measure mt-3 text-[0.9rem] leading-relaxed text-graphite">
                  Six declared dimensions. They are the vocabulary a model or a teammate uses to
                  decide whether this resource belongs in the interface they are building — before
                  reading any code.
                </p>
                <div className="mt-6">
                  <DnaStrip dna={entry.dna} variant="labelled" />
                </div>
              </div>

              <div>
                <h2 className="font-display text-step-2 tracking-tight">Design rules</h2>
                {itemState.data?.designRules ? (
                  <pre className="code-plate code-plate--light mt-4 max-h-[32rem] overflow-auto whitespace-pre-wrap font-mono text-[0.78rem] leading-relaxed">
                    {itemState.data.designRules}
                  </pre>
                ) : (
                  <p className="mt-3 text-[0.9rem] leading-relaxed text-graphite">
                    This resource does not ship a <code className="font-mono">design.md</code>. That
                    is allowed — but a resource with one is easier to compose and is what the AI
                    resources in this registry read.
                  </p>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* ------------------------------------------------------------ */}
      {/* Related                                                       */}
      {/* ------------------------------------------------------------ */}
      {related.length > 0 ? (
        <section className="shell mt-24">
          <div className="flex items-baseline justify-between gap-4 border-t border-line pt-5">
            <p className="eyebrow">Composes with</p>
            <p className="eyebrow">Shared tags and category</p>
          </div>
          <div className="catalogue-grid mt-8">
            {related.map((candidate, position) => (
              <ResourceTile key={candidate.name} item={candidate} index={position + 1} />
            ))}
          </div>
        </section>
      ) : null}

      {/* Report / licence footer */}
      <div className="shell mt-16">
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
          <p className="flex items-center gap-2 text-[0.8rem] text-graphite">
            <Download aria-hidden className="h-3.5 w-3.5" />
            Integrity <span className="font-mono text-ink">{entry.integrity.slice(0, 24)}…</span>
            <CopyButton value={entry.integrity} label="Copy integrity digest" />
          </p>
          <p className="eyebrow">
            Licence {entry.license ?? "not declared"} · verify before redistribution
          </p>
        </div>
      </div>
    </article>
  );
}

function languageFor(path: string): string {
  if (path.endsWith(".tsx") || path.endsWith(".ts")) return "tsx";
  if (path.endsWith(".css")) return "css";
  if (path.endsWith(".json")) return "json";
  if (path.endsWith(".md")) return "markdown";
  return "text";
}
