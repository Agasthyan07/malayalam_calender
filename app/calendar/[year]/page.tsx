import Link from 'next/link';
import AdSlot from '@/components/AdSlot';

import { Metadata } from 'next';

export async function generateStaticParams() {
    return [{ year: '2026' }];
}

type Props = {
    params: Promise<{ year: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { year } = await params;
    return {
        title: `${year} Malayalam Calendar | Full Year Panchangam`,
        description: `Complete ${year} Malayalam Calendar with monthly views, festivals, Nakshatram, and auspicious days for the whole year.`,
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

    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="text-center mb-10">
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-3">
                    {year} Malayalam Calendar
                </h1>
                <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    View the complete Malayalam calendar for {year} with daily Panchangam, Nakshatram, Thithi, and all major Kerala festivals and holidays.
                </p>
            </div>

            <AdSlot slotId="year-top" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {months.map((m) => (
                    <Link
                        key={m.slug}
                        href={`/calendar/${year}/${m.slug}`}
                        className="group relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 block"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <span className="text-2xl font-bold text-gray-900 dark:text-white block mb-1 group-hover:text-red-700 transition-colors">
                                    {m.name}
                                </span>
                                <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                                    View Month
                                </span>
                            </div>
                            <div className="w-10 h-10 bg-gray-50 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-400 group-hover:bg-red-50 group-hover:text-red-600 transition-colors">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </div>
                    </Link>
                ))}
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
                                The <strong>{year} Malayalam Calendar</strong> is an essential guide for Malayalis worldwide, helping track the traditional solar calendar system unique to Kerala.
                                This year spans across <strong>Kollavarsham 1201</strong> (until mid-August) and <strong>Kollavarsham 1202</strong> (starting from Chingam 1).
                            </p>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                Our digital calendar provides accurate daily Panchangam details including <strong>Nakshatram</strong> (Star), <strong>Tithi</strong>, <strong>Nalla Samayam</strong>, and <strong>Rahu Kalam</strong> timings calculated specifically for Kerala's longitude and latitude.
                            </p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 mt-0">
                                Major Kerala Festivals in {year}
                            </h3>
                            <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300 list-none pl-0">
                                <li className="flex items-center gap-2">
                                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                                    <span><strong>Vishu</strong>: April 14, {year}</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                                    <span><strong>Onam (Thiruvonam)</strong>: August 26, {year}</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                                    <span><strong>Maha Shivaratri</strong>: February 15, {year}</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                                    <span><strong>Deepavali</strong>: November 8, {year}</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-700">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                            Why Use Our Malayalam Panchangam?
                        </h3>
                        <div className="grid sm:grid-cols-3 gap-6 text-sm">
                            <div>
                                <h4 className="font-bold text-gray-900 dark:text-white mb-2">Accurate Timings</h4>
                                <p className="text-gray-600 dark:text-gray-400">Sunrise, Sunset, and Rahu Kalam timings adjusted for daily variations.</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 dark:text-white mb-2">Festival Reminders</h4>
                                <p className="text-gray-600 dark:text-gray-400">Never miss important dates like Ekadashi, Pradosham, or Pournami.</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 dark:text-white mb-2">Daily Stars</h4>
                                <p className="text-gray-600 dark:text-gray-400">Instant access to Innathe Nakshatram and Muhoortham guides.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
