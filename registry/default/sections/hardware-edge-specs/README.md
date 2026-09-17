# Hardware Edge Specs

A bare-metal computing specifications overview showing NVMe IOPS, RAM allocation, and CPU isolates.

## Install

```bash
openui add hardware-edge-specs
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `sections` → subcategory `hardware`
- Interaction model: `hardware-edge-specs-interaction`
- Visual model: `hardware-edge-specs-visual`
- Motion model: `subtle`
- Semantic purpose: `hardware-edge-specs-section`

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
