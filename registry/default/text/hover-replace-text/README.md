# Hover Replace Text

Two stacked labels that cross-fade and slide on hover with a directional bias from the pointer's entry side; tap toggles on touch, and keyboard focus triggers the same swap.

## Install

```bash
openui add hover-replace-text
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `text` → subcategory `interactive`
- Interaction model: `hover-swap`
- Visual model: `layered-labels`
- Motion model: `directional-cross-fade`
- Semantic purpose: `link-emphasis`

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
