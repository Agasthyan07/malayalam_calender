import Link from 'next/link';
import IslamicPrayerTimes from '@/components/IslamicPrayerTimes';
import AdSlot from '@/components/AdSlot';
import Breadcrumbs from '@/components/Breadcrumbs';
import CalendarGrid from '@/components/CalendarGrid';
import FAQ from '@/components/FAQ';
import { getYearData } from '@/lib/dateUtils';


import { Metadata } from 'next';

export async function generateStaticParams() {
    return [{ year: '2026' }, { year: '2027' }];
}

type Props = {
    params: Promise<{ year: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { year } = await params;
    return {
        title: `Malayalam Calendar ${year} | Kollavarsham 1201 - 1202 | Daily Panchangam`,
        description: `View the accurate Malayalam Calendar ${year} with daily Panchangam, Nakshatram, Tithi, Rahu Kalam, and Nalla Samayam. Includes dates for Onam, Vishu, and all Kerala festivals.`,
        keywords: [
            `Malayalam Calendar ${year}`,
            `2026 Malayalam Calendar`,
            `Malayalamcalnder ${year}`,
            `Malayalamcalnder2026`,
            `Keralacalnder ${year}`,
            `Malayalam Calendar Download`,
            `Kollavarsham ${year}`,
            `Kerala Calendar ${year}`,
            `Malayalam Panchangam ${year}`,
            `Nakshatram Finder`,
            `Nalla Samayam ${year}`,
            `Rahu Kalam ${year}`
        ],
        alternates: {
            canonical: `https://www.malayalamcalendar.site/malayalam-calendar/${year}`,
        }
    };
}

export default async function YearPage({ params }: Props) {
    const { year } = await params;

    const yearData = await getYearData(year);

    const months = Array.from({ length: 12 }, (_, i) => {
        const monthNum = (i + 1).toString().padStart(2, '0');
        const date = new Date(parseInt(year), i, 1);
        return {
            slug: (i + 1).toString().padStart(2, '0'),
            name: date.toLocaleString('default', { month: 'long' }),
            days: yearData.filter(d => d.date.startsWith(`${year}-${monthNum}`))
        };
    });


    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: `${year} Malayalam Calendar`,
        description: `Complete Malayalam Calendar for the year ${year}.`,
        url: `https://www.malayalamcalendar.site/malayalam-calendar/${year}`,
        hasPart: months.map(m => ({
            '@type': 'WebPage',
            name: `${m.name} ${year}`,
            url: `https://www.malayalamcalendar.site/malayalam-calendar-${m.name.toLowerCase()}-${year}`
        }))
    };

    const breadcrumbs = [
        { label: `${year} Calendar`, href: `/calendar/${year}` },
    ];

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <Breadcrumbs items={breadcrumbs} />

            {/* Hero Section */}
            <div className="text-center mb-10 max-w-4xl mx-auto">
                <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
                    Malayalam Calendar {year} — Official Kerala Calendar
                    <span className="block text-xl md:text-2xl mt-2 font-normal text-gray-600 dark:text-gray-400">
                        Daily Panchangam, Nakshatram & Festivals
                    </span>
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    Your complete digital guide to the <strong>{year} Malayalam Calendar</strong> (Kollavarsham 1201-1202).
                    Whether you search for <strong>malayalam calendar</strong>, need a <strong>kerala calendar {year}</strong>, or are looking to find the exact <strong>malayalamcalnder</strong> details,
                    navigate through the months below to find accurate daily <strong>Nakshatram</strong>, <strong>Tithi</strong>, <strong>Rahu Kalam</strong>, and <strong>Nalla Samayam</strong> timings calculated for Kerala.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-4">
                    <Link
                        href="#download-section"
                        className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2.5 rounded-full transition-colors shadow-sm"
                    >
                        📥 Download Calendar PDF
                    </Link>
                    <Link
                        href="#months-grid"
                        className="inline-flex items-center gap-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 font-semibold px-6 py-2.5 rounded-full transition-colors shadow-sm"
                    >
                        🗓️ Browse Months
                    </Link>
                </div>
            </div>

            <IslamicPrayerTimes />

            <div className="lg:grid lg:grid-cols-4 gap-8 mt-12 items-start relative">

                {/* Main Content Area (3/4 width on desktop) */}
                <div className="lg:col-span-3 space-y-12">

                    {/* Months Grid */}
                    <div id="months-grid" className="grid grid-cols-1 md:grid-cols-2 gap-6 scroll-mt-24">
                        {months.map((m, index) => {
                            const monthNameLower = m.name.toLowerCase();
                            return (
                                <div key={m.slug} id={monthNameLower} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col">
                                    <div className="bg-gray-50 dark:bg-gray-900/50 p-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
                                        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 uppercase tracking-wide">
                                            {m.name} {year}
                                        </h2>
                                        <Link
                                            href={`/malayalam-calendar-${monthNameLower}-${year}`}
                                            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                                        >
                                            View Details →
                                        </Link>
                                    </div>
                                    <div className="p-2 flex-grow">
                                        <CalendarGrid days={m.days} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Unique SEO & Rich Content Section for {year} */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-10 border border-gray-100 dark:border-gray-700 shadow-sm mt-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8 border-b pb-4 dark:border-gray-700">
                            Comprehensive Guide to the {year} Malayalam Calendar
                        </h2>

                        <div className="grid md:grid-cols-2 gap-10">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Understanding the {year} Kerala Calendar</h3>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                                    If you are planning your schedules, fasting, or auspicious events for {year}, the official <strong>Malayalam Calendar</strong> (also known as <em>malayalamcalnder {year}</em>) is your most reliable resource. The year {year} is particularly notable as it bridges two significant traditional Malayalam eras:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mb-6 marker:text-indigo-500">
                                    <li><strong>Kollavarsham 1201</strong>: This era spans the first half of {year}, ending roughly in mid-August when the month of Karkidakam concludes.</li>
                                    <li><strong>Kollavarsham 1202</strong>: The traditional New Year begins on Chingam 1 (typically August 16 or 17, {year}), bringing in the festival of Onam and the start of the 1202 era.</li>
                                </ul>

                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Why Use Our Daily Panchangam?</h3>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                                    A standard Gregorian calendar simply tells you the date. Our dedicated <strong>Kerala Calendar {year}</strong> provides specific, calculated astronomical data that is critical for religious and personal activities in Malayali culture. By navigating through the monthly grids above, you'll discover:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mb-6 marker:text-indigo-500">
                                    <li><strong>Daily Nakshatram:</strong> Track the active birth star each day for naming ceremonies and temple visits throughout {year}.</li>
                                    <li><strong>Nalla Samayam (Muhurtham):</strong> Find the most auspicious windows in {year} for weddings, housewarmings, or major purchases.</li>
                                    <li><strong>Rahu & Gulika Kalam:</strong> Easily identify the inauspicious times of day to ensure your new ventures start smoothly.</li>
                                </ul>
                            </div>

                            <div>
                                <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 mb-8 border border-indigo-100 dark:border-indigo-800/30">
                                    <h3 className="text-lg font-bold text-indigo-900 dark:text-indigo-200 mb-4 mt-0">
                                        Major Festival Dates in {year}
                                    </h3>
                                    <ul className="space-y-4 text-sm text-gray-700 dark:text-gray-300 list-none pl-0">
                                        <li className="flex items-start gap-3">
                                            <div className="mt-1.5 w-2 h-2 bg-indigo-500 rounded-full flex-shrink-0"></div>
                                            <div>
                                                <span className="font-bold block text-gray-900 dark:text-white">Vishu {year}</span>
                                                The astronomical New Year is celebrated with the traditional <em>Vishukkani</em> in April {year}. Check the Medam month above for the exact planetary transitions.
                                            </div>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="mt-1.5 w-2 h-2 bg-indigo-500 rounded-full flex-shrink-0"></div>
                                            <div>
                                                <span className="font-bold block text-gray-900 dark:text-white">Thiruvonam {year}</span>
                                                The grand harvest festival of Onam, marking the homecoming of true equality under King Mahabali, falls in the month of Chingam in August/September {year}.
                                            </div>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="mt-1.5 w-2 h-2 bg-indigo-500 rounded-full flex-shrink-0"></div>
                                            <div>
                                                <span className="font-bold block text-gray-900 dark:text-white">Maha Shivaratri & Navaratri</span>
                                                Essential fasting days and Goddess worship periods are clearly marked with custom Tithi information. Look for Kumbham and Kanni months respectively in {year}.
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-700">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                                Downloading Your {year} Calendar
                            </h3>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                                The daily view is great for detailed Panchangam, but sometimes you just need a physical copy. If you're searching for a <strong>malayalam calendar download</strong>, you can download the high-quality, printable PDF version of the {year} calendar directly from our site below. Keep it on your desktop or print it for your living room!
                            </p>

                            <div id="download-section" className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-8 rounded-xl border border-indigo-100 dark:border-indigo-800">
                                <h3 className="text-2xl font-bold text-indigo-900 dark:text-indigo-200 mb-2 mt-0">
                                    Official {year} PDF Download
                                </h3>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 text-sm">
                                    Get the complete 12-month spreadsheet with {year}'s Kerala Government holidays, bank holidays, and festival markers included.
                                </p>
                                <Link href={`/calendar-pdf/${year}_pdf/kerala-govt-official-calendar-${year}.pdf`} target="_blank" rel="noopener noreferrer" className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-all">
                                    Download {year} PDF
                                </Link>
                            </div>
                        </div>

                        <div className="mt-16 pt-12 border-t border-gray-200 dark:border-gray-700">
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8">
                                Astrological Precision of {year}
                            </h2>

                            <div className="grid md:grid-cols-2 gap-8 text-gray-700 dark:text-gray-300 leading-relaxed">
                                <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-800">
                                    <h3 className="text-xl font-bold text-indigo-900 dark:text-indigo-300 mb-3">Sidereal Calculations</h3>
                                    <p className="text-sm">
                                        Because the <strong>Malayalam Calendar</strong> uses the Sidereal Solar system, the {year} months are determined by the exact moment the Sun transits into a new Zodiac constellation (<em>Sankramam</em>). This is why a Malayalam month might have 28 days or 32 days, naturally adjusting without the need for artificial leap years.
                                    </p>
                                </div>

                                <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-800">
                                    <h3 className="text-xl font-bold text-indigo-900 dark:text-indigo-300 mb-3">Tithi & Lunar Phases</h3>
                                    <p className="text-sm">
                                        For fasting and rituals in {year}, Tithi is calculated based on the angular distance between the Sun and the Moon. Our {year} grid reveals exact times for Pradosham, Ekadashi, and Amavasya, perfectly synced to Kerala Standard Time.
                                    </p>
                                </div>

                                <div className="md:col-span-2 overflow-x-auto mt-6">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Quick Comparison: {year} English vs Malayalam Calendar</h3>
                                    <table className="min-w-full text-left border-collapse border border-gray-200 dark:border-gray-700 text-sm">
                                        <thead>
                                            <tr className="bg-gray-50 dark:bg-gray-800">
                                                <th className="p-4 border border-gray-200 dark:border-gray-700 font-bold text-gray-900 dark:text-white">Feature</th>
                                                <th className="p-4 border border-gray-200 dark:border-gray-700 font-bold text-gray-900 dark:text-white">English (Gregorian) {year}</th>
                                                <th className="p-4 border border-gray-200 dark:border-gray-700 font-bold text-gray-900 dark:text-white">Malayalam (Kollavarsham) {year}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="bg-white dark:bg-gray-900">
                                                <td className="p-4 border border-gray-200 dark:border-gray-700 font-semibold">Astronomy</td>
                                                <td className="p-4 border border-gray-200 dark:border-gray-700">Tropical Solar (Follows solstices/equinoxes)</td>
                                                <td className="p-4 border border-gray-200 dark:border-gray-700">Sidereal Solar (Tracks Sun's transit relative to fixed stars)</td>
                                            </tr>
                                            <tr className="bg-gray-50 dark:bg-gray-800">
                                                <td className="p-4 border border-gray-200 dark:border-gray-700 font-semibold">Month Start</td>
                                                <td className="p-4 border border-gray-200 dark:border-gray-700">Fixed at midnight on the 1st</td>
                                                <td className="p-4 border border-gray-200 dark:border-gray-700">Dynamic; begins at the minute of Sankramam</td>
                                            </tr>
                                            <tr className="bg-white dark:bg-gray-900">
                                                <td className="p-4 border border-gray-200 dark:border-gray-700 font-semibold">Leap Rules</td>
                                                <td className="p-4 border border-gray-200 dark:border-gray-700">Relies on a 29-day February rule</td>
                                                <td className="p-4 border border-gray-200 dark:border-gray-700">Self-calibrating; months vary naturally</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div className="mt-16">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 border-b pb-4 dark:border-gray-700">
                                Frequently Asked Questions for {year}
                            </h3>
                            <FAQ items={[
                                {
                                    question: `Can I download the ${year} Malayalam Calendar as a PDF?`,
                                    answer: `Yes, you can easily download the official ${year} Malayalam Calendar (keralacalnder) in high-quality PDF format from the link provided in the download section above.`
                                },
                                {
                                    question: `When does the new Malayalam year (Kollavarsham 1202) begin in ${year}?`,
                                    answer: `Kollavarsham 1202 will begin on Chingam 1, which typically falls around mid-August in ${year}. The period before that belongs to Kollavarsham 1201.`
                                },
                                {
                                    question: `Does the malayalamcalnder show daily Nakshatram and Tithi for ${year}?`,
                                    answer: `Absolutely! Our digital Malayalam Calendar ${year} provides precise daily Panchangam details including Nakshatram (Star), Tithi (Lunar Day), Rahu Kalam, and Nalla Samayam (auspicious timings) calculated specifically for Kerala.`
                                },
                                {
                                    question: `What is the difference between the English calendar and the Kerala Calendar?`,
                                    answer: `The English (Gregorian) calendar is a tropical solar calendar with fixed month starts. The Kerala (Malayalam) calendar is a sidereal solar calendar where months begin exactly when the sun transits into a new zodiac sign, making month lengths variable.`
                                }
                            ]} />
                        </div>
                    </div>
                </div>

                {/* Right Sidebar (1/4 width on desktop, sticky) */}
                <div className="hidden lg:block lg:col-span-1 border-l border-gray-100 dark:border-gray-800 pl-8 pb-12">
                    <div className="sticky top-24 space-y-8">

                        {/* Table of Contents */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <span>📅</span> Jump to Month
                            </h3>
                            <ul className="space-y-2 text-sm">
                                {months.map((m) => (
                                    <li key={m.slug}>
                                        <Link
                                            href={`#${m.name.toLowerCase()}`}
                                            className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors block py-1"
                                        >
                                            {m.name} {year}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Quick Services Links */}
                        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl p-6 border border-indigo-100 dark:border-indigo-800/30 shadow-sm">
                            <h3 className="text-lg font-bold text-indigo-900 dark:text-indigo-200 mb-4 flex items-center gap-2">
                                <span>⚡</span> Quick Links
                            </h3>
                            <div className="space-y-3">
                                <Link href="/innathe-nakshatram" className="block bg-white dark:bg-gray-800 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 text-gray-800 dark:text-gray-100 font-semibold px-4 py-3 rounded-xl shadow-sm transition-all text-sm text-center">
                                    Today's Nakshatra
                                </Link>
                                <Link href={`/marriage-muhurtham-${year}`} className="block bg-white dark:bg-gray-800 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 text-gray-800 dark:text-gray-100 font-semibold px-4 py-3 rounded-xl shadow-sm transition-all text-sm text-center">
                                    Marriage Muhurtham
                                </Link>
                                <Link href={`/malayalam-calendar/${parseInt(year) - 1}`} className="block bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium px-4 py-3 rounded-xl shadow-sm transition-all text-sm text-center border border-gray-200 dark:border-gray-700">
                                    Archive: {parseInt(year) - 1} Calendar
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
