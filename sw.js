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
let deferredPrompt;

window.addEventListener("beforeinstallprompt", e => {
  e.preventDefault();
  deferredPrompt = e;
  document.getElementById("installBtn").style.display = "block";
});

document.getElementById("installBtn").addEventListener("click", () => {
  deferredPrompt.prompt();
});
