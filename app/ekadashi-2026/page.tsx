import { getYearData, formatDate } from '@/lib/dateUtils';
import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';

export const revalidate = 3600;

export const metadata: Metadata = {
    title: 'Ekadashi 2026 Kerala Dates | Malayalam Calendar Vratam List',
    description: 'Complete list of Ekadashi dates in 2026 for Kerala. Find Vaikunta Ekadashi, Guruvayur Ekadashi, and all monthly Ekadashi Vratam dates with timings.',
    keywords: ['Ekadashi 2026 Kerala', 'Ekadashi Dates 2026', 'Vaikunta Ekadashi 2026', 'Guruvayur Ekadashi 2026', 'Malayalam Calendar Ekadashi List'],
    alternates: {
        canonical: 'https://www.malayalamcalendar.site/ekadashi-2026',
    },
};

const EKADASHI_NAMES: { [key: string]: string } = {
    '2026-01-13': 'Shattila Ekadashi',
    '2026-01-20': 'Putrada Ekadashi',
    '2026-01-28': 'Jaya Ekadashi',
    '2026-02-12': 'Vijaya Ekadashi',
    '2026-02-27': 'Amalaki Ekadashi',
    '2026-03-14': 'Papamochani Ekadashi',
    '2026-03-28': 'Kamada Ekadashi',
    '2026-04-13': 'Varuthini Ekadashi',
    '2026-04-27': 'Mohini Ekadashi',
    '2026-05-13': 'Apara Ekadashi',
    '2026-05-27': 'Padmini Ekadashi',
    '2026-06-11': 'Parama Ekadashi',
    '2026-06-25': 'Nirjala Ekadashi',
    '2026-07-10': 'Yogini Ekadashi',
    '2026-07-25': 'Devshayani Ekadashi',
    '2026-08-09': 'Kamika Ekadashi',
    '2026-08-23': 'Shravana Putrada Ekadashi',
    '2026-09-07': 'Aja Ekadashi',
    '2026-09-22': 'Parsva Ekadashi',
    '2026-10-07': 'Indira Ekadashi',
    '2026-10-21': 'Pasankusa Ekadashi',
    '2026-11-05': 'Rama Ekadashi',
    '2026-11-20': 'Devutthana Ekadashi',
    '2026-12-05': 'Utpanna Ekadashi',
    '2026-12-20': 'Mokshada Ekadashi'
};

export default async function EkadashiPage() {
    const yearData = await getYearData('2026');

    // Filter days where tithi includes Malayalam for Ekadashi ("ഏകാദശി") or English ("ekadashi")
    const ekadashiDays = yearData.filter(d =>
        d.tithi && (d.tithi.toLowerCase().includes('ekadashi') || d.tithi.includes('ഏകാദശി'))
    );

    // Group by month
    const grouped_months: { [key: string]: typeof ekadashiDays } = {};

    ekadashiDays.forEach(day => {
        const monthName = new Date(day.date).toLocaleString('default', { month: 'long' });
        if (!grouped_months[monthName]) {
            grouped_months[monthName] = [];
        }
        grouped_months[monthName].push(day);
    });

    const monthOrder = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const eventSchemas = ekadashiDays.map(day => {
        const isoDate = day.date.split('T')[0];
        return {
            '@type': 'Event',
            name: EKADASHI_NAMES[isoDate] ? `${EKADASHI_NAMES[isoDate]} - Ekadashi Vratam` : `Ekadashi Vratam - ${isoDate}`,
            description: 'Auspicious Ekadashi day for fasting and Vishnu worship according to the Malayalam Calendar.',
            startDate: `${isoDate}T00:00:00+05:30`,
            endDate: `${isoDate}T23:59:59+05:30`,
            eventStatus: 'https://schema.org/EventScheduled',
            eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
            isAccessibleForFree: true,
            image: [
                'https://www.malayalamcalendar.site/icon-192x192.png',
                'https://www.malayalamcalendar.site/icon-512x512.png'
            ],
            location: {
                '@type': 'Place',
                name: 'Kerala',
                address: {
                    '@type': 'PostalAddress',
                    addressRegion: 'Kerala',
                    addressCountry: 'India'
                }
            },
            offers: {
                '@type': 'Offer',
                price: 0,
                priceCurrency: 'INR',
                availability: 'https://schema.org/InStock',
                url: 'https://www.malayalamcalendar.site/ekadashi-2026'
            },
            organizer: {
                '@type': 'Organization',
                name: 'Malayalam Calendar',
                url: 'https://www.malayalamcalendar.site'
            }
        };
    });

    const graphSchema = {
        '@context': 'https://schema.org',
        '@graph': eventSchemas
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graphSchema) }} />

            <Breadcrumbs items={[{ label: 'Ekadashi 2026', href: '/ekadashi-2026' }]} />
            <h1 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-6">
                Ekadashi Vratam Dates 2026 (Kerala)
            </h1>

            <p className="text-center text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                <strong>Ekadashi</strong> is a sacred day dedicated to Lord Vishnu, observed on the 11th lunar day (Tithi) of each fortnight.
                It is considered highly auspicious for fasting and visiting temples like Guruvayur and Sree Padmanabhaswamy Temple.
            </p>

            <AdSlot slotId="top-banner" />

            <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300">
                        <thead className="bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-400 font-semibold uppercase text-xs">
                            <tr>
                                <th className="px-6 py-4">Date & Day</th>
                                <th className="px-6 py-4">Ekadashi Name</th>
                                <th className="px-6 py-4">Malayalam Date</th>
                                <th className="px-6 py-4">Nakshatram</th>
                                <th className="px-6 py-4 text-center">Action</th>
                            </tr>
                        </thead>
                        {monthOrder.map(month => {
                            const days = grouped_months[month];
                            if (!days || days.length === 0) return null;

                            return (
                                <tbody key={month} className="divide-y divide-gray-100 dark:divide-gray-700/50 border-t border-gray-200 dark:border-gray-700">
                                    <tr className="bg-gray-50/50 dark:bg-gray-800/50">
                                        <td colSpan={5} className="px-6 py-3 font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider text-xs border-l-4 border-green-500">
                                            {month} 2026
                                        </td>
                                    </tr>
                                    {days.map(day => {
                                        const dateObj = new Date(day.date);
                                        const formattedDate = `${month.substring(0, 3)} ${dateObj.getDate()}, ${dateObj.getFullYear()}`;
                                        const weekday = dateObj.toLocaleDateString('en-US', { weekday: 'short' });

                                        return (
                                            <tr key={day.date} className="hover:bg-green-50/30 dark:hover:bg-gray-700/30 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="font-semibold text-gray-900 dark:text-white">{formattedDate}</div>
                                                    <div className="text-xs text-gray-500 dark:text-gray-400">{weekday}</div>
                                                </td>
                                                <td className="px-6 py-4 font-bold text-green-700 dark:text-green-400 whitespace-nowrap">
                                                    {EKADASHI_NAMES[day.date] || "Ekadashi Vratam"}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300 font-medium">
                                                    {day.malayalam_date}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">
                                                    {day.nakshatram}
                                                </td>
                                                <td className="px-6 py-4 text-center whitespace-nowrap">
                                                    <Link
                                                        href={`/date/${formatDate(day.date)}`}
                                                        className="inline-flex items-center gap-1.5 text-xs font-semibold bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 px-3 py-1.5 rounded-full transition-colors"
                                                    >
                                                        Details <span aria-hidden="true">&rarr;</span>
                                                    </Link>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            );
                        })}
                    </table>
                </div>
            </div>

            <div className="mt-12 p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-100 dark:border-green-800/50 prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
                <h3>Significance of Ekadashi Fasting</h3>
                <p>
                    Observing Ekadashi Vratam involves abstaining from grains (especially rice) and beans.
                    Devotees spend the day chanting "Om Namo Bhagavate Vasudevaya" and reading scriptures like the <em>Bhagavatam</em>.
                    The fast is broken on the next day (Dwadashi) within a specific time window called <em>Parana</em> time.
                    <strong>Vaikunta Ekadashi</strong> (usually in Dec/Jan) and <strong>Guruvayur Ekadashi</strong> (in Vrischikam) are particularly grand celebrations in Kerala.
                </p>
            </div>

            <div className="mt-8 text-center">
                <Link href="/" className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                    <span>← Back to Malayalam Calendar Home</span>
                </Link>
            </div>

            <AdSlot slotId="bottom-banner" />
        </div>
    );
}
