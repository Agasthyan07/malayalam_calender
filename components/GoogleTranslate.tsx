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
            /* Customize the widget sort of */
            .goog-te-gadget {
                font-family: inherit !important;
                font-size: 0 !important; /* Hide "Powered by Google" */
            }
            .goog-te-gadget span {
                display: none !important; /* Hide "Powered by Google" text */
            }
            .goog-te-gadget .goog-te-combo {
                margin: 0 !important;
                padding: 4px 8px !important;
                border: 1px solid #e5e7eb !important;
                border-radius: 6px !important;
                font-size: 14px !important;
                color: #374151 !important;
                background-color: white !important;
                cursor: pointer !important;
                outline: none !important;
            }
            #google_translate_element img {
                display: none !important;
            }
      `}</style>
        </>
    );
}
