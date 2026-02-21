'use client';

import dynamic from 'next/dynamic';

/**
 * Thin client-component wrapper that lazy-loads CookieConsent.
 * This prevents CookieConsent from being included in the critical JS bundle.
 * `ssr: false` is only valid in Client Components (not Server Components).
 */
const CookieConsentLazy = dynamic(() => import('@/components/CookieConsent'), {
    ssr: false,
});

export default function LazyClientComponents() {
    return <CookieConsentLazy />;
}
