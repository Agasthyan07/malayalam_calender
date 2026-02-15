import { DailyData } from '@/types/date';
import { formatDate } from '@/lib/dateUtils';

type Props = {
    days: DailyData[];
    title: string;
};

export default function RahuKalamTable({ days, title }: Props) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden my-8">
            <div className="bg-indigo-50 dark:bg-indigo-900/20 px-6 py-4 border-b border-indigo-100 dark:border-indigo-800">
                <h3 className="text-lg font-bold text-indigo-900 dark:text-indigo-200 flex items-center gap-2">
                    <span className="text-xl">⏱️</span> {title}
                </h3>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                    <thead className="bg-gray-50 dark:bg-gray-700/50">
                        <tr>
                            <th className="px-6 py-3 font-semibold text-gray-900 dark:text-gray-100">Date</th>
                            <th className="px-6 py-3 font-semibold text-gray-900 dark:text-gray-100">Weekday</th>
                            <th className="px-6 py-3 font-semibold text-gray-900 dark:text-gray-100">Rahu Kalam</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                        {days.map((day) => (
                            <tr key={day.date} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                <td className="px-6 py-3 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                    {formatDate(day.date)} <span className="text-xs text-gray-500 font-normal ml-1">({day.malayalam_date})</span>
                                </td>
                                <td className="px-6 py-3 text-gray-600 dark:text-gray-300">
                                    {day.weekday}
                                </td>
                                <td className="px-6 py-3 text-red-600 dark:text-red-400 font-medium">
                                    {day.rahukalam}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
