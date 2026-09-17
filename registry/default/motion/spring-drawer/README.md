# Spring Drawer

A drawer that follows the finger 1:1 during drag and uses a velocity-aware spring on release: fast flicks complete the gesture even past the halfway mark, slow drags need majority travel — gesture semantics done properly.

## Install

```bash
openui add spring-drawer
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `motion` → subcategory `gesture`
- Interaction model: `drag-to-dismiss`
- Visual model: `edge-panel`
- Motion model: `velocity-spring-settle`
- Semantic purpose: `sheet-navigation`

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
