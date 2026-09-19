const CACHE_NAME = "panthers-halftime-v1";

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./assets/halftime-background.jpg",
  "./assets/FUDGrotesk-Bold.ttf",

  "./assets/logos/Panthers 1977.png",
  "./assets/logos/Issese.png",
  "./assets/logos/Mombrettese.png",
  "./assets/logos/Excelsior.png",
  "./assets/logos/Polisportiva Oratorio 2B.png",
  "./assets/logos/Città di Sesto.png",
  "./assets/logos/Oratorio 2B.png",
  "./assets/logos/San Martino.png",
  "./assets/logos/Calcio Schuster.png",
  "./assets/logos/Football Club Milanese.png",
  "./assets/logos/Trescore.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(FILES_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        return cachedResponse || fetch(event.request);
      })
  );
});