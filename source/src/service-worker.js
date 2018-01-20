var cacheName = 'trippur';
var filesToCache = [
  '/',
  '/index.html',
  '/favicon.ico',
  '/share.jpg',
  '/apple-touch-icon-72x72.png',
  '/apple-touch-icon-114x114.png',
  '/apple-touch-icon.png',
  '/static/css/main.css',
  '/static/css/main.css.map',
  '/static/js/main.js',
  '/static/js/main.js.map',
  '/static/media/back0.jpg',
  '/static/media/back1.jpg',
  '/static/media/back2.jpg',
  '/static/media/back3.jpg',
  '/static/media/Bangkok.jpg',
  '/static/media/Dubai.jpg',
  '/static/media/NewYork.jpg',
  '/static/media/Paris.jpg',
  '/static/media/Singapore.jpg',
  '/static/media/Venice.jpg',
  '/static/media/icomoon.ttf',
  '/static/media/icomoon.svg',
  '/static/media/icomoon.eot',
  '/static/media/icomoon.woff',
  '/static/media/trippur-coral.svg',
  '/static/media/trippur-white.svg',
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});
self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});
self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
