const CACHE_NAME = 'malayalam-calendar-v1';

const PRECACHE_ASSETS = [
    '/',
    '/icon.png',
    '/manifest.json'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(PRECACHE_ASSETS))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') return;

    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            // Return cached response if found
            if (cachedResponse) {
                return cachedResponse;
            }

            // Otherwise fetch from network
            return fetch(event.request).then((networkResponse) => {
                // Build a clone of the response since it can only be consumed once
                const responseClone = networkResponse.clone();

                // Check if we received a valid response
                if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
                    return networkResponse;
                }

                // Cache the response
                caches.open(CACHE_NAME).then((cache) => {
                    // Only cache same-origin requests
                    if (event.request.url.startsWith(self.location.origin)) {
                        cache.put(event.request, responseClone);
                    }
                });

                return networkResponse;
            });
        })
    );
});
