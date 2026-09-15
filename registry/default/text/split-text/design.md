# Split Text

Genre: Editorial
Macrostructure: Asymmetric
Density: Airy
Shape: Sharp
Motion: Expressive
Typography: Serif Display
Color: Monochrome

## Motion

Fast: 180ms
Normal: 320ms
Slow: 620ms

## Rules

- Split on words, never letters; letters break find-in-page and screen readers.
- Reveal once, on the sentence that carries the argument.
- Keep the travel under 0.5em so the paragraph does not reflow.
- The wrapper's accessible name must be the whole sentence.

## Avoid

- Reveals longer than 900ms total.
- Per-character stagger on paragraphs.
- Reveals that replay when scrolling back up.
