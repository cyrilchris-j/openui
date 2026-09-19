/// <reference types="vitest/config" />
import { fileURLToPath, URL } from "node:url";

import mdx from "@mdx-js/rollup";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

/**
 * Vite configuration.
 *
 * Two things here are load-bearing:
 *
 *  - **`@/` alias.** Registry resources are written to import `@/lib/cn`, which
 *    is the path the CLI rewrites when it installs them. The website resolves the
 *    same alias so a resource's demo can run unmodified in the playground.
 *  - **The `/r` directory is served verbatim.** Built registry artifacts are
 *    fetched from `/r/registry.json` and cached by the browser and CDN; we never
 *    bundle them, so a registry update ships without rebuilding the app.
 */
export default defineConfig({
  plugins: [
    // MDX comes first: the plugin transforms `.mdx` into a module before React
    // sees it. `providerImportSource` is what makes a custom component map
    // available inside the content, so docs can use the real `CodeBlock` and
    // `DnaStrip` rather than a parallel set of doc-only components.
    mdx({ providerImportSource: "@mdx-js/react" }),
    react(),
  ],
  resolve: {
    alias: [
      // Registry-internal imports first: registry sources use the consumer
      // alias convention (`@/lib/cn`, `@/hooks/<hook>`), and inside registry
      // sources those must resolve to the registry's own items — the same
      // mapping scripts/typecheck-registry.ts performs. Regex + `$1` works
      // because Vite aliases apply via String.replace semantics.
      {
        find: /^@\/lib\/cn$/,
        replacement: fileURLToPath(new URL("../../registry/default/components/cn/cn.ts", import.meta.url)),
      },
      {
        find: "@/hooks/use-in-view",
        replacement: fileURLToPath(new URL("../../registry/default/components/use-in-view/use-in-view.ts", import.meta.url)),
      },
      {
        find: "@/hooks/use-canvas-loop",
        replacement: fileURLToPath(new URL("../../registry/default/components/use-canvas-loop/use-canvas-loop.ts", import.meta.url)),
      },
      {
        find: "@/hooks/use-reduced-motion",
        replacement: fileURLToPath(new URL("../../registry/default/components/use-reduced-motion/use-reduced-motion.ts", import.meta.url)),
      },
      // Registry sources, for the generated mount tests: demos import their
      // own item's source with the same relative convention they ship with.
      {
        find: "@registry",
        replacement: fileURLToPath(new URL("../../registry", import.meta.url)),
      },
      // The app's own alias. Registry resources are written to import
      // `@/lib/cn` (mapped above), the CLI rewrites it on install, and app
      // source uses `@/` for everything else.
      {
        find: "@",
        replacement: fileURLToPath(new URL("./src", import.meta.url)),
      },
    ],
  },
  test: {
    environment: "jsdom",
    include: ["src/**/*.test.{ts,tsx}"],
    setupFiles: ["src/test/setup.ts"],
  },
  server: {
    port: 5173,
    // The API is a separate process; proxying keeps the browser on one origin in
    // development, which means cookies, CORS and CSP behave as they do in prod.
    proxy: {
      "/api": {
        target: process.env["VITE_PROXY_API_TARGET"] ?? "http://localhost:8787",
        changeOrigin: true,
      },
    },
  },
  build: {
    target: "es2022",
    sourcemap: true,
    chunkSizeWarningLimit: 1000,
    // Markdown is content, not code, and it is the largest text payload on the
    // site. Treating it as an asset keeps it out of the JavaScript graph.
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        // Sandpack and Monaco are only needed on the playground. Splitting them
        // out keeps the critical path for a catalogue page small.
        manualChunks: {
          sandpack: ["@codesandbox/sandpack-react"],
          editor: ["@monaco-editor/react"],
          three: ["three"],
          vendor: ["react", "react-dom", "react-router"],
        },
      },
    },
  },
  define: {
    // `process.env` is referenced by Sandpack's bundler shim; the browser has no
    // such global, so it is defined away at build time.
    "process.env": "{}",
  },
} as any);
