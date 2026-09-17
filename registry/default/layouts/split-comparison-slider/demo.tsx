"use client";

import { SplitComparisonSlider } from "./split-comparison-slider";

export default function SplitComparisonSliderDemo() {
  return (
    <SplitComparisonSlider
      before={<div>Raw CSS (Uncurated)</div>}
      after={<div>OpenUI Token Registry</div>}
    />
  );
}
