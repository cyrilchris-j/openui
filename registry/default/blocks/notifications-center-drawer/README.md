# Notifications Center Drawer

A slide-out alerts drawer featuring unread count badges, clear actions, and categorized notification items.

## Install

```bash
openui add notifications-center-drawer
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `blocks` → subcategory `notifications`
- Interaction model: `notification-tray-mark-read`
- Visual model: `slideout-activity-alerts-tray`
- Motion model: `subtle`
- Semantic purpose: `user-system-notifications`

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
