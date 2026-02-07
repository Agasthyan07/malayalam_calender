import { getYearData } from '@/lib/dateUtils';
import CalendarGrid from '@/components/CalendarGrid';
import AdSlot from '@/components/AdSlot';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Malayalam Calendar 2026 Full Year | Kollavarsham 1201-1202',
    description: 'Complete 2026 Malayalam Calendar (12 Months). Check Kollavarsham, Malayalam Era, Nakshatram, Tithi, and all Kerala festivals in one view.',
    keywords: [
        'Malayalam Calendar',
        '2026 Malayalam Calendar',
        'Kollavarsham Calendar',
        'Malayalam Era Calendar',
        'Malayalam Year Calendar',
        'Malayalamasam Calendar',
        '2025 Malayalam Calendar',
        'Kerala Calendar 2026'
    ],
    alternates: {
        canonical: 'https://malayalamcalendar.site/calendar-2026',
    },
    openGraph: {
        title: 'Malayalam Calendar 2026 Full Year View',
        description: 'View the full 2026 Malayalam Calendar with daily Panchangam and festivals.',
        type: 'website',
    }
};

export default async function FullYearCalendarPage() {
    const year = '2026';
    const yearData = await getYearData(year);

    // Group data by month
    const monthsData = Array.from({ length: 12 }, (_, i) => {
        const monthNum = (i + 1).toString().padStart(2, '0');
        return {
            name: new Date(parseInt(year), i, 1).toLocaleString('default', { month: 'long' }),
            days: yearData.filter(d => d.date.startsWith(`${year}-${monthNum}`))
        };
    });

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Malayalam Calendar 2026 Full Year',
        description: 'Comprehensive Malayalam Calendar for the year 2026 with festival dates and panchangam.',
        url: 'https://malayalamcalendar.site/calendar-2026',
        breadcrumb: {
            '@type': 'BreadcrumbList',
            itemListElement: [
                {
                    '@type': 'ListItem',
                    position: 1,
                    name: 'Home',
                    item: 'https://malayalamcalendar.site'
                },
                {
                    '@type': 'ListItem',
                    position: 2,
                    name: '2026 Calendar',
                    item: 'https://malayalamcalendar.site/calendar-2026'
                }
            ]
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <AdSlot slotId="top-banner" />

            <div className="text-center mb-10">
                <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-100 mb-4 tracking-tight">
                    Malayalam Calendar 2026
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                    Welcome to the most comprehensive **Malayalam Era Calendar** for **2026**.
                    Navigate through the full year to check **Kollavarsham** dates, **Nakshatram**, Thithi, and Muhoorthams.
                    Transitioning from the **2025 Malayalam Calendar**, this year brings new auspicious timings and festival dates.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                    {['Kollavarsham 1201', 'Kollavarsham 1202', 'Malayalamasam', 'Kerala Festivals'].map(tag => (
                        <span key={tag} className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-full text-sm font-semibold border border-indigo-100 dark:border-indigo-800">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {monthsData.map((month, index) => (
                    <div key={month.name} id={month.name.toLowerCase()} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col">
                        <div className="bg-gray-50 dark:bg-gray-900/50 p-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 uppercase tracking-wide">
                                {month.name} 2026
                            </h2>
                            <Link
                                href={`/calendar/2026/${(index + 1).toString().padStart(2, '0')}`}
                                className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                            >
                                View Details →
                            </Link>
                        </div>
                        <div className="p-2 flex-grow">
                            <CalendarGrid days={month.days} />
                        </div>
                    </div>
                ))}
            </div>

            <AdSlot slotId="mid-content" />

            {/* SEO Content Section */}
            <div className="mt-16 bg-white dark:bg-gray-800 rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100 dark:border-gray-700">
                <article className="prose prose-indigo dark:prose-invert max-w-none">
                    <h2 className="text-3xl font-bold mb-6">About Malayalam Year Calendar 2026</h2>

                    <div className="grid md:grid-cols-2 gap-12">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Understanding Kollavarsham Calendar</h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                                The **Malayalam Calendar**, also known as the **Kollavarsham Calendar**, is a solar calendar used in Kerala.
                                The year 2026 spans two **Malayalam Eras**:
                            </p>
                            <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                                <li><strong>Kollavarsham 1201</strong>: Continues until mid-August (Chingam 1).</li>
                                <li><strong>Kollavarsham 1202</strong>: Begins on Chingam 1 (August 17, 2026).</li>
                            </ul>
                            <p className="text-gray-600 dark:text-gray-300 mt-4">
                                This **Malayalam Year Calendar** is crucial for determining auspicious dates for weddings, housewarmings, and other ceremonies based on **Malayalamasam**.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Major Festivals in 2026</h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                                Our **2026 Malayalam Calendar** lists all major festivals.
                                Compared to the **2025 Malayalam Calendar**, dates for festivals like Onam and Vishu shift slightly due to the solar calculation.
                            </p>
                            <table className="min-w-full text-left text-sm">
                                <thead className="bg-gray-50 dark:bg-gray-700/50">
                                    <tr>
                                        <th className="p-3 font-semibold text-gray-900 dark:text-white">Festival</th>
                                        <th className="p-3 font-semibold text-gray-900 dark:text-white">Date</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                    <tr>
                                        <td className="p-3 text-gray-700 dark:text-gray-300">Vishu</td>
                                        <td className="p-3 text-gray-700 dark:text-gray-300">April 14, 2026</td>
                                    </tr>
                                    <tr>
                                        <td className="p-3 text-gray-700 dark:text-gray-300">Onam (Thiruvonam)</td>
                                        <td className="p-3 text-gray-700 dark:text-gray-300">August 26, 2026</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-700">
                        <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                            Looking for last year's dates? Check our archive for <Link href="/calendar/2025" className="text-indigo-600 hover:underline">2025 Malayalam Calendar</Link>.
                        </p>
                    </div>
                </article>
            </div>
        </div>
    );
}
