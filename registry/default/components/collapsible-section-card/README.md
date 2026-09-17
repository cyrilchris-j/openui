# Collapsible Section Card

A surface card featuring a top disclosure header with an animated chevron toggle to collapse body contents.

## Install

```bash
openui add collapsible-section-card
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `components` → subcategory `cards`
- Interaction model: `card-chevron-disclosure`
- Visual model: `bordered-collapsible-chassis`
- Motion model: `stepwise-body-collapse`
- Semantic purpose: `collapsible-content-card`

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
