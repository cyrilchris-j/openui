# Keyboard Shortcut Matrix

An interactive keycap layout matrix displaying active keypress states and hotkey binding triggers in real time.

## Install

```bash
openui add keyboard-shortcut-matrix
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `interactions` → subcategory `keyboard`
- Interaction model: `keycap-press-visualization`
- Visual model: `sculpted-keyboard-cap-matrix`
- Motion model: `bistable-key-depression`
- Semantic purpose: `hotkey-tester-matrix`

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
