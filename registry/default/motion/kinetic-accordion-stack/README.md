# Kinetic Accordion Stack

A vertical accordion whose content height expands and contracts with smooth spring damping physics.

## Install

```bash
openui add kinetic-accordion-stack
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `motion` → subcategory `gestures`
- Interaction model: `spring-disclosure-toggle`
- Visual model: `vertically-stacked-slabs`
- Motion model: `spring-height-damping`
- Semantic purpose: `spring-disclosure-accordion`

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
