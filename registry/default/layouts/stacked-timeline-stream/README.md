# Stacked Timeline Stream

Single-column vertical activity feed with avatar indicators and connecting timeline guides.

## Install

```bash
openui add stacked-timeline-stream
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `layouts` → subcategory `stacks`
- Interaction model: `activity-stream-scroll`
- Visual model: `vertical-timeline-wire`
- Motion model: `none`
- Semantic purpose: `activity-audit-stream`

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
