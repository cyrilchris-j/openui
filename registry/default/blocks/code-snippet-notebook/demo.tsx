"use client";

import { CodeSnippetNotebook } from "./code-snippet-notebook";

export default function Demo() {
  return (
    <div className="w-full min-h-[300px] p-4 flex items-center justify-center bg-neutral-900">
      <CodeSnippetNotebook />
    </div>
  );
}
