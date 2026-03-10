import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import CalendarGrid from '@/components/CalendarGrid';
import FAQ from '@/components/FAQ';
import TableOfContents from './TableOfContents';
import MonthJump from './MonthJump';
import { getYearData } from '@/lib/dateUtils';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Malayalam Calendar 2027 | Kollavarsham 1202-1203 | Panchangam, Festivals & Holidays',
    description: 'Malayalam Calendar 2027 with complete daily Panchangam for Kerala. Find Nakshatram, Tithi, Rahu Kalam, Nalla Samayam, Onam 2027, Vishu 2027 and all government holidays. Kollavarsham 1202-1203.',
    keywords: [
        'Malayalam Calendar 2027',
        'Kerala Calendar 2027',
        'Kollavarsham 1202',
        'Kollavarsham 1203',
        'Malayalam Panchangam 2027',
        'Onam 2027 date',
        'Vishu 2027 date',
        'Nakshatram 2027',
        'Nalla Samayam 2027',
        'Rahu Kalam 2027 Kerala',
        'Kerala government holidays 2027',
        'Malayalam calendar download 2027',
        'malayalamcalnder 2027',
        'keralacalnder 2027',
    ],
    alternates: {
        canonical: 'https://www.malayalamcalendar.site/malayalam-calendar/2027',
    },
    openGraph: {
        title: 'Malayalam Calendar 2027 | Complete Kerala Calendar with Panchangam',
        description: 'Your trusted guide to the 2027 Malayalam Calendar. Daily Nakshatram, Tithi, Rahu Kalam, and all Kerala festival dates for Kollavarsham 1202-1203.',
        url: 'https://www.malayalamcalendar.site/malayalam-calendar/2027',
        type: 'website',
    },
};

export default async function Calendar2027Page() {
    const year = '2027';
    const yearData = await getYearData(year);

    const months = Array.from({ length: 12 }, (_, i) => {
        const monthNum = (i + 1).toString().padStart(2, '0');
        const date = new Date(2027, i, 1);
        return {
            slug: (i + 1).toString().padStart(2, '0'),
            name: date.toLocaleString('default', { month: 'long' }),
            days: yearData.filter(d => d.date.startsWith(`2027-${monthNum}`))
        };
    });

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Malayalam Calendar 2027',
        description: 'Complete Malayalam Calendar for 2027 with daily Panchangam, Nakshatram, Tithi, Rahu Kalam and all Kerala festival dates. Kollavarsham 1202-1203.',
        url: 'https://www.malayalamcalendar.site/malayalam-calendar/2027',
        datePublished: '2026-01-01',
        dateModified: new Date().toISOString().split('T')[0],
        inLanguage: 'en-IN',
        publisher: {
            '@type': 'Organization',
            name: 'MalayalamCalendar.site',
            url: 'https://www.malayalamcalendar.site',
        },
        hasPart: months.map(m => ({
            '@type': 'WebPage',
            name: `Malayalam Calendar ${m.name} 2027`,
            url: `https://www.malayalamcalendar.site/malayalam-calendar-${m.name.toLowerCase()}-2027`,
            description: `${m.name} 2027 Malayalam Calendar with daily Panchangam for Kerala`
        })),
    };

    const faqJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
            {
                '@type': 'Question',
                name: 'When is Onam 2027?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Thiruvonam 2027 (the main day of Onam) falls in the Malayalam month of Chingam, typically in late August or early September 2027. Check the Chingam month in the 2027 Malayalam Calendar above for the exact date confirmed by the Kerala government.',
                }
            },
            {
                '@type': 'Question',
                name: 'What is Kollavarsham year for 2027?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'The year 2027 spans two Malayalam eras: Kollavarsham 1202 (January to mid-August 2027) and Kollavarsham 1203 (mid-August 2027 onwards, starting from Chingam 1).',
                }
            },
            {
                '@type': 'Question',
                name: 'When is Vishu 2027?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Vishu 2027 falls on the first day of Medam (when the sun enters the Mesha / Aries constellation), which is typically April 14 or 15 in 2027. It marks the astronomical New Year for Keralites.',
                }
            },
            {
                '@type': 'Question',
                name: 'Can I download the 2027 Malayalam Calendar PDF?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Yes. You can download the official 2027 Kerala Government calendar as a high-resolution PDF from the download section on this page. It includes all public holidays, bank holidays, and regional festivals.',
                }
            },
        ],
    };

    const breadcrumbs = [
        { label: '2027 Calendar', href: '/malayalam-calendar/2027' },
    ];

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />

            <Breadcrumbs items={breadcrumbs} />

            {/* Hero */}
            <div className="text-center mb-10 max-w-4xl mx-auto">
                <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
                    Malayalam Calendar 2027
                    <span className="block text-xl md:text-2xl mt-2 font-normal text-gray-600 dark:text-gray-400">
                        Kollavarsham 1202–1203 &nbsp;|&nbsp; Daily Panchangam &amp; Kerala Festivals
                    </span>
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    Planning ahead for <strong>2027</strong>? This page is your go-to reference for the{' '}
                    <strong>Malayalam Calendar 2027</strong> — covering every month from Makaram through Dhanu,
                    with accurate <strong>Nakshatram</strong>, <strong>Tithi</strong>,{' '}
                    <strong>Rahu Kalam</strong>, and <strong>Nalla Samayam</strong> values computed for Kerala
                    Standard Time. Whether you are choosing a wedding date, planning a housewarming, or just
                    keeping track of government holidays, the 12 monthly grids below give you everything daily.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-4">
                    <a
                        href="#download-section"
                        className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2.5 rounded-full transition-colors shadow-sm"
                    >
                        📥 Download 2027 Calendar PDF
                    </a>
                    <a
                        href="#months-grid"
                        className="inline-flex items-center gap-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 font-semibold px-6 py-2.5 rounded-full transition-colors shadow-sm"
                    >
                        🗓️ Browse Months
                    </a>
                </div>
            </div>

            {/* Two-column layout: Main + Sidebar */}
            <div className="lg:grid lg:grid-cols-4 gap-8 mt-12 items-start relative">

                {/* Main Content (3/4) */}
                <div className="lg:col-span-3 space-y-16">

                    {/* Monthly Grids */}
                    <section id="months-grid" className="scroll-mt-24">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {months.map((m) => {
                                const monthNameLower = m.name.toLowerCase();
                                return (
                                    <div
                                        key={m.slug}
                                        id={monthNameLower}
                                        className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col"
                                    >
                                        <div className="bg-gray-50 dark:bg-gray-900/50 p-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
                                            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 uppercase tracking-wide">
                                                {m.name} 2027
                                            </h2>
                                            <Link
                                                href={`/malayalam-calendar-${monthNameLower}-2027`}
                                                className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                                            >
                                                View Details →
                                            </Link>
                                        </div>
                                        <div className="p-2 flex-grow">
                                            <CalendarGrid days={m.days} />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    {/* About 2027 Calendar */}
                    <section
                        id="about-2027"
                        className="scroll-mt-24 bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-10 border border-gray-100 dark:border-gray-700 shadow-sm"
                    >
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6 border-b pb-4 dark:border-gray-700">
                            What Makes the 2027 Malayalam Calendar Unique?
                        </h2>
                        <div className="grid md:grid-cols-2 gap-10">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                                    A Transitional Year: 1202 Meets 1203
                                </h3>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                                    The <strong>2027 Malayalam Calendar</strong> is special because it straddles two
                                    traditional Kollavarsham eras. From January through mid-August, you are living
                                    through <strong>Kollavarsham 1202</strong> — the tail end of an era that began in
                                    August 2026. Then, when the month of Chingam begins (around August 16–17, 2027),
                                    the traditional new year quietly rolls over to <strong>Kollavarsham 1203</strong>.
                                </p>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                                    This transition is not just a number change. It marks the harvest season, the return
                                    of King Mahabali celebrated through Onam, and a cultural reset for millions of
                                    Keralites at home and abroad. Families visiting temples, performing house-warming
                                    ceremonies, or starting new businesses often time these events around the Chingam
                                    transition — making the August section of this calendar particularly important.
                                </p>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 mt-6">
                                    How We Calculate Daily Panchangam for 2027
                                </h3>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                    Each day in our 2027 calendar is backed by sidereal astronomical calculations
                                    anchored to Kerala Standard Time (IST, UTC+5:30). The five elements of Panchangam —
                                    Vaara (weekday), Tithi, Nakshatram, Yoga, and Karanam — are derived from the actual
                                    positions of the Sun and Moon, not from lookup tables or approximations. This approach
                                    mirrors what Kerala astrologers and temple almanacs use, so you can trust the data
                                    for naming ceremonies, muhurtham selection, or simply knowing whether today is an
                                    Ekadashi.
                                </p>
                            </div>
                            <div className="space-y-6">
                                <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 border border-indigo-100 dark:border-indigo-800/30">
                                    <h3 className="text-lg font-bold text-indigo-900 dark:text-indigo-200 mb-1">
                                        Quick Facts: 2027 Calendar Year
                                    </h3>
                                    <ul className="mt-3 space-y-3 text-sm text-gray-700 dark:text-gray-300">
                                        <li className="flex gap-3">
                                            <span className="text-indigo-500 font-bold min-w-[6rem]">Starts</span>
                                            <span>Saturday, 1 January 2027</span>
                                        </li>
                                        <li className="flex gap-3">
                                            <span className="text-indigo-500 font-bold min-w-[6rem]">Ends</span>
                                            <span>Friday, 31 December 2027</span>
                                        </li>
                                        <li className="flex gap-3">
                                            <span className="text-indigo-500 font-bold min-w-[6rem]">Leap Year?</span>
                                            <span>No — 365 days in 2027</span>
                                        </li>
                                        <li className="flex gap-3">
                                            <span className="text-indigo-500 font-bold min-w-[6rem]">KV Start</span>
                                            <span>Kollavarsham 1202 (Jan–Aug)</span>
                                        </li>
                                        <li className="flex gap-3">
                                            <span className="text-indigo-500 font-bold min-w-[6rem]">KV End</span>
                                            <span>Kollavarsham 1203 (Aug–Dec)</span>
                                        </li>
                                        <li className="flex gap-3">
                                            <span className="text-indigo-500 font-bold min-w-[6rem]">New Year</span>
                                            <span>Chingam 1 (~Aug 16–17, 2027)</span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-5 border border-amber-100 dark:border-amber-800/30">
                                    <p className="text-sm text-amber-800 dark:text-amber-200 leading-relaxed">
                                        <strong>Note for NRIs:</strong> All Rahu Kalam, Gulika Kalam, and Nalla Samayam
                                        timings shown on this site are calculated for Kerala Standard Time (IST). If you
                                        are performing rituals from a different time zone, please add or subtract
                                        accordingly.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Festivals 2027 */}
                    <section
                        id="festivals-2027"
                        className="scroll-mt-24 bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-10 border border-gray-100 dark:border-gray-700 shadow-sm"
                    >
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6 border-b pb-4 dark:border-gray-700">
                            Major Festivals &amp; Kerala Holidays in 2027
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                            Below is a curated list of the most searched-for dates in the 2027 Kerala Calendar.
                            Exact dates depend on astronomical calculations and will be confirmed by the Kerala
                            Government almanac — click each month link above for the precise date and day.
                        </p>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {[
                                {
                                    name: 'Vishu 2027',
                                    month: 'April',
                                    malMonth: 'Medam 1, 1202',
                                    desc: 'The astronomical Malayalam new year. Families arrange the Vishukkani — an auspicious display of gold, fruits, and grains seen at dawn — before visiting the temple.',
                                    color: 'from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-200 dark:border-yellow-800/30',
                                    textColor: 'text-yellow-800 dark:text-yellow-200',
                                },
                                {
                                    name: 'Thiruvonam 2027',
                                    month: 'August / September',
                                    malMonth: 'Chingam, 1203',
                                    desc: 'The 10-day Onam celebration culminates on Thiruvonam — the day King Mahabali is believed to return. It brings sadya feasts, pookalam flower carpets, and vallam kali boat races.',
                                    color: 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800/30',
                                    textColor: 'text-green-800 dark:text-green-200',
                                },
                                {
                                    name: 'Christmas 2027',
                                    month: 'December 25',
                                    malMonth: 'Dhanu, 1203',
                                    desc: "A public holiday across Kerala celebrated with midnight masses, carol singing, and star lanterns (kookeeyam). Kerala's large Christian population makes this one of the biggest December celebrations.",
                                    color: 'from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 border-red-200 dark:border-red-800/30',
                                    textColor: 'text-red-800 dark:text-red-200',
                                },
                                {
                                    name: 'Maha Shivaratri 2027',
                                    month: 'February',
                                    malMonth: 'Kumbham, 1202',
                                    desc: 'A major fasting day dedicated to Lord Shiva. Observed by staying awake through the night and visiting Shiva temples, especially Vaikom Mahadeva Temple and Ettumanoor.',
                                    color: 'from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800/30',
                                    textColor: 'text-blue-800 dark:text-blue-200',
                                },
                                {
                                    name: 'Navaratri 2027',
                                    month: 'September / October',
                                    malMonth: 'Kanni, 1203',
                                    desc: 'Nine nights of goddess worship, culminating in Saraswati Puja (book worship) and Vijayadasami — the auspicious day for children starting their education, known as Vidyarambham in Kerala.',
                                    color: 'from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800/30',
                                    textColor: 'text-purple-800 dark:text-purple-200',
                                },
                                {
                                    name: 'Karkidaka Vavu 2027',
                                    month: 'July / August',
                                    malMonth: 'Karkidakam, 1202',
                                    desc: 'The Amavasya (new moon) day of the Karkidakam month, when Keralites perform ancestral offerings called Bali Tharpanam at sacred rivers or beaches. Also the month of Ramayana recitation.',
                                    color: 'from-gray-50 to-slate-50 dark:from-gray-900/20 dark:to-slate-900/20 border-gray-200 dark:border-gray-700',
                                    textColor: 'text-gray-800 dark:text-gray-200',
                                },
                            ].map((fest) => (
                                <div
                                    key={fest.name}
                                    className={`rounded-xl p-5 bg-gradient-to-br ${fest.color} border`}
                                >
                                    <h3 className={`font-bold text-base mb-1 ${fest.textColor}`}>{fest.name}</h3>
                                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">
                                        {fest.month} &bull; {fest.malMonth}
                                    </p>
                                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{fest.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Kollavarsham Section */}
                    <section
                        id="kollavarsham-1202"
                        className="scroll-mt-24 bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-10 border border-gray-100 dark:border-gray-700 shadow-sm"
                    >
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6 border-b pb-4 dark:border-gray-700">
                            Understanding Kollavarsham 1202 &amp; 1203
                        </h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                                    The Malayalam Era Explained
                                </h3>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                                    The Kollavarsham (also written Kollam Era) is one of the oldest surviving
                                    solar calendrical systems in India, believed to have started in 825 CE from
                                    the port city of Kollam (Quilon) in what is now southern Kerala. Unlike the
                                    more widely known Vikram Samvat, the Kollavarsham strictly follows the
                                    sidereal solar year — meaning each month corresponds to the Sun's transit
                                    through one of the 12 zodiac constellations.
                                </p>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                    For the year <strong>2027</strong>: the first seven or so months belong to
                                    Kollavarsham 1202, and the era formally advances to{' '}
                                    <strong>Kollavarsham 1203</strong> on <em>Chingam 1</em> — the first day of
                                    the Malayalam month of Chingam, when the Sun enters the constellation of
                                    Simha (Leo). This solar event, called Simha Sankramam, is the true start of
                                    the new Kollavarsham year.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                                    Malayalam Months in 2027
                                </h3>
                                <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 leading-relaxed">
                                    The 12 Malayalam months and their approximate Gregorian equivalents in 2027:
                                </p>
                                <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
                                    <table className="min-w-full text-sm">
                                        <thead>
                                            <tr className="bg-indigo-600 text-white">
                                                <th className="px-4 py-2 text-left font-semibold">Malayalam Month</th>
                                                <th className="px-4 py-2 text-left font-semibold">Approx. English Period</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                            {[
                                                ['Makaram', 'Jan – Feb 2027'],
                                                ['Kumbham', 'Feb – Mar 2027'],
                                                ['Meenam', 'Mar – Apr 2027'],
                                                ['Medam', 'Apr – May 2027'],
                                                ['Edavam', 'May – Jun 2027'],
                                                ['Midhunam', 'Jun – Jul 2027'],
                                                ['Karkidakam', 'Jul – Aug 2027'],
                                                ['Chingam', 'Aug – Sep 2027'],
                                                ['Kanni', 'Sep – Oct 2027'],
                                                ['Thulam', 'Oct – Nov 2027'],
                                                ['Vrischikam', 'Nov – Dec 2027'],
                                                ['Dhanu', 'Dec 2027 – Jan 2028'],
                                            ].map(([mal, eng], idx) => (
                                                <tr
                                                    key={mal}
                                                    className={idx % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800/60'}
                                                >
                                                    <td className="px-4 py-2 font-medium text-gray-900 dark:text-white">{mal}</td>
                                                    <td className="px-4 py-2 text-gray-600 dark:text-gray-300">{eng}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Panchangam Guide */}
                    <section
                        id="panchangam-guide"
                        className="scroll-mt-24 bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-10 border border-gray-100 dark:border-gray-700 shadow-sm"
                    >
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6 border-b pb-4 dark:border-gray-700">
                            Your 2027 Daily Panchangam — What Each Column Means
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                            If you are new to reading a Panchangam, the five elements can seem overwhelming at
                            first. Here is a plain-language explanation of each piece of information you will
                            find when you click into a specific day in the 2027 monthly grids above.
                        </p>
                        <div className="grid sm:grid-cols-2 gap-5">
                            {[
                                {
                                    term: 'Nakshatram (Star)',
                                    icon: '⭐',
                                    desc: 'The lunar mansion the Moon occupies at sunrise on that day. There are 27 Nakshatrams in the Malayalam tradition. Your birth star (Janma Nakshatram) influences the auspiciousness of days for personal rituals.',
                                },
                                {
                                    term: 'Tithi (Lunar Day)',
                                    icon: '🌕',
                                    desc: 'One of 30 lunar days in a month, measured by the angular separation of the Sun and Moon. Certain Tithis — like Ekadashi (11th), Pradosham (13th), and Amavasya (new moon) — are considered particularly important for fasting.',
                                },
                                {
                                    term: 'Rahu Kalam',
                                    icon: '⚠️',
                                    desc: 'A 90-minute window each day considered inauspicious for new beginnings. It varies by weekday and time of year. Most Keralites avoid starting journeys, business deals, or ceremonies during this window.',
                                },
                                {
                                    term: 'Nalla Samayam (Muhurtham)',
                                    icon: '✨',
                                    desc: 'The auspicious time windows on a given day, calculated by combining Nakshatram, Tithi, and other factors. These are the ideal slots for weddings, housewarming, vehicle purchase, or any significant life event in 2027.',
                                },
                            ].map((item) => (
                                <div
                                    key={item.term}
                                    className="flex gap-4 p-5 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800"
                                >
                                    <span className="text-2xl flex-shrink-0 mt-0.5">{item.icon}</span>
                                    <div>
                                        <h3 className="font-bold text-gray-900 dark:text-white mb-1">{item.term}</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                            {item.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Comparison Table */}
                    <section
                        id="comparison-table"
                        className="scroll-mt-24 bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-10 border border-gray-100 dark:border-gray-700 shadow-sm"
                    >
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6 border-b pb-4 dark:border-gray-700">
                            Malayalam Calendar vs. Gregorian Calendar — How They Differ in 2027
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                            Many people wonder why the Malayalam Calendar does not align neatly with the English
                            one. The answer lies in astronomy. Here is a side-by-side look:
                        </p>
                        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
                            <table className="min-w-full text-left text-sm">
                                <thead>
                                    <tr className="bg-indigo-600 text-white">
                                        <th className="px-5 py-3 font-semibold w-1/3">Aspect</th>
                                        <th className="px-5 py-3 font-semibold w-1/3">Gregorian (English) Calendar</th>
                                        <th className="px-5 py-3 font-semibold w-1/3">Malayalam (Kollavarsham)</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                    {[
                                        ['Solar System', "Tropical \u2014 aligned to Earth\u2019s seasons (equinoxes)", "Sidereal \u2014 aligned to Sun\u2019s transit through fixed-star constellations"],
                                        ['Month Start', 'Always on the 1st at midnight', 'Begins exactly at the moment of Sankramam (solar transit)'],
                                        ['Month Length', '28\u201331 days, fixed by rule', '29\u201332 days, varies naturally each year'],
                                        ['Leap Year', 'Every 4 years, Feb gets 29 days', "No artificial leap; system self-calibrates via Sun\u2019s orbit"],
                                        ['New Year', 'January 1 \u2014 arbitrary historical date', 'Chingam 1 \u2014 tied to Sun entering Leo (Simha Sankramam)'],
                                        ['Daily Data', 'Date, day, and holidays only', 'Date + Nakshatram, Tithi, Yoga, Karanam, Rahu Kalam, Nalla Samayam'],
                                    ].map(([aspect, gregorian, malayalam], idx) => (
                                        <tr
                                            key={aspect}
                                            className={idx % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800/60'}
                                        >
                                            <td className="px-5 py-3 font-semibold text-gray-900 dark:text-white">{aspect}</td>
                                            <td className="px-5 py-3 text-gray-600 dark:text-gray-300">{gregorian}</td>
                                            <td className="px-5 py-3 text-gray-700 dark:text-gray-200">{malayalam}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* Download Section */}
                    <section
                        id="download-section"
                        className="scroll-mt-24 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl p-6 md:p-10 border border-indigo-100 dark:border-indigo-800 shadow-sm"
                    >
                        <h2 className="text-2xl md:text-3xl font-bold text-indigo-900 dark:text-indigo-200 mb-4">
                            Download the 2027 Malayalam Calendar PDF
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                            Looking for a printable copy? The official <strong>2027 Kerala Government Calendar PDF</strong>{' '}
                            includes all 12 months on a single page, pre-marked with public holidays, bank holidays,
                            school vacations, and major festive dates recognised by the Government of Kerala. It is
                            the same source used by offices and households across the state.
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700 dark:text-gray-300 mb-8">
                            <li>High-resolution, print-ready PDF</li>
                            <li>All Kerala government &amp; bank holidays marked</li>
                            <li>Covers January–December 2027 (Makaram to Dhanu)</li>
                            <li>Free to download — no sign-up required</li>
                        </ul>
                        <Link
                            href="/calendar-pdf/2027_pdf/kerala-govt-official-calendar-2027.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-all"
                        >
                            📥 Download 2027 Calendar PDF
                        </Link>
                    </section>

                    {/* FAQ */}
                    <section id="faq-2027" className="scroll-mt-24">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8 border-b pb-4 dark:border-gray-700">
                            Frequently Asked Questions — 2027 Malayalam Calendar
                        </h2>
                        <FAQ
                            items={[
                                {
                                    question: 'When is Onam 2027?',
                                    answer: 'Thiruvonam 2027 falls in the Malayalam month of Chingam. The exact date depends on when the Thiruvonam Nakshatram falls in August or September 2027. Check our Chingam 2027 monthly page above for the confirmed date once the Kerala government almanac is published.',
                                },
                                {
                                    question: 'What Kollavarsham year is 2027?',
                                    answer: 'The year 2027 spans Kollavarsham 1202 (January to mid-August 2027) and Kollavarsham 1203 (mid-August to December 2027). The new Kollavarsham year 1203 begins on Chingam 1 — the day the Sun transits into the Simha (Leo) constellation.',
                                },
                                {
                                    question: 'When is Vishu 2027?',
                                    answer: 'Vishu 2027 falls on Medam 1, which is typically April 14 or 15 in the Gregorian calendar. It marks the Sun entering the Mesha (Aries) constellation and is celebrated as the astronomical new year with Vishukkani and Vishu Kaineetam (gift-giving).',
                                },
                                {
                                    question: 'Can I download the 2027 Malayalam Calendar as a PDF?',
                                    answer: 'Yes. The official 2027 Kerala Government Calendar PDF is available for free download from the Download section on this page. It is a high-resolution, print-ready file that includes all public holidays, bank holidays, and major festival dates.',
                                },
                                {
                                    question: 'Is the 2027 Malayalam Calendar different from the 2026 one?',
                                    answer: 'Yes, significantly. Every year the festival dates shift because the Malayalam calendar is based on the actual positions of the Sun and Moon, not a fixed pattern. In 2027, Kollavarsham advances to 1203, and all dates for Onam, Vishu, Ekadashi, and other festivals will be different from their 2026 equivalents.',
                                },
                                {
                                    question: 'What is Karkidaka Masam in 2027?',
                                    answer: 'Karkidakam (also called Ramayana Month) is the final month of the Malayalam year 1202, falling roughly in July–August 2027. It is considered the monsoon month when Keralites traditionally read or listen to the Adhyathma Ramayanam. Karkidaka Vavu (new moon day) is especially important for ancestral rituals.',
                                },
                            ]}
                        />
                    </section>
                </div>

                {/* Sticky Sidebar (1/4 width) */}
                <aside className="hidden lg:block lg:col-span-1 border-l border-gray-100 dark:border-gray-800 pl-8 pb-12">
                    <div className="sticky top-24 space-y-8">

                        {/* Table of Contents (interactive client component) */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
                            <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-4">
                                On This Page
                            </h3>
                            <TableOfContents />
                        </div>

                        {/* Quick Month Jump */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
                            <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-4">
                                Jump to Month
                            </h3>
                            <MonthJump months={months} />
                        </div>

                        {/* Quick Links */}
                        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl p-6 border border-indigo-100 dark:border-indigo-800/30 shadow-sm">
                            <h3 className="text-sm font-bold text-indigo-700 dark:text-indigo-300 uppercase tracking-widest mb-4">
                                Related Tools
                            </h3>
                            <div className="space-y-3">
                                <Link
                                    href="/innathe-nakshatram"
                                    className="block bg-white dark:bg-gray-800 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 text-gray-800 dark:text-gray-100 font-semibold px-4 py-3 rounded-xl shadow-sm transition-all text-sm text-center"
                                >
                                    Today's Nakshatra
                                </Link>
                                <Link
                                    href="/marriage-muhurtham-2027"
                                    className="block bg-white dark:bg-gray-800 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 text-gray-800 dark:text-gray-100 font-semibold px-4 py-3 rounded-xl shadow-sm transition-all text-sm text-center"
                                >
                                    Marriage Muhurtham 2027
                                </Link>
                                <Link
                                    href="/malayalam-calendar/2026"
                                    className="block bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium px-4 py-3 rounded-xl shadow-sm transition-all text-sm text-center border border-gray-200 dark:border-gray-700"
                                >
                                    ← 2026 Calendar
                                </Link>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}
