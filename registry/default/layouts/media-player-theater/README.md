# Media Player Theater

Cinema 16:9 media viewport above with playlist queue and comments below.

## Install

```bash
openui add media-player-theater
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `layouts` → subcategory `shells`
- Interaction model: `theater-viewport-below-queue`
- Visual model: `cinema-stage-with-queue`
- Motion model: `none`
- Semantic purpose: `cinema-media-playback`

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
