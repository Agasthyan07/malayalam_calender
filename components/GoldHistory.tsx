import React from 'react';

interface HistoryData {
    date: string;
    price22k: number;
    price24k: number;
}

const historyData: HistoryData[] = [
    { date: 'Feb 03, 2026', price22k: 13890, price24k: 14585 },
    { date: 'Feb 02, 2026', price22k: 14039, price24k: 15316 }, // Using search data for history context
    { date: 'Feb 01, 2026', price22k: 14720, price24k: 16058 },
    { date: 'Jan 31, 2026', price22k: 14720, price24k: 16058 },
    { date: 'Jan 30, 2026', price22k: 15510, price24k: 16920 },
    { date: 'Jan 29, 2026', price22k: 16395, price24k: 17885 },
    { date: 'Jan 28, 2026', price22k: 15315, price24k: 16708 },
    { date: 'Jan 27, 2026', price22k: 14845, price24k: 16195 },
    { date: 'Jan 26, 2026', price22k: 14845, price24k: 16195 },
    { date: 'Jan 25, 2026', price22k: 14690, price24k: 16026 },
];

export default function GoldHistory() {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden mt-8">
            <div className="bg-gray-50 dark:bg-gray-900/50 px-6 py-4 border-b border-gray-100 dark:border-gray-800">
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                    Gold Rate History (Last 10 Days)
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Trend analysis of 22k and 24k gold prices in Kerala
                </p>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800">
                            <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Date</th>
                            <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">22 Carat (1g)</th>
                            <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">24 Carat (1g)</th>
                            <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase text-right">Change</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                        {historyData.map((day, index) => {
                            const previousDay = historyData[index + 1];
                            const change = previousDay ? day.price22k - previousDay.price22k : 0;
                            const changeColor = change > 0 ? 'text-green-600' : change < 0 ? 'text-red-500' : 'text-gray-400';
                            const changeSign = change > 0 ? '+' : '';

                            return (
                                <tr key={day.date} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100 whitespace-nowrap">
                                        {day.date}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                                        ₹{day.price22k.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                                        ₹{day.price24k.toLocaleString()}
                                    </td>
                                    <td className={`px-6 py-4 text-sm font-medium text-right ${changeColor}`}>
                                        {previousDay ? `${changeSign}₹${change}` : '-'}
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
