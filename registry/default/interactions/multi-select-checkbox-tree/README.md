# Multi Select Checkbox Tree

A nested hierarchical tree component with parent indeterminate checkbox states resolving child selection.

## Install

```bash
openui add multi-select-checkbox-tree
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `interactions` → subcategory `selection`
- Interaction model: `hierarchical-checkbox-cascade`
- Visual model: `indented-branching-tree`
- Motion model: `tri-state-glyph-toggle`
- Semantic purpose: `hierarchical-selection-tree`

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
