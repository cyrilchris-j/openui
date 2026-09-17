# Cloud Infrastructure Map

A geographical edge location matrix displaying active points of presence, latency pings, and redundancy.

## Install

```bash
openui add cloud-infrastructure-map
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `sections` → subcategory `infrastructure`
- Interaction model: `cloud-infrastructure-map-interaction`
- Visual model: `cloud-infrastructure-map-visual`
- Motion model: `subtle`
- Semantic purpose: `cloud-infrastructure-map-section`

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
