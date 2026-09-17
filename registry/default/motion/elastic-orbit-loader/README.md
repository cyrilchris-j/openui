# Elastic Orbit Loader

A celestial loading spinner featuring multi-satellite nodes orbiting an elliptical nucleus with gravitational acceleration at periapsis and spring-tethered lag.

## Install

```bash
openui add elastic-orbit-loader
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `motion` → subcategory `orbital`
- Interaction model: `continuous-playback`
- Visual model: `concentric-orbital-traces`
- Motion model: `keplerian-gravitational-orbit`
- Semantic purpose: `loading-progress-indicator`

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
