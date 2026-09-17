# Stepped Timeline Milestones

A chronological milestone rail snapping to historical date nodes with informational card tooltips.

## Install

```bash
openui add stepped-timeline-milestones
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `interactions` → subcategory `pointer`
- Interaction model: `milestone-notch-snapping`
- Visual model: `chronological-station-track`
- Motion model: `stepwise-station-advance`
- Semantic purpose: `chronological-station-scrubber`

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
