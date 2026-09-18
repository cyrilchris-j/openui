import { SandpackCodeEditor, SandpackProvider } from "@codesandbox/sandpack-react";
import * as React from "react";

import type { BuiltRegistryItem } from "@openui/types";
import { EmptyState, Skeleton } from "@openui/ui";

import { BlobPreview } from "./BlobPreview.js";
import { buildSandboxFiles } from "./files.js";

export interface SandboxProps {
  item: BuiltRegistryItem;
  view?: "preview" | "code" | "split";
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

  // Sandpack code editor files (with hidden HTML/CSS overrides)
  const sandpackFiles = {
    ...files,
    "/public/index.html": { code: SANDBOX_HTML, hidden: true },
    "/styles.css": { code: SANDBOX_CSS, hidden: true },
  };

  const previewHeight = view === "split" ? "22rem" : "32rem";
  const editorHeight = view === "split" ? "24rem" : "34rem";

  return (
    <div className={className}>
      <div className="border border-line">
        {/* BlobPreview: uses Babel standalone (jsdelivr) + React (esm.sh).
            No connection to sandpack-bundler.codesandbox.io is required. */}
        {view !== "code" ? (
          <BlobPreview files={files} height={previewHeight} scrollable />
        ) : null}

        {/* Code editor: Sandpack's code editor is safe to use from npm.
            Only the preview iframe requires the blocked CDN. */}
        {view !== "preview" ? (
          <SandpackProvider
            template="react-ts"
            theme={sandpackTheme}
            files={sandpackFiles}
            customSetup={{
              dependencies: {
                clsx: "latest",
                "tailwind-merge": "latest",
                "lucide-react": "latest",
                "class-variance-authority": "latest",
                motion: "latest",
              },
            }}
            options={{ autorun: false }}
          >
            <SandpackCodeEditor
              showLineNumbers
              showTabs
              style={{ height: editorHeight }}
            />
          </SandpackProvider>
        ) : null}
      </div>

      <p className="mt-3 flex items-start gap-2 text-[0.78rem] leading-relaxed text-graphite">
        <span aria-hidden className="mt-[0.35rem] h-1.5 w-1.5 shrink-0 rounded-pill bg-moss" />
        Running in an isolated sandbox. The preview has no access to this page, your session or your files.
      </p>
    </div>
  );
}

export function SandboxSkeleton(): React.JSX.Element {
  return (
    <div className="border border-line p-6">
      <Skeleton lines={6} />
      <p className="eyebrow mt-6">Loading the isolated sandbox…</p>
    </div>
  );
}

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
} as const;const SANDBOX_CSS = `*, *::before, *::after { box-sizing: border-box; }

:root {
  /* Colour */
  --paper:    42 33% 96%;
  --ink:      60 4%  5%;
  --graphite: 40 4%  33%;
  --line:     60 4%  5%;
  --oxide:    13 76% 37%;
  --moss:     137 22% 24%;
  --azure:    214 45% 34%;
  --line-alpha: 0.16;

  /* Typography */
  --font-display: "Instrument Serif", Georgia, serif;
  --font-sans:    "Inter", system-ui, sans-serif;
  --font-mono:    "JetBrains Mono", ui-monospace, monospace;

  /* Modular scale */
  --step--1: clamp(0.8rem,  0.78rem + 0.10vw, 0.85rem);
  --step-0:  clamp(0.95rem, 0.92rem + 0.15vw, 1.05rem);
  --step-1:  clamp(1.15rem, 1.10rem + 0.25vw, 1.30rem);
  --step-2:  clamp(1.40rem, 1.30rem + 0.50vw, 1.70rem);
  --step-3:  clamp(1.75rem, 1.55rem + 1.00vw, 2.35rem);
  --step-4:  clamp(2.20rem, 1.80rem + 2.00vw, 3.40rem);
  --step-5:  clamp(2.80rem, 2.00rem + 4.00vw, 5.20rem);

  /* Shape */
  --radius-sm:   0px;
  --radius-md:   2px;
  --radius-lg:   3px;
  --radius-pill: 999px;

  /* Motion */
  --motion-fast:   140ms;
  --motion-normal: 280ms;
  --motion-slow:   520ms;
  --motion-ease:   cubic-bezier(0.2, 0, 0, 1);

  /* Composition */
  --measure:    68ch;
  --shell-max:  1440px;
  --gutter:     clamp(1rem, 4vw, 4rem);
}

body {
  margin: 0;
  font-family: var(--font-sans);
  font-size: var(--step-0);
  line-height: 1.6;
  background-color: hsl(var(--paper));
  color: hsl(var(--ink));
  -webkit-font-smoothing: antialiased;
}

:focus-visible {
  outline: 2px solid hsl(var(--oxide));
  outline-offset: 2px;
}
`;

/**
 * The full HTML shell for the Sandpack preview iframe.
 */
const SANDBOX_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Preview</title>

  <link
    href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
    rel="stylesheet"
  />

  <style>
\${SANDBOX_CSS}
  </style>

  <script>
    window.tailwind = {
      config: {
        theme: {
          extend: {
            colors: {
              paper:    "hsl(var(--paper)   / <alpha-value>)",
              ink:      "hsl(var(--ink)     / <alpha-value>)",
              graphite: "hsl(var(--graphite)/ <alpha-value>)",
              line:     "hsl(var(--line)    / <alpha-value>)",
              oxide:    "hsl(var(--oxide)   / <alpha-value>)",
              moss:     "hsl(var(--moss)    / <alpha-value>)",
              azure:    "hsl(var(--azure)   / <alpha-value>)",
            },
            fontFamily: {
              display: ["Instrument Serif", "Georgia", "serif"],
              sans:    ["Inter", "system-ui", "sans-serif"],
              mono:    ["JetBrains Mono", "ui-monospace", "monospace"],
            },
            fontSize: {
              "step--1": "var(--step--1)",
              "step-0":  "var(--step-0)",
              "step-1":  "var(--step-1)",
              "step-2":  "var(--step-2)",
              "step-3":  "var(--step-3)",
              "step-4":  "var(--step-4)",
              "step-5":  "var(--step-5)",
            },
            borderRadius: {
              sm:   "var(--radius-sm)",
              md:   "var(--radius-md)",
              lg:   "var(--radius-lg)",
              pill: "var(--radius-pill)",
            },
            transitionDuration: {
              fast:   "var(--motion-fast)",
              normal: "var(--motion-normal)",
              slow:   "var(--motion-slow)",
            },
            maxWidth: {
              measure: "var(--measure)",
              shell:   "var(--shell-max)",
            },
          },
        },
      }
    };
  </script>

  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
  <div id="root"></div>
</body>
</html>
`;
