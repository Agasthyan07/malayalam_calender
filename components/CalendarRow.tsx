import Link from 'next/link';
import { DailyData } from '@/types/date';
import { formatDate } from '@/lib/dateUtils';

interface CalendarRowProps {
    day: DailyData;
}

export default function CalendarRow({ day }: CalendarRowProps) {
    const isHoliday = !!day.is_holiday;
    const isSunday = day.weekday === 'Sunday';

    // Check if it's today logic could be passed in or calculated here
    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    const isToday = day.date === todayStr;

    return (
        <Link
            href={isToday ? '/' : `/date/${formatDate(day.date)}`}
            className={`
                group relative flex flex-col sm:flex-row items-stretch border-b border-gray-100 dark:border-gray-800 
                hover:bg-blue-50/50 dark:hover:bg-gray-800/50 transition-colors duration-200
                ${isToday ? 'bg-indigo-50/60 dark:bg-indigo-900/10' : 'bg-white dark:bg-gray-900'}
            `}
        >
            {/* Left Side: Date & Weekday */}
            <div className={`
                flex sm:flex-col items-center justify-center p-4 w-full sm:w-24 md:w-32 flex-shrink-0 
                ${(isHoliday || isSunday) ? 'bg-red-50/50 dark:bg-red-900/10 text-red-600 dark:text-red-400' : 'bg-gray-50/50 dark:bg-gray-800/30 text-gray-700 dark:text-gray-300'}
                border-r border-gray-100 dark:border-gray-800
            `}>
                <span className="text-3xl font-bold leading-none">{day.date.split('-')[2]}</span>
                <span className="text-xs uppercase font-bold tracking-wider mt-1">{day.weekday.substring(0, 3)}</span>
            </div>

            {/* Right Side: Details */}
            <div className="flex-grow p-4 min-w-0">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="font-bold text-lg text-gray-900 dark:text-gray-100">
                            {day.malayalam_date}
                        </span>
                        {day.festival && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 whitespace-normal text-center">
                                {day.festival}
                            </span>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                        <span className="w-4 h-4 text-indigo-500">★</span>
                        <span className="truncate" title={`Nakshatram: ${day.nakshatram}`}>{day.nakshatram}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-4 h-4 text-purple-500">☾</span>
                        <span className="truncate" title={`Tithi: ${day.tithi}`}>{day.tithi}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-4 h-4 text-orange-500">⚠</span>
                        <span className="truncate" title={`Rahu Kalam: ${day.rahukalam}`}>{day.rahukalam}</span>
                    </div>
                </div>
            </div>

            {/* View Details Arrow (Mobile Only mostly) */}
            <div className="hidden sm:flex items-center justify-center w-12 text-gray-300 group-hover:text-indigo-500 transition-colors">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </div>
        </Link>
    );
}
