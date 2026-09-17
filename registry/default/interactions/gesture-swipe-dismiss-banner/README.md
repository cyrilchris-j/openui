# Gesture Swipe Dismiss Banner

An alert notification ribbon that translates laterally and dissolves when swiped horizontally past threshold.

## Install

```bash
openui add gesture-swipe-dismiss-banner
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `interactions` → subcategory `gestures`
- Interaction model: `lateral-banner-dismiss-swipe`
- Visual model: `dismissible-alert-ribbon`
- Motion model: `lateral-ejection-dissolve`
- Semantic purpose: `swipeable-notice-banner`

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
