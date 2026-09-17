# Feature Tabbed Walkthrough

Interactive tabbed feature demonstration switching between code AST, design tokens, and live visual preview.

## Install

```bash
openui add feature-tabbed-walkthrough
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `sections` → subcategory `features`
- Interaction model: `tabbed-feature-switch`
- Visual model: `tabs-above-feature-stage`
- Motion model: `none`
- Semantic purpose: `feature-deepdive-walkthrough`

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
