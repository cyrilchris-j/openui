# Changelog Timeline Compact

A streamlined vertical timeline for minor releases, dependency bumps, and rapid fixes.

## Install

```bash
openui add changelog-timeline-compact
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `sections` → subcategory `changelog`
- Interaction model: `changelog-timeline-compact-interaction`
- Visual model: `changelog-timeline-compact-visual`
- Motion model: `subtle`
- Semantic purpose: `changelog-timeline-compact-section`

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
