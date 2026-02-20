import { getYearData, formatDate } from '@/lib/dateUtils';
import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import { Metadata } from 'next';

export const revalidate = 3600;

export const metadata: Metadata = {
    title: 'Ekadashi 2026 Kerala Dates | Malayalam Calendar Vratam List',
    description: 'Complete list of Ekadashi dates in 2026 for Kerala. Find Vaikunta Ekadashi, Guruvayur Ekadashi, and all monthly Ekadashi Vratam dates with timings.',
    keywords: ['Ekadashi 2026 Kerala', 'Ekadashi Dates 2026', 'Vaikunta Ekadashi 2026', 'Guruvayur Ekadashi 2026', 'Malayalam Calendar Ekadashi List'],
    alternates: {
        canonical: 'https://malayalamcalendar.site/ekadashi-2026',
    },
};

export default async function EkadashiPage() {
    const yearData = await getYearData('2026');

    // Filter days where tithi includes "Ekadashi"
    const ekadashiDays = yearData.filter(d => d.tithi && d.tithi.toLowerCase().includes('ekadashi'));

    // Group by month
    const grouped_months: { [key: string]: typeof ekadashiDays } = {};

    ekadashiDays.forEach(day => {
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
                Ekadashi Vratam Dates 2026 (Kerala)
            </h1>

            <p className="text-center text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                <strong>Ekadashi</strong> is a sacred day dedicated to Lord Vishnu, observed on the 11th lunar day (Tithi) of each fortnight.
                It is considered highly auspicious for fasting and visiting temples like Guruvayur and Sree Padmanabhaswamy Temple.
            </p>

            <AdSlot slotId="top-banner" />

            <div className="space-y-8 mt-8">
                {monthOrder.map(month => {
                    const days = grouped_months[month];
                    if (!days || days.length === 0) return null;

                    return (
                        <div key={month} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                            <div className="bg-green-50 dark:bg-green-900/30 px-6 py-4 border-b border-green-100 dark:border-green-800/50">
                                <h2 className="text-xl font-bold text-green-700 dark:text-green-400">{month} 2026</h2>
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
                                                        {day.tithi.split(',')[0]} {/* Showing primary tithi if comma separated */}
                                                    </p>
                                                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-gray-600 dark:text-gray-400">
                                                        <span>⭐ {day.nakshatram}</span>
                                                        <span>🗓️ {day.malayalam_date}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <Link
                                                href={`/date/${formatDate(day.date)}`}
                                                className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline whitespace-nowrap"
                                            >
                                                View Details →
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-12 p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-100 dark:border-green-800/50 prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
                <h3>Significance of Ekadashi Fasting</h3>
                <p>
                    Observing Ekadashi Vratam involves abstaining from grains (especially rice) and beans.
                    Devotees spend the day chanting "Om Namo Bhagavate Vasudevaya" and reading scriptures like the <em>Bhagavatam</em>.
                    The fast is broken on the next day (Dwadashi) within a specific time window called <em>Parana</em> time.
                    <strong>Vaikunta Ekadashi</strong> (usually in Dec/Jan) and <strong>Guruvayur Ekadashi</strong> (in Vrischikam) are particularly grand celebrations in Kerala.
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
