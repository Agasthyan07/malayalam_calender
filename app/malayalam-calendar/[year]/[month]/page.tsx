import CalendarRow from '@/components/CalendarRow';
import DailyMuhurthamTable from '@/components/DailyMuhurthamTable';
import RahuKalamTable from '@/components/RahuKalamTable';
import DownloadableCalendar from '@/components/DownloadableCalendar';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getMonthData, formatDate } from '@/lib/dateUtils';
import AdSlot from '@/components/AdSlot';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';

import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
    // Generate params for 2026/01
    return [
        { year: '2026', month: '01' }
    ];
}

type Props = {
    params: Promise<{ year: string, month: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { year, month } = await params;

    // Month name helper
    const date = new Date(parseInt(year), parseInt(month) - 1, 1);
    const monthName = date.toLocaleString('default', { month: 'long' });

    return {
        title: `${monthName} ${year} Malayalam Calendar | Daily View`,
        description: `Malayalam Calendar for ${monthName} ${year} with daily Nakshatram, Tithi, Rahu Kalam, and festival details. Plan your month with our accurate Panchangam.`,
        keywords: [
            `Malayalam Calendar ${year} ${monthName}`,
            `${monthName} ${year} Mollywood Calendar`,
            `Calendar ${year} Malayalam`,
            `${monthName} ${year} Nalla Samayam`,
            `Rahu Kalam ${monthName} ${year}`
        ],
        openGraph: {
            title: `${monthName} ${year} Malayalam Calendar`,
            description: `View the complete Malayalam Calendar for ${monthName} ${year} with all daily details.`,
        }
    };
}

export default async function MonthPage({ params }: Props) {
    const { year, month } = await params;
    const days = await getMonthData(year, month);

    if (!days || days.length === 0) {
        notFound();
    }

    const festivals = days.filter(d => d.festival);

    // Month name helper
    const date = new Date(parseInt(year), parseInt(month) - 1, 1);
    const monthName = date.toLocaleString('default', { month: 'long' });

    const breadcrumbs = [
        { label: `${year} Calendar`, href: `/calendar/${year}` },
        { label: monthName, href: `/malayalam-calendar-${monthName.toLowerCase()}-${year}` },
    ];

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'ImageObject',
        'contentUrl': `https://malayalamcalendar.site/calendar-images/${year}/malayalam-calendar-${year}-${monthName.toLowerCase()}.png`,
        'license': 'https://malayalamcalendar.site/terms',
        'acquireLicensePage': 'https://malayalamcalendar.site/contact',
        'creditText': 'MalayalamCalendar.site',
        'creator': {
            '@type': 'Organization',
            'name': 'Malayalam Calendar'
        },
        'copyrightNotice': `© ${year} Malayalam Calendar`
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <JsonLd data={jsonLd} />
            <Breadcrumbs items={breadcrumbs} />

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white capitalize mb-2">
                        {monthName} {year}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Malayalam Calendar {year} - Daily Panchangam & Festivals
                    </p>
                </div>
                <Link
                    href={`/calendar/${year}`}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                >
                    Back to Year View
                </Link>
            </div>

            <AdSlot slotId={`month-top-${month}`} />

            {/* Main Calendar List View */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden my-6">
                <div className="divide-y divide-gray-100 dark:divide-gray-800">
                    {days.map((day) => (
                        <CalendarRow key={day.date} day={day} />
                    ))}
                </div>
            </div>

            <AdSlot slotId={`month-bottom-${month}`} />

            {/* Festivals Section */}
            <div className="mt-12">
                <div className="flex items-center gap-3 mb-6">
                    <span className="w-1 h-8 bg-red-600 rounded-full"></span>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Festivals & Holidays in {monthName} {year}
                    </h2>
                </div>

                {festivals.length > 0 ? (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {festivals.map((day) => {
                            // IST Today check
                            const now = new Date();
                            const options = { timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit' } as const;
                            const formatter = new Intl.DateTimeFormat('en-CA', options);
                            const todayStr = formatter.format(now);
                            const isToday = day.date === todayStr;

                            return (
                                <Link
                                    href={isToday ? '/' : `/date/${formatDate(day.date)}`}
                                    key={day.date}
                                    className="group flex items-center p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 h-full"
                                >
                                    <div className="flex-shrink-0 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 font-bold text-xs w-16 h-12 flex flex-col items-center justify-center rounded-lg mr-4 group-hover:bg-red-600 group-hover:text-white transition-colors">
                                        <span className="text-lg leading-none">{day.date.split('-')[2]}</span>
                                        <span className="text-[10px] uppercase">{day.weekday.substring(0, 3)}</span>
                                    </div>
                                    <div className="flex-grow min-w-0 py-0.5">
                                        <h3 className="font-bold text-gray-900 dark:text-gray-100 group-hover:text-red-700 dark:group-hover:text-red-400 transition-colors text-sm mb-1 leading-snug break-words whitespace-normal">
                                            {day.festival}
                                        </h3>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">
                                            {day.malayalam_date}
                                        </div>
                                    </div>
                                </Link>
                            );
                        })
                        }
                    </div>
                ) : (
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 text-center border border-gray-100 dark:border-gray-700 border-dashed">
                        <p className="text-gray-500 dark:text-gray-400">No major festivals listed for this month.</p>
                    </div>
                )}
            </div>

            {/* Daily Muhurtham Table */}


            <DailyMuhurthamTable days={days} title={`Daily Muhurtham in ${monthName} ${year}`} />

            <DownloadableCalendar year={year} monthName={monthName} />

            <RahuKalamTable days={days} title={`Rahu Kalam Timings - ${monthName} ${year}`} />

            <div className="mt-12 prose prose-indigo dark:prose-invert max-w-none">
                <h3>Significance of {monthName} {year} in Malayalam Calendar</h3>
                <p>
                    The month of <strong>{monthName}</strong> holds specific cultural and astrological significance in the Kerala calendar system.
                    {monthName === 'August' || monthName === 'September' ? (
                        " This period typically corresponds to the Malayalam month of Chingam, marking the beginning of the New Year (Kollavarsham) and the harvest season. It is a time of joy, prosperity, and the grand celebration of Onam."
                    ) : monthName === 'April' || monthName === 'May' ? (
                        " This period usually spans the Malayalam months of Meenam and Medam. The transition into Medam marks 'Vishu', the astronomical New Year, celebrated with the auspicious Vishukkani."
                    ) : monthName === 'July' || monthName === 'August' ? (
                        " This period often covers the month of Karkidakam, known as the 'Ramayana Month'. It is a time dedicated to reading the Ramayana, practicing Ayurveda (Karkidaka Chikitsa), and spiritual reflection amidst the heavy monsoon rains."
                    ) : (
                        ` In ${monthName}, the sun's position and the corresponding Nakshatras play a vital role in determining auspicious dates for weddings (Vivaha Muhurtham) and house warming ceremonies (Griha Pravesham).`
                    )}
                </p>

                <h4>How to Use This Calendar Strategy</h4>
                <p>
                    Our <strong>{monthName} {year} daily view</strong> is designed to help you plan your activities in alignment with traditional values.
                </p>
                <ul>
                    <li><strong>For Weddings & Events:</strong> Look for days where "Nalla Samayam" is abundant and avoid days with "Dur Muhurtham".</li>
                    <li><strong>For Fasting (Vratam):</strong> Check the <em>Tithi</em>. Ekadashi, Pradosham, and Sashti are key days for fasting.</li>
                    <li><strong>For Farming/Gardening:</strong> The <em>Njattuvela</em> (Sun's star position) available in our daily details helps in deciding when to plant crops.</li>
                </ul>
                <p>
                    Each day listed above is clickable. By visiting the specific date page, you can access minute-level details including sunrise/sunset times, Gulika Kalam, and the exact ending times of stars and thithis.
                </p>
            </div>
        </div>
    );
}

