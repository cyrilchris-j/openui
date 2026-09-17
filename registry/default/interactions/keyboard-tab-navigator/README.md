# Keyboard Tab Navigator

A keyboard focus trap container illustrating active focus rings and tab loop navigation.

## Install

```bash
openui add keyboard-tab-navigator
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `interactions` → subcategory `keyboard`
- Interaction model: `tab-key-roving-focus`
- Visual model: `illuminated-focus-bounds`
- Motion model: `stepwise-focus-handoff`
- Semantic purpose: `keyboard-focus-ring-manager`

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
