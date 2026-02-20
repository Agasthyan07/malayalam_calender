import { getWeekData, formatDate } from '@/lib/dateUtils';
import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const revalidate = 3600;

type Props = {
    searchParams: Promise<{ date?: string }>;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
    const resolvedSearchParams = await searchParams;
    const targetDateStr = resolvedSearchParams?.date || new Date().toISOString().split('T')[0];
    const targetDate = new Date(targetDateStr);
    const day = targetDate.getDay(); // 0 is Sunday
    const diff = targetDate.getDate() - day; // Adjust to Sunday
    const weekStart = new Date(targetDate.setDate(diff));
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);

    const startStr = formatDate(weekStart.toISOString().split('T')[0]);
    const endStr = formatDate(weekEnd.toISOString().split('T')[0]);

    return {
        title: `Malayalam Weekly Calendar (${startStr} to ${endStr}) | Panchangam`,
        description: `View the weekly Malayalam calendar and Panchangam from ${startStr} to ${endStr}. Check Nakshatram, Tithi, Rahu Kalam, and auspicious timings for the week.`,
        alternates: {
            canonical: `https://malayalamcalendar.site/weekly-calendar?date=${weekStart.toISOString().split('T')[0]}`,
        },
    };
}

export default async function WeeklyCalendarPage({ searchParams }: Props) {
    const resolvedSearchParams = await searchParams;
    const targetDateStr = resolvedSearchParams?.date || new Date().toISOString().split('T')[0];

    // Validate date format
    if (!/^\d{4}-\d{2}-\d{2}$/.test(targetDateStr)) {
        return notFound();
    }

    const targetDate = new Date(targetDateStr);
    const day = targetDate.getDay();
    const diff = targetDate.getDate() - day;
    const weekStart = new Date(targetDate);
    weekStart.setDate(diff); // Set to Sunday
    const weekStartStr = weekStart.toISOString().split('T')[0];

    const weekData = await getWeekData(weekStartStr);

    const prevWeek = new Date(weekStart);
    prevWeek.setDate(prevWeek.getDate() - 7);
    const prevWeekStr = prevWeek.toISOString().split('T')[0];

    const nextWeek = new Date(weekStart);
    nextWeek.setDate(nextWeek.getDate() + 7);
    const nextWeekStr = nextWeek.toISOString().split('T')[0];

    if (weekData.length === 0) {
        return (
            <div className="container mx-auto px-4 py-8 text-center max-w-4xl">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Data Not Available</h1>
                <p className="mt-2 text-gray-600">Calendar data for this week is not yet available.</p>
                <Link href="/" className="text-indigo-600 hover:underline mt-4 inline-block">Back to Home</Link>
            </div>
        );
    }

    const startFormatted = formatDate(weekData[0].date);
    const endFormatted = formatDate(weekData[weekData.length - 1].date);

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <h1 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white mb-2">
                Malayalam Weekly Calendar & Panchangam
            </h1>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
                {startFormatted} - {endFormatted}
            </p>

            <div className="flex justify-between items-center mb-6">
                <Link
                    href={`/weekly-calendar?date=${prevWeekStr}`}
                    className="bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium transition-colors"
                >
                    ← Previous Week
                </Link>
                <Link
                    href={`/weekly-calendar?date=${nextWeekStr}`}
                    className="bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium transition-colors"
                >
                    Next Week →
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {weekData.map((dayData) => (
                    <div key={dayData.date} className={`bg-white dark:bg-gray-800 border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow ${dayData.date === new Date().toISOString().split('T')[0] ? 'border-indigo-500 ring-1 ring-indigo-500' : 'border-gray-200 dark:border-gray-700'}`}>
                        <div className="bg-gray-50 dark:bg-gray-900/50 px-4 py-2 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                            <span className="font-bold text-gray-900 dark:text-white">{formatDate(dayData.date)}</span>
                            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">{new Date(dayData.date).toLocaleDateString('en-US', { weekday: 'short' })}</span>
                        </div>
                        <div className="p-4 space-y-3">
                            <div>
                                <p className="text-xs text-orange-500 font-bold uppercase">Malayalam Date</p>
                                <p className="font-medium text-gray-900 dark:text-gray-100">{dayData.malayalam_date}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 font-bold uppercase">Nakshatram</p>
                                <p className="text-sm text-gray-800 dark:text-gray-200">{dayData.nakshatram}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 font-bold uppercase">Tithi</p>
                                <p className="text-sm text-gray-800 dark:text-gray-200">{dayData.tithi}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <p className="text-xs text-red-500 font-bold uppercase">Rahu Kalam</p>
                                    <p className="text-xs text-gray-800 dark:text-gray-200">{dayData.rahukalam}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 font-bold uppercase">Sunrise</p>
                                    <p className="text-xs text-gray-800 dark:text-gray-200">{dayData.sunrise}</p>
                                </div>
                            </div>
                            {dayData.muhurtham && (
                                <div className="pt-2 border-t border-dashed border-gray-100 dark:border-gray-700">
                                    <p className="text-xs text-indigo-500 font-bold uppercase">Muhurtham</p>
                                    <p className="text-xs text-gray-800 dark:text-gray-200">{dayData.muhurtham}</p>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 text-center">
                <Link href="/" className="text-indigo-600 hover:underline">Back to Home</Link>
            </div>

            <AdSlot slotId="bottom-banner" />
        </div>
    );
}
