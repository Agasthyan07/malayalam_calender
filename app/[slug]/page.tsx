import CalendarRow from '@/components/CalendarRow';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getMonthData, formatDate } from '@/lib/dateUtils';
import AdSlot from '@/components/AdSlot';
import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const revalidate = 3600; // Hourly revalidation

type Props = {
    params: Promise<{ slug: string }>;
}

const MONTH_NAMES = [
    'january', 'february', 'march', 'april', 'may', 'june',
    'july', 'august', 'september', 'october', 'november', 'december'
];

function parseSlug(slug: string): { year: string, month: string } | null {
    // Expected format: malayalam-calendar-{monthName}-{year}
    // minimal length: malayalam-calendar-may-2026 (26 chars)
    if (!slug.startsWith('malayalam-calendar-')) return null;

    const parts = slug.replace('malayalam-calendar-', '').split('-');
    // parts should be [monthName, year]
    if (parts.length !== 2) return null;

    const [monthName, year] = parts;
    if (!/^\d{4}$/.test(year)) return null;

    const monthIndex = MONTH_NAMES.indexOf(monthName.toLowerCase());
    if (monthIndex === -1) return null;

    const month = String(monthIndex + 1).padStart(2, '0');
    return { year, month };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const parsed = parseSlug(slug);

    if (!parsed) {
        return {
            title: 'Page Not Found',
        };
    }

    const { year, month } = parsed;
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
        alternates: {
            canonical: `https://malayalamcalendar.site/${slug}`,
        },
        openGraph: {
            title: `${monthName} ${year} Malayalam Calendar`,
            description: `View the complete Malayalam Calendar for ${monthName} ${year} with all daily details.`,
            url: `https://malayalamcalendar.site/${slug}`,
        }
    };
}

export default async function MonthPageSEO({ params }: Props) {
    const { slug } = await params;
    const parsed = parseSlug(slug);

    if (!parsed) {
        notFound();
    }

    const { year, month } = parsed;
    const days = await getMonthData(year, month);
    const festivals = days.filter(d => d.festival);

    // Month name helper
    const date = new Date(parseInt(year), parseInt(month) - 1, 1);
    const monthName = date.toLocaleString('default', { month: 'long' });

    const breadcrumbs = [
        { label: `${year} Calendar`, href: `/calendar/${year}` },
        { label: monthName, href: `/${slug}` }, // Already good
    ];

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <Breadcrumbs items={breadcrumbs} />

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white capitalize mb-2">
                        {monthName} {year} Malayalam Calendar
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Daily Panchangam, Nakshatram, Tithi & Festivals
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
                    {days.length > 0 ? (
                        days.map((day) => (
                            <CalendarRow key={day.date} day={day} />
                        ))
                    ) : (
                        <div className="p-8 text-center text-gray-500">
                            No data available for this month yet.
                        </div>
                    )}
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

            <div className="mt-12 prose prose-indigo dark:prose-invert max-w-none">
                <h3>About {monthName} {year} in Malayalam Calendar</h3>
                <p>
                    {monthName} {year} corresponds to the Malayalam months of <strong>{days[0]?.malayalam_date.split(' ')[0]}</strong> and <strong>{days[days.length - 1]?.malayalam_date.split(' ')[0]}</strong>.
                    This page offers a comprehensive daily view (Panchangam) enabling you to check the <strong>Nakshatram</strong>, <strong>Tithi</strong>, <strong>Rahu Kalam</strong>, and other auspicious timings for every day of the month.
                </p>
                <p>
                    For detailed daily views including Nalla Samayam and sunrise/sunset timings, simply click on any date in the list above.
                </p>
            </div>
        </div>
    );
}
