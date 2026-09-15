import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { App } from "./app/App.js";
import "./styles/app.css";

/**
 * Client entrypoint.
 *
 * The root element is asserted rather than defaulted: a missing `#root` means
 * the HTML and the bundle have diverged, and a blank page with no error is the
 * worst possible failure mode to debug.
 */
const container = document.getElementById("root");
if (!container) {
  throw new Error("Root element #root is missing from index.html.");
}

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
