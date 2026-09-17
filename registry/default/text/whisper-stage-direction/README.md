# Whisper Stage Direction

Play-script typography where italic stage directions sit inset from the speech, character names are tracked caps on their own line, and clicking a direction highlights the affected character's next line — theatre markup made navigable.

## Install

```bash
openui add whisper-stage-direction
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `text` → subcategory `editorial`
- Interaction model: `click-highlight-cast`
- Visual model: `inset-direction-blocks`
- Motion model: `highlight-link`
- Semantic purpose: `dramatic-text`

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
