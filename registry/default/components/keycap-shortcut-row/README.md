# Keycap Shortcut Row

A reference list row showing keyboard keys and description text for cheat sheets.

## Install

```bash
openui add keycap-shortcut-row
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `components` → subcategory `data-display`
- Interaction model: `passive-shortcut-reference`
- Visual model: `ruled-hotkey-table`
- Motion model: `none`
- Semantic purpose: `keyboard-cheatsheet-row`

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
