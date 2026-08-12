const CACHE_NAME = 'sqa-prep-v1';

const PRECACHE_URLS = [
  './',
  'index.html',
  'manifest.json',
  'level1-lesson1.html',
  'level1-lesson2.html',
  'level1-lesson3.html',
  'level2-lesson1.html',
  'level2-lesson2.html',
  'level2-lesson3.html',
  'level2-lesson4.html',
  'level3-lesson1.html',
  'level3-lesson2.html',
  'level4-lesson1.html',
  'level4-lesson2.html',
  'level5-lesson1.html',
  'level5-lesson2.html',
  'level6-lesson1.html',
  'level7-lesson1.html',
  'level7-lesson2.html',
  'level8-lesson1.html',
  'level8-lesson2.html',
  'level9-lesson1.html',
  'level9-lesson2.html',
  'level10-lesson1.html',
  'level11-lesson1.html',
  'level12-lesson1.html',
  'level13-lesson1.html',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/icon-maskable-512.png',
  'icons/apple-touch-icon.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      })
      .catch(() =>
        caches.match(event.request).then((cached) => cached || caches.match('index.html'))
      )
  );
});
