# Keyboard Focus Trap Modal

An accessible modal dialog containing an active keyboard focus loop that traps tab key cycles.

## Install

```bash
openui add keyboard-focus-trap-modal
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `interactions` → subcategory `keyboard`
- Interaction model: `trapped-tab-cycle`
- Visual model: `modal-chassis-bounds`
- Motion model: `bounded-focus-loop`
- Semantic purpose: `focus-trapped-dialog`

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
