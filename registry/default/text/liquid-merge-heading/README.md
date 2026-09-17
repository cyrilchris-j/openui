# Liquid Merge Heading

Two words drift toward each other on a loop, blur at the seam, and merge into one with a gooey SVG filter — then pull apart again. The metaball effect is a filter chain, not a physics engine.

## Install

```bash
openui add liquid-merge-heading
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `text` → subcategory `kinetic`
- Interaction model: `ambient-loop`
- Visual model: `gooey-filter-merge`
- Motion model: `oscillating-approach`
- Semantic purpose: `relationship-heading`

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
