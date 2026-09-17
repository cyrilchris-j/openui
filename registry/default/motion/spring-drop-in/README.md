# Spring Drop In

Entrance motion built on a critically damped spring equation run in rAF: element falls from above with velocity-carrying overshoot, one bounce below rest position, then settles — parameterised by stiffness and damping, not keyframes.

## Install

```bash
openui add spring-drop-in
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `motion` → subcategory `entrance`
- Interaction model: `in-view-trigger`
- Visual model: `single-element-drop`
- Motion model: `damped-spring-integrator`
- Semantic purpose: `entrance-attention`

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
