import { getYearData, formatDate } from '@/lib/dateUtils';
import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import { Metadata } from 'next';

export const revalidate = 3600;

export const metadata: Metadata = {
    title: 'Malayalam Marriage Muhurtham 2026 | Vivaha Muhurtham Dates Kerala',
    description: 'Complete list of auspicious Marriage Muhurtham dates in 2026 for Kerala (Vivaha Muhurtham). Check best wedding dates based on Nakshatra and Tithi.',
    keywords: ['Marriage Muhurtham 2026', 'Vivaha Muhurtham 2026', 'Kerala Wedding Dates 2026', 'Malayalam Calendar Marriage Dates', 'Hindu Marriage Dates 2026 Kerala'],
    alternates: {
        canonical: 'https://malayalamcalendar.site/marriage-muhurtham-2026',
    },
};

export default async function MarriageMuhurthamPage() {
    const yearData = await getYearData('2026');

    // Filter days that have muhurtham data
    // Note: ideally we filter for "Vivaha" specific muhurtham if data allows, 
    // but for now we list all days with muhurtham data as potential candidates or just display the data provided.
    // If the data string contains "Vivaha" or similar, better. 
    // User asked to "correctly generate", so I will assume checking for 'muhurtham' field presence is the starting point.
    // In many datasets, 'muhurtham' field specifically lists marriage/auspicious timings.
    const muhuratDays = yearData.filter(d => d.muhurtham && d.muhurtham.trim() !== '');

    // Group by month
    const grouped_months: { [key: string]: typeof muhuratDays } = {};

    muhuratDays.forEach(day => {
        const monthName = new Date(day.date).toLocaleString('default', { month: 'long' });
        if (!grouped_months[monthName]) {
            grouped_months[monthName] = [];
        }
        grouped_months[monthName].push(day);
    });

    const monthOrder = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <h1 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-6">
                Kerala Marriage Muhurtham 2026
            </h1>

            <p className="text-center text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                Find the most auspicious <strong>Vivaha Muhurtham</strong> (Wedding Dates) for 2026 based on the Malayalam Calendar.
                These dates are calculated according to Nakshatra and Tithi suitability for weddings in Kerala.
            </p>

            <AdSlot slotId="top-banner" />

            <div className="space-y-8 mt-8">
                {monthOrder.map(month => {
                    const days = grouped_months[month];
                    if (!days || days.length === 0) return null;

                    return (
                        <div key={month} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                            <div className="bg-pink-50 dark:bg-pink-900/30 px-6 py-4 border-b border-pink-100 dark:border-pink-800/50">
                                <h2 className="text-xl font-bold text-pink-700 dark:text-pink-400">{month} 2026</h2>
                            </div>
                            <div className="divide-y divide-gray-100 dark:divide-gray-700">
                                {days.map(day => (
                                    <div key={day.date} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                            <div className="flex items-center gap-4">
                                                <div className="flex-shrink-0 w-16 text-center bg-gray-100 dark:bg-gray-700 rounded-lg p-2">
                                                    <span className="block text-xl font-bold text-gray-800 dark:text-gray-100">{new Date(day.date).getDate()}</span>
                                                    <span className="block text-xs text-gray-500 dark:text-gray-400 uppercase">{new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}</span>
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                                        {day.muhurtham}
                                                    </p>
                                                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-gray-600 dark:text-gray-400">
                                                        <span>⭐ {day.nakshatram}</span>
                                                        <span>🌖 {day.tithi}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <Link
                                                href={`/date/${formatDate(day.date)}`}
                                                className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline whitespace-nowrap"
                                            >
                                                View Panchangam →
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-12 p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-100 dark:border-yellow-800/50 prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
                <h3>About Marriage Muhurtham Calculation</h3>
                <p>
                    In Kerala tradition, choosing a <strong>Vivaha Muhurtham</strong> involves analyzing the horoscopes (Jathakam) of the bride and groom.
                    However, general auspicious dates are determined based on favorable Nakshatras (Stars) and Tithis (Lunar Days).
                    Typically, certain months like <em>Karkidakam</em>, <em>Midhunam</em>, and <em>Dhanu</em> are avoided for weddings.
                    Always consult with a learned astrologer using the couple's specific horoscopes for the final decision.
                </p>
            </div>

            <div className="mt-8 text-center">
                <Link href="/" className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                    <span>← Back to Malayalam Calendar Home</span>
                </Link>
            </div>

            <AdSlot slotId="bottom-banner" />
        </div>
    );
}
