# Count Up Spring

Numeric tween driven by a spring, not an easing curve: the displayed value overshoots the target and settles, digits use tabular numerals so widths never jitter, and re-targeting mid-flight re-targets the spring without restart.

## Install

```bash
openui add count-up-spring
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `motion` → subcategory `data`
- Interaction model: `value-change-trigger`
- Visual model: `overshooting-numeral`
- Motion model: `spring-value-integrator`
- Semantic purpose: `metric-attention`

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
