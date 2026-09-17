# Elastic Badge Pop

An interactive notification badge pill that squashes and springs into existence with vibrant rubberband momentum.

## Install

```bash
openui add elastic-badge-pop
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `motion` → subcategory `feedback`
- Interaction model: `toggle-pill-pop`
- Visual model: `elastic-rubber-badge`
- Motion model: `squash-and-stretch-spring`
- Semantic purpose: `notification-callout-badge`

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
