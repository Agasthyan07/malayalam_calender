import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import Breadcrumbs from '@/components/Breadcrumbs';

import { Metadata } from 'next';

export async function generateStaticParams() {
    return [{ year: '2026' }, { year: '2027' }];
}

type Props = {
    params: Promise<{ year: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { year } = await params;
    return {
        title: `${year} Malayalam Calendar | Full Year Panchangam & Festivals`,
        description: `Complete ${year} Malayalam Calendar with monthly views. Check daily Nakshatram, Tithi, auspicious days, and major Kerala festivals for the entire year.`,
        keywords: [
            `Malayalam Calendar ${year}`,
            `Kerala Calendar ${year}`,
            `${year} Panchangam Malayalam`,
            `Malayalam Date ${year}`,
            `Calendar ${year} with Nakshatram`
        ]
    };
}

export default async function YearPage({ params }: Props) {
    const { year } = await params;

    const months = Array.from({ length: 12 }, (_, i) => {
        const date = new Date(parseInt(year), i, 1);
        return {
            slug: (i + 1).toString().padStart(2, '0'),
            name: date.toLocaleString('default', { month: 'long' })
        };
    });

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: `${year} Malayalam Calendar`,
        description: `Complete Malayalam Calendar for the year ${year}.`,
        url: `https://malayalamcalendar2026.in/calendar/${year}`,
        hasPart: months.map(m => ({
            '@type': 'WebPage',
            name: `${m.name} ${year}`,
            url: `https://malayalamcalendar2026.in/calendar/${year}/${m.slug}`
        }))
    };

    const breadcrumbs = [
        { label: `${year} Calendar`, href: `/calendar/${year}` },
    ];

    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <Breadcrumbs items={breadcrumbs} />

            <div className="text-center mb-10">
                <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
                    {year} Malayalam Calendar
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    View the complete Malayalam calendar for {year}. Select a month below to see daily Panchangam, Nakshatram, Thithi, and festival details.
                </p>
            </div>

            <AdSlot slotId="year-top" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 my-8">
                {months.map((m) => {
                    const monthNameLower = m.name.toLowerCase();
                    return (
                        <Link
                            key={m.slug}
                            href={`/malayalam-calendar-${monthNameLower}-${year}`}
                            className="group relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 block"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <span className="text-2xl font-bold text-gray-900 dark:text-white block mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                        {m.name}
                                    </span>
                                    <span className="text-sm text-gray-500 dark:text-gray-400 font-medium group-hover:text-gray-700 dark:group-hover:text-gray-300">
                                        View Full Month
                                    </span>
                                </div>
                                <div className="w-12 h-12 bg-gray-50 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-400 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/30 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-all">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>

            {/* SEO & Rich Content Section */}
            <div className="mt-16 prose prose-indigo dark:prose-invert max-w-none">
                <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 shadow-sm">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        About Malayalam Calendar {year} (Kollavarsham 1201 - 1202)
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                                The <strong>{year} Malayalam Calendar</strong> (or <em>Kollavarsham</em>) is the traditional solar calendar used by Malayalis in Kerala and around the world.
                                This year corresponds to <strong>Kollavarsham 1201</strong> (until Chingam 1 in mid-August) and <strong>Kollavarsham 1202</strong> thereafter.
                            </p>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                Our simplified digital almanac offers precise daily <strong>Panchangam</strong> data. You can easily check the:
                                <ul className="list-disc pl-5 mt-2 space-y-1">
                                    <li><strong>Nakshatram (Birth Star)</strong> for baby naming and weddings.</li>
                                    <li><strong>Tithi (Lunar Day)</strong> for rituals.</li>
                                    <li><strong>Rahu Kalam & Nalla Samayam</strong> for starting new ventures.</li>
                                </ul>
                            </p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 mt-0">
                                Upcoming Holidays in {year}
                            </h3>
                            <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300 list-none pl-0">
                                <li className="flex items-center gap-2">
                                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                                    <span><strong>Vishu</strong>: April 14, {year}</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                                    <span><strong>Onam</strong>: August 26, {year}</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                                    <span><strong>Maha Shivaratri</strong>: February 15, {year}</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                                    <span><strong>Christmas</strong>: December 25, {year}</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-700">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                            Why {year} Malayalam Calendar is Important?
                        </h3>
                        <div className="grid sm:grid-cols-3 gap-6 text-sm">
                            <div>
                                <h4 className="font-bold text-gray-900 dark:text-white mb-2">Detailed Panchangam</h4>
                                <p className="text-gray-600 dark:text-gray-400">Accurate sunrise, sunset, and Rahu Kalam timings adjusted for Kerala.</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 dark:text-white mb-2">Festival Dates</h4>
                                <p className="text-gray-600 dark:text-gray-400">Never miss dates for Ekadashi, Pradosham, Pournami, or Amavasya.</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 dark:text-white mb-2">Muhoortham Guide</h4>
                                <p className="text-gray-600 dark:text-gray-400">Find the best time (Nalla Samayam) for your auspicious events.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
