const CACHE = 'expense-v1';
self.addEventListener('install', e => { self.skipWaiting(); });
self.addEventListener('activate', e => { self.clients.claim(); });
self.addEventListener('fetch', e => {
  if (e.request.url.includes('open.er-api.com')) return;
  if (e.request.url.includes('jsdelivr.net')) return;
  if (e.request.url.endsWith('expense.html') || e.request.url.endsWith('/')) return;
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
