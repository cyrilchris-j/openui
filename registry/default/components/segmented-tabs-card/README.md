# Segmented Tabs Card

A surface container featuring segmented tabs integrated directly into the header boundary.

## Install

```bash
openui add segmented-tabs-card
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `components` → subcategory `navigation`
- Interaction model: `card-header-tab-switch`
- Visual model: `tabbed-header-card`
- Motion model: `none`
- Semantic purpose: `multi-view-panel-card`

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
