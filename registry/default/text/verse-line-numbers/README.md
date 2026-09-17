# Verse Line Numbers

Poetry typesetting with margin line numbers every fifth line plus an active-line follower that brightens the number of the line currently in the viewport centre — scripture-style apparatus, live.

## Install

```bash
openui add verse-line-numbers
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `text` → subcategory `editorial`
- Interaction model: `viewport-line-follow`
- Visual model: `margin-numbered-verse`
- Motion model: `active-line-track`
- Semantic purpose: `verse-navigation`

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
