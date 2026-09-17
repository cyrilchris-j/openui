# Two-Factor Auth Setup

A time-based one-time password (TOTP) setup card featuring authenticator QR placeholder and verification code field.

## Install

```bash
openui add two-factor-auth-setup
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `blocks` → subcategory `auth`
- Interaction model: `totp-code-verification-setup`
- Visual model: `two-factor-authenticator-card`
- Motion model: `subtle`
- Semantic purpose: `mfa-security-provisioning`

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
