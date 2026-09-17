# Magnetic Switch Slider

An industrial toggle lever sliding smoothly along a linear track with metallic snap detents and spring vibration.

## Install

```bash
openui add magnetic-switch-slider
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `motion` → subcategory `controls`
- Interaction model: `lever-bistable-throw`
- Visual model: `metallic-knife-switch`
- Motion model: `bistable-mechanical-snap`
- Semantic purpose: `industrial-breaker-switch`

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
