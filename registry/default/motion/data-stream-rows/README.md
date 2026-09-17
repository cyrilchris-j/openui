# Data Stream Rows

Streaming rows enter at the top and push older rows down with a measured slide (FLIP), each new row flashing once on arrival — the motion of a live feed, honest about the fact that data keeps arriving.

## Install

```bash
openui add data-stream-rows
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `motion` → subcategory `data`
- Interaction model: `interval-push`
- Visual model: `measured-feed-insert`
- Motion model: `flip-push-slide`
- Semantic purpose: `live-monitoring`

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
