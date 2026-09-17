# Virtual Keyboard Numpad

Tactile on-screen PIN/numeric keypad for POS terminals and verification gates with backspace and clear.

## Install

```bash
openui add virtual-keyboard-numpad
```

Dependencies: lucide-react.

## What makes it distinct

- Category: `components` → subcategory `controls`
- Interaction model: `touch-keypad-pin-entry`
- Visual model: `three-column-button-grid`
- Motion model: `none`
- Semantic purpose: `secure-pin-input`

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
