# Toast Region

Genre: Technical
Macrostructure: Stack
Density: Compact
Shape: Sharp
Motion: Subtle
Typography: Monospace
Color: Accent Only

## Motion

Fast: 180ms
Normal: 240ms
Slow: 320ms

## Rules

- Errors are assertive and persist longer; everything else is polite.
- Toasts never take focus and never block the underlying interface.
- One region, mounted for the lifetime of the app.
- The border colour carries the tone; never fill the surface with a saturated tint.

## Avoid

- Stacking more than three toasts at once.
- Auto-dismissing an error the user must act on.
- Toasts for information the user can already see.
