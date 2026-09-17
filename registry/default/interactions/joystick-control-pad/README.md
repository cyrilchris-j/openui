# Joystick Control Pad

A virtual 2D analog thumbstick that displaces within a circular constraint zone tracking pointer drag vectors.

## Install

```bash
openui add joystick-control-pad
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `interactions` → subcategory `gestures`
- Interaction model: `polar-joystick-displacement`
- Visual model: `radial-gimbal-pad`
- Motion model: `clamped-radial-spring-recenter`
- Semantic purpose: `virtual-analog-controller`

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
