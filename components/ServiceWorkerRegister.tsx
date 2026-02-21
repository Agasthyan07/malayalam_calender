'use client';

import { useEffect } from 'react';

/**
 * Deferred Service Worker registration.
 * Waits for the 'load' event so SW registration never competes
 * with critical page resources — eliminates long main-thread task.
 */
export default function ServiceWorkerRegister() {
    useEffect(() => {
        if ('serviceWorker' in navigator) {
            // Defer until all page resources have loaded
            const register = () => {
                navigator.serviceWorker
                    .register('/sw.js')
                    .then((registration) => {
                        if (process.env.NODE_ENV === 'development') {
                            console.log('SW registered:', registration.scope);
                        }
                    })
                    .catch((err) => {
                        if (process.env.NODE_ENV === 'development') {
                            console.error('SW registration failed:', err);
                        }
                    });
            };

            if (document.readyState === 'complete') {
                register();
            } else {
                window.addEventListener('load', register, { once: true });
            }
        }
    }, []);

    return null;
}
