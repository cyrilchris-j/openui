# User Profile Settings Hub

A complete profile preferences block featuring avatar editing, account security, and notification preference controls.

## Install

```bash
openui add user-profile-settings-hub
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `blocks` → subcategory `settings`
- Interaction model: `form-state-management-and-avatar-picker`
- Visual model: `profile-account-settings-form`
- Motion model: `subtle`
- Semantic purpose: `user-account-management`

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
