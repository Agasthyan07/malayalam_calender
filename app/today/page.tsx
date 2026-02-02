import TodayCard from '@/components/TodayCard';
import AdSlot from '@/components/AdSlot';
import DateNavigation from '@/components/DateNavigation';
import { getDailyData, formatDate, getMonthData } from '@/lib/dateUtils';
import JsonLd from '@/components/JsonLd';
import { Metadata } from 'next';
import CalendarGrid from '@/components/CalendarGrid';

export const revalidate = 3600; // Hourly revalidation

type Props = {
    searchParams: Promise<{ date?: string }>;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
    const resolvedSearchParams = await searchParams;
    let targetDate = resolvedSearchParams?.date;

    // Calculate "Today" in IST
    const now = new Date();
    const options = { timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit' } as const;
    const formatter = new Intl.DateTimeFormat('en-CA', options);
    const todayStr = formatter.format(now); // YYYY-MM-DD

    if (!targetDate) {
        targetDate = todayStr;
    }

    const isToday = targetDate === todayStr;
    const data = await getDailyData(targetDate);

    if (!data) {
        return {
            title: 'Malayalam Calendar - Date Not Found',
            description: 'Daily Malayalam Calendar details not available.',
        };
    }

    const titlePrefix = isToday ? 'Malayalam Date Today' : `Malayalam Date ${formatDate(targetDate)}`;

    return {
        title: `${data.malayalam_date} - ${titlePrefix} | ${data.nakshatram}`,
        description: `${titlePrefix} is ${data.malayalam_date}. Nakshatram: ${data.nakshatram}, Tithi: ${data.tithi}. Sunrise: ${data.sunrise}, Rahukalam: ${data.rahukalam}.`,
        openGraph: {
            title: `${data.malayalam_date} - ${titlePrefix}`,
            description: `Check ${isToday ? "today's" : "the"} Malayalam date, Nakshatram (${data.nakshatram}), and auspicious timings.`,
            type: 'article',
            publishedTime: data.date,
        }
    };
}

export default async function TodayPage({ searchParams }: Props) {
    const resolvedSearchParams = await searchParams;
    let targetDate = resolvedSearchParams?.date;

    // Calculate "Today" in IST
    const now = new Date();
    const options = { timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit' } as const;
    const formatter = new Intl.DateTimeFormat('en-CA', options);
    const todayStr = formatter.format(now);

    if (!targetDate || Array.isArray(targetDate)) {
        targetDate = todayStr;
    }

    const isToday = targetDate === todayStr;
    const data = await getDailyData(targetDate);

    if (!data) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <h1 className="text-xl font-medium text-gray-600">Data not available for {targetDate}</h1>
                <p className="mt-2 text-gray-500">Please check back later.</p>
            </div>
        );
    }

    // Fetch full month data for the calendar grid
    const [year, month] = targetDate.split('-');
    const monthData = await getMonthData(year, month);

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Event',
        name: `Malayalam Date: ${data.malayalam_date}`,
        startDate: data.date,
        endDate: data.date,
        description: `Daily Malayalam Calendar details for ${data.date}. Nakshatram: ${data.nakshatram}, Tithi: ${data.tithi}.`,
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
        location: {
            '@type': 'VirtualLocation',
            url: 'https://your-domain.com/today'
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <JsonLd data={jsonLd} />
            <h1 className="sr-only">Malayalam Calendar - {data.malayalam_date}</h1>
            <AdSlot slotId="top-banner" />

            {/* Title Section */}
            <div className="text-center mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">
                    {isToday ? 'ഇന്നത്തെ മലയാളം കലണ്ടർ' : `${formatDate(targetDate)} - മലയാളം കലണ്ടർ`}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                    {data.malayalam_date}
                </p>
            </div>

            <TodayCard data={data} />

            <div className="mt-8">
                <DateNavigation currentDate={data.date} />
            </div>

            <div className="my-8">
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4 px-2 uppercase tracking-wide">
                    {new Date(parseInt(year), parseInt(month) - 1).toLocaleString('default', { month: 'long', year: 'numeric' })}
                </h3>
                <CalendarGrid days={monthData} />
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 my-8 text-center">
                <p className="text-lg md:text-xl text-gray-800 dark:text-gray-200 leading-relaxed font-malayalam">
                    {isToday ? 'ഇന്ന് കേരളത്തിൽ' : <span className="font-bold text-red-700 dark:text-red-400">{formatDate(data.date)}</span>}
                    {' '}
                    (<span className="font-medium text-gray-900 dark:text-gray-100">{data.malayalam_date}</span>) ആണ്.
                    {' '}
                    {isToday ? 'ഇന്നത്തെ' : 'ആ ദിവസത്തെ'} നക്ഷത്രം <span className="font-bold text-indigo-700 dark:text-indigo-400">{data.nakshatram}</span> ആണ്.
                    {' '}
                    സൂര്യോദയം രാവിലെ <span className="font-medium text-gray-900 dark:text-gray-100">{data.sunrise}</span>-നും
                    {' '}
                    സൂര്യാസ്തമയം വൈകിട്ട് <span className="font-medium text-gray-900 dark:text-gray-100">{data.sunset}</span>-നും ആണ്.
                </p>
            </div>

            <div className="bg-red-50 dark:bg-gray-900/50 rounded-xl p-6 my-8 border border-red-100 dark:border-gray-800">
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                    About Malayalam Calendar 2026 & Kollavarsham
                </h2>
                <div className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-3">
                    <p>
                        The <strong>Malayalam Calendar</strong>, extensively used in Kerala, is a solar calendar based on the <strong>Kollavarsham</strong> era.
                        This <strong>2026 Malayalam Calendar</strong> provides accurate daily details compliant with traditional <strong>Malayalam Era</strong> calculations.
                    </p>
                    <p>
                        Our <strong>Malayalam Panchangam</strong> helps you track daily <strong>Nakshatram</strong>, Tithi, and auspicious timings like Nalla Samayam.
                        Whether you follow the <strong>Manorama</strong> or <strong>Mathrubhumi</strong> calendar styles, our daily date views ensure you stay updated with correct festival dates and <strong>Muhoortham</strong> timings.
                    </p>
                </div>
            </div>

            <AdSlot slotId="mid-content" />
        </div>
    );
}
