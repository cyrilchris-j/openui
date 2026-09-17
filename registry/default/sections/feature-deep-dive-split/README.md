# Feature Deep Dive Split

A two-sided feature spotlight pairing technical bullet points with interactive code mockups.

## Install

```bash
openui add feature-deep-dive-split
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `sections` → subcategory `feature`
- Interaction model: `feature-deep-dive-split-interaction`
- Visual model: `feature-deep-dive-split-visual`
- Motion model: `subtle`
- Semantic purpose: `feature-deep-dive-split-section`

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
