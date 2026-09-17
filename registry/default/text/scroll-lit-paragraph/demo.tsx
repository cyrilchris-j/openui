import { ScrollLitParagraph } from "./scroll-lit-paragraph";

export default function Demo() {
  return (
    <div className="min-h-[80vh] bg-paper p-10">
      <div className="h-[30vh]" />
      <ScrollLitParagraph className="w-full max-w-2xl">
        Scroll and watch the light travel. Each word waits for the page to bring it forward. This is how a long-form reading experience can show position without a progress bar: the text itself becomes the indicator, and the eye never leaves the sentence.
      </ScrollLitParagraph>
      <div className="h-[40vh]" />
    </div>
  );
}
