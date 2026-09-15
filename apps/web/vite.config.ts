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
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
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
});
