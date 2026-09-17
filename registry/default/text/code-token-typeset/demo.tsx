import { CodeTokenTypeset } from "./code-token-typeset";

export default function Demo() {
  return (
    <div className="flex min-h-[11rem] items-center justify-center bg-paper p-10 text-lg">
      <p className="text-ink">
        Call <CodeTokenTypeset>registry.get("magnetic-button")</CodeTokenTypeset> to load it — the default returns {" "}
        <CodeTokenTypeset>null</CodeTokenTypeset> for missing items.
      </p>
    </div>
  );
}
