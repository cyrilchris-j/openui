# Podcast Episode Stage

A featured multimedia stage showcasing podcast interviews, interactive progress scrubbers, and guest credentials.

## Install

```bash
openui add podcast-episode-stage
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `sections` → subcategory `media`
- Interaction model: `podcast-episode-stage-interaction`
- Visual model: `podcast-episode-stage-visual`
- Motion model: `subtle`
- Semantic purpose: `podcast-episode-stage-section`

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
