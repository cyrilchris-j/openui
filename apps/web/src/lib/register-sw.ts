/**
 * PWA Service Worker Registration
 */
export function registerServiceWorker(): void {
  if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
    return;
  }

  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        // Check for updates periodically
        registration.addEventListener("updatefound", () => {
          const installingWorker = registration.installing;
          if (installingWorker == null) return;
          installingWorker.addEventListener("statechange", () => {
            if (installingWorker.state === "installed") {
              if (navigator.serviceWorker.controller) {
                // New content is available once current tabs are closed or updated
                console.info("[PWA] New content available. Refresh to update.");
              } else {
                console.info("[PWA] Content cached for offline use.");
              }
            }
          });
        });
      })
      .catch((error) => {
        console.warn("[PWA] Service worker registration failed:", error);
      });
  });
}
