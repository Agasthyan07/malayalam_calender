import CalendarGrid from '@/components/CalendarGrid';
import { getMonthData, formatDate } from '@/lib/dateUtils';
import AdSlot from '@/components/AdSlot';
import Link from 'next/link';

import { Metadata } from 'next';

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
        title: `${monthName} ${year} Malayalam Calendar | Festivals & Nakshatram`,
        description: `Malayalam Calendar for ${monthName} ${year}. Check daily Nakshatram, Tithi, Rahukalam and major festivals in Kerala.`,
        openGraph: {
            title: `${monthName} ${year} Malayalam Calendar`,
            description: `View the compelte Malayalam Calendar for ${monthName} ${year} with all daily details.`,
        }
    };
}

export default async function MonthPage({ params }: Props) {
    const { year, month } = await params;
    const days = await getMonthData(year, month);
    const festivals = days.filter(d => d.festival);

    // Month name helper
    const date = new Date(parseInt(year), parseInt(month) - 1, 1);
    const monthName = date.toLocaleString('default', { month: 'long' });

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold capitalize">{monthName} {year}</h1>
                    <p className="text-sm text-gray-500">{year} Malayalam Calendar</p>
                </div>
                <Link href={`/calendar/${year}`} className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700">Back to Year</Link>
            </div>

            <CalendarGrid days={days} />

            <div className="mt-10">
                <div className="flex items-center gap-3 mb-6">
                    <span className="w-1 h-8 bg-red-600 rounded-full"></span>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Holidays & Festivals in {monthName} {year}</h2>
                </div>

                {festivals.length > 0 ? (
                    <div className="grid gap-4 md:grid-cols-2">
                        {festivals.map((day) => (
                            <Link
                                href={`/today?date=${day.date}`}
                                key={day.date}
                                className="group flex items-center p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
                            >
                                <div className="flex-shrink-0 bg-red-50 text-red-700 font-bold text-xs w-20 h-10 flex items-center justify-center rounded-lg mr-4 group-hover:bg-red-600 group-hover:text-white transition-colors">
                                    {formatDate(day.date)}
                                </div>
                                <div className="flex-grow min-w-0">
                                    <div className="font-bold text-gray-900 group-hover:text-red-700 transition-colors truncate text-base mb-0.5">
                                        {day.festival}
                                    </div>
                                    <div className="flex items-center text-xs text-gray-500 font-medium">
                                        <span className="uppercase tracking-wider">{day.weekday}</span>
                                        <span className="mx-2 text-gray-300">•</span>
                                        <span>{day.malayalam_date}</span>
                                    </div>
                                </div>
                                <div className="text-gray-300 group-hover:text-red-500 transition-colors">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="bg-gray-50 rounded-xl p-8 text-center border border-gray-100 border-dashed">
                        <p className="text-gray-500">No major festivals listed for this month.</p>
                    </div>
                )}
            </div>

            <AdSlot slotId={`month-${month}`} />
        </div>
    );
}
