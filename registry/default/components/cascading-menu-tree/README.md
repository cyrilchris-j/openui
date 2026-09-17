# Cascading Menu Tree

A nested flyout menu with keyboard navigation support, chevron branch indicators, and action triggers.

## Install

```bash
openui add cascading-menu-tree
```

Dependencies: lucide-react.

## What makes it distinct

- Category: `components` → subcategory `navigation`
- Interaction model: `cascading-flyout-hover`
- Visual model: `floating-nested-popover`
- Motion model: `none`
- Semantic purpose: `hierarchical-action-menu`

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
