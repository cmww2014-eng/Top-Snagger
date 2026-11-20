const CACHE = 'top-snagger-v15';
const SHELL = ['./', './index.html', './docx.umd.js', './pdf.min.js', './pdf.worker.min.js', './jspdf.umd.min.js', './jspdf.plugin.autotable.min.js', './xlsx.full.min.js', './manifest.webmanifest', './icon-hand.svg', './icon-hand-192.png', './icon-hand-512.png', './icon-hand-maskable-512.png', './apple-touch-icon.png'];
// install fresh copies (bypassing the browser cache), take over straight away
self.addEventListener('install', e => e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL.map(u => new Request(u, { cache: 'reload' })))).then(() => self.skipWaiting())));
self.addEventListener('activate', e => e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;
  // the page itself, the manifest and the layouts: always try the network first, so updates show at once
  if (req.mode === 'navigate' || /\/(index\.html|manifest\.webmanifest|layouts\.bin)?$/.test(url.pathname) || url.pathname.endsWith('.webmanifest')) {
    e.respondWith(fetch(req, { cache: 'no-store' }).then(r => {
      if (r.ok && !url.pathname.endsWith('layouts.bin')) { const cp = r.clone(); caches.open(CACHE).then(c => c.put(req.mode === 'navigate' ? './index.html' : req, cp)); }
      return r;
    }).catch(() => caches.match(req, { ignoreSearch: true }).then(h => h || caches.match('./index.html'))));
    return;
  }
  // libraries and icons: cache first (they change name or the cache version when updated)
  e.respondWith(caches.match(req, { ignoreSearch: true }).then(hit => hit || fetch(req).then(r => { if (r.ok) { const cp = r.clone(); caches.open(CACHE).then(c => c.put(req, cp)); } return r; })));
});
