import Editor from "@monaco-editor/react";
import { RotateCcw, Save } from "lucide-react";
import * as React from "react";
import { Link, useSearchParams } from "react-router";

import type { BuiltRegistryItem } from "@openui/types";
import {
  Badge,
  Button,
  EmptyState,
  SegmentedControl,
  Skeleton,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@openui/ui";

import { CodeBlock } from "../components/CodeBlock.js";
import { SectionHeader } from "../components/SectionHeader.js";
import { Sandbox, SandboxSkeleton } from "../features/playground/Sandbox.js";
import { buildSandboxFiles } from "../features/playground/files.js";
import { useRegistryIndex, useRegistryItem } from "../features/resources/use-catalogue.js";
import { categorySegmentFor } from "../components/ResourceTile.js";
import { useDocumentTitle } from "../hooks/use-document-title.js";
import { CATALOGUE_CATEGORIES } from "../lib/registry.js";

/**
 * The playground.
 *
 * Two panes with distinct jobs, and the distinction is the point:
 *
 *  - **Sandpack** answers "what does this do?" It runs the resource in an
 *    isolated sandbox, so a broken or hostile contribution cannot affect this
 *    page. Nothing is edited here.
 *  - **Monaco** answers "what would this look like if I changed it?" The editor
 *    holds a *copy* of the source. Nothing typed here is written anywhere —
 *    which is stated on the page, because a code editor that silently discards
 *    work is a bad surprise.
 *
 * The editor is intentionally *not* wired to the sandbox. A live two-way binding
 * would mean re-bundling on every keystroke, and the bundle is where the latency
 * is; composing the edited source into Sandpack is available as an explicit
 * action instead.
 */
export default function PlaygroundPage(): React.JSX.Element {
  const [params, setParams] = useSearchParams();
  const index = useRegistryIndex();

  const options = React.useMemo(() => {
    if (!index.data) return [];
    return index.data.items
      .filter((item) => item.type !== "registry:ai")
      .map((item) => ({
        name: item.name,
        title: item.title,
        category: item.category,
      }));
  }, [index.data]);

  const selected = params.get("item") ?? options[0]?.name ?? "";
  const item = useRegistryItem(selected);

  const [tab, setTab] = React.useState(params.get("tab") === "code" ? "code" : "preview");
  const [fileOverrides, setFileOverrides] = React.useState<Record<string, string>>({});
  const [activeFile, setActiveFile] = React.useState<string | null>(null);

  useDocumentTitle(item.data ? `${item.data.title} — Playground — OpenUI` : "Playground — OpenUI");

  const sandboxFiles = React.useMemo(() => {
    if (!item.data) return null;
    const base = buildSandboxFiles(item.data);
    // Overrides are applied on top, so "Compose" can push edited source into a
    // fresh sandbox without mutating the resource definition.
    return { ...base, ...fileOverrides };
  }, [item.data, fileOverrides]);

  const editableFiles = React.useMemo(() => {
    if (!item.data) return [];
    return item.data.files.filter(
      (file) => file.path.endsWith(".tsx") || file.path.endsWith(".ts") || file.path.endsWith(".css"),
    );
  }, [item.data]);

  React.useEffect(() => {
    setFileOverrides({});
    setActiveFile(null);
  }, [selected]);

  const currentFile = activeFile ?? editableFiles[0]?.path ?? null;
  const currentSource = React.useMemo(() => {
    if (!item.data || !currentFile) return "";
    if (fileOverrides[`/${currentFile}`] !== undefined) return fileOverrides[`/${currentFile}`]!;
    return item.data.files.find((file) => file.path === currentFile)?.content ?? "";
  }, [item.data, currentFile, fileOverrides]);

  return (
    <div className="shell py-16">
      <SectionHeader
        as="h1"
        eyebrow="Playground"
        title="Run it isolated. Edit it safely."
        description="The preview runs inside a sandboxed iframe with no access to this page or your session. The editor holds a copy of the source — nothing you type is written to disk or to the registry."
      />

      <div className="mt-10 grid gap-8 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-12">
        {/* Resource picker */}
        <aside aria-label="Choose a resource">
          <div className="flex items-baseline justify-between">
            <p className="eyebrow">Resources</p>
            <span className="font-mono text-[10px] text-graphite">{options.length}</span>
          </div>
          <div className="mt-3 max-h-[32rem] overflow-y-auto border-t border-line">
            {index.isLoading ? (
              <Skeleton lines={8} className="pt-4" />
            ) : (
              <ul>
                {options.map((option) => (
                  <li key={option.name} className="border-b border-line">
                    <button
                      type="button"
                      aria-current={option.name === selected ? "true" : undefined}
                      onClick={() => setParams({ item: option.name }, { replace: true })}
                      className={[
                        "flex w-full flex-col items-start gap-0.5 py-2.5 text-left transition-colors duration-fast",
                        option.name === selected ? "text-ink" : "text-graphite hover:text-ink",
                      ].join(" ")}
                    >
                      <span className="text-[0.85rem]">{option.title}</span>
                      <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-graphite/70">
                        {option.category}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </aside>

        {/* Work surface */}
        <div>
          {index.isLoading || item.isLoading ? (
            <SandboxSkeleton />
          ) : item.error ? (
            <EmptyState
              eyebrow="Unavailable"
              title="That resource could not be loaded."
              description={item.error.message}
            />
          ) : !item.data ? (
            <EmptyState
              eyebrow="Nothing selected"
              title="Choose a resource from the index."
              description="Published resources with a demo run here in an isolated sandbox."
            />
          ) : (
            <PlaygroundSurface
              item={item.data}
              tab={tab}
              setTab={setTab}
              sandboxFiles={sandboxFiles}
              editableFiles={editableFiles}
              currentFile={currentFile}
              currentSource={currentSource}
              setActiveFile={setActiveFile}
              onChange={(value) => {
                if (!currentFile || value === undefined) return;
                setFileOverrides((current) => ({ ...current, [`/${currentFile}`]: value }));
              }}
              overridden={Object.keys(fileOverrides).length > 0}
              onReset={() => setFileOverrides({})}
            />
          )}
        </div>
      </div>

      <nav aria-label="Browse by category" className="mt-20 border-t border-line pt-6">
        <p className="eyebrow mb-4">Browse</p>
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

interface SurfaceProps {
  item: BuiltRegistryItem;
  tab: string;
  setTab: (value: string) => void;
  sandboxFiles: Record<string, string> | null;
  editableFiles: BuiltRegistryItem["files"];
  currentFile: string | null;
  currentSource: string;
  setActiveFile: (path: string) => void;
  onChange: (value: string | undefined) => void;
  overridden: boolean;
  onReset: () => void;
}

function PlaygroundSurface({
  item,
  tab,
  setTab,
  sandboxFiles,
  editableFiles,
  currentFile,
  currentSource,
  setActiveFile,
  onChange,
  overridden,
  onReset,
}: SurfaceProps): React.JSX.Element {
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-4">
        <div>
          <h2 className="font-display text-step-2 leading-tight tracking-tight">{item.title}</h2>
          <p className="mt-1 flex flex-wrap items-center gap-2">
            <Link
              to={`/${categorySegmentFor(item.category)}/${item.name}`}
              className="eyebrow transition-colors hover:text-ink"
            >
              {item.name}
            </Link>
            <Badge tone="ink">{item.type.replace("registry:", "")}</Badge>
            {item.license ? <Badge tone="moss">{item.license}</Badge> : null}
          </p>
        </div>
        <SegmentedControl
          label="Mode"
          hideLabel
          value={tab}
          onValueChange={setTab}
          options={[
            { value: "preview", label: "Preview" },
            { value: "code", label: "Edit" },
            { value: "source", label: "Read" },
          ]}
        />
      </div>

      <div className="mt-6">
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="sr-only">
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Edit</TabsTrigger>
            <TabsTrigger value="source">Read</TabsTrigger>
          </TabsList>

          <TabsContent value="preview">
            <React.Suspense fallback={<SandboxSkeleton />}>
              {sandboxFiles ? (
                // The edited filesystem is passed in, so an edit is visible in
                // the preview without the sandbox knowing about the editor.
                <Sandbox item={item} files={sandboxFiles} view="split" />
              ) : (
                <SandboxSkeleton />
              )}
            </React.Suspense>
          </TabsContent>

          <TabsContent value="code">
            <div className="grid gap-4 md:grid-cols-[12rem_minmax(0,1fr)] md:gap-6">
              <nav aria-label="Files" className="border-t border-line md:border-t-0">
                <p className="eyebrow mb-2">Files</p>
                <ul>
                  {editableFiles.map((file) => (
                    <li key={file.path} className="border-b border-line">
                      <button
                        type="button"
                        aria-current={file.path === currentFile ? "true" : undefined}
                        onClick={() => setActiveFile(file.path)}
                        className={[
                          "w-full truncate py-2 text-left font-mono text-[0.72rem] transition-colors duration-fast",
                          file.path === currentFile ? "text-ink" : "text-graphite hover:text-ink",
                        ].join(" ")}
                      >
                        {file.path}
                      </button>
                    </li>
                  ))}
                </ul>

                {overridden ? (
                  <div className="mt-4 flex flex-col gap-2">
                    <Button variant="ghost" size="sm" onClick={onReset}>
                      <RotateCcw aria-hidden className="h-3 w-3" />
                      Reset edits
                    </Button>
                  </div>
                ) : null}
              </nav>

              <div>
                <div className="flex items-center justify-between gap-3 border border-b-0 border-line px-3 py-2">
                  <span className="eyebrow truncate">{currentFile ?? "No file selected"}</span>
                  <span className="flex items-center gap-2">
                    <Save aria-hidden className="h-3 w-3 text-graphite" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-graphite">
                      in memory only
                    </span>
                  </span>
                </div>
                <div className="border border-line" style={{ height: "34rem" }}>
                  {currentFile ? (
                    <Editor
                      height="100%"
                      language={
                        currentFile.endsWith(".css")
                          ? "css"
                          : currentFile.endsWith(".json")
                            ? "json"
                            : "typescript"
                      }
                      theme="vs-dark"
                      value={currentSource}
                      onChange={onChange}
                      options={{
                        minimap: { enabled: false },
                        fontSize: 13,
                        lineNumbers: "on",
                        scrollBeyondLastLine: false,
                        tabSize: 2,
                        fontFamily: '"JetBrains Mono", ui-monospace, monospace',
                        renderLineHighlight: "none",
                        // The editor is a scratchpad, not a repository: turning
                        // off the suggestions that imply persistence keeps the
                        // mental model honest.
                        quickSuggestions: false,
                        occurrencesHighlight: "off",
                      }}
                    />
                  ) : (
                    <p className="p-4 text-[0.85rem] text-graphite">This item ships no source files.</p>
                  )}
                </div>
                <p className="mt-2 text-[0.78rem] leading-relaxed text-graphite">
                  Edits live in this browser tab. To keep them, copy the source into your project —
                  or use the CLI, which writes real files with conflict checking.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="source">
            <div className="flex flex-col gap-6">
              {item.files
                .filter((file) => !file.path.endsWith("registry.json"))
                .map((file) => (
                  <CodeBlock
                    key={file.path}
                    caption={file.path}
                    language={file.path.endsWith(".css") ? "css" : "tsx"}
                    code={file.content}
                    tone="light"
                    showLineNumbers
                    maxLines={30}
                  />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
