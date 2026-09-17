# Physics Pendulum Dial

An angular balance indicator suspended from a top pivot that swings with gravitational restoring torque and damped oscillations when pulled.

## Install

```bash
openui add physics-pendulum-dial
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `motion` → subcategory `physics`
- Interaction model: `rotational-drag-release`
- Visual model: `pivoted-plumb-bob`
- Motion model: `damped-angular-harmonic-oscillator`
- Semantic purpose: `angle-tilt-meter`

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
