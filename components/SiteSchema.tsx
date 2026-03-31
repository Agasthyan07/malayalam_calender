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
            "https://www.malayalamcalendar.site/",
            "https://www.malayalamcalendar.site/malayalam-calendar/2026",
            "https://www.malayalamcalendar.site/festivals",

            "https://www.malayalamcalendar.site/rahu-kalam-today"
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
