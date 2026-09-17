# Expandable Data Row

A ledger row that expands on click to reveal detailed JSON payload keys and network latency metrics.

## Install

```bash
openui add expandable-data-row
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `components` → subcategory `data-display`
- Interaction model: `row-disclosure-toggle`
- Visual model: `ruled-ledger-row`
- Motion model: `stepwise-accordion-open`
- Semantic purpose: `data-payload-inspector`

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
