# Roadmap Quarterly Milestones

A forward-looking technical roadmap displaying upcoming milestones across Q1 through Q4.

## Install

```bash
openui add roadmap-quarterly-milestones
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `sections` → subcategory `roadmap`
- Interaction model: `roadmap-quarterly-milestones-interaction`
- Visual model: `roadmap-quarterly-milestones-visual`
- Motion model: `subtle`
- Semantic purpose: `roadmap-quarterly-milestones-section`

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
