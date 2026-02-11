'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

declare global {
    interface Window {
        googleTranslateElementInit?: () => void;
        google?: any;
    }
}

export default function GoogleTranslate() {
    const [isScriptLoaded, setIsScriptLoaded] = useState(false);

    useEffect(() => {
        window.googleTranslateElementInit = () => {
            if (window.google && window.google.translate) {
                new window.google.translate.TranslateElement(
                    {
                        pageLanguage: 'en',
                        includedLanguages: 'en,ml', // Only English and Malayalam
                        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
                        autoDisplay: false,
                    },
                    'google_translate_element'
                );
            }
        };
    }, []);

    return (
        <>
            <div id="google_translate_element" className="notranslate" />
            <Script
                src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
                strategy="afterInteractive"
                onLoad={() => setIsScriptLoaded(true)}
                onError={(e) => console.error('Google Translate script failed to load', e)}
            />
            <style jsx global>{`
        /* Hide the specific google translate toolbar */
        .goog-te-banner-frame.skiptranslate {
            display: none !important;
        } 
        body {
            top: 0px !important; 
        }
        /* Customize the widget sort of */
        #google_translate_element {
            display: inline-block;
        }
        .goog-te-gadget-simple {
            background-color: transparent !important;
            border: none !important;
            font-size: 10pt !important;
            padding: 0 !important;
        }
      `}</style>
        </>
    );
}
