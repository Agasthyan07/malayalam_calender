import TodayCard from '@/components/TodayCard';
import AdSlot from '@/components/AdSlot';
import { getDailyData, formatDate } from '@/lib/dateUtils';
import JsonLd from '@/components/JsonLd';
import { Metadata } from 'next';

export const revalidate = 3600; // Hourly revalidation

type Props = {
    searchParams: Promise<{ date?: string }>;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
    const resolvedSearchParams = await searchParams;
    let targetDate = resolvedSearchParams?.date;

    if (!targetDate) {
        const now = new Date();
        const options = { timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit' } as const;
        const formatter = new Intl.DateTimeFormat('en-CA', options);
        targetDate = formatter.format(now);
    }

    const data = await getDailyData(targetDate);

    if (!data) {
        return {
            title: 'Malayalam Calendar - Today',
            description: 'Daily Malayalam Calendar showing Nakshatram, Tithi, and Auspicious timings.',
        };
    }

    return {
        title: `${data.malayalam_date} - Malayalam Date Today | ${data.nakshatram}`,
        description: `Today's Malayalam date is ${data.malayalam_date}. Nakshatram: ${data.nakshatram}, Tithi: ${data.tithi}. Sunrise: ${data.sunrise}, Rahukalam: ${data.rahukalam}.`,
        openGraph: {
            title: `${data.malayalam_date} - Malayalam Date Today`,
            description: `Check today's Malayalam date, Nakshatram (${data.nakshatram}), and auspicious timings.`,
            type: 'article',
            publishedTime: data.date,
        }
    };
}

export default async function TodayPage({ searchParams }: Props) {
    // Determine date: query param OR today (IST)
    const resolvedSearchParams = await searchParams;
    let targetDate = resolvedSearchParams?.date;

    if (!targetDate || Array.isArray(targetDate)) {
        const now = new Date();
        const options = { timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit' } as const;
        const formatter = new Intl.DateTimeFormat('en-CA', options);
        targetDate = formatter.format(now);
    }

    const data = await getDailyData(targetDate);

    if (!data) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <h1 className="text-xl font-medium text-gray-600">Data not available for {targetDate}</h1>
                <p className="mt-2 text-gray-500">Please check back later.</p>
            </div>
        );
    }

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Event',
        name: `Malayalam Date: ${data.malayalam_date}`,
        startDate: data.date,
        endDate: data.date,
        description: `Daily Malayalam Calendar details for ${data.date}. Nakshatram: ${data.nakshatram}, Tithi: ${data.tithi}.`,
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
        location: {
            '@type': 'VirtualLocation',
            url: 'https://your-domain.com/today'
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <JsonLd data={jsonLd} />
            <h1 className="sr-only">Malayalam Calendar - {data.malayalam_date}</h1>
            <AdSlot slotId="top-banner" />

            <TodayCard data={data} />

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 my-8 text-center">
                <p className="text-lg md:text-xl text-gray-800 leading-relaxed font-malayalam">
                    ഇന്ന് കേരളത്തിൽ <span className="font-bold text-red-700">{formatDate(data.date)}</span> (<span className="font-medium">{data.malayalam_date}</span>) ആണ്.
                    ഇന്നത്തെ നക്ഷത്രം <span className="font-bold text-indigo-700">{data.nakshatram}</span> ആണ്.
                    സൂര്യോദയം രാവിലെ <span className="font-medium">{data.sunrise}</span>-നും
                    സൂര്യാസ്തമയം വൈകിട്ട് <span className="font-medium">{data.sunset}</span>-നും ആണ്.
                </p>
            </div>

            <AdSlot slotId="mid-content" />
        </div>
    );
}
