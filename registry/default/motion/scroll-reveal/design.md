# Scroll Reveal

Genre: Editorial
Macrostructure: Asymmetric
Density: Airy
Shape: Sharp
Motion: Subtle
Typography: Grotesk
Color: Monochrome

## Motion

Fast: 180ms
Normal: 320ms
Slow: 560ms

## Rules

- Reveal once. Never re-trigger on scroll direction change.
- Travel stays under 24px; a reveal is a settle, not an entrance.
- Content is visible without JavaScript; animation is additive.
- Stagger direct children only, by 60–120ms.

## Avoid

- Revealing every element on the page.
- Fading from 0 opacity with a delay long enough to look broken.
- Slide-ins from the side on large blocks.
