import Script from 'next/script';

export default function DatasetSchema() {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Dataset',
        'name': 'Malayalam Calendar 2026 Data',
        'description': 'Comprehensive daily Malayalam Calendar data for the year 2026, including Nakshatram, Tithi, Rahu Kalam, and Festival dates.',
        'url': 'https://malayalamcalendar.site/calendar-2026',
        'keywords': [
            'Malayalam Calendar 2026',
            'Kollavarsham 1201',
            'Kerala Festivals 2026',
            'Panchangam Data'
        ],
        'creator': {
            '@type': 'Organization',
            'name': 'Malayalam Calendar Site',
            'url': 'https://malayalamcalendar.site'
        },
        'distribution': [
            {
                '@type': 'DataDownload',
                'encodingFormat': 'application/pdf',
                'contentUrl': 'https://malayalamcalendar.site/calendar-2026-printable.pdf'
            }
        ],
        'temporalCoverage': '2026-01-01/2026-12-31'
    };

    const vishuEvent = {
        '@context': 'https://schema.org',
        '@type': 'Event',
        'name': 'Vishu 2026 (വിഷു)',
        'startDate': '2026-04-14',
        'endDate': '2026-04-14',
        'eventAttendanceMode': 'https://schema.org/OfflineEventAttendanceMode',
        'eventStatus': 'https://schema.org/EventScheduled',
        'location': {
            '@type': 'Place',
            'name': 'Kerala, India',
            'address': {
                '@type': 'PostalAddress',
                'addressRegion': 'Kerala',
                'addressCountry': 'IN'
            }
        },
        'description': 'Vishu is the Malayalam New Year festival celebrated with Vishukkani and traditional feasts.',
        'organizer': {
            '@type': 'Organization',
            'name': 'Public Holiday'
        }
    };

    const onamEvent = {
        '@context': 'https://schema.org',
        '@type': 'Event',
        'name': 'Thiruvonam 2026 (തിരുവോണം)',
        'startDate': '2026-08-26',
        'endDate': '2026-08-26',
        'eventAttendanceMode': 'https://schema.org/OfflineEventAttendanceMode',
        'eventStatus': 'https://schema.org/EventScheduled',
        'location': {
            '@type': 'Place',
            'name': 'Kerala, India',
            'address': {
                '@type': 'PostalAddress',
                'addressRegion': 'Kerala',
                'addressCountry': 'IN'
            }
        },
        'description': 'Onam is the harvest festival of Kerala. Thiruvonam is the most important day of the 10-day celebration.',
        'organizer': {
            '@type': 'Organization',
            'name': 'Public Holiday'
        }
    };

    return (
        <>
            <Script
                id="dataset-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />
            <Script
                id="vishu-event-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(vishuEvent) }}
            />
            <Script
                id="onam-event-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(onamEvent) }}
            />
        </>
    );
}
