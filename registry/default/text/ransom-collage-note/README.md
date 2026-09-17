# Ransom Collage Note

Each glyph is clipped from its own 'scrap' — deterministic per-index rotation, paper tone, serif/sans alternation and tape strip — so the collage is chaotic to the eye but reproducible to the pixel across renders.

## Install

```bash
openui add ransom-collage-note
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `text` → subcategory `editorial`
- Interaction model: `static`
- Visual model: `per-glyph-collage-scrap`
- Motion model: `none`
- Semantic purpose: `protest-statement`

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
