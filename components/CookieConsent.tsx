'use client';

import { useState, useEffect } from 'react';

export default function CookieConsent() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) setShow(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const accept = () => {
        localStorage.setItem('cookie-consent', 'true');
        setShow(false);
    };

    if (!show) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-[100] flex flex-col md:flex-row items-center justify-between gap-4 max-w-screen-xl mx-auto">
            <p className="text-sm text-gray-600">
                We use cookies to improve your experience and show personalized ads. By using our site, you accept our <a href="/privacy-policy" className="text-red-700 underline">Privacy Policy</a>.
            </p>
            <button
                onClick={accept}
                className="bg-red-700 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-red-800 transition whitespace-nowrap"
            >
                Accept & Close
            </button>
        </div>
    );
}
