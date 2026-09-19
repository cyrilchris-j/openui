import * as React from "react";

import { useTheme } from "../../hooks/use-theme.js";

export interface BlobPreviewProps {
  /** Virtual file map: "/App.tsx" → source, "/lib/cn.ts" → source, … */
  files: Record<string, string>;
  height?: string;
  style?: React.CSSProperties;
  className?: string;
  scrollable?: boolean;
}

/**
 * Self-contained TSX component preview running in an isolated iframe.
 *
 * Uses:
 *  - @babel/standalone (from cdn.jsdelivr.net) to compile TSX/TS into CommonJS in-browser
 *  - esm.sh for peer dependencies (React, ReactDOM, Lucide, clsx, tailwind-merge, CVA, Motion)
 *  - A synchronous in-memory virtual module runner (no flaky blob-url module imports)
 *  - Tailwind CDN for instant utility classes
 */
export function BlobPreview({
  files,
  height = "22rem",
  style,
  className,
  scrollable = false,
}: BlobPreviewProps): React.JSX.Element {
  const { resolved } = useTheme();
  const isDark = resolved === "dark";
  const iframeRef = React.useRef<HTMLIFrameElement>(null);
  const pageBlobRef = React.useRef<string | null>(null);

  React.useEffect(() => {
    // Collect TSX/TS/JS/CSS files
    const virtualFiles: Record<string, string> = {};
    const cssChunks: string[] = [];

    for (const [rawPath, content] of Object.entries(files)) {
      // Normalize to leading slash
      const p = rawPath.startsWith("/") ? rawPath : `/${rawPath}`;
      if (p.endsWith(".css")) {
        cssChunks.push(content);
      } else if (/\.(tsx?|jsx?)$/.test(p)) {
        // Strip Next.js directives that don't belong in client sandbox
        const stripped = content.replace(/^['"]use client['"]\s*;?\s*\n?/m, "");
        virtualFiles[p] = stripped;
      }
    }

    // Check for App entry
    const hasApp = Object.keys(virtualFiles).some((p) => /(^|\/)App\.(tsx?|jsx?)$/.test(p));
    if (!hasApp) return;

    const filesJson = JSON.stringify(virtualFiles).replace(/<\/script/gi, "<\\/script");
    const cssStyle = cssChunks.length > 0 ? `<style>${cssChunks.join("\n")}</style>` : "";

    const html = `<!DOCTYPE html>
<html lang="en" class="${isDark ? "dark" : ""}">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>Component Preview</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet">
  <script>
    window.tailwind = {
      darkMode: 'class',
      config: {
        darkMode: 'class',
        theme: {
          extend: {
            colors: {
              paper: 'hsl(var(--paper) / <alpha-value>)',
              ink: 'hsl(var(--ink) / <alpha-value>)',
              graphite: 'hsl(var(--graphite) / <alpha-value>)',
              oxide: 'hsl(var(--oxide) / <alpha-value>)',
              moss: 'hsl(var(--moss) / <alpha-value>)',
              azure: 'hsl(var(--azure) / <alpha-value>)',
              line: 'hsl(var(--line) / <alpha-value>)',
            },
            borderRadius: {
              sm: '0px',
              md: '2px',
              lg: '4px',
              pill: '999px',
            }
          }
        }
      }
    };
  </script>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    :root {
      --paper: ${isDark ? "60 5% 5%" : "42 33% 96%"};
      --ink: ${isDark ? "40 20% 93%" : "60 4% 5%"};
      --graphite: ${isDark ? "40 5% 64%" : "40 4% 33%"};
      --line: ${isDark ? "40 20% 93%" : "60 4% 5%"};
      --oxide: ${isDark ? "13 72% 58%" : "13 76% 37%"};
      --moss: ${isDark ? "137 20% 58%" : "137 22% 24%"};
      --azure: ${isDark ? "214 55% 68%" : "214 45% 34%"};
      --line-alpha: ${isDark ? "0.22" : "0.20"};
      --font-display: 'Instrument Serif', Georgia, serif;
      --font-sans: 'Inter', system-ui, sans-serif;
      --font-mono: ui-monospace, SFMono-Regular, Menlo, monospace;
      --color-paper: hsl(var(--paper));
      --color-ink: hsl(var(--ink));
      --color-line: hsl(var(--line) / var(--line-alpha));
      --color-graphite: hsl(var(--graphite));
      --color-oxide: hsl(var(--oxide));
      --color-moss: hsl(var(--moss));
      --color-azure: hsl(var(--azure));
      --border-line: var(--color-line);
    }
    *, *::before, *::after { box-sizing: border-box; }
    ${
      scrollable
        ? `
    html, body {
      margin: 0;
      padding: 0;
      min-height: 100vh;
      font-family: 'Inter', system-ui, sans-serif;
      background: hsl(var(--paper));
      color: hsl(var(--ink));
      -webkit-font-smoothing: antialiased;
      overflow-x: hidden;
      overflow-y: auto;
    }
    #root {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
      width: 100%;
      box-sizing: border-box;
    }
    #root > * {
      max-width: 100%;
    }
    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    ::-webkit-scrollbar-track {
      background: transparent;
    }
    ::-webkit-scrollbar-thumb {
      background: hsl(var(--graphite) / 0.2);
      border-radius: 9999px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: hsl(var(--graphite) / 0.4);
    }
    `
        : `
    html, body {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      min-height: 100%;
      font-family: 'Inter', system-ui, sans-serif;
      background: hsl(var(--paper));
      color: hsl(var(--ink));
      -webkit-font-smoothing: antialiased;
      overflow: hidden !important;
      scrollbar-width: none !important;
      -ms-overflow-style: none !important;
    }
    #root {
      width: 100%;
      height: 100%;
      min-height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.5rem !important;
      box-sizing: border-box;
      overflow: hidden !important;
      scrollbar-width: none !important;
      -ms-overflow-style: none !important;
    }
    #root > * {
      max-width: 100%;
      box-sizing: border-box;
    }
    #root > div[class*="min-h-"],
    #root > div[class*="p-8"],
    #root > div[class*="p-10"] {
      min-height: 0 !important;
      height: 100% !important;
      padding: 0.5rem !important;
      background: transparent !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
    }
    * {
      scrollbar-width: none !important;
      -ms-overflow-style: none !important;
    }
    ::-webkit-scrollbar, *::-webkit-scrollbar {
      display: none !important;
      width: 0 !important;
      height: 0 !important;
      background: transparent !important;
    }
    `
    }
    #error-container {
      display: none;
      position: fixed;
      inset: 0;
      padding: 1.5rem;
      background: #111111;
      color: #f87171;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-size: 13px;
      line-height: 1.6;
      white-space: pre-wrap;
      overflow: auto;
      z-index: 99999;
    }
  </style>
  ${cssStyle}
  <script id="__vfs" type="application/json">${filesJson}</script>
  <script src="https://cdn.jsdelivr.net/npm/@babel/standalone@7.26.4/babel.min.js"></script>
</head>
<body>
  <div id="root"></div>
  <div id="error-container"></div>

  <script>
    function showError(err) {
      var el = document.getElementById('error-container');
      if (el) {
        el.style.display = 'block';
        el.textContent = typeof err === 'string' ? err : (err && (err.stack || err.message)) || String(err);
      }
      console.error('[Preview Error]', err);
    }
    window.addEventListener('error', function(e) {
      showError('Runtime error: ' + (e.message || (e.error && e.error.message) || e));
    });
    window.addEventListener('unhandledrejection', function(e) {
      var r = e.reason;
      showError('Unhandled rejection: ' + ((r && (r.stack || r.message)) || r));
    });
  </script>

  <script type="module">
    import * as React from "https://esm.sh/react@18.3.1";
    import * as ReactDOM from "https://esm.sh/react-dom@18.3.1";
    import * as ReactDOMClient from "https://esm.sh/react-dom@18.3.1/client";
    import * as ReactJSXRuntime from "https://esm.sh/react@18.3.1/jsx-runtime";
    import * as LucideReact from "https://esm.sh/lucide-react@0.460.0?deps=react@18.3.1";
    import { clsx } from "https://esm.sh/clsx@2";
    import { twMerge } from "https://esm.sh/tailwind-merge@2";
    import * as CvaModule from "https://esm.sh/class-variance-authority@0.7.1";
    import * as MotionModule from "https://esm.sh/motion@11/react?deps=react@18.3.1";
    import * as ThreeModule from "https://esm.sh/three@0.170.0";

    window.React = React;
    window.ReactDOM = ReactDOM;
    window.ReactDOMClient = ReactDOMClient;
    window.ReactJSXRuntime = ReactJSXRuntime;
    window.LucideReact = LucideReact;
    window.clsx = { clsx, default: clsx };
    window.tailwindMerge = { twMerge, default: twMerge };
    window.cva = CvaModule;
    window.Motion = MotionModule;
    window.THREE = ThreeModule;

    window.__depsReady = true;
    if (window.__maybeStart) window.__maybeStart();
  </script>

  <script>
    function cleanPath(p) {
      p = p.replace(/^@\\//, '/');
      if (!p.startsWith('/')) p = '/' + p;
      var segments = p.split('/');
      var out = [];
      for (var i = 0; i < segments.length; i++) {
        var s = segments[i];
        if (!s || s === '.') continue;
        if (s === '..') {
          if (out.length > 0) out.pop();
        } else {
          out.push(s);
        }
      }
      return '/' + out.join('/');
    }

    function startRunner() {
      try {
        var vfsEl = document.getElementById('__vfs');
        if (!vfsEl) throw new Error('Virtual file map element missing');
        var vfs = JSON.parse(vfsEl.textContent);

        // 1. Compile all virtual files into CommonJS functions
        var compiledModules = {};
        var moduleCache = {};

        var paths = Object.keys(vfs);
        for (var i = 0; i < paths.length; i++) {
          var p = cleanPath(paths[i]);
          var code = vfs[paths[i]];
          var isTSX = p.endsWith('.tsx') || p.endsWith('.jsx');
          try {
            var transformed = window.Babel.transform(code, {
              filename: p,
              presets: [
                ['env', { targets: { esmodules: false }, modules: 'commonjs' }],
                ['react', { runtime: 'automatic' }],
                ['typescript', { isTSX: isTSX, allExtensions: true }]
              ]
            });
            compiledModules[p] = new Function('exports', 'require', 'module', transformed.code);
          } catch (compErr) {
            showError('Compilation error in ' + p + ':\\n' + (compErr.stack || compErr.message));
            return;
          }
        }

        // 2. Resolver for local files
        function findModuleKey(target) {
          if (compiledModules[target]) return target;

          var exts = ['.tsx', '.ts', '.jsx', '.js', '/index.tsx', '/index.ts'];
          for (var e = 0; e < exts.length; e++) {
            if (compiledModules[target + exts[e]]) return target + exts[e];
          }

          var targetWithoutExt = target.replace(/\\.(tsx?|jsx?)$/, '');
          var keys = Object.keys(compiledModules);
          for (var k = 0; k < keys.length; k++) {
            var keyNorm = keys[k].replace(/\\.(tsx?|jsx?)$/, '');
            if (keyNorm === targetWithoutExt) return keys[k];
          }

          // Match by file basename
          var baseName = targetWithoutExt.split('/').pop();
          for (var k = 0; k < keys.length; k++) {
            var keyBase = keys[k].replace(/\\.(tsx?|jsx?)$/, '').split('/').pop();
            if (keyBase === baseName) return keys[k];
          }

          return null;
        }

        // 3. Resolver for peer packages
        function resolvePeer(specifier) {
          if (specifier === 'react') {
            return { __esModule: true, ...window.React, default: window.React };
          }
          if (specifier === 'react-dom') {
            return { __esModule: true, ...window.ReactDOM, default: window.ReactDOM };
          }
          if (specifier === 'react-dom/client') {
            return { __esModule: true, ...window.ReactDOMClient, default: window.ReactDOMClient };
          }
          if (specifier === 'react/jsx-runtime') {
            return { __esModule: true, ...window.ReactJSXRuntime, default: window.ReactJSXRuntime };
          }
          if (specifier === 'lucide-react') {
            return { __esModule: true, ...window.LucideReact, default: window.LucideReact };
          }
          if (specifier === 'clsx') {
            var fn = (window.clsx && (window.clsx.clsx || window.clsx.default)) || window.clsx;
            return { __esModule: true, clsx: fn, default: fn };
          }
          if (specifier === 'tailwind-merge') {
            var fn = (window.tailwindMerge && (window.tailwindMerge.twMerge || window.tailwindMerge.default)) || window.tailwindMerge;
            return { __esModule: true, twMerge: fn, default: fn };
          }
          if (specifier === 'class-variance-authority') {
            return { __esModule: true, ...window.cva, default: window.cva };
          }
          if (specifier === 'motion' || specifier === 'motion/react' || specifier === 'framer-motion') {
            return { __esModule: true, ...window.Motion, default: window.Motion };
          }
          if (specifier === 'three') {
            return { __esModule: true, ...window.THREE, default: window.THREE };
          }
          return null;
        }

        // 4. Custom require implementation
        function customRequire(specifier, currentFile) {
          var peer = resolvePeer(specifier);
          if (peer) return peer;

          var raw = specifier;
          if (raw.startsWith('@/')) {
            raw = raw.replace(/^@\\//, '/');
          } else if (raw.startsWith('.')) {
            var dir = currentFile.substring(0, currentFile.lastIndexOf('/'));
            raw = (dir ? dir : '') + '/' + raw;
          }
          var target = cleanPath(raw);
          var matchedKey = findModuleKey(target);

          if (!matchedKey) {
            throw new Error("Cannot find module '" + specifier + "' from '" + currentFile + "'. (Available: " + Object.keys(compiledModules).join(', ') + ")");
          }

          if (moduleCache[matchedKey]) {
            return moduleCache[matchedKey].exports;
          }

          var mod = { exports: {} };
          moduleCache[matchedKey] = mod;

          var fn = compiledModules[matchedKey];
          fn(mod.exports, function(dep) {
            return customRequire(dep, matchedKey);
          }, mod);

          return mod.exports;
        }

        // 5. Find App entry point
        var appKey = Object.keys(compiledModules).find(function(k) {
          return /(^|\\/)App\\.(tsx?|jsx?)$/.test(k);
        });

        if (!appKey) {
          throw new Error('No App entry point found. Files: ' + Object.keys(compiledModules).join(', '));
        }

        var appMod = customRequire(appKey, '/');
        var AppComponent = appMod.default || appMod.App || appMod.Demo || appMod;

        if (!AppComponent || (typeof AppComponent !== 'function' && typeof AppComponent !== 'object')) {
          throw new Error('App file (' + appKey + ') did not export a valid React component.');
        }

        // 6. React Error Boundary
        class ErrorBoundary extends window.React.Component {
          constructor(props) {
            super(props);
            this.state = { hasError: false, error: null };
          }
          static getDerivedStateFromError(error) {
            return { hasError: true, error: error };
          }
          componentDidCatch(error, errorInfo) {
            showError('Render Error:\\n' + (error.stack || error.message) + '\\n\\nComponent stack:' + errorInfo.componentStack);
          }
          render() {
            if (this.state.hasError) return null;
            return this.props.children;
          }
        }

        // 7. Mount React App
        var root = window.ReactDOMClient.createRoot(document.getElementById('root'));
        root.render(window.React.createElement(ErrorBoundary, null, window.React.createElement(AppComponent)));

        // 8. Auto-fit and auto-animate for thumbnail preview mode
        if (!${scrollable}) {
          function autoFit() {
            var rootEl = document.getElementById('root');
            if (!rootEl || !rootEl.firstElementChild) return;
            var target = rootEl.firstElementChild;
            if (target.children && target.children.length === 1 && target.firstElementChild) {
              target = target.firstElementChild;
            }
            var availW = window.innerWidth - 16;
            var availH = window.innerHeight - 16;
            var curW = target.scrollWidth || target.offsetWidth;
            var curH = target.scrollHeight || target.offsetHeight;
            if (curW > availW || curH > availH) {
              var s = Math.min(availW / curW, availH / curH, 1);
              if (s < 0.96) {
                target.style.transform = 'scale(' + s.toFixed(3) + ')';
                target.style.transformOrigin = 'center center';
              }
            }
          }
          setTimeout(autoFit, 60);
          setTimeout(autoFit, 250);
          setTimeout(autoFit, 600);

          // Auto-animate interactive previews so they are visibly active:
          setTimeout(function() {
            // A. If range slider exists (e.g. PhysicsRopePulley, InteractiveDiffSlider), oscillate it!
            var slider = document.querySelector('input[type="range"]');
            if (slider) {
              var min = parseFloat(slider.min || 0);
              var max = parseFloat(slider.max || 100);
              var step = (max - min) / 50;
              var dir = 1;
              setInterval(function() {
                var val = parseFloat(slider.value) + step * dir;
                if (val >= max) { val = max; dir = -1; }
                if (val <= min) { val = min; dir = 1; }
                slider.value = val;
                slider.dispatchEvent(new Event('input', { bubbles: true }));
                slider.dispatchEvent(new Event('change', { bubbles: true }));
              }, 40);
            }

            // B. If hamburger / toggle button exists, auto-toggle it!
            var btn = document.querySelector('button[aria-expanded], button[aria-label*="menu" i], button[aria-label*="toggle" i]');
            if (btn) {
              setInterval(function() {
                btn.click();
              }, 1800);
            }

            // C. If spring drawer or dialog panel exists, click it to open!
            var drawer = document.querySelector('[role="dialog"], [aria-label*="drawer" i], [aria-label*="panel" i]');
            if (drawer) {
              drawer.click();
            }
          }, 300);
        }
      } catch (err) {
        showError(err);
      }
    }

    window.__maybeStart = function() {
      if (window.Babel && window.__depsReady) {
        startRunner();
      }
    };

    if (window.Babel) {
      window.__maybeStart();
    } else {
      var checkBabelInterval = setInterval(function() {
        if (window.Babel) {
          clearInterval(checkBabelInterval);
          window.__maybeStart();
        }
      }, 50);
    }
  </script>
</body>
</html>`;

    const pageBlob = new Blob([html], { type: "text/html" });
    const pageUrl = URL.createObjectURL(pageBlob);

    if (pageBlobRef.current) URL.revokeObjectURL(pageBlobRef.current);
    pageBlobRef.current = pageUrl;

    if (iframeRef.current) {
      iframeRef.current.src = pageUrl;
    }

    return () => {
      if (pageBlobRef.current) {
        URL.revokeObjectURL(pageBlobRef.current);
        pageBlobRef.current = null;
      }
    };
  }, [files, scrollable, resolved]);

  return (
    <iframe
      ref={iframeRef}
      title="Component preview"
      scrolling={scrollable ? "auto" : "no"}
      sandbox="allow-scripts allow-same-origin"
      style={{
        width: "100%",
        height,
        border: "none",
        display: "block",
        background: isDark ? "hsl(60 5% 5%)" : "hsl(42 33% 96%)",
        overflow: scrollable ? "auto" : "hidden",
        ...style,
      }}
      className={className}
    />
  );
}
