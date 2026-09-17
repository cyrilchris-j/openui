# Baseline Grid Overlay

A proofing tool that overlays the document's baseline grid on any block of text and flags lines that drift off it — vertical rhythm made visible, with a drift count readout for CI-style typographic QA.

## Install

```bash
openui add baseline-grid-overlay
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `text` → subcategory `technical`
- Interaction model: `toggle-inspect`
- Visual model: `grid-line-overlay`
- Motion model: `none`
- Semantic purpose: `rhythm-verification`

## Accessibility

- Keyboard reachable; visible focus ring.
- Honours `prefers-reduced-motion`: animation is disabled or replaced with a
  static state change.
- Semantic HTML first; ARIA only where the semantics need help.

## When to use

When the interface needs exactly this behaviour — check the fingerprint above
against the composition you are building.

## When not to use

When a simpler resource meets the need. Do not stack decorative motion on top
of a surface that already carries motion.
