# Tree Checkbox Selector

Hierarchical nested folder tree with multi-state parent checkboxes and expandable branch folders.

## Install

```bash
openui add tree-checkbox-selector
```

Dependencies: lucide-react.

## What makes it distinct

- Category: `components` → subcategory `forms`
- Interaction model: `nested-checkbox-tree-selection`
- Visual model: `hierarchical-indented-tree`
- Motion model: `none`
- Semantic purpose: `nested-scope-selection`

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
