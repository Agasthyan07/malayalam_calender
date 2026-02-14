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
            <h1 className="text-3xl md:text-4xl font-extrabold mb-6 text-center text-gray-900 dark:text-white tracking-tight">
                Festivals <span className="text-red-600">2026</span>
            </h1>

            {/* INTRO CONTENT FOR SEO & USER VALUE */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 md:p-8 shadow-sm border border-gray-100 dark:border-gray-700 mb-10 prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
                <p className="lead text-xl text-center mb-6">
                    Discover the vibrant tapestry of Kerala's culture through its festivals.
                    From the grand spectacle of <strong>Thrissur Pooram</strong> to the nostalgic harvest festival of <strong>Onam</strong>, 2026 promises a year filled with celebration.
                </p>

                <h2>The Cultural Significance of Kerala Festivals</h2>
                <p>
                    Kerala, often referred to as "God's Own Country," is a land where tradition and modernity coexist.
                    The festivals here are not just religious observances; they are social events that bring together people of all castes, creeds, and communities.
                    Most festivals in Kerala are determined by the <strong>Malayalam Calendar</strong>, falling on specific <em>Nakshatras</em> (stars) or <em>Tithis</em> (lunar days) in specific Malayalam months.
                </p>

                <h3>Temple Festivals (Ulsavams)</h3>
                <p>
                    The temple festival season in Kerala typically begins with the Kodiyettu (flag hoisting) and culminates in the Arattu (holy bath).
                    The highlight of these festivals is the presence of caparisoned elephants, traditional percussion advice called <em>Chenda Melam</em> or <em>Panchavadyam</em>, and spectacular fireworks.
                    Major events like the <strong>Thrissur Pooram</strong> (in the month of Medam) are world-renowned for their pageantry.
                </p>

                <h3>Harvest Festivals</h3>
                <p>
                    Agrarian traditions run deep in Kerala. <strong>Onam</strong>, the state festival, is a harvest festival celebrated in the month of Chingam.
                    It welcomes the spirit of King Mahabali with floral carpets (Pookkalam) and a grand feast (Sadhya).
                    Similarly, <strong>Vishu</strong> in local April marks the astronomical new year and the time of sowing seeds.
                </p>

                <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg text-sm border-l-4 border-indigo-500">
                    <strong>Note for Travelers:</strong> If you are planning to visit Kerala in 2026, the best time to witness these festivals is between November and May, which is traditionally considered the festival season.
                </div>
            </div>

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
                                        // Dynamic link logic
                                        let linkHref = isToday ? '/' : `/date/${formatDate(day.date)}`;
                                        if (day.festival?.toLowerCase().includes('vishu')) linkHref = '/vishu-2026-date-kerala';
                                        if (day.festival?.toLowerCase().includes('onam') && day.festival.includes('Thiruvonam')) linkHref = '/onam-2026-date';

                                        return (
                                            <Link
                                                href={linkHref}
                                                key={day.date}
                                                className="group block bg-white dark:bg-gray-800 rounded-xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:-translate-y-1"
                                            >
                                                <div className="flex items-start justify-between mb-3">
                                                    <div className="bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 font-bold text-sm px-3 py-1 rounded-lg">
                                                        {formatDate(day.date)}
                                                    </div>
                                                    <div className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                                                        {day.weekday.substring(0, 3)}
                                                    </div>
                                                </div>

                                                <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-red-700 dark:group-hover:text-red-400 transition-colors mb-2 line-clamp-2 leading-tight">
                                                    {day.festival}
                                                </h3>

                                                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600"></span>
                                                    <span className="font-medium text-gray-600 dark:text-gray-300">{day.malayalam_date}</span>
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
