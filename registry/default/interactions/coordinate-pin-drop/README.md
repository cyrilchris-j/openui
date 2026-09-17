# Coordinate Pin Drop

An interactive geographic coordinate canvas dropping draggable location pin beacons on user click.

## Install

```bash
openui add coordinate-pin-drop
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `interactions` → subcategory `pointer`
- Interaction model: `coordinate-pin-placement`
- Visual model: `cartographic-grid-pins`
- Motion model: `point-drop-settle`
- Semantic purpose: `spatial-pin-annotator`

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
