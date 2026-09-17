# Elastic Split Reveal

A split-screen curtain reveal dividing a surface along a central diagonal or horizontal axis with rubberband overshoot on trigger.

## Install

```bash
openui add elastic-split-reveal
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `motion` → subcategory `reveal`
- Interaction model: `toggle-split-parting`
- Visual model: `bisected-shutter-panels`
- Motion model: `bipartite-spring-parting`
- Semantic purpose: `canvas-content-unveil`

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
