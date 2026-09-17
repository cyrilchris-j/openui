# Tabular Mass Edit

A numeric column you can edit like a spreadsheet: tabular-numeral alignment, arrow-key cell navigation, per-cell validation that shakes invalid entries, and an aggregate footer that recomputes live.

## Install

```bash
openui add tabular-mass-edit
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `text` → subcategory `data`
- Interaction model: `grid-key-navigation`
- Visual model: `tabular-edit-cells`
- Motion model: `invalid-shake`
- Semantic purpose: `bulk-entry`

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
