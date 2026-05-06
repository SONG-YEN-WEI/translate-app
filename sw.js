const CACHE = 'jptrans-v2';
const ASSETS = [
  './manifest.json'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  // 永遠不快取這些，確保每次都拿最新版
  if (
    e.request.url.includes('api.anthropic.com') ||
    e.request.url.includes('workers.dev') ||
    e.request.url.includes('cdn.jsdelivr.net') ||
    e.request.url.endsWith('index.html') ||
    e.request.url.endsWith('/')
  ) {
    return;
  }
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
