# Toggle Switch Card

A settings tile row containing descriptive label copy paired with a boolean toggle switch.

## Install

```bash
openui add toggle-switch-card
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `components` → subcategory `controls`
- Interaction model: `setting-tile-toggle`
- Visual model: `setting-row-chassis`
- Motion model: `lateral-switch-slide`
- Semantic purpose: `preference-toggle-card`

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
