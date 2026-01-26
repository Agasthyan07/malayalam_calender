import { Metadata } from 'next';
import Link from 'next/link';
import { getDailyData, formatDate } from '@/lib/dateUtils';
import AdSlot from '@/components/AdSlot';

export const revalidate = 3600; // Hourly revalidation

export const metadata: Metadata = {
    title: 'Rahu Kalam Today – Timings, Meaning & Day-Wise Schedule',
    description: 'Check today’s Rahu Kalam time. Avoid this inauspicious period for new ventures. View the complete weekly Rahu Kaalam chart for India.',
    openGraph: {
        title: 'Rahu Kalam Today – Timings & Schedule',
        description: 'Avoid Rahu Kalam for important tasks. Check today’s accurate timings.',
        type: 'article',
    },
};

export default async function RahuKalamPage() {
    // 1. Get Today's Data
    const now = new Date();
    const options = { timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit' } as const;
    const formatter = new Intl.DateTimeFormat('en-CA', options);
    const todayStr = formatter.format(now); // YYYY-MM-DD

    const data = await getDailyData(todayStr);

    // Fallback if data is missing (unlikely unless file missing)
    const rahuKalam = data?.rahukalam || "Unavailable";
    const displayDate = data ? formatDate(data.date) : "Today";
    const weekday = data?.weekday || "";

    // Static Weekly Chart Data
    const weeklySchedule = [
        { day: "Sunday", time: "04:30 PM - 06:00 PM" },
        { day: "Monday", time: "07:30 AM - 09:00 AM" },
        { day: "Tuesday", time: "03:00 PM - 04:30 PM" },
        { day: "Wednesday", time: "12:00 PM - 01:30 PM" },
        { day: "Thursday", time: "01:30 PM - 03:00 PM" },
        { day: "Friday", time: "10:30 AM - 12:00 PM" },
        { day: "Saturday", time: "09:00 AM - 10:30 AM" },
    ];

    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl">
            {/* Breadcrumb / Navigation helper */}
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                <Link href="/" className="hover:underline">Home</Link> &gt; <span>Rahu Kalam Today</span>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Rahu Kalam Today – Timings, Meaning & Day-Wise Schedule
            </h1>

            <AdSlot slotId="rahukalam-top" />

            {/* ABOVE THE FOLD: Hero Section */}
            <section className="bg-red-50 dark:bg-gray-800 border border-red-100 dark:border-gray-700 rounded-xl p-6 mb-8 text-center shadow-sm">
                <p className="text-gray-600 dark:text-gray-300 font-medium mb-1">{displayDate} | {weekday}</p>

                <div className="my-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-widest font-semibold">TODAY'S RAHU KALAM</p>
                    <p className="text-3xl md:text-4xl font-bold text-red-700 dark:text-red-400 mt-2">{rahuKalam}</p>
                </div>

                <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                    <p>Location: India</p>
                    <p>Last Updated: Today</p>
                </div>
            </section>

            {/* Explanation Section */}
            <section className="prose prose-gray dark:prose-invert max-w-none mb-8">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">What is Rahu Kalam?</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    Rahu Kalam (or Rahu Kaalam) is a period of about 90 minutes every day that is considered inauspicious in Vedic astrology.
                    It is strictly avoided for starting new ventures, buying property, or auspicious ceremonies like marriages.
                    The timing changes every day based on the weekday and sunrise/sunset times.
                </p>
            </section>

            {/* Weekly Table Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Rahu Kalam Weekly Schedule</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
                        <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                            <tr>
                                <th className="px-6 py-3 font-semibold text-sm uppercase">Weekday</th>
                                <th className="px-6 py-3 font-semibold text-sm uppercase">Standard Time</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {weeklySchedule.map((row) => (
                                <tr key={row.day} className={row.day === weekday ? "bg-red-50 dark:bg-gray-700" : "hover:bg-gray-50 dark:hover:bg-gray-700"}>
                                    <td className={`px-6 py-4 text-sm font-medium ${row.day === weekday ? "text-red-700 dark:text-red-400" : "text-gray-900 dark:text-white"}`}>
                                        {row.day} {row.day === weekday && <span className="ml-2 text-xs bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-2 py-0.5 rounded-full">Today</span>}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300 font-mono">
                                        {row.time}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-3 italic">
                    Timings are indicative and calculated based on a standard 6:00 AM sunrise. Actual times may vary slightly by location.
                </p>
            </section>

            <AdSlot slotId="rahukalam-bottom" />

            {/* Internal Linking / Related Section */}
            <section className="mt-8 border-t border-gray-100 dark:border-gray-800 pt-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Related Daily Timings</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <li>
                        <Link href="/today" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 hover:underline">
                            Today Malayalam Calendar
                        </Link>
                    </li>
                    <li>
                        <Link href="/innathe-nakshatram" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 hover:underline">
                            Innathe Nakshatram (Today's Star)
                        </Link>
                    </li>
                    <li>
                        {/* Placeholder for future pages if needed */}
                        <span className="text-gray-400 dark:text-gray-500">Yamagandam Today (Coming Soon)</span>
                    </li>
                    <li>
                        <Link href="/festivals" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 hover:underline">
                            Upcoming Festivals
                        </Link>
                    </li>
                </ul>
            </section>
        </div>
    );
}
