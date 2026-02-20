import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import Breadcrumbs from '@/components/Breadcrumbs';
import CalendarGrid from '@/components/CalendarGrid';
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
            `Kollavarsham ${year}`,
            `Kerala Calendar ${year}`,
            `Malayalam Panchangam ${year}`,
            `Nakshatram Finder`,
            `Nalla Samayam ${year}`,
            `Rahu Kalam ${year}`
        ],
        alternates: {
            canonical: `https://malayalamcalendar.site/malayalam-calendar/${year}`,
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
        url: `https://malayalamcalendar2026.in/calendar/${year}`,
        hasPart: months.map(m => ({
            '@type': 'WebPage',
            name: `${m.name} ${year}`,
            url: `https://malayalamcalendar2026.in/calendar/${year}/${m.slug}`
        }))
    };

    const breadcrumbs = [
        { label: `${year} Calendar`, href: `/calendar/${year}` },
    ];

    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <Breadcrumbs items={breadcrumbs} />

            <div className="text-center mb-10">
                <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
                    Malayalam Calendar {year}
                    <span className="block text-xl md:text-2xl mt-2 font-normal text-gray-600 dark:text-gray-400">
                        Daily Panchangam, Nakshatram & Festivals
                    </span>
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                    Your complete digital guide to the <strong>{year} Malayalam Calendar</strong> (Kollavarsham 1201-1202).
                    Navigate through the months below to find accurate daily <strong>Nakshatram</strong>, <strong>Tithi</strong>, <strong>Rahu Kalam</strong>, and <strong>Nalla Samayam</strong> timings calculated for Kerala.
                </p>
            </div>

            <AdSlot slotId="year-top" />

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 my-8">
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


            {/* SEO & Rich Content Section */}
            <div className="mt-16 prose prose-indigo dark:prose-invert max-w-none">
                <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 shadow-sm">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        Everything You Need to Know About Malayalam Calendar {year}
                    </h2>

                    <div className="grid md:grid-cols-2 gap-10">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">What is the Kollavarsham Era?</h3>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                                The <strong>Malayalam Calendar</strong>, also known as the <em>Kollavarsham</em>, is a solar calendar widely used in Kerala for agricultural, religious, and social purposes.
                                The year {year} bridges two Malayalam eras:
                            </p>
                            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300 mb-6">
                                <li><strong>Kollavarsham 1201</strong>: Continues until mid-August (Chingam 1).</li>
                                <li><strong>Kollavarsham 1202</strong>: Begins on Chingam 1 (typically August 17, {year}).</li>
                            </ul>

                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Why Use This Digital Calendar?</h3>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                Unlike standard Gregorian calendars, our tool provides specific astronomical data crucial for Malayali life:
                                <ul className="list-disc pl-5 mt-2 space-y-1">
                                    <li><strong>Daily Nakshatram (Star):</strong> Essential for choosing names and matching horoscopes.</li>
                                    <li><strong>Muhoorthams:</strong> Find the most auspicious <em>Nalla Samayam</em> for weddings, housewarmings, and buying vehicles.</li>
                                    <li><strong>Inauspicious Times:</strong> Avoid <em>Rahu Kalam</em> and <em>Gulika Kalam</em> easily with our daily breakdown.</li>
                                </ul>
                            </p>
                        </div>

                        <div>
                            <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 mb-8">
                                <h3 className="text-lg font-bold text-indigo-900 dark:text-indigo-200 mb-4 mt-0">
                                    Key Festival Highlights for {year}
                                </h3>
                                <ul className="space-y-4 text-sm text-gray-700 dark:text-gray-300 list-none pl-0">
                                    <li className="flex items-start gap-3">
                                        <div className="mt-1.5 w-2 h-2 bg-indigo-500 rounded-full flex-shrink-0"></div>
                                        <div>
                                            <span className="font-bold block text-gray-900 dark:text-white">Vishu {year}</span>
                                            Marking the astronomical New Year, Vishu falls on April 14, {year}. It is celebrated with the traditional <em>Vishukkani</em>.
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="mt-1.5 w-2 h-2 bg-indigo-500 rounded-full flex-shrink-0"></div>
                                        <div>
                                            <span className="font-bold block text-gray-900 dark:text-white">Onam {year}</span>
                                            The harvest festival Thiruvonam is celebrated on August 26, {year}. It commemorates the return of King Mahabali.
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="mt-1.5 w-2 h-2 bg-indigo-500 rounded-full flex-shrink-0"></div>
                                        <div>
                                            <span className="font-bold block text-gray-900 dark:text-white">Maha Shivaratri</span>
                                            A major night of worship for Lord Shiva, occurring on February 15, {year}.
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-700">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                            How to Read the Malayalam Panchangam
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                            Each date in our calendar provides a comprehensive view. Simply click on any month above to see the daily view.
                            You will find the <strong>Sunrise</strong> and <strong>Sunset</strong> times adjusted for Kerala standard time,
                            along with the <strong>Tithi (Moon Phase)</strong> which is vital for observing fasts like <em>Ekadashi</em> and <em>Pradosham</em>.
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-8">
                            Looking for past dates? view our <Link href="/calendar/2025" className="text-indigo-600 hover:underline">2025 Malayalam Calendar Archive</Link>.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
}
