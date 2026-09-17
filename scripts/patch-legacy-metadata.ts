import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const REGISTRY_DIR = join(process.cwd(), "registry", "default");

const LEGACY_METADATA_MAP: Record<string, { subcategory: string; fingerprint: Record<string, string> }> = {
  "blueprint-grid": {
    subcategory: "grid",
    fingerprint: {
      interactionModel: "passive-viewport",
      visualModel: "drafting-blueprint-cad",
      layoutModel: "full-bleed-underlay",
      semanticPurpose: "canvas-backdrop",
    },
  },
  "grain-background": {
    subcategory: "texture",
    fingerprint: {
      interactionModel: "passive-viewport",
      visualModel: "photographic-film-grain",
      layoutModel: "fixed-noise-overlay",
      semanticPurpose: "editorial-backdrop",
    },
  },
  "industrial-dashboard": {
    subcategory: "analytics",
    fingerprint: {
      interactionModel: "multi-panel-monitor",
      visualModel: "dense-data-instrumentation",
      layoutModel: "grid-command-center",
      semanticPurpose: "system-observability",
    },
  },
  "accordion-index": {
    subcategory: "data-display",
    fingerprint: {
      interactionModel: "disclosure-toggle",
      visualModel: "editorial-rule-separated",
      layoutModel: "vertical-stacked-list",
      semanticPurpose: "content-hierarchy",
    },
  },
  "copy-button": {
    subcategory: "actions",
    fingerprint: {
      interactionModel: "clipboard-write-feedback",
      visualModel: "icon-swap-state",
      layoutModel: "compact-inline",
      semanticPurpose: "quick-copy",
    },
  },
  "ledger-table": {
    subcategory: "data-display",
    fingerprint: {
      interactionModel: "tabular-inspection",
      visualModel: "monochrome-ruled-ledger",
      layoutModel: "dense-horizontal-scroll",
      semanticPurpose: "financial-reporting",
    },
  },
  "magnetic-button": {
    subcategory: "actions",
    fingerprint: {
      interactionModel: "magnetic-pointer-attraction",
      visualModel: "editorial-outline",
      motionModel: "spring-follow",
      layoutModel: "inline",
      semanticPurpose: "primary-cta",
    },
  },
  "marquee-index": {
    subcategory: "navigation",
    fingerprint: {
      interactionModel: "pointer-pause-hover",
      visualModel: "continuous-tape-ticker",
      motionModel: "linear-infinite-travel",
      layoutModel: "full-width-strip",
      semanticPurpose: "catalogue-browse",
    },
  },
  "segmented-control": {
    subcategory: "forms",
    fingerprint: {
      interactionModel: "exclusive-pill-selection",
      visualModel: "capsule-slider-track",
      motionModel: "spring-thumb-slide",
      layoutModel: "inline-segmented",
      semanticPurpose: "view-mode-toggle",
    },
  },
  "status-pill": {
    subcategory: "data-display",
    fingerprint: {
      interactionModel: "passive-badge",
      visualModel: "dot-prefix-pill",
      layoutModel: "inline-badge",
      semanticPurpose: "system-state-indicator",
    },
  },
  "toast-region": {
    subcategory: "overlays",
    fingerprint: {
      interactionModel: "timed-dismiss-queue",
      visualModel: "corner-stack-surface",
      motionModel: "spring-slide-entrance",
      layoutModel: "floating-fixed-region",
      semanticPurpose: "action-notification",
    },
  },
  "cursor-trail": {
    subcategory: "pointer",
    fingerprint: {
      interactionModel: "pointer-history-tracking",
      visualModel: "fade-attenuated-bead-ribbon",
      motionModel: "lagged-particle-follow",
      layoutModel: "viewport-overlay",
      semanticPurpose: "pointer-accentuation",
    },
  },
  "spotlight-follow": {
    subcategory: "pointer",
    fingerprint: {
      interactionModel: "radial-light-aiming",
      visualModel: "soft-radial-gradient-mask",
      motionModel: "damped-focal-follow",
      layoutModel: "under-cursor-glow",
      semanticPurpose: "card-surface-reveal",
    },
  },
  "asymmetric-split": {
    subcategory: "editorial",
    fingerprint: {
      interactionModel: "dual-pane-scroll",
      visualModel: "golden-ratio-bleed-frame",
      layoutModel: "asymmetric-two-column",
      semanticPurpose: "narrative-lead-story",
    },
  },
  "scroll-reveal": {
    subcategory: "scroll",
    fingerprint: {
      interactionModel: "intersection-threshold-trigger",
      visualModel: "mask-unclip-rise",
      motionModel: "staggered-vertical-lift",
      layoutModel: "flow-child-wrapper",
      semanticPurpose: "story-entrance",
    },
  },
  "sticky-stack": {
    subcategory: "scroll",
    fingerprint: {
      interactionModel: "stacked-pin-card-scroll",
      visualModel: "overlapping-deck-leaves",
      motionModel: "scale-compress-as-pinned",
      layoutModel: "sticky-viewport-anchor",
      semanticPurpose: "feature-storytelling",
    },
  },
  "asymmetric-hero": {
    subcategory: "hero",
    fingerprint: {
      interactionModel: "interactive-cta-focus",
      visualModel: "off-axis-typographic-composition",
      layoutModel: "asymmetric-editorial-split",
      semanticPurpose: "brand-landing-masthead",
    },
  },
  "editorial-navigation": {
    subcategory: "navigation",
    fingerprint: {
      interactionModel: "hierarchical-subnav-disclosure",
      visualModel: "minimal-ink-rule-header",
      layoutModel: "top-anchored-sticky-bar",
      semanticPurpose: "primary-site-navigation",
    },
  },
  "blur-reveal-text": {
    subcategory: "reveal",
    fingerprint: {
      interactionModel: "viewport-trigger",
      visualModel: "gaussian-deblur-fade",
      motionModel: "smooth-filter-transition",
      layoutModel: "inline-block",
      semanticPurpose: "heading-entrance",
    },
  },
  "counter-typography": {
    subcategory: "kinetic",
    fingerprint: {
      interactionModel: "value-increment-trigger",
      visualModel: "tabular-numeral-spin",
      motionModel: "spring-digit-roll",
      layoutModel: "inline-numeral",
      semanticPurpose: "metric-counter",
    },
  },
  "decrypt-text": {
    subcategory: "scramble",
    fingerprint: {
      interactionModel: "hover-scramble-resolve",
      visualModel: "matrix-glyph-substitution",
      motionModel: "frame-by-frame-settle",
      layoutModel: "inline-phrase",
      semanticPurpose: "cypherpunk-accent",
    },
  },
  "editorial-drop-cap": {
    subcategory: "editorial",
    fingerprint: {
      interactionModel: "prose-typeset-flow",
      visualModel: "two-line-flourished-initial",
      layoutModel: "float-left-hanging-capital",
      semanticPurpose: "article-prologue-anchor",
    },
  },
  "editorial-heading": {
    subcategory: "editorial",
    fingerprint: {
      interactionModel: "responsive-type-scale",
      visualModel: "tight-tracked-display-serif",
      layoutModel: "block-flow",
      semanticPurpose: "section-headline",
    },
  },
  "gradient-outline-type": {
    subcategory: "stylized",
    fingerprint: {
      interactionModel: "animated-sheen-sweep",
      visualModel: "conic-spectrum-stroke",
      motionModel: "continuous-gradient-shift",
      layoutModel: "display-heading",
      semanticPurpose: "high-contrast-display",
    },
  },
  "hover-replace-text": {
    subcategory: "interactive",
    fingerprint: {
      interactionModel: "pointer-hover-crossfade",
      visualModel: "dual-state-word-swap",
      motionModel: "vertical-slide-swap",
      layoutModel: "inline-phrase",
      semanticPurpose: "playful-cta-hover",
    },
  },
  "kinetic-ticker": {
    subcategory: "kinetic",
    fingerprint: {
      interactionModel: "pointer-pause-marquee",
      visualModel: "high-contrast-ticker-ribbon",
      motionModel: "constant-velocity-drift",
      layoutModel: "viewport-span-strip",
      semanticPurpose: "announcement-ticker",
    },
  },
  "scramble-text": {
    subcategory: "scramble",
    fingerprint: {
      interactionModel: "pointer-hover-trigger",
      visualModel: "random-symbol-cycle",
      motionModel: "progressive-reveal-tick",
      layoutModel: "inline-phrase",
      semanticPurpose: "interactive-label-accent",
    },
  },
  "split-text": {
    subcategory: "reveal",
    fingerprint: {
      interactionModel: "scroll-triggered-split",
      visualModel: "character-clip-path-reveal",
      motionModel: "staggered-glyph-rise",
      layoutModel: "multiline-display",
      semanticPurpose: "hero-title-reveal",
    },
  },
  "vertical-kern-text": {
    subcategory: "editorial",
    fingerprint: {
      interactionModel: "responsive-orientation-flow",
      visualModel: "vertical-writing-mode-typeset",
      layoutModel: "sideways-sidebar-label",
      semanticPurpose: "editorial-margin-annotation",
    },
  },
  "smart-breadcrumb": {
    subcategory: "navigation",
    fingerprint: {
      interactionModel: "adaptive-overflow-collapse",
      visualModel: "slash-delimited-trail",
      motionModel: "popover-menu-spring",
      layoutModel: "responsive-inline-trail",
      semanticPurpose: "hierarchical-wayfinding",
    },
  },
  "swiss-editorial": {
    subcategory: "design-system",
    fingerprint: {
      interactionModel: "design-system-tokens",
      visualModel: "asymmetric-swiss-editorial-typography",
      layoutModel: "modular-grid-scale",
      semanticPurpose: "global-design-system",
    },
  },
  "industrial-archive": {
    subcategory: "design-system",
    fingerprint: {
      interactionModel: "dense-data-token-system",
      visualModel: "utilitarian-monochrome-wireframe",
      layoutModel: "compact-instrument-matrix",
      semanticPurpose: "industrial-styleguide",
    },
  },
  "editorial-oxide": {
    subcategory: "palette",
    fingerprint: {
      interactionModel: "theme-variable-tokens",
      visualModel: "warm-oxide-editorial-palette",
      layoutModel: "css-custom-properties-scope",
      semanticPurpose: "editorial-color-theme",
    },
  },
  "industrial-mono": {
    subcategory: "palette",
    fingerprint: {
      interactionModel: "terminal-contrast-tokens",
      visualModel: "monochrome-cad-slate-palette",
      layoutModel: "css-token-bundle",
      semanticPurpose: "industrial-theme-definition",
    },
  },
  "swiss-ledger": {
    subcategory: "palette",
    fingerprint: {
      interactionModel: "high-contrast-paper-tokens",
      visualModel: "stark-ink-on-vellum-palette",
      layoutModel: "css-root-variables",
      semanticPurpose: "swiss-theme-definition",
    },
  },
};

async function main() {
  const categories = await readdir(REGISTRY_DIR);
  let patchedCount = 0;

  for (const cat of categories) {
    const catPath = join(REGISTRY_DIR, cat);
    let items: string[] = [];
    try {
      items = await readdir(catPath);
    } catch {
      continue;
    }

    for (const item of items) {
      const jsonPath = join(catPath, item, "registry.json");
      let content = "";
      try {
        content = await readFile(jsonPath, "utf8");
      } catch {
        continue;
      }

      const json = JSON.parse(content);
      const meta = json.meta || {};
      let changed = false;

      const override = LEGACY_METADATA_MAP[item];
      if (override) {
        if (meta.subcategory !== override.subcategory) {
          meta.subcategory = override.subcategory;
          changed = true;
        }
        if (JSON.stringify(meta.fingerprint) !== JSON.stringify(override.fingerprint)) {
          meta.fingerprint = override.fingerprint;
          changed = true;
        }
      } else {
        // Generic fallback if any other item lacks subcategory or fingerprint
        if (!meta.subcategory) {
          meta.subcategory = "general";
          changed = true;
        }
        if (!meta.fingerprint || Object.keys(meta.fingerprint).length < 3) {
          meta.fingerprint = {
            interactionModel: "standard-event",
            visualModel: "openui-token-aesthetic",
            motionModel: "subtle-spring",
            layoutModel: "responsive-flow",
            semanticPurpose: "ui-component",
          };
          changed = true;
        }
      }

      if (changed) {
        json.meta = meta;
        await writeFile(jsonPath, JSON.stringify(json, null, 2) + "\n", "utf8");
        patchedCount++;
      }
    }
  }

  console.log(`Patched ${patchedCount} legacy items with valid subcategories and fingerprints.`);
}

main();
