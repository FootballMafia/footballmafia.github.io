self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("impostor-v1").then(cache => {
      return cache.addAll([
        "./",
        "./index.html"
      ]);
    })
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js");
}
