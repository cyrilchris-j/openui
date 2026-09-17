# Password Generator Vault

A cryptographic password generator with customizable length slider, character toggles, and copy confirmation.

## Install

```bash
openui add password-generator-vault
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `blocks` → subcategory `security`
- Interaction model: `random-password-generation-slider`
- Visual model: `credential-vault-generator-card`
- Motion model: `subtle`
- Semantic purpose: `credential-entropy-generator`

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
