# Collapsible Details Card

A metadata specification tile with expandable details pane.

## Install

```bash
openui add collapsible-details-card
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `components` → subcategory `cards`
- Interaction model: `details-card-expansion`
- Visual model: `bordered-metadata-card`
- Motion model: `none`
- Semantic purpose: `specification-details-card`

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
