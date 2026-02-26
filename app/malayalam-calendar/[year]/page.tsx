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
        url: `https://malayalamcalendar.site/malayalam-calendar/${year}`,
        hasPart: months.map(m => ({
            '@type': 'WebPage',
            name: `${m.name} ${year}`,
            url: `https://malayalamcalendar.site/malayalam-calendar-${m.name.toLowerCase()}-${year}`
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
                    Malayalam Calendar {year} — Official Kerala Calendar
                    <span className="block text-xl md:text-2xl mt-2 font-normal text-gray-600 dark:text-gray-400">
                        Daily Panchangam, Nakshatram & Festivals
                    </span>
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                    Your complete digital guide to the <strong>{year} Malayalam Calendar</strong> (Kollavarsham 1201-1202).
                    Whether you search for <strong>malayalam calendar</strong>, need a <strong>kerala calendar {year}</strong>, or are looking to find the exact <strong>malayalamcalnder</strong> details,
                    navigate through the months below to find accurate daily <strong>Nakshatram</strong>, <strong>Tithi</strong>, <strong>Rahu Kalam</strong>, and <strong>Nalla Samayam</strong> timings calculated for Kerala.
                </p>
                <div className="mt-6 flex justify-center gap-4">
                    <Link
                        href="#download-section"
                        className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2.5 rounded-full transition-colors shadow-sm"
                    >
                        📥 Malayalam Calendar Download
                    </Link>
                </div>
            </div>

            <AdSlot slotId="year-top" />

            <IslamicPrayerTimes />

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
                                The <strong>Malayalam Calendar</strong> (often spelled as <em>malayalamcalnder</em> or <em>keralacalnder</em>) is the official solar calendar widely used in Kerala for agricultural, religious, and social purposes.
                                Searching for <strong>malayalamcalnder2026</strong> will bring you exactly here, where the year {year} bridges two Malayalam eras:
                            </p>
                            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300 mb-6">
                                <li><strong>Kollavarsham 1201</strong>: Continues until mid-August (Chingam 1).</li>
                                <li><strong>Kollavarsham 1202</strong>: Begins on Chingam 1 (typically August 17, {year}).</li>
                            </ul>

                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Why Use This Kerala Calendar {year}?</h3>
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

                        <div id="download-section" className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-8 rounded-xl my-10 border border-indigo-100 dark:border-indigo-800">
                            <h3 className="text-2xl font-bold text-indigo-900 dark:text-indigo-200 mb-4 mt-0">
                                Malayalam Calendar Download (PDF & Image)
                            </h3>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                                Want a copy for offline use? We offer high-quality, printable versions of the Kerala Calendar for {year}.
                                Whether you prefer a month-by-month view or a single yearly sheet, you can grab the official <strong>malayalam calendar download</strong> right here.
                                Perfect for saving to your phone, setting as computer wallpaper, or printing for your desk.
                            </p>
                            <Link href="/calendar-pdf/2026_pdf/kerala-govt-official-calendar-2026.pdf" target="_blank" rel="noopener noreferrer" className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-all">
                                Download {year} Calendar PDF
                            </Link>
                        </div>
                    </div>

                    <div className="mt-12 pt-12 border-t border-gray-200 dark:border-gray-700">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                            History and Science of the Malayalam Calendar
                        </h2>

                        <div className="space-y-8 text-gray-700 dark:text-gray-300 leading-relaxed">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">History of the Malayalam Calendar (Kollavarsham)</h3>
                                <p>
                                    The <strong>Kollavarsham</strong> or Malayalam Era is believed to have originated in 825 AD in the port city of Kollam (Quilon), Kerala.
                                    Historical records, including the <em>Shri Shankaracharya</em> traditions and royal edicts of the Venad Kingdom, point to its creation to standardize timekeeping across different principalities in Kerala.
                                    The calendar was established by a royal decree during a grand assembly of scholars and astronomers at Kollam. Since then, it has deeply intertwined with Kerala's temple festivals, agricultural cycles, and cultural life.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">How is the Malayalam Calendar Calculated?</h3>
                                <p>
                                    Unlike calendars based on lunar cycles, the Malayalam calendar is a <strong>Sidereal Solar Calendar</strong>.
                                    This means it calculates months based on the actual time it takes the Earth to orbit the Sun relative to fixed stars (the Zodiac or <em>Rashi</em>).
                                    A new Malayalam month begins at the exact moment the Sun transits (Sankramam) into a new constellation.
                                    For example, the month of <em>Chingam</em> begins when the Sun enters the <em>Simha</em> (Leo) constellation. Because the Earth's orbit is elliptical, Malayalam months vary in length between 28 and 32 days.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Difference Between English (Gregorian) and Malayalam Calendars</h3>
                                <div className="overflow-x-auto mt-4">
                                    <table className="min-w-full text-left border-collapse border border-gray-200 dark:border-gray-700">
                                        <thead>
                                            <tr className="bg-gray-50 dark:bg-gray-800">
                                                <th className="p-3 border border-gray-200 dark:border-gray-700 font-bold text-gray-900 dark:text-white">Feature</th>
                                                <th className="p-3 border border-gray-200 dark:border-gray-700 font-bold text-gray-900 dark:text-white">English (Gregorian) Calendar</th>
                                                <th className="p-3 border border-gray-200 dark:border-gray-700 font-bold text-gray-900 dark:text-white">Malayalam (Kollavarsham) Calendar</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="bg-white dark:bg-gray-900">
                                                <td className="p-3 border border-gray-200 dark:border-gray-700 font-semibold">Base Concept</td>
                                                <td className="p-3 border border-gray-200 dark:border-gray-700">Tropical Solar (Matches seasons purely on solstices/equinoxes)</td>
                                                <td className="p-3 border border-gray-200 dark:border-gray-700">Sidereal Solar (Matches Sun's position relative to stars)</td>
                                            </tr>
                                            <tr className="bg-gray-50 dark:bg-gray-800">
                                                <td className="p-3 border border-gray-200 dark:border-gray-700 font-semibold">Month Start</td>
                                                <td className="p-3 border border-gray-200 dark:border-gray-700">Fixed at midnight of the 1st of every month</td>
                                                <td className="p-3 border border-gray-200 dark:border-gray-700">Variable based on the exact minute of Sankramam (Sun transit)</td>
                                            </tr>
                                            <tr className="bg-white dark:bg-gray-900">
                                                <td className="p-3 border border-gray-200 dark:border-gray-700 font-semibold">Leap Years</td>
                                                <td className="p-3 border border-gray-200 dark:border-gray-700">Uses a 29-day February every 4 years</td>
                                                <td className="p-3 border border-gray-200 dark:border-gray-700">No leap years needed; precise astronomical calculations keep it aligned</td>
                                            </tr>
                                            <tr className="bg-gray-50 dark:bg-gray-800">
                                                <td className="p-3 border border-gray-200 dark:border-gray-700 font-semibold">Start of Year</td>
                                                <td className="p-3 border border-gray-200 dark:border-gray-700">January 1st</td>
                                                <td className="p-3 border border-gray-200 dark:border-gray-700">Chingam 1 (Mid-August)</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                Frequently Asked Questions (Malayalam Calendar {year})
                            </h3>
                            <FAQ items={[
                                {
                                    question: `Is the ${year} Malayalam Calendar available for download?`,
                                    answer: `Yes, you can easily download the official ${year} Malayalam Calendar (keralacalnder) in high-quality PDF format from our website. We provide both yearly and monthly printable views.`
                                },
                                {
                                    question: `When does Kollavarsham 1202 begin in ${year}?`,
                                    answer: `Kollavarsham 1202 begins on Chingam 1, which typically falls in mid-August ${year}. The first half of the year belongs to Kollavarsham 1201.`
                                },
                                {
                                    question: `Does the malayalamcalnder show daily Nakshatram and Tithi?`,
                                    answer: `Absolutely! Our digital Malayalam Calendar ${year} provides precise daily Panchangam details including Nakshatram (Star), Tithi (Lunar Day), Rahu Kalam, and Nalla Samayam (auspicious timings) calculated specifically for Kerala Standard Time.`
                                },
                                {
                                    question: `What is the difference between the English calendar and the Kerala Calendar?`,
                                    answer: `The English (Gregorian) calendar is a tropical solar calendar with fixed month starts. The Kerala (Malayalam) calendar is a sidereal solar calendar where months begin exactly when the sun transits into a new zodiac sign (Sankramam), making month lengths variable.`
                                }
                            ]} />
                        </div>

                        <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-12 bg-gray-50 dark:bg-gray-800/50 py-4 rounded-xl border border-gray-100 dark:border-gray-800">
                            Looking for past dates? View our <Link href="/malayalam-calendar/2025" className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline">2025 Malayalam Calendar Archive</Link>.
                            Explore the <Link href="/innathe-nakshatram" className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline">Innathe Nakshatram</Link> guide or find the
                            perfect <Link href="/marriage-muhurtham-2026" className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline">Marriage Muhurat for {year}</Link>.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
}
