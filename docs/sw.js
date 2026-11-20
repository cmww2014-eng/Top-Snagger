const CACHE = 'top-snagger-v11';
const SHELL = ['./', './index.html', './docx.umd.js', './pdf.min.js', './pdf.worker.min.js', './jspdf.umd.min.js', './jspdf.plugin.autotable.min.js', './xlsx.full.min.js', './manifest.webmanifest', './icon-hand.svg', './icon-hand-192.png', './icon-hand-512.png', './icon-hand-maskable-512.png', './apple-touch-icon.png'];
self.addEventListener('install', e => e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())));
self.addEventListener('activate', e => e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then(hit => {
    const net = fetch(e.request).then(r => { if (r && (r.ok || r.type === 'opaque')) { const cp = r.clone(); caches.open(CACHE).then(c => c.put(e.request, cp)); } return r; }).catch(() => hit);
    return hit || net;
  }));
});
