# Fountain Pen Signature

A cursive signature drawn as an SVG stroke path with variable stroke width (two overlapping paths slightly offset), animating via dashoffset as if written by hand — sign here, then wipe and re-sign.

## Install

```bash
openui add fountain-pen-signature
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `text` → subcategory `path`
- Interaction model: `button-redraw`
- Visual model: `svg-variable-stroke`
- Motion model: `dash-write`
- Semantic purpose: `signature`

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
