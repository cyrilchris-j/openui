# Stroke Draw Text

An SVG path rendition of the headline whose strokes draw themselves via stroke-dashoffset on entering view; the DOM text stays present for accessibility while the drawn paths carry the visual.

## Install

```bash
openui add stroke-draw-text
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `text` → subcategory `reveal`
- Interaction model: `in-view-trigger`
- Visual model: `svg-path-stroke`
- Motion model: `dash-offset-draw`
- Semantic purpose: `signature-reveal`

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
