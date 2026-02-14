import Script from 'next/script';

export default function SiteSchema() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "SiteNavigationElement",
        "name": [
            "Home",
            "2026 Calendar",
            "Festivals",

            "Rahu Kalam"
        ],
        "url": [
            "https://malayalamcalendar.site/",
            "https://malayalamcalendar.site/calendar-2026",
            "https://malayalamcalendar.site/festivals",

            "https://malayalamcalendar.site/rahu-kalam-today"
        ]
    };

    return (
        <Script
            id="site-nav-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
