# Idle Fade Whisper

Ambient text that slowly fades toward invisibility while the reader is idle and breathes back on any input — presence-aware typography that rewards attention instead of demanding it.

## Install

```bash
openui add idle-fade-whisper
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `text` → subcategory `interactive`
- Interaction model: `idle-decay`
- Visual model: `attention-fade`
- Motion model: `slow-opacity-drift`
- Semantic purpose: `ambient-message`

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
