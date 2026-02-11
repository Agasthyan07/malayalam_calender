import TodayCard from '@/components/TodayCard';
import FAQ from '@/components/FAQ';
import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import DateNavigation from '@/components/DateNavigation';
import { getDailyData, formatDate, getMonthData } from '@/lib/dateUtils';
import JsonLd from '@/components/JsonLd';
import { Metadata } from 'next';
import CalendarGrid from '@/components/CalendarGrid';

async function getGoldRate() {
  const data = await import('@/data/gold-rate.json');
  return data.default;
}

export const revalidate = 3600; // Hourly revalidation

type Props = {
  searchParams: Promise<{ date?: string }>;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const resolvedSearchParams = await searchParams;
  let targetDate = resolvedSearchParams?.date;

  // Calculate "Today" in IST
  const now = new Date();
  const options = { timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit' } as const;
  const formatter = new Intl.DateTimeFormat('en-CA', options);
  const todayStr = formatter.format(now); // YYYY-MM-DD

  if (!targetDate) {
    targetDate = todayStr;
  }

  const isToday = targetDate === todayStr;
  const data = await getDailyData(targetDate);

  // Format date for title: "February 11, 2026"
  const [y, m, d] = targetDate.split('-').map(Number);
  const dateObj = new Date(y, m - 1, d);
  const titleDate = dateObj.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });

  if (!data) {
    return {
      title: `Malayalam Calendar 2026 – Today’s Date ${titleDate}, Nakshatram & Rahu Kalam (Kerala)`,
      description: 'Check Malayalam Calendar 2026 with today’s Nakshatram, Rahu Kalam, Panchangam, festival dates, Muhurat timings and Kerala public holidays. Updated daily.',
    };
  }

  const canonicalUrl = isToday
    ? 'https://malayalamcalendar.site'
    : `https://malayalamcalendar.site/date/${formatDate(targetDate)}`;

  // STEP 1: Improved Meta Tags
  return {
    title: `Malayalam Calendar 2026 – Today’s Date ${titleDate}, Nakshatram & Rahu Kalam (Kerala)`,
    description: 'Check Malayalam Calendar 2026 with today’s Nakshatram, Rahu Kalam, Panchangam, festival dates, Muhurat timings and Kerala public holidays. Updated daily.',
    alternates: {
      canonical: canonicalUrl,
    },
    keywords: [
      'Malayalam Calendar 2026',
      'Today Nakshatram',
      'Rahu Kalam Today',
      'Malayalam Panchangam',
      'Kerala Calendar',
      'മലയാളം കലണ്ടർ 2026',
      'ഇന്ന് നക്ഷത്രം',
      'രാഹുകാലം',
      'മുഹൂർത്തം',
      'കൊല്ലവർഷം'
    ],
    openGraph: {
      title: `Malayalam Calendar 2026 – Today’s Date ${titleDate}, Nakshatram & Rahu Kalam (Kerala)`,
      description: `Today's Malayalam Date: ${data.malayalam_date}. Nakshatram: ${data.nakshatram}. Check Rahu Kalam & Festvals.`,
      type: 'website',
      url: canonicalUrl,
    }
  };
}

export default async function Home({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams;
  let targetDate = resolvedSearchParams?.date;

  // Calculate "Today" in IST
  const now = new Date();
  const options = { timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit' } as const;
  const formatter = new Intl.DateTimeFormat('en-CA', options);
  const todayStr = formatter.format(now);

  if (!targetDate || Array.isArray(targetDate)) {
    targetDate = todayStr;
  }

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

  // Fetch full month data for the calendar grid
  const [year, month] = targetDate.split('-');
  const monthData = await getMonthData(year, month);
  const goldRate = await getGoldRate();

  // STEP 8: Schema Markup
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://malayalamcalendar.site/#website',
        'url': 'https://malayalamcalendar.site',
        'name': 'Malayalam Calendar',
        'description': 'Kerala\'s most accurate daily Malayalam Calendar, Panchangam, and Festival guide.',
        'inLanguage': 'en-IN'
      },
      {
        '@type': 'Organization',
        '@id': 'https://malayalamcalendar.site/#organization',
        'name': 'Malayalam Calendar Site',
        'url': 'https://malayalamcalendar.site',
        'logo': {
          '@type': 'ImageObject',
          'url': 'https://malayalamcalendar.site/icon.png'
        }
      },
      {
        '@type': 'WebPage',
        '@id': 'https://malayalamcalendar.site/#webpage',
        'url': 'https://malayalamcalendar.site',
        'name': `Malayalam Calendar ${year} - Today's Panchangam`,
        'datePublished': data.date,
        'description': `Daily Malayalam Calendar details for ${data.date}. Nakshatram: ${data.nakshatram}, Tithi: ${data.tithi}.`,
        'isPartOf': {
          '@id': 'https://malayalamcalendar.site/#website'
        },
        'breadcrumb': {
          '@type': 'BreadcrumbList',
          'itemListElement': [
            {
              '@type': 'ListItem',
              'position': 1,
              'name': 'Home',
              'item': 'https://malayalamcalendar.site'
            }
          ]
        }
      }
    ]
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <JsonLd data={jsonLd} />

      {/* STEP 2: Improve H1 Structure - Single H1 */}
      <div className="text-center mb-6">
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white mb-2 leading-tight">
          Malayalam Calendar – Today’s Date, Nakshatram & Rahu Kalam (Kerala)
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Current Malayalam Date: <strong>{data.malayalam_date}</strong> • Nakshatram: <strong>{data.nakshatram}</strong>
        </p>
      </div>

      <AdSlot slotId="top-banner" />

      {/* STEP 4: Daily Panchang - Description kept minimal/integrated as section header if needed, but per user request "below card" logic applies to heavy text.
          We keep the card prominent. */}
      {/* <!-- SEO IMPROVEMENT START --> */}
      <p className="text-sm text-center text-gray-500 dark:text-gray-400 mb-2">
        Today's Malayalam date, Nakshatram, Rahu Kalam, Yamagandam, and Gulika Kalam for Kerala.
      </p>
      {/* <!-- SEO IMPROVEMENT END --> */}

      <TodayCard data={data} />

      {/* Gold Rate Widget */}
      <div className="mt-6 bg-gradient-to-r from-yellow-50 to-white dark:from-yellow-900/10 dark:to-gray-800 rounded-xl border border-yellow-100 dark:border-yellow-900/30 p-4 shadow-sm">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-yellow-800 dark:text-yellow-500 font-bold text-sm uppercase tracking-wide">
              Today's Gold Rate in Kerala
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">22 Carat (1 Gram)</p>
          </div>
          <Link href="/gold-rate" className="flex items-center gap-2 group">
            <span className="text-2xl font-black text-gray-900 dark:text-white">
              ₹{goldRate.gram22.toLocaleString()}
            </span>
            <span className="bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-400 p-1.5 rounded-full group-hover:bg-yellow-200 transition">
              →
            </span>
          </Link>
        </div>
      </div>

      <div className="mt-8">
        <DateNavigation currentDate={data.date} />
      </div>

      <div className="my-8">
        <div className="flex items-center justify-between mb-4 px-2">
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200 uppercase tracking-wide">
            {new Date(parseInt(year), parseInt(month) - 1).toLocaleString('default', { month: 'long', year: 'numeric' })} Calendar
          </h2>
          <Link href={`/malayalam-calendar-${new Date(parseInt(year), parseInt(month) - 1).toLocaleString('default', { month: 'long' }).toLowerCase()}-${year}`} className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline">
            View Full Month List →
          </Link>
        </div>
        <CalendarGrid days={monthData} />
        {/* STEP 5: Month Navigation Description */}
        {/* <!-- SEO IMPROVEMENT START --> */}
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 text-center">
          View the detailed <Link href="/calendar/2026" className="text-indigo-600 hover:underline">Monthly Malayalam Calendar</Link> including festivals, Muhurat timings, Nakshatra details, and public holidays for each month.
        </p>
        {/* <!-- SEO IMPROVEMENT END --> */}
      </div>

      {/* =========================================
          SEO CONTENT SECTION (Moved to Bottom)
          ========================================= */}

      <div className="space-y-8 mt-12 bg-white dark:bg-gray-800/50 p-4 md:p-6 rounded-2xl border border-gray-100 dark:border-gray-700">

        {/* STEP 3: SEO Intro Section */}
        {/* <!-- SEO IMPROVEMENT START --> */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">
            What is Malayalam Calendar (മലയാളം കലണ്ടർ)?
          </h2>
          <div className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-3">
            <p>
              The <strong>Malayalam Calendar</strong> (known locally as <em>Kollavarsham</em> or <em>Kollam Era</em>) is the traditional solar calendar system followed in Kerala, India. Unlike the Gregorian calendar, the Malayalam era calculates dates based on the sun's position while also integrating lunar phases for determination of auspicious timings like <strong>Muhurat</strong> (മുഹൂർത്തം) and festivals.
            </p>
            <p>
              Used widely for agricultural, religious, and social activities, this calendar is essential for checking the daily <strong>Nakshatram</strong> (Star), <strong>Tithi</strong> (Lunar day), and avoidance times like <strong>Rahu Kalam</strong> (രാഹുകാലം) and <strong>Gulika Kalam</strong>.
            </p>
            <p>
              Whether you are planning a wedding, a housewarming, or simply checking today's auspicious times, our <Link href="/calendar/2026" className="text-indigo-600 hover:underline">2026 Malayalam Calendar</Link> provides accurate, location-based Panchangam data specifically calculated for Kerala. Tracks major festivals like <Link href="/festivals" className="text-indigo-600 hover:underline">Onam</Link>, Vishu, and temple festivals across the state.
            </p>
          </div>
        </section>
        {/* <!-- SEO IMPROVEMENT END --> */}

        {/* STEP 6: Festival Highlight Section */}
        {/* <!-- SEO IMPROVEMENT START --> */}
        <section className="pt-6 border-t border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Major Festivals in Malayalam Calendar 2026
          </h2>
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg border border-orange-100 dark:border-orange-900/30">
              <h3 className="font-bold text-orange-800 dark:text-orange-400 mb-1">Vishu 2026 (വിഷു)</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Marking the Malayali New Year, Vishu involves the traditional 'Vishukkani' and is celebrated in the month of Medam.
                <Link href="/vishu-2026-date-kerala" className="ml-1 text-orange-700 hover:underline text-xs font-semibold">Check Date →</Link>
              </p>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-100 dark:border-yellow-900/30">
              <h3 className="font-bold text-yellow-800 dark:text-yellow-400 mb-1">Onam 2026 (ഓണം)</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                The harvest festival of Kerala celebrating the return of King Mahabali. Thiruvonam is the most important day.
                <Link href="/onam-2026-date" className="ml-1 text-yellow-700 hover:underline text-xs font-semibold">See Onam Dates →</Link>
              </p>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-100 dark:border-purple-900/30">
              <h3 className="font-bold text-purple-800 dark:text-purple-400 mb-1">Mahashivratri & Deepavali</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Important religious observances. Shivratri is dedicated to Lord Shiva, while Deepavali is the festival of lights.
                <Link href="/festivals" className="ml-1 text-purple-700 hover:underline text-xs font-semibold">All Festivals →</Link>
              </p>
            </div>
          </div>
        </section>
        {/* <!-- SEO IMPROVEMENT END --> */}

        {/* Existing Dynamic Footer Text Logic (Improved) */}
        <div className="pt-6 border-t border-gray-100 dark:border-gray-700 text-center">
          <p className="text-lg md:text-xl text-gray-800 dark:text-gray-200 leading-relaxed font-malayalam">
            {isToday ? 'ഇന്ന് കേരളത്തിൽ' : <span className="font-bold text-red-700 dark:text-red-400">{formatDate(data.date)}</span>}
            {' '}
            (<span className="font-medium text-gray-900 dark:text-gray-100">{data.malayalam_date}</span>) ആണ്.
            {' '}
            {isToday ? 'ഇന്നത്തെ' : 'ആ ദിവസത്തെ'} നക്ഷത്രം <span className="font-bold text-indigo-700 dark:text-indigo-400">{data.nakshatram}</span> ആണ്.
            {' '}
            സൂര്യോദയം രാവിലെ <span className="font-medium text-gray-900 dark:text-gray-100">{data.sunrise}</span>-നും
            {' '}
            സൂര്യാസ്തമയം വൈകിട്ട് <span className="font-medium text-gray-900 dark:text-gray-100">{data.sunset}</span>-നും ആണ്.
          </p>
        </div>

      </div>

      {/* STEP 7: FAQ Section */}
      {/* <!-- SEO IMPROVEMENT START --> */}
      <FAQ items={[
        {
          question: "What is Malayalam Calendar?",
          answer: "The Malayalam Calendar, or Kolla Varsham, is a solar calendar used in Kerala for agricultural, religious, and social events. It determines dates based on the sun's transit into zodiac signs."
        },
        {
          question: "When does Malayalam year 1202 start?",
          answer: "The Malayalam year changes in the month of Chingam (mid-August to mid-September). Kollavarsham 1202 is expected to begin in August 2026."
        },
        {
          question: "What is Nakshatram today in Kerala?",
          answer: `Today's Nakshatram in Kerala is ${data.nakshatram}. The star may change at a specific time during the day, so please check the daily Panchangam view for exact ending times.`
        },
        {
          question: "What is Rahu Kalam?",
          answer: `Rahu Kalam (രാഹുകാലം) is an inauspicious time period of the day (approx 1.5 hours) derived from planetary positions. Today's Rahu Kalam is ${data.rahukalam}.`
        },
        {
          question: "How is Malayalam calendar calculated?",
          answer: "It is calculated based on the position of the Sun (Solar Calendar). The year begins when the Sun enters Leo (Simha Rashi). Months are named after the zodiac sign the Sun is transiting."
        },
        {
          question: "When is Vishu 2026?",
          answer: "Vishu typically falls on April 14th or 15th, marking the sun's transit into Aries (Medam). Check our 2026 April calendar for the exact date."
        },
        {
          question: "When is Onam 2026?",
          answer: "Onam is celebrated in the month of Chingam. The main day, Thiruvonam, usually falls in August or September. See the Festivals section for precise 2026 dates."
        },
        {
          question: "What is Marriage Muhurat?",
          answer: "Marriage Muhurat (Vivaha Muhurtham) is an auspicious time slot chosen based on Nakshatra matches and planetary positions to ensure a prosperous married life."
        }
      ]} />
      {/* <!-- SEO IMPROVEMENT END --> */}

      <AdSlot slotId="mid-content" />
    </div>
  );
}
