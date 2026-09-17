# Liquid Shape Morph

A surface that morphs between organic blob shapes using animated border-radius interpolation across eight values — the cheapest real morph in CSS, with asymmetric timing so the blob never looks mechanical.

## Install

```bash
openui add liquid-shape-morph
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `motion` → subcategory `page`
- Interaction model: `ambient-loop`
- Visual model: `border-radius-blob`
- Motion model: `keyframe-radius-morph`
- Semantic purpose: `decorative-motion`

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
