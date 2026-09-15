import { SandpackCodeEditor, SandpackPreview, SandpackProvider } from "@codesandbox/sandpack-react";
import * as React from "react";

import type { BuiltRegistryItem } from "@openui/types";
import { EmptyState, Skeleton } from "@openui/ui";

import { buildSandboxFiles } from "./files.js";

/**
 * The isolated preview sandbox.
 *
 * **Registry source is untrusted code, and it is treated as such.** It is never
 * imported into this application's origin, never evaluated in a worker, and
 * never injected as HTML. It runs inside Sandpack's sandboxed `iframe`, which
 * means:
 *
 *  - it cannot read this origin's `localStorage`, cookies or DOM,
 *  - it cannot fetch this application's authenticated API with the user's token,
 *  - a resource that throws, loops or renders nothing fails inside its own frame
 *    rather than taking the page down.
 *
 * The consequence a visitor should notice: the preview area is a real, separate
 * document. That is why it is safe to preview third-party contributions here at
 * all, and why the alternative — a dynamic `import()` of the source — is
 * deliberately not used.
 *
 * Sandpack is loaded eagerly by this module and this module is loaded lazily by
 * the route, so a visitor who only reads the documentation never downloads the
 * bundler.
 */
export interface SandboxProps {
  item: BuiltRegistryItem;
  /** Which pane to show. `code` is editable; `preview` is read-only output. */
  view?: "preview" | "code" | "split";
  /**
   * Precomputed filesystem, for the playground.
   *
   * Passed in rather than rebuilt here so an edited copy of the source can be
   * previewed without this component needing to know that editing exists.
   */
  files?: Record<string, string>;
  className?: string;
}

export function Sandbox({ item, view = "split", files: provided, className }: SandboxProps): React.JSX.Element {
  const computed = React.useMemo(() => buildSandboxFiles(item), [item]);
  const files = provided ?? computed;

  if (!files["/App.tsx"]) {
    return (
      <EmptyState
        eyebrow="No demo"
        title="This resource ships no runnable demo."
        description="A preview needs an entry file. The source is still available in the Code tab, and can be installed with the CLI."
        className={className}
      />
    );
  }

  return (
    <div className={className}>
      <SandpackProvider
        template="react-ts"
        theme={sandpackTheme}
        files={files}
        options={{
          // Tailwind is loaded from its CDN inside the sandbox, not from this
          // origin. Registry source is styled with utility classes, so without
          // this the preview would render unstyled rather than incorrectly.
          externalResources: [TAILWIND_CDN],
          autorun: true,
          recompileMode: "delayed",
          recompileDelay: 400,
        }}
      >
        <div className="grid grid-rows-[minmax(20rem,1fr)] border border-line">
          {view !== "code" ? (
            <SandpackPreview
              showOpenInCodeSandbox={false}
              showRefreshButton
              style={{ height: view === "split" ? "22rem" : "32rem" }}
            />
          ) : null}
          {view !== "preview" ? (
            <SandpackCodeEditor
              showLineNumbers
              showTabs
              style={{ height: view === "split" ? "24rem" : "34rem" }}
            />
          ) : null}
        </div>
      </SandpackProvider>

      <p className="mt-3 flex items-start gap-2 text-[0.78rem] leading-relaxed text-graphite">
        <span aria-hidden className="mt-[0.35rem] h-1.5 w-1.5 shrink-0 rounded-pill bg-moss" />
        Running in an isolated sandbox. The preview has no access to this page, your session or your
        files.
      </p>
    </div>
  );
}

/** Lazily loaded by routes so the bundler stays out of the critical path. */
export function SandboxSkeleton(): React.JSX.Element {
  return (
    <div className="border border-line p-6">
      <Skeleton lines={6} />
      <p className="eyebrow mt-6">Loading the isolated sandbox…</p>
    </div>
  );
}

/**
 * A Sandpack theme expressed in the platform's tokens.
 *
 * Sandpack takes literal colours, not CSS variables, so the values here mirror
 * `globals.css`. They are the *dark* values because a code pane is an ink plate
 * on this site in both themes — a light code pane next to editorial type reads as
 * a different product.
 */
const sandpackTheme = {
  colors: {
    surface1: "#0e0e0d",
    surface2: "#1a1a19",
    surface3: "#262625",
    clickable: "#a5a19a",
    base: "#f5f2ec",
    disabled: "#55534f",
    hover: "#f5f2ec",
    accent: "#e2624a",
    error: "#e2624a",
    errorSurface: "#2a1512",
  },
  syntax: {
    plain: "#f5f2ec",
    comment: { color: "#7a7772", fontStyle: "italic" as const },
    keyword: "#e2624a",
    tag: "#85a78e",
    punctuation: "#a5a19a",
    definition: "#9db4d0",
    property: "#e0c98a",
    static: "#e0c98a",
    string: "#85a78e",
  },
  font: {
    body: '"Inter", system-ui, sans-serif',
    mono: '"JetBrains Mono", ui-monospace, monospace',
    size: "13px",
    lineHeight: "1.6",
  },
} as const;

const TAILWIND_CDN = "https://cdn.tailwindcss.com";
