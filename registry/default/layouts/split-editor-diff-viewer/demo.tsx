"use client";

import { SplitEditorDiffViewer } from "./split-editor-diff-viewer";

export default function SplitEditorDiffViewerDemo() {
  return (
    <SplitEditorDiffViewer
      original={<div>- const version = "0.9.4";</div>}
      modified={<div>+ const version = "1.0.0";</div>}
    />
  );
}
