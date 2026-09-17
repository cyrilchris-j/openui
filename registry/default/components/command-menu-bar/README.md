# Command Menu Bar

A compact horizontal action ribbon containing tool buttons, key shortcuts, and divider rules.

## Install

```bash
openui add command-menu-bar
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `components` → subcategory `navigation`
- Interaction model: `toolbar-action-invocation`
- Visual model: `divided-toolbar-rack`
- Motion model: `none`
- Semantic purpose: `document-tool-ribbon`

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
