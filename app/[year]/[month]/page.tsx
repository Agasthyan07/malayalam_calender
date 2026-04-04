import CalendarRow from '@/components/CalendarRow';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getMonthData, formatDate } from '@/lib/dateUtils';
import AdSlot from '@/components/AdSlot';
import Link from 'next/link';
import RahuKalamTable from '@/components/RahuKalamTable';
import DownloadableCalendar from '@/components/DownloadableCalendar';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/JsonLd';

export const revalidate = 3600;

type Props = {
    params: Promise<{ year: string, month: string }>;
}

const MONTH_NAMES = [
    'january', 'february', 'march', 'april', 'may', 'june',
    'july', 'august', 'september', 'october', 'november', 'december'
];

interface MonthInfo {
    malayalamMonths: string;
    kollavarshamYear: string;
    season: string;
    aboutText: string;
}

const YEAR_INFO: { [key: string]: MonthInfo } = {
    'january': {
        malayalamMonths: "Dhanu (ധനു) – Makaram (മകരം)",
        kollavarshamYear: "1201",
        season: "Winter",
        aboutText: "January marks the peak of the Sabarimala pilgrimage season in Kerala. The transition into the Malayalam month of Makaram is celebrated with the auspicious Makara Vilakku festival."
    },
    'february': {
        malayalamMonths: "Makaram (മകരം) – Kumbham (കുംഭം)",
        kollavarshamYear: "1201",
        season: "Late Winter",
        aboutText: "February is a month of vibrant temple festivals and 'Poorams' across Kerala. It often hosts the Mahashivaratri festival, a night of intense spiritual devotion and fasting."
    },
    'march': {
        malayalamMonths: "Kumbham (കുംഭം) – Meenam (മീനം)",
        kollavarshamYear: "1201",
        season: "Summer",
        aboutText: "As summer sets in, March becomes the season for grand temple 'Utsavams'. The month is characterized by traditional percussion ensembles and caparisoned elephant processions."
    },
    'april': {
        malayalamMonths: "Meenam (മീനം) – Medam (മേടം)",
        kollavarshamYear: "1201",
        season: "Summer",
        aboutText: "April is synonymous with Vishu, the astronomical New Year of Kerala. Families gather for 'Vishukkani', seeking a prosperous year ahead during the height of summer."
    },
    'may': {
        malayalamMonths: "Medam (മേടം) – Edavam (ഇടവം)",
        kollavarshamYear: "1201",
        season: "Summer/Monsoon Prep",
        aboutText: "May brings the last intense heat of summer before the arrival of the monsoons. It is a period of transition and preparation for the agricultural cycle in Kerala."
    },
    'june': {
        malayalamMonths: "Edavam (ഇടവം) – Mithunam (മിഥുനം)",
        kollavarshamYear: "1201",
        season: "Monsoon",
        aboutText: "The arrival of the Southwest Monsoon (Edavapathi) in June rejuvenates the Kerala landscape. It is traditionally considered the ideal time for Ayurvedic health treatments."
    },
    'july': {
        malayalamMonths: "Mithunam (മിഥുനം) – Karkidakam (കർക്കിടകം)",
        kollavarshamYear: "1201",
        season: "Monsoon",
        aboutText: "July coincides with Karkidakam, the 'Ramayana Month' in Kerala. Despite the heavy rains, homes resonate with the chanting of the epic, focusing on spiritual growth."
    },
    'august': {
        malayalamMonths: "Karkidakam (കർക്കിടകം) – Chingam (ചിങ്ങം)",
        kollavarshamYear: "1201–1202",
        season: "Harvest/Monsoon End",
        aboutText: "August heralds the arrival of Chingam, the traditional Malayalam New Year. It brings the harvest festival of Onam, filling the state with floral carpets and festive joy."
    },
    'september': {
        malayalamMonths: "Chingam (ചിങ്ങം) – Kanni (കന്നി)",
        kollavarshamYear: "1202",
        season: "Post-Monsoon",
        aboutText: "The pleasant post-monsoon weather in September is ideal for festivities. The month often sees the continuation of Onam celebrations and the beginning of Navaratri preparations."
    },
    'october': {
        malayalamMonths: "Kanni (കന്നി) – Thulam (തുലാം)",
        kollavarshamYear: "1202",
        season: "Northeast Monsoon",
        aboutText: "October brings the 'Thulavarsham' or the Northeast Monsoon. It is a time for Navaratri celebrations, honoring the Goddess and celebrating the triumph of knowledge."
    },
    'november': {
        malayalamMonths: "Thulam (തുലാം) – Vrischikam (വൃശ്ചികം)",
        kollavarshamYear: "1202",
        season: "Winter Start",
        aboutText: "The start of the 41-day Mandalam season in November marks a period of austerity and pilgrimage for Sabarimala devotees. The air is filled with spiritual songs and chants."
    },
    'december': {
        malayalamMonths: "Vrischikam (വൃശ്ചികം) – Dhanu (ധനു)",
        kollavarshamYear: "1202",
        season: "Winter",
        aboutText: "December brings the coolest weather to Kerala. It is a month of diverse celebrations, including the traditional Thiruvathira festival and Christmas festivities."
    }
};

export async function generateStaticParams() {
    const years = ['2026', '2027'];
    const params = [];
    for (const year of years) {
        for (const month of MONTH_NAMES) {
            params.push({ year, month });
        }
    }
    return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { year, month: monthName } = await params;
    
    if (!MONTH_NAMES.includes(monthName.toLowerCase()) || (year !== '2026' && year !== '2027')) {
        return { title: 'Page Not Found' };
    }

    const date = new Date(parseInt(year), MONTH_NAMES.indexOf(monthName.toLowerCase()), 1);
    const fullMonthName = date.toLocaleString('default', { month: 'long' });
    const info = YEAR_INFO[monthName.toLowerCase()] || YEAR_INFO['january'];

    return {
        title: `${fullMonthName} ${year} Malayalam Calendar – Nakshatram, Tithi, Rahu Kalam & Festivals`,
        description: `View the ${fullMonthName} ${year} Malayalam Calendar with Kollavarsham ${info.malayalamMonths} details. Check daily Panchangam, Nakshatram times, Rahu Kalam, and major Kerala festivals for ${fullMonthName} ${year}.`,
        keywords: [
            `Malayalam Calendar ${year} ${fullMonthName}`,
            `Malayalam month ${fullMonthName} ${year}`,
            `${info.malayalamMonths} calendar`,
            `${fullMonthName} ${year} festivals Kerala`,
            `Rahu Kalam ${fullMonthName} ${year}`
        ],
        alternates: {
            canonical: `https://www.malayalamcalendar.site/${year}/${monthName.toLowerCase()}`,
        }
    };
}

export default async function MonthPage({ params }: Props) {
    const { year, month: monthSlug } = await params;
    const monthIndex = MONTH_NAMES.indexOf(monthSlug.toLowerCase());

    if (monthIndex === -1 || (year !== '2026' && year !== '2027')) {
        notFound();
    }

    const monthNum = String(monthIndex + 1).padStart(2, '0');
    const days = await getMonthData(year, monthNum);

    if (!days || days.length === 0) notFound();

    const festivals = days.filter(d => d.festival);
    const date = new Date(parseInt(year), monthIndex, 1);
    const monthName = date.toLocaleString('default', { month: 'long' });
    const info = YEAR_INFO[monthSlug.toLowerCase()] || YEAR_INFO['january'];

    const breadcrumbs = [
        { label: `${year} Calendar`, href: `/${year}` },
        { label: monthName, href: `/${year}/${monthSlug.toLowerCase()}` },
    ];

    // Dynamic unique content generator logic
    const topFestival = festivals.length > 0 ? festivals[0] : null;

    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': [
            {
                '@type': 'Question',
                'name': `Which Malayalam months fall in ${monthName} ${year}?`,
                'acceptedAnswer': {
                    '@type': 'Answer',
                    'text': `${monthName} ${year} includes ${info.malayalamMonths} months in Kollavarsham ${info.kollavarshamYear}.`
                }
            },
            {
                '@type': 'Question',
                'name': `What are the important festivals in ${monthName} ${year}?`,
                'acceptedAnswer': {
                    '@type': 'Answer',
                    'text': festivals.length > 0
                        ? `Major festivals in ${monthName} ${year} include ${festivals.slice(0, 3).map(f => f.festival).join(', ')}.`
                        : `There are no major public holidays listed for ${monthName} ${year}, but daily auspicious timings are available.`
                }
            }
        ]
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl">
            <JsonLd data={faqSchema} />
            <Breadcrumbs items={breadcrumbs} />

            <div className="mb-8 border-b border-gray-200 dark:border-gray-700 pb-6">
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight">
                    {monthName} {year} Malayalam Calendar ({info.malayalamMonths})
                </h1>

                <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
                    <p>
                        Welcome to the comprehensive guide for <strong>{monthName} {year}</strong> in the Malayalam Calendar.
                        This period covers the traditional months of <strong>{info.malayalamMonths}</strong> in Kollavarsham <strong>{info.kollavarshamYear}</strong>.
                        {topFestival && (
                            <span> A major highlight of this month is the celebration of <strong>{topFestival.festival}</strong> on {formatDate(topFestival.date)}.</span>
                        )}
                    </p>
                    <p>
                        Our {monthName} {year} Kerala calendar provides detailed daily Panchangam including <strong>Nakshatram</strong> (birth stars), <strong>Tithi</strong>, and <strong>Rahu Kalam</strong> timings precisely calculated for Kerala.
                        Whether you are looking for auspicious wedding dates (Muhurtham) or planning a temple visit, this interactive grid has all the information you need.
                    </p>
                </div>
            </div>

            <AdSlot slotId={`month-top-${monthNum}`} />

            <section className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                    <span className="w-1 h-8 bg-indigo-600 rounded-full"></span>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Daily Panchangam – {monthName} {year}
                    </h2>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
                    <div className="divide-y divide-gray-100 dark:divide-gray-800">
                        {days.map((day) => (
                            <CalendarRow key={day.date} day={day} />
                        ))}
                    </div>
                </div>
            </section>

            <AdSlot slotId={`month-mid-${monthNum}`} />

            <section className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                    <span className="w-1 h-8 bg-red-600 rounded-full"></span>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Festivals &amp; Holidays in {monthName} {year}
                    </h2>
                </div>

                {festivals.length > 0 ? (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {festivals.map((day) => (
                            <div key={day.date} className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                                <div className="flex-shrink-0 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 font-bold text-xs w-16 h-12 flex flex-col items-center justify-center rounded-lg mr-4">
                                    <span className="text-lg leading-none">{day.date.split('-')[2]}</span>
                                    <span className="text-[10px] uppercase">{day.weekday.substring(0, 3)}</span>
                                </div>
                                <div className="flex-grow min-w-0">
                                    <h3 className="font-bold text-gray-900 dark:text-gray-100 text-sm mb-1 leading-snug">
                                        {day.festival}
                                    </h3>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">
                                        {day.malayalam_date}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 text-center border border-gray-100 dark:border-gray-700 border-dashed">
                        <p className="text-gray-500 dark:text-gray-400">No major public festivals listed for this month.</p>
                    </div>
                )}
            </section>

            <section className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                    <span className="w-1 h-8 bg-purple-600 rounded-full"></span>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Rahu Kalam Timings – {monthName} {year}
                    </h2>
                </div>
                <RahuKalamTable days={days} title={`Rahu Kalam Timings - ${monthName} ${year}`} />
            </section>

            <section id="download" className="mb-12 scroll-mt-20">
                <div className="flex items-center gap-3 mb-6">
                    <span className="w-1 h-8 bg-teal-600 rounded-full"></span>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Free {monthName} {year} Malayalam Calendar Download
                    </h2>
                </div>
                <DownloadableCalendar year={year} monthName={monthName} />
                <p className="text-sm text-center text-gray-500 mt-2">
                    Printable high-resolution {monthName} {year} Malayalam Calendar image.
                </p>
            </section>

            <section className="mb-12 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl p-8 border border-indigo-100 dark:border-indigo-800">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Significance of {monthName} in Kerala
                </h2>
                <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
                    <p>{info.aboutText}</p>
                    <p className="mt-4">
                        In the year {year}, {monthName} provides a bridge between different seasonal activities.
                        Planning your agricultural, spiritual, or family events in accordance with the <strong>Malayalam Calendar</strong> helps align with traditional Kerala practices.
                        Whether it is observing fasting (Vratham) or choosing the right time (Muhurtham), accurate Panchangam is key.
                    </p>
                </div>
            </section>
        </div>
    );
}
