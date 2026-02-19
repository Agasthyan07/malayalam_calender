import { formatDate } from '@/lib/dateUtils';
import Link from 'next/link';

type Props = {
    data: {
        date: string;
        malayalam_date: string;
        nakshatram: string;
        tithi: string;
    };
};

export default function TodaysDetails({ data }: Props) {
    // Format Gregorian date for display (e.g., "February 20, 2026")
    const dateObj = new Date(data.date);
    const formattedDate = dateObj.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    return (
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 border border-indigo-100 dark:border-indigo-800 rounded-xl p-6 mb-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Today's Insight (ഇന്നത്തെ വിവരങ്ങൾ)
            </h2>
            <div className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white leading-relaxed">
                <p>Today is <span className="text-indigo-600 dark:text-indigo-400">{formattedDate}</span>.</p>
                <p>The Malayalam date is <span className="text-indigo-600 dark:text-indigo-400">{data.malayalam_date}</span>.</p>
                <p>The Nakshatram is <span className="text-indigo-600 dark:text-indigo-400">{data.nakshatram}</span>.</p>
            </div>
            <div className="mt-4 pt-4 border-t border-indigo-100 dark:border-indigo-800 flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
                <span>Tithi: <strong>{data.tithi}</strong></span>
                <Link href="#calendar-scroll" className="text-indigo-600 hover:text-indigo-800 font-medium">View Full Calendar ↓</Link>
            </div>
        </div>
    );
}
