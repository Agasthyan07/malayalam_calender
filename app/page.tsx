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

  if (!data) {
    return {
      title: 'Malayalam Calendar 2026 - 2027 | Today\'s Date & Panchangam',
      description: 'Accurate Malayalam Calendar 2026 & 2027. Check today\'s Malayalam date, Nakshatram, Tithi, Rahu Kalam, and Nalla Samayam. Festival dates for Vishu, Onam, and more.',
    };
  }

  const titlePrefix = isToday ? 'Malayalam Calendar Today' : `Malayalam Date ${formatDate(targetDate)}`;

  const canonicalUrl = isToday
    ? 'https://malayalamcalendar.site'
    : `https://malayalamcalendar.site/date/${formatDate(targetDate)}`;

  return {
    title: `${titlePrefix} | ${data.malayalam_date} | Nakshatram & Nalla Samayam`,
    description: `Today's Malayalam Date: ${data.malayalam_date}. Nakshatram: ${data.nakshatram}, Tithi: ${data.tithi}. Rahu Kalam: ${data.rahukalam}. Complete Malayalam Calendar ${targetDate.split('-')[0]}.`,
    alternates: {
      canonical: canonicalUrl,
    },
    keywords: [
      'Malayalam Calendar 2026',
      'Malayalam Calendar Today',
      'Innathe Nakshatram',
      'Malayalam Date Today',
      'Kollam Era Calendar',
      '2027 Malayalam Calendar'
    ],
    openGraph: {
      title: `${titlePrefix} - ${data.malayalam_date}`,
      description: `Check today's Malayalam date, Nakshatram (${data.nakshatram}), and auspicious timings.`,
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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `Malayalam Calendar ${year} - Today's Panchangam`,
    datePublished: data.date,
    description: `Daily Malayalam Calendar details for ${data.date}. Nakshatram: ${data.nakshatram}, Tithi: ${data.tithi}.`,
    isPartOf: {
      '@type': 'WebSite',
      name: 'Malayalam Calendar',
      url: 'https://malayalamcalendar.site'
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <JsonLd data={jsonLd} />

      {/* Visual Hidden H1 for SEO, but we show a nice H2 below. Or better, make the main title H1. */}
      { /* User said: "titlem, meta , first heading and sytart of first paragrah need seo words correctly placed" */}

      <div className="text-center mb-6">
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
          Malayalam Calendar {year} & Today's Date
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Current Malayalam Date: <strong>{data.malayalam_date}</strong> • Nakshatram: <strong>{data.nakshatram}</strong>
        </p>
      </div>

      <AdSlot slotId="top-banner" />

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
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 my-8 text-center">
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

      <div className="bg-red-50 dark:bg-gray-900/50 rounded-xl p-6 my-8 border border-red-100 dark:border-gray-800">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          About Malayalam Calendar {year}
        </h2>
        <div className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-3">
          <p>
            The <strong>Malayalam Calendar {year}</strong> is your ultimate guide to the traditional solar calendar (Kollavarsham) followed in Kerala.
            Whether you are looking for <strong>today's Malayalam date</strong>, <strong>Nakshatram</strong>, or auspicious <strong>Muhoortham</strong>, our calendar provides accurate daily Panchangam details.
          </p>
          <p>
            Stay updated with major festivals like <strong>Vishu</strong>, <strong>Onam</strong>, and <strong>Deepavali</strong>.
            We provide precise calculations for <strong>Rahu Kalam</strong>, sunrise, and sunset times specific to Kerala's location.
          </p>
          <div className="mt-4 pt-4 border-t border-red-100 dark:border-gray-800">
            <p className="font-medium">
              Check future dates? <Link href="/calendar/2026" className="text-red-700 dark:text-red-400 hover:underline">Malayalam Calendar 2026</Link> • <Link href="/calendar/2027" className="text-red-700 dark:text-red-400 hover:underline">2027 Calendar</Link>
            </p>
          </div>
        </div>
      </div>

      <FAQ items={[
        {
          question: `What is the Nakshatram today (${data.date})?`,
          answer: `Today's Nakshatram is ${data.nakshatram}. The Nakshatram changes at a specific time, so check the daily view for exact timings.`
        },
        {
          question: "ഇന്നത്തെ നക്ഷത്രം ഏതാണ്?",
          answer: `ഇന്നത്തെ നക്ഷത്രം ${data.nakshatram} ആണ്. മലയാളം കലണ്ടർ പ്രകാരം ദിവസം തുടങ്ങുന്നത് സൂര്യോദയത്തിനാണ്.`
        },
        {
          question: "What is the Rahu Kalam time today?",
          answer: `Today's Rahu Kalam is from ${data.rahukalam}. It is generally advised to avoid starting important activities during this time.`
        },
        {
          question: "ഇന്നത്തെ രാഹുകാലം എപ്പോഴാണ്?",
          answer: `ഇന്നത്തെ രാഹുകാലം ${data.rahukalam} വരെയാണ്. പുതിയ കാര്യങ്ങൾ തുടങ്ങാൻ ഈ സമയം ഒഴിവാക്കുന്നതാണ് ഉചിതം.`
        }
      ]} />

      <AdSlot slotId="mid-content" />
    </div>
  );
}
