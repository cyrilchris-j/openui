# Keyboard Command Palette Menu

A fast terminal-style action selector navigable exclusively via keyboard arrow keys and return triggers.

## Install

```bash
openui add keyboard-command-palette-menu
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `interactions` → subcategory `keyboard`
- Interaction model: `arrow-key-command-navigation`
- Visual model: `terminal-palette-list`
- Motion model: `stepwise-selection-jump`
- Semantic purpose: `terminal-command-menu`

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
