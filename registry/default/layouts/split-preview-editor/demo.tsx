"use client";

import { SplitPreviewEditor } from "./split-preview-editor";

export default function SplitPreviewEditorDemo() {
  return (
    <SplitPreviewEditor
      editor={<div>const Button = () =&gt; &lt;button&gt;Click Me&lt;/button&gt;;</div>}
      preview={<button type="button" className="px-4 py-2 rounded bg-accent text-white font-sans text-xs">Click Me</button>}
    />
  );
}
