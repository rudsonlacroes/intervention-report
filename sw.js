const CACHE_NAME = 'fortna-report-v1';
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './translations.js',
  './app.js',
  './manifest.json',
  'https://cdn.tailwindcss.com'
];

// Installatie: bestanden in cache opslaan
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// Ophalen: eerst proberen van netwerk, anders uit cache
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});