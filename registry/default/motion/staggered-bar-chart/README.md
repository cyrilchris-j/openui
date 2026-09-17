# Staggered Bar Chart

An animated analytics histogram whose vertical bars rise sequentially with staggered elastic spring overshoot on trigger.

## Install

```bash
openui add staggered-bar-chart
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `motion` → subcategory `data`
- Interaction model: `mount-cascade-trigger`
- Visual model: `vertical-histogram-columns`
- Motion model: `staggered-spring-growth`
- Semantic purpose: `data-growth-histogram`

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
