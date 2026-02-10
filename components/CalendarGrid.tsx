import { DailyData } from '@/types/date';
import Link from 'next/link';
import { formatDate } from '@/lib/dateUtils';

const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function CalendarGrid({ days }: { days: DailyData[] }) {
    if (days.length === 0) return null;

    const startDayIndex = WEEKDAYS.indexOf(days[0].weekday);
    const blanks = Array.from({ length: startDayIndex === -1 ? 0 : startDayIndex });

    // Get today's date in YYYY-MM-DD format based on local time
    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    return (
        <div className="w-full">
            <div className="grid grid-cols-7 gap-1 text-center font-bold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 py-2 rounded-t-lg text-xs md:text-sm">
                <div className="text-red-600 dark:text-red-400">SUN</div>
                <div>MON</div>
                <div>TUE</div>
                <div>WED</div>
                <div>THU</div>
                <div>FRI</div>
                <div>SAT</div>
            </div>
            <div className="grid grid-cols-7 gap-1 bg-gray-200 dark:bg-gray-700 border border-gray-200 dark:border-gray-700">
                {blanks.map((_, i) => (
                    <div key={`blank-${i}`} className="bg-gray-50 min-h-[80px]"></div>
                ))}
                {days.map((day) => {
                    const isToday = day.date === todayStr;
                    const isHoliday = !!day.is_holiday;

                    const isMalayalamMonthStart = day.malayalam_date.endsWith(' 1');

                    return (
                        <Link
                            href={isToday ? '/' : `/date/${formatDate(day.date)}`}
                            key={day.date}
                            className={`
                                min-h-[60px] md:min-h-[80px] p-0.5 md:p-2 transition relative flex flex-col justify-between group
                                ${isToday ? 'bg-indigo-50 dark:bg-indigo-900/30 border-2 border-indigo-500 shadow-sm z-10' : 'bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-gray-700'}
                                ${!isToday && isHoliday ? 'bg-red-50 dark:bg-red-900/20' : ''}
                                ${isMalayalamMonthStart ? 'ring-1 ring-inset ring-orange-200 dark:ring-orange-800 bg-orange-50/50 dark:bg-orange-900/10' : ''}
                            `}
                        >
                            <div className="flex justify-between items-start">
                                <span className={`font-bold text-xs md:text-base ${isToday ? 'text-indigo-700 dark:text-indigo-300' : 'text-gray-800 dark:text-gray-200'} ${!isToday && isHoliday ? 'text-red-700 dark:text-red-400' : ''} group-hover:text-red-700 dark:group-hover:text-red-300`}>
                                    {day.date.split('-')[2].replace(/^0/, '')}
                                </span>
                            </div>

                            {isMalayalamMonthStart && (
                                <div className="text-[9px] md:text-[10px] font-bold text-orange-700 dark:text-orange-400 uppercase tracking-tighter leading-none mb-0.5">
                                    {day.malayalam_date}
                                </div>
                            )}

                            <div className={`text-[9px] md:text-[10px] truncate leading-tight ${isToday ? 'text-indigo-600 dark:text-indigo-400 font-medium' : 'text-gray-500 dark:text-gray-400'}`}>
                                {day.nakshatram}
                            </div>
                            {day.festival && (
                                <div className="absolute top-1 right-1 md:top-2 md:right-2 flex flex-col items-end gap-0.5">
                                    <div className="w-1 md:w-1.5 h-1 md:h-1.5 bg-red-500 rounded-full"></div>
                                </div>
                            )}
                            {isToday && (
                                <div className="absolute top-0.5 right-0.5 md:top-1 md:right-1">
                                    <span className="flex h-1.5 w-1.5 md:h-2 md:w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-full w-full bg-indigo-500"></span>
                                    </span>
                                </div>
                            )}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
