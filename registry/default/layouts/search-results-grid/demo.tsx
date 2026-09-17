"use client";

import { SearchResultsGrid } from "./search-results-grid";

export default function SearchResultsGridDemo() {
  return (
    <SearchResultsGrid
      filters={
        <div className="text-xs space-y-1">
          <div className="font-bold mb-2">Category</div>
          <div>Components (100)</div>
          <div>Backgrounds (100)</div>
        </div>
      }
    >
      <div className="p-4 rounded-xl border border-line bg-paper text-xs">Result Item A</div>
      <div className="p-4 rounded-xl border border-line bg-paper text-xs">Result Item B</div>
    </SearchResultsGrid>
  );
}
