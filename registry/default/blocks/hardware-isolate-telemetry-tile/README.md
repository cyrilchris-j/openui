# Hardware Isolate Telemetry Tile

An isolated V8 runtime memory gauge showing heap allocations and garbage collection duration.

## Install

```bash
openui add hardware-isolate-telemetry-tile
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `blocks` → subcategory `telemetry`
- Interaction model: `isolate-resource-telemetry-gauge`
- Visual model: `v8-memory-heap-tile`
- Motion model: `subtle`
- Semantic purpose: `v8-isolate-heap-monitoring`

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
