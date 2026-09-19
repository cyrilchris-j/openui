import * as React from "react";
import { Link, useParams } from "react-router";
import { Button, EmptyState, Tabs, TabsContent, TabsList, TabsTrigger } from "@openui/ui";

import { CodeBlock } from "../components/CodeBlock.js";
import { SectionHeader } from "../components/SectionHeader.js";
import { getAdvancedItemBySlug, getAdvancedItemsByCategory } from "../advanced/index.js";
import { AdvancedPreview } from "../advanced/renderers/AdvancedPreview.js";

export default function AdvancedDetailPage(): React.JSX.Element {
  const { slug, category } = useParams<{ slug: string; category: string }>();
  const item = slug ? getAdvancedItemBySlug(slug) : undefined;

  const [activeTab, setActiveTab] = React.useState<"preview" | "code" | "install" | "dna">("preview");
  const [viewport, setViewport] = React.useState<"desktop" | "tablet" | "mobile">("desktop");
  const [reducedMotion, setReducedMotion] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  const related = React.useMemo(() => {
    if (!item) return [];
    return getAdvancedItemsByCategory(item.category)
      .filter((other) => other.slug !== item.slug)
      .slice(0, 4);
  }, [item]);

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    setActiveTab("preview");
  }, [slug]);

  if (!item) {
    return (
      <div className="shell py-16">
        <EmptyState
          eyebrow="Resource Not Found"
          title={`No advanced resource found for "${slug}".`}
          description="The requested resource may have moved or does not exist in the Advanced Ecosystem."
          action={
            <Button variant="outline" asChild>
              <Link to="/advanced">Browse Advanced Ecosystem</Link>
            </Button>
          }
        />
      </div>
    );
  }

  const installCommand = `pnpm dlx openui add ${item.slug}`;

  const copyInstall = () => {
    navigator.clipboard?.writeText(installCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="shell py-8 sm:py-16">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center gap-2 font-mono text-[11px] text-graphite">
          <li>
            <Link to="/" className="hover:text-ink">OpenUI</Link>
          </li>
          <li>/</li>
          <li>
            <Link to="/advanced" className="hover:text-ink">Advanced</Link>
          </li>
          <li>/</li>
          <li>
            <Link to={`/advanced?category=${item.category}`} className="hover:text-ink capitalize">
              {item.category}
            </Link>
          </li>
          <li>/</li>
          <li className="text-ink font-medium">{item.title}</li>
        </ol>
      </nav>

      {/* Header */}
      <SectionHeader
        as="h1"
        eyebrow={`Advanced · ${item.category} · ${item.technology}`}
        title={item.title}
        description={item.description}
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" size="sm" onClick={copyInstall}>
              {copied ? "Copied Command!" : "Copy Install Command"}
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link to={`/playground?advanced=${item.slug}`}>Open in Playground</Link>
            </Button>
          </div>
        }
      />

      {/* Main Stage & Tabs */}
      <div className="mt-8">
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line pb-3">
            <TabsList>
              <TabsTrigger value="preview">Live Preview</TabsTrigger>
              <TabsTrigger value="code">Source Code</TabsTrigger>
              <TabsTrigger value="install">Install & Spec</TabsTrigger>
              <TabsTrigger value="dna">Design DNA</TabsTrigger>
            </TabsList>

            {/* Viewport & Accessibility Toggles */}
            {activeTab === "preview" && (
              <div className="flex items-center gap-3">
                {/* Viewport Width */}
                <div className="flex items-center border border-line rounded-md p-0.5 bg-surface/30">
                  <button
                    type="button"
                    onClick={() => setViewport("desktop")}
                    className={`px-2 py-1 text-[10px] font-mono rounded transition-colors ${
                      viewport === "desktop" ? "bg-paper text-ink shadow-xs" : "text-graphite hover:text-ink"
                    }`}
                    title="Desktop (100%)"
                  >
                    Desktop
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewport("tablet")}
                    className={`px-2 py-1 text-[10px] font-mono rounded transition-colors ${
                      viewport === "tablet" ? "bg-paper text-ink shadow-xs" : "text-graphite hover:text-ink"
                    }`}
                    title="Tablet (768px)"
                  >
                    Tablet
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewport("mobile")}
                    className={`px-2 py-1 text-[10px] font-mono rounded transition-colors ${
                      viewport === "mobile" ? "bg-paper text-ink shadow-xs" : "text-graphite hover:text-ink"
                    }`}
                    title="Mobile (375px)"
                  >
                    Mobile
                  </button>
                </div>

                {/* Reduced Motion Toggle */}
                <button
                  type="button"
                  onClick={() => setReducedMotion(!reducedMotion)}
                  className={`px-2.5 py-1 text-[10px] font-mono border rounded-md transition-colors ${
                    reducedMotion
                      ? "bg-moss/20 border-moss text-moss font-semibold"
                      : "border-line text-graphite hover:text-ink"
                  }`}
                >
                  {reducedMotion ? "Reduced Motion: On" : "Reduced Motion: Off"}
                </button>
              </div>
            )}
          </div>

          {/* Preview Tab */}
          <TabsContent value="preview" className="mt-6">
            <div className="flex justify-center w-full">
              <div
                className={`w-full transition-all duration-normal border border-line rounded-xl overflow-hidden bg-surface/20 shadow-xs ${
                  viewport === "tablet" ? "max-w-[768px]" : viewport === "mobile" ? "max-w-[375px]" : "max-w-full"
                }`}
              >
                <div
                  key={`${item.slug}-${viewport}`}
                  className="h-[360px] sm:h-[480px] w-full flex items-center justify-center relative"
                >
                  <AdvancedPreview item={item} reducedMotion={reducedMotion} />
                </div>

                <div className="border-t border-line/40 bg-paper/60 px-4 py-2.5 flex items-center justify-between text-[11px] font-mono text-graphite">
                  <span>Technology: {item.technology}</span>
                  <span>Performance: {item.fingerprint.performanceTier}</span>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Source Code Tab */}
          <TabsContent value="code" className="mt-6">
            <CodeBlock
              caption={`openui/${item.category}/${item.slug}.tsx`}
              language="tsx"
              code={item.sourceCode}
            />
          </TabsContent>

          {/* Installation Tab */}
          <TabsContent value="install" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="flex flex-col gap-4">
                <h3 className="font-display font-semibold text-base text-ink">Installation</h3>
                <CodeBlock
                  caption="terminal"
                  language="bash"
                  code={`# Install with OpenUI CLI\n${installCommand}\n\n# Peer dependencies\npnpm add ${item.dependencies.join(" ")}`}
                />
              </div>

              <div className="flex flex-col gap-4">
                <h3 className="font-display font-semibold text-base text-ink">Declared Properties</h3>
                <div className="border border-line rounded-lg overflow-hidden bg-paper">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-surface/50 border-b border-line text-[10px] text-graphite uppercase">
                      <tr>
                        <th className="p-3">Prop</th>
                        <th className="p-3">Type</th>
                        <th className="p-3">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-line/30">
                      {item.props?.map((prop) => (
                        <tr key={prop.name}>
                          <td className="p-3 font-semibold text-ink">{prop.name}</td>
                          <td className="p-3 text-graphite">{prop.type}</td>
                          <td className="p-3 text-ink/80">{prop.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Design DNA Tab */}
          <TabsContent value="dna" className="mt-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                ["Visual Family", item.fingerprint.visualFamily, "Harmonious visual treatment calibrated for editorial and technical interfaces."],
                ["Motion Profile", item.fingerprint.motionProfile, "Dynamic spring response and duration curve configuration."],
                ["Interaction Profile", item.fingerprint.interactionProfile, "Hardware pointer and tactile input model."],
                ["Performance Tier", item.fingerprint.performanceTier, "GPU frame budget and offscreen pause management."],
                ["Accessibility", item.fingerprint.accessibilityProfile, "WCAG AA semantic markup, keyboard focus, and screen-reader support."],
                ["Responsive Profile", item.fingerprint.responsiveProfile, "Fluid adaptations for desktop, tablet, and touch screens."],
              ].map(([title, val, desc]) => (
                <div key={title} className="p-4 border border-line rounded-lg bg-paper">
                  <span className="font-mono text-[10px] text-graphite uppercase tracking-wider">{title}</span>
                  <p className="mt-1 font-display font-medium text-ink text-sm capitalize">{val}</p>
                  <p className="mt-1 text-[11px] text-graphite leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Resources */}
      {related.length > 0 && (
        <section className="mt-16 sm:mt-24 border-t border-line pt-8">
          <SectionHeader
            eyebrow={`Related · ${item.category}`}
            title="More in this collection"
            description="Explore companion resources engineered within the same creative family."
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-8">
            {related.map((other) => (
              <Link
                key={other.slug}
                to={`/advanced/${other.category}/${other.slug}`}
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "instant" });
                }}
                className="group block border border-line bg-paper rounded-lg p-4 transition-all duration-fast hover:border-ink/80 hover:shadow-md cursor-pointer select-none active:scale-[0.98]"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9px] text-graphite uppercase tracking-wider group-hover:text-oxide transition-colors">
                    {other.technology}
                  </span>
                  <span className="font-mono text-xs text-graphite/60 group-hover:text-oxide group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
                    ↗
                  </span>
                </div>
                <h4 className="mt-1.5 font-display font-medium text-ink text-sm group-hover:text-oxide transition-colors">
                  {other.title}
                </h4>
                <p className="mt-1 text-[11px] text-graphite line-clamp-2 leading-relaxed">
                  {other.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
