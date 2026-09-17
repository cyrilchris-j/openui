import * as React from "react";

import { BlobPreview } from "./BlobPreview.js";
import { buildSandboxFiles } from "./files.js";
import { loadItem } from "../../lib/registry.js";

/**
 * The preview pane for a catalogue tile.
 *
 * Kept separate from `TilePreview` so the sandbox machinery (and its lazy
 * chunk) is only downloaded by tiles that actually became visible. Loading is
 * promise-based rather than hook-based because the tile already owns the
 * in-view lifecycle; this component only needs the artifact.
 */
export function TileSandbox({ name }: { name: string }): React.JSX.Element {
  const [files, setFiles] = React.useState<Record<string, string> | null>(null);
  const [failed, setFailed] = React.useState(false);

  React.useEffect(() => {
    let active = true;
    loadItem(name)
      .then((item) => {
        if (!active) return;
        setFiles(buildSandboxFiles(item));
      })
      .catch(() => {
        if (active) setFailed(true);
      });
    return () => {
      active = false;
    };
  }, [name]);

  if (failed) {
    return (
      <div className="flex h-44 items-center justify-center bg-ink/[0.02]">
        <p className="eyebrow text-[10px] text-graphite">preview unavailable</p>
      </div>
    );
  }

  if (!files) {
    return (
      <div className="flex h-44 items-center justify-center bg-ink/[0.02]">
        <p className="eyebrow text-[10px] text-graphite">loading preview…</p>
      </div>
    );
  }

  return <BlobPreview files={files} height="11rem" />;
}
