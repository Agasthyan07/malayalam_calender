import { getDailyData, formatDate, getMonthData } from '@/lib/dateUtils';
import TodayCard from '@/components/TodayCard';
import AdSlot from '@/components/AdSlot';
import DateNavigation from '@/components/DateNavigation';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CalendarGrid from '@/components/CalendarGrid';

export const revalidate = 3600;

type Props = {
    params: Promise<{ date: string }>;
};

function parseDateFromUrl(dateStr: string): string {
    // Input: DD-MM-YYYY
    // Output: YYYY-MM-DD
    const parts = dateStr.split('-');
    if (parts.length !== 3) return '';
    const [day, month, year] = parts;
    return `${year}-${month}-${day}`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const resolvedParams = await params;
    const { date } = resolvedParams;
    const targetDate = parseDateFromUrl(date);

    // Validate date
    if (!targetDate || isNaN(new Date(targetDate).getTime())) {
        return {
            title: 'Invalid Date - Malayalam Calendar',
            description: 'The requested date is invalid.'
        };
    }

    const data = await getDailyData(targetDate);

    if (!data) {
        return {
            title: `Malayalam Date for ${formatDate(targetDate)}`,
            description: `Malayalam calendar details for ${formatDate(targetDate)}.`,
        };
    }

    return {
        title: `${data.malayalam_date} - ${formatDate(data.date)} | Malayalam Calendar`,
        description: `Malayalam date for ${formatDate(data.date)} is ${data.malayalam_date}. Nakshatram: ${data.nakshatram}, Tithi: ${data.tithi}.`,
        openGraph: {
            title: `${data.malayalam_date} - ${formatDate(data.date)}`,
            description: `Check the Malayalam date and details for ${formatDate(data.date)}.`,
            type: 'article',
            publishedTime: data.date,
        }
    };
}

export default async function DatePage({ params }: Props) {
    const resolvedParams = await params;
    const { date } = resolvedParams; // URL format: DD-MM-YYYY
    const targetDate = parseDateFromUrl(date); // Data format: YYYY-MM-DD

    // Validate date format
    if (!targetDate || isNaN(new Date(targetDate).getTime())) {
        notFound();
    }

    const data = await getDailyData(targetDate);

    if (!data) {
        return (
            <div className="container mx-auto px-4 py-8 text-center bg-gray-50 min-h-screen">
                <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                    <h1 className="text-xl font-medium text-gray-800 mb-2">Data Not Available</h1>
                    <p className="text-gray-500 mb-6">
                        We couldn't find calendar data for <span className="font-semibold text-gray-700">{date}</span>.
                    </p>
                    <DateNavigation currentDate={targetDate} />
                </div>
            </div>
        );
    }

    // Fetch full month data for the calendar grid
    const [year, month] = targetDate.split('-');
    const monthData = await getMonthData(year, month);

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <h1 className="sr-only">Malayalam Calendar - {formatDate(data.date)}</h1>
            <AdSlot slotId="top-banner" />

            <div className="text-center mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">
                    {formatDate(targetDate)} - മലയാളം കലണ്ടർ
                </h2>
            </div>

            <TodayCard data={data} />

            <div className="mt-8">
                <DateNavigation currentDate={data.date} />
            </div>

            <div className="my-8">
                <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4 px-2 uppercase tracking-wide">
                    {new Date(parseInt(year), parseInt(month) - 1).toLocaleString('default', { month: 'long', year: 'numeric' })}
                </h2>
                <CalendarGrid days={monthData} />
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 my-8 text-center">
                <p className="text-lg md:text-xl text-gray-800 dark:text-gray-200 leading-relaxed font-malayalam">
                    <span className="font-bold text-red-700 dark:text-red-400">{formatDate(data.date)}</span> (<span className="font-medium text-gray-900 dark:text-gray-100">{data.malayalam_date}</span>)
                    ലെ നക്ഷത്രം <span className="font-bold text-indigo-700 dark:text-indigo-400">{data.nakshatram}</span> ആണ്.
                </p>
            </div>

            <AdSlot slotId="mid-content" />
        </div>
    );
}
