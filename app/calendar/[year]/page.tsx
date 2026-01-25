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
        </div>
    );
}
