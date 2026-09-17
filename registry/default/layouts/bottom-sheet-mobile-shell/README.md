# Bottom Sheet Mobile Shell

Mobile-optimized viewport shell with top navigation bar and sliding bottom sheet drawer.

## Install

```bash
openui add bottom-sheet-mobile-shell
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `layouts` → subcategory `shells`
- Interaction model: `mobile-bottom-sheet-tray`
- Visual model: `handheld-viewport-shell`
- Motion model: `none`
- Semantic purpose: `handheld-mobile-shell`

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
