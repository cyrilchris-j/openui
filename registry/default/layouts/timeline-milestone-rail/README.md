# Timeline Milestone Rail

Vertical chronological timeline spine with alternating milestone event cards.

## Install

```bash
openui add timeline-milestone-rail
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `layouts` → subcategory `stacks`
- Interaction model: `chronological-spine-scroll`
- Visual model: `central-spine-timeline`
- Motion model: `none`
- Semantic purpose: `roadmap-milestone-timeline`

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
