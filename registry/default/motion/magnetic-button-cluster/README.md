# Magnetic Button Cluster

An array of navigation pills that displace collectively toward cursor proximity with inverted spring tension.

## Install

```bash
openui add magnetic-button-cluster
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `motion` → subcategory `cursor`
- Interaction model: `pointer-proximity-displacement`
- Visual model: `constellation-pill-cluster`
- Motion model: `inverse-square-displacement`
- Semantic purpose: `interactive-cta-cluster`

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
