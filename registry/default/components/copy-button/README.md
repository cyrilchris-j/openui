# Copy Button

Copy with honest state: success, failure and an announcement for both.

## Props

| Prop          | Type                  | Default       | Notes                                      |
| ------------- | --------------------- | ------------- | ------------------------------------------ |
| `value`       | `string`              | —             | Text placed on the clipboard.               |
| `label`       | `string`              | `Copy`        | Idle label.                                 |
| `resetAfter`  | `number`              | `1800`        | ms before returning to idle.                |
| `onCopied`    | `(value) => void`     | —             | Called only on success.                     |

## Accessibility

- A `role="status"` region announces the outcome, so the state change is not
  visual-only.
- Failure is exposed as text (`Press ⌘C`), not just a colour.

## Notes

Falls back to `document.execCommand("copy")` when the async Clipboard API is
unavailable (insecure origin, older Safari, permission denied).
