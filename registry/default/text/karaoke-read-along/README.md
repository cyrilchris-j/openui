# Karaoke Read-Along

A paragraph that highlights each chunk in sync with a timer while an aria-live region reads the current chunk — designed for language learning and read-along accessibility, with speed control and pause.

## Install

```bash
openui add karaoke-read-along
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `text` → subcategory `accessible`
- Interaction model: `playback-control`
- Visual model: `progressive-highlight`
- Motion model: `timed-advance`
- Semantic purpose: `guided-reading`

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
