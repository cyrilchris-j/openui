import { VerseLineNumbers } from "./verse-line-numbers";

export default function Demo() {
  return (
    <div className="min-h-[70vh] bg-paper p-10">
      <VerseLineNumbers
        lines={[
          "The registry keeps what frameworks discard:",
          "a file, a name, a set of promises.",
          "",
          "Scroll slowly. Watch the numbers",
          "burn red as the verse line",
          "crosses the centre of the page,",
          "then cool to grey again.",
          "",
          "Nothing here is decoration.",
          "The apparatus is the point.",
        ]}
        className="max-w-md"
      />
    </div>
  );
}
