import { getYearData, formatDate } from '@/lib/dateUtils';
import Link from 'next/link';
import { DailyData } from '@/types/date';

const MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

export default async function FestivalsPage() {
    const yearData = await getYearData('2026');
    const festivals = yearData.filter(d => d.festival);

    // Group festivals by month
    const festivalsByMonth: { [key: number]: DailyData[] } = {};
    festivals.forEach(day => {
        const monthIndex = parseInt(day.date.split('-')[1]) - 1;
        if (!festivalsByMonth[monthIndex]) {
            festivalsByMonth[monthIndex] = [];
        }
        festivalsByMonth[monthIndex].push(day);
    });

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'EventSeries',
        name: 'Kerala Festivals 2026',
        description: 'Complete list of festivals and holidays in Kerala for the year 2026.',
        startDate: '2026-01-01',
        endDate: '2026-12-31',
        event: festivals.map(f => ({
            '@type': 'Event',
            name: f.festival,
            startDate: f.date,
            location: {
                '@type': 'Place',
                name: 'Kerala, India'
            }
        }))
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <h1 className="text-3xl md:text-4xl font-extrabold mb-10 text-center text-gray-900 dark:text-white tracking-tight">
                Festivals <span className="text-red-600">2026</span>
            </h1>

            <div className="space-y-12">
                {Object.keys(festivalsByMonth).length > 0 ? (
                    Object.keys(festivalsByMonth).sort((a, b) => parseInt(a) - parseInt(b)).map((monthIndexStr) => {
                        const monthIndex = parseInt(monthIndexStr);
                        const monthFestivals = festivalsByMonth[monthIndex];

                        // Get Today in IST
                        const now = new Date();
                        const options = { timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit' } as const;
                        const formatter = new Intl.DateTimeFormat('en-CA', options);
                        const todayStr = formatter.format(now);

                        return (
                            <section key={monthIndex} className="relative">
                                <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm py-4 mb-4 border-b border-gray-100">
                                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-3">
                                        <span className="w-8 h-1 bg-red-500 rounded-full"></span>
                                        {MONTH_NAMES[monthIndex]}
                                    </h2>
                                </div>
                                <div className="grid gap-4 sm:grid-cols-2">
                                    {monthFestivals.map((day) => {
                                        const isToday = day.date === todayStr;
                                        return (
                                            <Link
                                                href={isToday ? '/' : `/date/${formatDate(day.date)}`}
                                                key={day.date}
                                                className="group block bg-white rounded-xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] border border-gray-100 transition-all duration-300 hover:-translate-y-1"
                                            >
                                                <div className="flex items-start justify-between mb-3">
                                                    <div className="bg-red-50 text-red-700 font-bold text-sm px-3 py-1 rounded-lg">
                                                        {formatDate(day.date)}
                                                    </div>
                                                    <div className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                                                        {day.weekday.substring(0, 3)}
                                                    </div>
                                                </div>

                                                <h3 className="font-bold text-lg text-gray-900 group-hover:text-red-700 transition-colors mb-2 line-clamp-2 leading-tight">
                                                    {day.festival}
                                                </h3>

                                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                                                    <span className="font-medium text-gray-600">{day.malayalam_date}</span>
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </section>
                        );
                    })
                ) : (
                    <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                        <p className="text-gray-500 font-medium">No festivals found in 2026 data.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
