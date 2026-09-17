# Timeline Roadmap Stream

Product roadmap stream showing past milestones achieved and upcoming releases.

## Install

```bash
openui add timeline-roadmap-stream
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `sections` → subcategory `roadmap`
- Interaction model: `quarterly-roadmap-inspection`
- Visual model: `timeline-rail-milestones`
- Motion model: `none`
- Semantic purpose: `product-roadmap-display`

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
