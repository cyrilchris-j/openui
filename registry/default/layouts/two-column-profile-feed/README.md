# Two Column Profile Feed

Social profile view with sticky user bio credentials on left and chronological post stream on right.

## Install

```bash
openui add two-column-profile-feed
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `layouts` → subcategory `splits`
- Interaction model: `profile-bio-and-stream-scroll`
- Visual model: `sticky-bio-and-activity-stream`
- Motion model: `none`
- Semantic purpose: `user-profile-and-activity-layout`

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
