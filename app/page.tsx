import TodayCard from '@/components/TodayCard';
import FAQ from '@/components/FAQ';
import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import { getDailyData, formatDate, getMonthData, getYearData } from '@/lib/dateUtils';
import JsonLd from '@/components/JsonLd';

import { Metadata } from 'next';
import CalendarGrid from '@/components/CalendarGrid';
import IslamicPrayerTimes from '@/components/IslamicPrayerTimes';

export const revalidate = 3600;

type Props = {
  searchParams: Promise<{ date?: string }>;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const resolvedSearchParams = await searchParams;
  let targetDate = resolvedSearchParams?.date;

  const now = new Date();
  const options = { timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit' } as const;
  const formatter = new Intl.DateTimeFormat('en-CA', options);
  const todayStr = formatter.format(now);

  if (!targetDate) targetDate = todayStr;
  const isToday = targetDate === todayStr;
  const data = await getDailyData(targetDate);

  // The homepage is ALWAYS canonical at the root URL.
  // When ?date= param is used, it's still the same page – not a duplicate.
  const canonicalUrl = 'https://www.malayalamcalendar.site/';

  return {
    title: 'Malayalam Calendar 2026 & 2027 – Today Date, Monthly & PDF Download',
    description: 'View Malayalam Calendar 2026 and 2027 online with daily Panchangam, Nakshatram, Tithi, festivals and Kerala holidays. Explore the interactive calendar and download printable Malayalam calendar PDF.',
    alternates: { canonical: canonicalUrl },
    keywords: [
      'Malayalam Calendar 2026',
      'Malayalam Calendar 2027',
      'Malayalam Calendar Today',
      'Today Malayalam Date',
      'Malayalam Panchangam Today',
      'Nakshatra Today Kerala',
      'Malayalam Calendar PDF Download',
      'Printable Malayalam Calendar 2026',
      'Kerala Festival Calendar 2026',
      'Malayalam Monthly Calendar',
      'Kollavarsham 1201 1202',
      'Kerala Calendar 2026 PDF',
      'Malayalam Calendar 2026 PDF download',
      'Rahu Kalam Today',
      'മലയാളം കലണ്ടർ 2026',
      'ഇന്ന് നക്ഷത്രം',
    ],
    openGraph: {
      title: 'Malayalam Calendar 2026 – Today Date, Monthly & PDF Download',
      description: data
        ? `Today's Malayalam Date: ${data.malayalam_date}. Nakshatram: ${data.nakshatram}. Check Rahu Kalam, Panchangam & Festivals.`
        : 'View Malayalam Calendar 2026 and 2027 online with daily Panchangam, Nakshatram, Tithi, festivals and Kerala holidays. Explore the interactive calendar and download printable Malayalam calendar PDF.',
      type: 'website',
      url: canonicalUrl,
    }
  };
}

export default async function Home({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams;
  let targetDate = resolvedSearchParams?.date;

  const now = new Date();
  const options = { timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit' } as const;
  const formatter = new Intl.DateTimeFormat('en-CA', options);
  const todayStr = formatter.format(now);

  if (!targetDate || Array.isArray(targetDate)) targetDate = todayStr;

  const isToday = targetDate === todayStr;
  const data = await getDailyData(targetDate);

  if (!data) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-xl font-medium text-gray-600">Data not available for {targetDate}</h1>
        <p className="mt-2 text-gray-500">Please check back later.</p>
      </div>
    );
  }

  const [year, month] = targetDate.split('-');
  const monthData = await getMonthData(year, month);

  const currentMonthName = new Date(parseInt(year), parseInt(month) - 1).toLocaleString('default', { month: 'long' });
  const currentMonthSlug = `/malayalam-calendar-${currentMonthName.toLowerCase()}-${year}`;

  const MONTHS_2026 = [
    { name: 'January', slug: 'malayalam-calendar-january-2026', ml: 'ജനുവരി' },
    { name: 'February', slug: 'malayalam-calendar-february-2026', ml: 'ഫെബ്രുവരി' },
    { name: 'March', slug: 'malayalam-calendar-march-2026', ml: 'മാർച്ച്' },
    { name: 'April', slug: 'malayalam-calendar-april-2026', ml: 'ഏപ്രിൽ' },
    { name: 'May', slug: 'malayalam-calendar-may-2026', ml: 'മേയ്' },
    { name: 'June', slug: 'malayalam-calendar-june-2026', ml: 'ജൂൺ' },
    { name: 'July', slug: 'malayalam-calendar-july-2026', ml: 'ജൂലൈ' },
    { name: 'August', slug: 'malayalam-calendar-august-2026', ml: 'ഓഗസ്റ്റ്' },
    { name: 'September', slug: 'malayalam-calendar-september-2026', ml: 'സെപ്തംബർ' },
    { name: 'October', slug: 'malayalam-calendar-october-2026', ml: 'ഒക്ടോബർ' },
    { name: 'November', slug: 'malayalam-calendar-november-2026', ml: 'നവംബർ' },
    { name: 'December', slug: 'malayalam-calendar-december-2026', ml: 'ഡിസംബർ' },
  ];

  // Dynamic Date Info Logic
  const fullDateEnglish = new Date(targetDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  // Extract Malayalam Month Name (e.g., from "മകരം 20")
  const malDateParts = data.malayalam_date.split(', '); // ["മകരം 20"] or ["മകരം 20", "1201"] if year exists
  const malMonthPart = malDateParts[0]; // "മകരം 20"
  const malMonthName = malMonthPart.split(' ')[0]; // "മകരം"

  // Find start date of this Malayalam month
  const yearData = await getYearData(year); // Fetch full year data
  // The start date in JSON is like "മകരം 1" or "മകരം 1, 1201", so we check for both.
  const startOfMalMonth = yearData.find(d => d.malayalam_date === `${malMonthName} 1` || d.malayalam_date.startsWith(`${malMonthName} 1,`));

  let malMonthStartText = '';
  if (startOfMalMonth) {
    const startEnglishDate = new Date(startOfMalMonth.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
    malMonthStartText = `Malayalam month ${malMonthName} 1, ${year} falls on ${startEnglishDate}.`;
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://www.malayalamcalendar.site/#website',
        'url': 'https://www.malayalamcalendar.site',
        'name': 'Malayalam Calendar',
        'description': 'Kerala\'s most accurate daily Malayalam Calendar, Panchangam, and Festival guide.',
        'inLanguage': 'en-IN',
        'potentialAction': {
          '@type': 'SearchAction',
          'target': 'https://www.malayalamcalendar.site/?date={search_term_string}',
          'query-input': 'required name=search_term_string'
        }
      },
      {
        '@type': 'Organization',
        '@id': 'https://www.malayalamcalendar.site/#organization',
        'name': 'Malayalam Calendar Site',
        'url': 'https://www.malayalamcalendar.site',
        'logo': { '@type': 'ImageObject', 'url': 'https://www.malayalamcalendar.site/icon.png' }
      },
      {
        '@type': 'WebPage',
        '@id': 'https://www.malayalamcalendar.site/#webpage',
        'url': 'https://www.malayalamcalendar.site',
        'name': `Malayalam Calendar 2026 – Today's Date, Monthly & PDF Download`,
        'datePublished': data.date,
        'description': `Daily Malayalam Calendar details for ${data.date}. Nakshatram: ${data.nakshatram}, Tithi: ${data.tithi}.`,
        'isPartOf': { '@id': 'https://www.malayalamcalendar.site/#website' },
      }
    ]
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-5xl">
      <JsonLd data={jsonLd} />


      {/* ══════════════════════════════════════
          SECTION 1: HERO
          ══════════════════════════════════════ */}
      <section className="text-center mb-10 py-8 px-4 bg-gradient-to-br from-red-700 via-red-600 to-orange-500 rounded-2xl text-white shadow-xl">
        <div className="flex justify-center mb-6">
          <span className="bg-red-800/40 border border-red-500/30 text-red-100 text-xs px-3 py-1 rounded-full flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
            Last Updated: {fullDateEnglish} (Live Data)
          </span>
        </div>

        <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-2 drop-shadow">
          Malayalam Calendar 2026
        </h1>
        <h2 className="text-lg md:text-2xl font-semibold mb-4 text-red-50 drop-shadow-sm">
          Daily Panchangam, Kerala Holidays & PDF Calendar
        </h2>
        <p className="text-red-100 text-sm md:text-base max-w-2xl mx-auto leading-relaxed mb-6">
          Explore the Malayalam Calendar 2026 and 2027 online with daily Panchangam details, Nakshatram, Tithi, festivals, and Kerala government holidays. View the interactive calendar or download the printable Malayalam calendar PDF for easy reference.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link prefetch={false}
            href="/calendar-pdf/2026_pdf/kerala-govt-official-calendar-2026.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-red-700 font-bold px-6 py-3 rounded-full shadow-md hover:shadow-lg hover:bg-red-50 transition-all text-sm md:text-base"
          >
            📥 Download 2026 PDF
          </Link>
          <Link prefetch={false}
            href="#today-panchangam"
            className="inline-flex items-center gap-2 bg-red-800 text-white font-bold px-6 py-3 rounded-full shadow-md hover:shadow-lg hover:bg-red-900 transition-all border border-red-400 text-sm md:text-base"
          >
            📅 Today&apos;s Malayalam Date
          </Link>
        </div>
      </section>

      <AdSlot slotId="top-banner" />

      {/* ══════════════════════════════════════
          SECTION 2: TODAY MALAYALAM DATE & PANCHANGAM
          ══════════════════════════════════════ */}
      <section id="today-panchangam" className="mb-10 scroll-mt-20">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-1 h-8 bg-red-600 rounded-full"></span>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
            Today Malayalam Date &amp; Panchangam
          </h2>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-5 ml-4">
          <em>Malayalam calendar today · Today Malayalam date · <Link prefetch={false} href="/rahu-kalam-today" className="hover:text-red-600 hover:underline">today rahukalam</Link> · Malayalam panchangam today · Nakshatra today Kerala</em>
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* Left: TodayCard with all Panchangam details */}
          <div className="flex flex-col gap-4">
            <TodayCard data={data} />
            <div className="w-full flex">
              <Link prefetch={false} href="/rahu-kalam-today" className="w-full text-center bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 text-red-700 dark:text-red-400 font-semibold py-2.5 px-4 rounded-lg border border-red-200 dark:border-red-800 text-sm transition-colors">
                Check Exact Rahukalam Timings Today & Yamagandam →
              </Link>
            </div>
            <div className="bg-orange-50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-900/30 rounded-lg p-4 text-sm text-gray-700 dark:text-gray-300">
              <p className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                Today is <strong className="text-2xl text-red-600 dark:text-red-400">{fullDateEnglish}</strong>
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Malayalam date: <strong>{data.malayalam_date}</strong>. {malMonthStartText}
              </p>
            </div>
            <IslamicPrayerTimes />
          </div>

          {/* Right: Current month calendar grid */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-700">
              <p className="text-sm font-bold text-gray-800 dark:text-gray-200 uppercase tracking-wide">
                {currentMonthName} {year}
              </p>
              <Link prefetch={false} href={currentMonthSlug} className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
                Full Month View →
              </Link>
            </div>
            <div className="p-2">
              <CalendarGrid days={monthData} />
            </div>
          </div>
        </div>
      </section>



      {/* ══════════════════════════════════════
          SECTION 3: MONTHLY CALENDAR GRID
          ══════════════════════════════════════ */}
      <section className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-1 h-8 bg-indigo-600 rounded-full"></span>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
            Malayalam Monthly Calendar 2026
          </h2>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-5 italic ml-4">
          Malayalam monthly calendar
        </p>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 mb-8">
          {MONTHS_2026.map((m, i) => (
            <Link prefetch={false}
              key={m.slug}
              href={`/${m.slug}`}
              className="group flex flex-col items-center justify-center p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-indigo-400 hover:shadow-md hover:-translate-y-0.5 transition-all text-center" aria-label={`View ${m.name} 2026 Malayalam Calendar`}
            >
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 mb-1">{(i + 1).toString().padStart(2, '0')}</span>
              <span className="font-bold text-gray-800 dark:text-gray-100 text-xs group-hover:text-indigo-700 dark:group-hover:text-indigo-300">{m.name}</span>
              <span className="text-[10px] text-gray-600 dark:text-gray-400 font-malayalam">{m.ml}</span>
              <span className="text-[10px] text-gray-500 mt-1">2026</span>
            </Link>
          ))}
        </div>

        <div className="prose dark:prose-invert max-w-none text-sm text-gray-600 dark:text-gray-300 leading-relaxed bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-5 border border-indigo-100 dark:border-indigo-800">
          <p>
            The Malayalam Calendar is the traditional calendar followed in Kerala for determining festivals, religious observances, and daily panchangam details. It shows both Malayalam and English dates along with important information such as Nakshatram, Tithi, Rahu Kalam, sunrise and sunset timings. This online calendar helps users easily check daily panchangam details, festival dates, and Kerala holidays in one place.
          </p>
          <p className="mt-3">
            On malayalamcalendar.site, you can explore the Malayalam Calendar online with an interactive monthly view and clear day-wise details. The website also provides a printable Malayalam calendar PDF for convenient offline use. Whether you want to check festival dates, plan important events, or simply follow the traditional Kerala calendar, the online calendar makes it simple and accessible.
          </p>
        </div>
      </section>

      <AdSlot slotId="mid-content" />

      {/* ══════════════════════════════════════
          SECTION 4: PDF DOWNLOAD
          ══════════════════════════════════════ */}
      <section id="pdf-download" className="mb-10 scroll-mt-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-1 h-8 bg-green-600 rounded-full"></span>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
            Download Malayalam Calendar 2026 PDF (Free)
          </h2>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-5 italic">
          Malayalam calendar 2026 PDF download · Printable Malayalam calendar 2026 · Kerala calendar 2026 PDF
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { icon: '📄', label: 'Yearly PDF', desc: 'Full year 2026', href: '/calendar-pdf/2026_pdf/kerala-govt-official-calendar-2026.pdf' },
            { icon: '📅', label: 'Monthly PDF', desc: 'Each month separately', href: currentMonthSlug },
            { icon: '🔄', label: 'Landscape', desc: 'Wide format view', href: '/calendar-pdf/2026_pdf/kerala-govt-official-calendar-2026.pdf' },
            { icon: '🖼️', label: 'High Resolution', desc: 'HD quality image', href: '/calendar-pdf/2026_pdf/kerala-govt-official-calendar-2026.pdf' },
          ].map((item) => (
            <Link prefetch={false}
              key={item.label}
              href={item.href}
              className="group flex flex-col items-center text-center p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-green-400 hover:shadow-md transition-all"
            >
              <span className="text-3xl mb-2">{item.icon}</span>
              <span className="font-bold text-gray-800 dark:text-gray-100 text-sm group-hover:text-green-700 dark:group-hover:text-green-400">{item.label}</span>
              <span className="text-xs text-gray-500 mt-1">{item.desc}</span>
            </Link>
          ))}
        </div>

        <div className="prose dark:prose-invert max-w-none text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
          <p>
            Get the Malayalam Calendar 2026 PDF in a clear and printable format. The calendar is available as a free download and includes all months with important daily details such as Nakshatram, Tithi, Rahu Kalam, and major Kerala holidays.
          </p>
        </div>
        <div className="mt-4 flex justify-center">
          <Link prefetch={false}
            href="/calendar-pdf/2026_pdf/kerala-govt-official-calendar-2026.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-600 text-white font-bold px-8 py-3 rounded-full shadow hover:bg-green-700 transition-colors"
          >
            📥 Download Malayalam Calendar 2026 PDF
          </Link>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SECTION 5: WEEKLY CALENDAR (SECRET WEAPON)
          ══════════════════════════════════════ */}
      {/* ══════════════════════════════════════
          SECTION 5: WEEKLY CALENDAR (SECRET WEAPON)
          ══════════════════════════════════════ */}
      <section className="mb-10 bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 rounded-2xl p-6 border border-purple-100 dark:border-purple-800">
        <div className="flex items-center gap-3 mb-3">
          <span className="w-1 h-8 bg-purple-600 rounded-full"></span>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
            Malayalam Weekly Calendar &amp; Panchangam 2026
          </h2>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-5 leading-relaxed">
          Plan your week according to the traditional Kerala Panchangam. Know the best days for
          <strong> Muhurat</strong> (auspicious timings), <strong>Vrats</strong> (fasting days), and <strong>festivals</strong>
          in advance. Our weekly view helps you align daily activities with Nakshatram, Tithi, and Rahu Kalam timings.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link prefetch={false}
            href="/weekly-calendar"
            className="group flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl border border-purple-200 dark:border-purple-700 hover:shadow-md hover:border-purple-400 transition-all"
          >
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/40 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
              📆
            </div>
            <div>
              <p className="font-bold text-gray-900 dark:text-white text-sm group-hover:text-purple-700 dark:group-hover:text-purple-300">This Week Malayalam Calendar</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">View this week&apos;s Nakshatram & Panchangam</p>
            </div>
          </Link>
          <Link prefetch={false}
            href={`/weekly-calendar?date=${(() => {
              const d = new Date();
              d.setDate(d.getDate() + 7);
              return d.toISOString().split('T')[0];
            })()}`}
            className="group flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl border border-purple-200 dark:border-purple-700 hover:shadow-md hover:border-purple-400 transition-all"
          >
            <div className="w-12 h-12 bg-violet-100 dark:bg-violet-900/40 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
              🔮
            </div>
            <div>
              <p className="font-bold text-gray-900 dark:text-white text-sm group-hover:text-purple-700 dark:group-hover:text-purple-300">Next Week Panchangam</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Plan ahead with next week&apos;s calendar</p>
            </div>
          </Link>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SECTION 6: KERALA FESTIVALS 2026
          ══════════════════════════════════════ */}
      <section className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-1 h-8 bg-orange-500 rounded-full"></span>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
            Kerala Festival Calendar 2026
          </h2>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-5 leading-relaxed ml-4">
          Festivals are the heart of Kerala culture. The Malayalam Calendar 2026 is the definitive guide for
          planning Vishu celebrations, Onam preparations, Shivaratri fasting, Ekadashi observances, and
          choosing the most auspicious Marriage Muhurat for your family events.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              icon: '🌸', title: 'Vishu 2026', date: 'April 14, 2026',
              desc: 'Astronomical New Year of Kerala. Celebrated with Vishukkani, Vishukaineetam & fireworks.',
              href: '/vishu-2026-date-kerala', color: 'orange'
            },
            {
              icon: '🎊', title: 'Onam 2026', date: 'August 26, 2026',
              desc: 'Grand harvest festival. Thiruvonam is the most auspicious day of the 10-day celebration.',
              href: '/onam-2026-date', color: 'yellow'
            },
            {
              icon: '🔱', title: 'Maha Shivaratri 2026', date: 'February 2026',
              desc: 'Night-long worship of Lord Shiva. Observed with fasting and temple visits across Kerala.',
              href: '/festivals', color: 'blue'
            },
            {
              icon: '🌙', title: 'Ekadashi 2026', date: 'Monthly',
              desc: 'The sacred 11th day of each lunar fortnight. Observed with fasting and prayers to Lord Vishnu.',
              href: '/ekadashi-2026', color: 'green'
            },
            {
              icon: '💍', title: 'Marriage Muhurat 2026', date: 'Multiple Dates',
              desc: 'Best auspicious dates for weddings (Vivaha Muhurtham) in 2026 based on Nakshatram & Tithi.',
              href: '/marriage-muhurtham-2026', color: 'pink'
            },
            {
              icon: '🎆', title: 'All Kerala Festivals', date: '2026 Full List',
              desc: 'Complete list of all Kerala public holidays, temple festivals, and religious observances.',
              href: '/festivals', color: 'red'
            },
          ].map((fest) => (
            <Link prefetch={false}
              key={fest.title}
              href={fest.href}
              className="group flex flex-col p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{fest.icon}</span>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-sm group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">{fest.title}</h3>
                  <p className="text-xs font-semibold text-red-600 dark:text-red-400">{fest.date}</p>
                </div>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed flex-grow">{fest.desc}</p>
              <span className="text-xs text-indigo-600 dark:text-indigo-400 mt-3 font-semibold group-hover:underline">View Details →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          SECTION 7: ABOUT MALAYALAM CALENDAR
          ══════════════════════════════════════ */}
      <section className="mb-10 bg-gray-50 dark:bg-gray-800/60 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-1 h-8 bg-teal-600 rounded-full"></span>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
            What is Malayalam Calendar (Kollavarsham)?
          </h2>
        </div>

        <div className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
          <p>
            The Malayalam Calendar, also known as Kollavarsham, is the traditional calendar followed in the Indian state of Kerala. It began in 825 AD in the historic port city of Kollam (Quilon) and is widely used for determining religious festivals, temple rituals, and cultural events.
          </p>
          <p>
            Malayalam calendar is based on a solar system that tracks the movement of the sun through the twelve zodiac signs. Each Malayalam month begins with Sankramam, the moment when the sun enters a new zodiac sign. Because of this astronomical basis, the calendar plays an important role in astrology, selecting auspicious timings (Muhurtham), horoscope matching, and observing traditional fasts and festivals.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-base">Key Facts</h3>
              <ul className="space-y-2">
                {[
                  ['📅', 'Founded', '825 AD in Kollam, Kerala'],
                  ['☀️', 'Type', 'Sidereal Solar Calendar'],
                  ['📆', 'Months', '12 Malayalam months'],
                  ['🗓️', '2026 Year', 'Kollavarsham 1201–1202'],
                  ['🏛️', 'Used in', 'Temples, homes, astrology across Kerala'],
                ].map(([icon, label, val]) => (
                  <li key={label} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <span>{icon}</span>
                    <span><strong className="text-gray-900 dark:text-white">{label}:</strong> {val}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-base">12 Malayalam Months</h3>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  ['Chingam', 'Aug–Sep'], ['Kanni', 'Sep–Oct'], ['Thulam', 'Oct–Nov'],
                  ['Vrischikam', 'Nov–Dec'], ['Dhanu', 'Dec–Jan'], ['Makaram', 'Jan–Feb'],
                  ['Kumbham', 'Feb–Mar'], ['Meenam', 'Mar–Apr'], ['Medam', 'Apr–May'],
                  ['Edavam', 'May–Jun'], ['Mithunam', 'Jun–Jul'], ['Karkidakam', 'Jul–Aug'],
                ].map(([ml, en]) => (
                  <div key={ml} className="flex items-center justify-between bg-white dark:bg-gray-700/50 rounded-lg px-2.5 py-1.5 text-xs border border-gray-100 dark:border-gray-700">
                    <span className="font-semibold text-gray-800 dark:text-gray-200">{ml}</span>
                    <span className="text-gray-600 dark:text-gray-400">{en}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SECTION 7.5: POPULAR MALAYALAM CALENDARS
          ══════════════════════════════════════ */}
      <section className="mb-10 bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-1 h-8 bg-pink-600 rounded-full"></span>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
            Popular Malayalam Calendars
          </h2>
        </div>

        <div className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
          <p>
            Several printed calendars are widely used across Kerala for tracking festival dates, holidays, and daily panchangam details. Some of the most popular ones include the Malayala Manorama Calendar, Mathrubhumi Calendar, Deepika Calendar, and Kerala Kaumudi Calendar. In addition, the Kerala Government publishes an official calendar each year listing public and government holidays.
          </p>
          <p>
            Many of these calendars are also available in digital and PDF formats, allowing users to easily access them online.
          </p>
          <p>
            Online calendar platforms provide detailed day-to-day information such as Nakshatram, sunrise and sunset timings, Rahu Kalam, Muhurtham, and other panchangam details for multiple years.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SECTION 8: FAQ
          ══════════════════════════════════════ */}
      <section className="mb-10">
        <FAQ title="Frequently Asked Questions – Malayalam Calendar" items={[
          {
            question: 'What is the Malayalam Calendar and how is it used?',
            answer: 'The Malayalam Calendar, also known as Kollavarsham, is a traditional solar calendar originating in Kerala in 825 AD. It precisely tracks the sun\'s movement through the zodiac signs to determine the exact length and start of each month. Keralites use it extensively for finding auspicious timings (Muhurtham), matching horoscopes, and determining dates for important religious festivals and observances.'
          },
          {
            question: 'Can I download the Malayalam Calendar for offline use?',
            answer: 'Yes, you can easily download a complete and clear printable PDF version of the Malayalam Calendar for 2026 and 2027 directly from our website. Our free PDF calendar includes all twelve months along with daily details like Nakshatram, Tithi, and Rahu Kalam timings. It is formatted perfectly for A4 printing so you can keep a physical copy at your home or office.'
          },
          {
            question: 'How does the Malayalam Calendar differ from the English calendar?',
            answer: 'The English (Gregorian) calendar is a tropical solar calendar where months always have fixed lengths and start dates regardless of astronomical events. In contrast, the Malayalam Calendar is a sidereal solar calendar based on precise astronomical calculations. Each Malayalam month begins only at the exact moment (Sankramam) when the sun transits into a new zodiac constellation, causing the number of days in a month to vary slightly each year.'
          },
          {
            question: 'How can I find Today\'s Nakshatram in Malayalam?',
            answer: 'You can easily find Today\'s Nakshatram in Malayalam along with the daily Panchangam details on our homepage. We update the calendar live every day so you always have the most accurate and precise astrological information. This allows you to plan your daily activities, rituals, and auspicious events according to traditional beliefs.'
          },
          {
            question: 'What is the exact time for Rahu Kalam today in Kollam?',
            answer: 'To check the exact time for Rahu Kalam today in Kollam (or anywhere in Kerala), simply refer to the daily details section on our interactive calendar. We calculate Rahu Kalam based on accurate local sunrise and sunset timings, ensuring you can completely avoid starting important tasks during these inauspicious hours. Our tools make it simple to track Yamagandam and Gulika Kalam as well.'
          }
        ]} />
      </section>

      {/* ══════════════════════════════════════
          SECTION 9: POPULAR PAGES (INTERNAL LINK FOOTER)
          ══════════════════════════════════════ */}
      <section className="mb-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white">
        <h2 className="text-lg font-bold mb-4 text-gray-100">
          📚 Popular Malayalam Calendar Pages
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {[
            { label: 'Calendar 2025', href: '/malayalam-calendar/2025', icon: '📅' },
            { label: 'Calendar 2027', href: '/malayalam-calendar/2027', icon: '📅' },
            { label: 'Panchangam Today', href: '/', icon: '🌟' },
            { label: 'Rahukalam Today', href: '/rahu-kalam-today', icon: '⏱️' },
            { label: 'Wedding Muhurat', href: '/festivals', icon: '💍' },
            { label: 'Ekadashi 2026', href: '/festivals', icon: '🌙' },
            { label: 'Public Holidays', href: '/festivals', icon: '🎆' },
          ].map((p) => (
            <Link prefetch={false}
              key={p.href + p.label}
              href={p.href}
              className="flex flex-col items-center text-center p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors border border-white/10 hover:border-white/30"
            >
              <span className="text-xl mb-1">{p.icon}</span>
              <span className="text-xs font-semibold text-gray-200">{p.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Malayalam Language Summary */}
      <div className="pt-4 border-t border-gray-100 dark:border-gray-700 text-center">
        <p className="text-base md:text-lg text-gray-800 dark:text-gray-200 leading-relaxed font-malayalam">
          {isToday ? 'ഇന്ന് കേരളത്തിൽ' : <span className="font-bold text-red-700 dark:text-red-400">{formatDate(data.date)}</span>}
          {' '}
          (<span className="font-medium text-gray-900 dark:text-gray-100">{data.malayalam_date}</span>) ആണ്.
          {' '}
          {isToday ? 'ഇന്നത്തെ' : 'ആ ദിവസത്തെ'} നക്ഷത്രം <span className="font-bold text-indigo-700 dark:text-indigo-400">{data.nakshatram}</span> ആണ്.
          {' '}
          സൂര്യോദയം <span className="font-medium">{data.sunrise}</span>-നും
          {' '}
          സൂര്യാസ്തമയം <span className="font-medium">{data.sunset}</span>-നും ആണ്.
        </p>
      </div>

      <AdSlot slotId="bottom-banner" />
    </div>
  );
}
