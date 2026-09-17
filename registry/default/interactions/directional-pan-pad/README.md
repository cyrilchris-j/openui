# Directional Pan Pad

A four-way cross D-pad allowing orthogonal coordinate navigation with tactile keycap depression states.

## Install

```bash
openui add directional-pan-pad
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `interactions` → subcategory `gestures`
- Interaction model: `cardinal-dpad-navigation`
- Visual model: `cruciform-dpad-chassis`
- Motion model: `bistable-direction-latch`
- Semantic purpose: `cardinal-directional-pad`

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
