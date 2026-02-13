import { DailyData } from "@/types/date";
import Link from "next/link";
import { formatDate } from "@/lib/dateUtils";

type Props = {
    days: DailyData[];
    title?: string;
};

export default function DailyMuhurthamTable({ days, title = "Daily Muhurtham" }: Props) {
    if (!days || days.length === 0) return null;

    // Check if there is ANY muhurtham data for the month
    const hasAnyMuhurtham = days.some(day => day.muhurtham);

    if (!hasAnyMuhurtham) {
        return (
            <div className="mt-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <span className="w-1 h-6 bg-indigo-600 rounded-full"></span>
                    {title}
                </h3>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg text-center text-gray-500 text-sm">
                    No special Muhurtham timings listed for this month.
                </div>
            </div>
        )
    }

    return (
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <span className="w-1 h-6 bg-indigo-600 rounded-full"></span>
                    {title}
                </h3>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 dark:bg-gray-900/50 text-gray-600 dark:text-gray-400 text-xs uppercase tracking-wider">
                            <th className="p-4 font-semibold border-b border-gray-100 dark:border-gray-700">Date</th>
                            <th className="p-4 font-semibold border-b border-gray-100 dark:border-gray-700 hidden md:table-cell">Weekday</th>
                            <th className="p-4 font-semibold border-b border-gray-100 dark:border-gray-700">Nakshatram</th>
                            <th className="p-4 font-semibold border-b border-gray-100 dark:border-gray-700">Muhurtham Details</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-sm">
                        {days.map((day) => {
                            // Check if today
                            const now = new Date();
                            const options = { timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit' } as const;
                            const formatter = new Intl.DateTimeFormat('en-CA', options);
                            const todayStr = formatter.format(now);
                            const isToday = day.date === todayStr;

                            return (
                                <tr
                                    key={day.date}
                                    className={`hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${isToday ? 'bg-indigo-50/50 dark:bg-indigo-900/10' : ''}`}
                                >
                                    <td className="p-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                        <Link href={`/date/${formatDate(day.date)}`} className="hover:text-indigo-600 hover:underline">
                                            {day.date.split('-')[2]}
                                            <span className="md:hidden ml-1 text-gray-500 font-normal">
                                                ({day.weekday.substring(0, 3)})
                                            </span>
                                        </Link>
                                    </td>
                                    <td className="p-4 text-gray-600 dark:text-gray-300 hidden md:table-cell">
                                        {day.weekday}
                                    </td>
                                    <td className="p-4 text-gray-600 dark:text-gray-300">
                                        {day.nakshatram}
                                    </td>
                                    <td className="p-4">
                                        {day.muhurtham ? (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300">
                                                {day.muhurtham}
                                            </span>
                                        ) : (
                                            <span className="text-gray-400">-</span>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
