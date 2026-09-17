# Fluid Tab Indicator

A segmented tab bar featuring a liquid underline that stretches and snaps between targets with non-linear spring physics.

## Install

```bash
openui add fluid-tab-indicator
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `motion` → subcategory `tabs`
- Interaction model: `click-select-tab`
- Visual model: `elastic-underline-pill`
- Motion model: `asymmetric-stretching-glide`
- Semantic purpose: `view-switcher-rail`

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
