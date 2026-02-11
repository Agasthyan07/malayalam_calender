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

    if (!targetDate) {
        targetDate = todayStr;
    }

    const isToday = targetDate === todayStr;
    const data = await getDailyData(targetDate);

    if (!data) {
        return {
            title: 'മലയാളം കലണ്ടർ 2026 - ഇന്നത്തെ നക്ഷത്രം, രാഹുകാലം, പഞ്ചാംഗം',
            description: 'കൃത്യമായ മലയാളം കലണ്ടർ 2026. ഇന്നത്തെ നക്ഷത്രം, തിഥി, രാഹുകാലം, നല്ല സമയം എന്നിവ അറിയാം.',
        };
    }

    const canonicalUrl = isToday
        ? 'https://malayalamcalendar.site/ml'
        : `https://malayalamcalendar.site/ml/date/${formatDate(targetDate)}`;

    return {
        title: `മലയാളം കലണ്ടർ 2026 - ${data.malayalam_date} ഇന്നത്തെ നക്ഷത്രം, രാഹുകാലം`,
        description: `ഇന്നത്തെ മലയാളം തീയതി: ${data.malayalam_date}. നക്ഷത്രം: ${data.nakshatram}. രാഹുകാലം, വിശേഷദിവസങ്ങൾ എന്നിവ അറിയാം.`,
        alternates: {
            canonical: canonicalUrl,
            languages: {
                'en-IN': 'https://malayalamcalendar.site',
                'ml-IN': 'https://malayalamcalendar.site/ml',
            },
        },
        keywords: [
            'മലയാളം കലണ്ടർ 2026',
            'ഇന്നത്തെ നക്ഷത്രം',
            'രാഹുകാലം ഇന്ന്',
            'പഞ്ചാംഗം',
            'കേരള കലണ്ടർ',
            'മുഹൂർത്തം',
            'വിഷു 2026',
            'ഓണം 2026'
        ],
        openGraph: {
            title: `മലയാളം കലണ്ടർ - ${data.malayalam_date}`,
            description: `ഇന്നത്തെ നക്ഷത്രം: ${data.nakshatram}. രാഹുകാലം, വിശേഷങ്ങൾ എന്നിവയും.`,
            locale: 'ml_IN',
            type: 'website',
            url: canonicalUrl,
        }
    };
}

export default async function MalayalamHome({ searchParams }: Props) {
    const resolvedSearchParams = await searchParams;
    let targetDate = resolvedSearchParams?.date;

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
            <div className="container mx-auto px-4 py-8 text-center text-gray-600">
                വിവരങ്ങൾ ലഭ്യമല്ല. ദയവായി പിന്നീട് ശ്രമിക്കുക.
            </div>
        );
    }

    const [year, month] = targetDate.split('-');
    const monthData = await getMonthData(year, month);
    const goldRate = await getGoldRate();

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'മലയാളം കലണ്ടർ 2026',
        inLanguage: 'ml',
        description: 'കേരളത്തിലെ ഏറ്റവും കൃത്യമായ മലയാളം കലണ്ടർ.',
        url: 'https://malayalamcalendar.site/ml',
        isPartOf: {
            '@type': 'WebSite',
            name: 'Malayalam Calendar',
            url: 'https://malayalamcalendar.site'
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl font-malayalam">
            <JsonLd data={jsonLd} />

            <div className="text-center mb-6">
                <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white mb-2 leading-tight">
                    മലയാളം കലണ്ടർ {year} & ഇന്നത്തെ പഞ്ചാംഗം
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    ഇന്നത്തെ തീയതി: <strong>{data.malayalam_date}</strong> • നക്ഷത്രം: <strong>{data.nakshatram}</strong>
                </p>
            </div>

            <AdSlot slotId="top-banner" />

            <p className="text-sm text-center text-gray-500 dark:text-gray-400 mb-2">
                ഇന്നത്തെ നക്ഷത്രം, തിഥി, രാഹുകാലം, ഗുളികകാലം തുടങ്ങിയ വിവരങ്ങൾ താഴെ നൽകുന്നു.
            </p>

            <TodayCard data={data} showMalayalamLabels={true} />

            {/* Gold Rate */}
            <div className="mt-6 bg-gradient-to-r from-yellow-50 to-white dark:from-yellow-900/10 dark:to-gray-800 rounded-xl border border-yellow-100 dark:border-yellow-900/30 p-4 shadow-sm">
                <div className="flex justify-between items-center">
                    <div>
                        <h3 className="text-yellow-800 dark:text-yellow-500 font-bold text-sm uppercase tracking-wide">
                            ഇന്നത്തെ സ്വർണ്ണവില
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">22 കാരറ്റ് (1 ഗ്രാമിന്)</p>
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
                <DateNavigation currentDate={data.date} lang="ml" />
            </div>

            <div className="my-8">
                <div className="flex items-center justify-between mb-4 px-2">
                    <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200 uppercase tracking-wide">
                        {new Date(parseInt(year), parseInt(month) - 1).toLocaleString('default', { month: 'long', year: 'numeric' })} കലണ്ടർ
                    </h2>
                    <Link href={`/calendar/2026`} className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline">
                        പൂർണ്ണരൂപം →
                    </Link>
                </div>
                <CalendarGrid days={monthData} />
            </div>

            {/* SEO Content Section (Malayalam) */}
            <div className="space-y-8 mt-12 bg-white dark:bg-gray-800/50 p-4 md:p-6 rounded-2xl border border-gray-100 dark:border-gray-700">

                <section>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                        എന്താണ് കൊല്ലവർഷം അഥവാ മലയാളം കലണ്ടർ?
                    </h2>
                    <div className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-3">
                        <p>
                            കേരളത്തിലെ പരമ്പരാഗതമായ കാലഗണനാരീതിയാണ് **കൊല്ലവർഷം**. സൂര്യന്റെ രാശിമാറ്റത്തെ അടിസ്ഥാനമാക്കിയാണ് (Solar Calendar) ഇത് കണക്കാക്കുന്നത്. ചിങ്ങം മുതൽ കർക്കടകം വരെ 12 മാസങ്ങളായാണ് മലയാളവർഷം തിരിച്ചിട്ടുള്ളത്.
                        </p>
                        <p>
                            നിത്യജീവിതത്തിൽ **നക്ഷത്രം**, **തിഥി**, **മുഹൂർത്തം** എന്നിവ നോക്കുന്നതിനും, **വിഷു**, **ഓണം** തുടങ്ങിയ ആഘോഷങ്ങൾ നിശ്ചയിക്കുന്നതിനും മലയാളം കലണ്ടർ അത്യാവശ്യമാണ്.
                        </p>
                    </div>
                </section>

                <section className="pt-6 border-t border-gray-100 dark:border-gray-700">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                        2026-ലെ പ്രധാന ആഘോഷങ്ങൾ
                    </h2>
                    <div className="grid grid-cols-1 gap-4">
                        <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg border border-orange-100 dark:border-orange-900/30">
                            <h3 className="font-bold text-orange-800 dark:text-orange-400 mb-1">വിഷു 2026</h3>
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                                മലയാളികളുടെ പുതുവർഷം. കണികാണൽ, കൈനീട്ടം എന്നിവയാണ് പ്രധാന ചടങ്ങുകൾ.
                                <Link href="/vishu-2026-date-kerala" className="ml-1 text-orange-700 hover:underline text-xs font-semibold">കൂടുതൽ അറിയാൻ →</Link>
                            </p>
                        </div>

                        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-100 dark:border-yellow-900/30">
                            <h3 className="font-bold text-yellow-800 dark:text-yellow-400 mb-1">ഓണം 2026</h3>
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                                കേരളത്തിന്റെ ദേശീയ ഉത്സവം. പൂക്കളം, സദ്യ, ഓണക്കളികൾ എന്നിവയാണ് സവിശേഷതകൾ.
                                <Link href="/onam-2026-date" className="ml-1 text-yellow-700 hover:underline text-xs font-semibold">തിരുവോണം തീയതി →</Link>
                            </p>
                        </div>
                    </div>
                </section>

                <div className="pt-6 border-t border-gray-100 dark:border-gray-700 text-center">
                    <p className="text-lg text-gray-800 dark:text-gray-200 leading-relaxed font-malayalam">
                        {isToday ? 'ഇന്ന്' : ''} <span className="font-bold text-red-700 dark:text-red-400">{formatDate(data.date)}</span>
                        {' '}
                        (<span className="font-medium text-gray-900 dark:text-gray-100">{data.malayalam_date}</span>) ആണ്.
                        {' '}
                        നക്ഷത്രം: <span className="font-bold text-indigo-700 dark:text-indigo-400">{data.nakshatram}</span>.
                        {' '}
                        രാഹുകാലം: <span className="font-medium text-gray-900 dark:text-gray-100">{data.rahukalam}</span>.
                    </p>
                </div>
            </div>

            <FAQ items={[
                {
                    question: "ഇന്നത്തെ നക്ഷത്രം ഏതാണ്?",
                    answer: `ഇന്നത്തെ നക്ഷത്രം ${data.nakshatram} ആണ്. (രാവിലെയും വൈകിട്ടും നക്ഷത്രം മാറാൻ സാധ്യതയുണ്ട്, കൃത്യമായ സമയം മുകളിൽ നോക്കുക).`
                },
                {
                    question: "എപ്പോഴാണ് രാഹുകാലം?",
                    answer: `ഇന്നത്തെ രാഹുകാലം ${data.rahukalam} വരെയാണ്. ശുഭകാര്യങ്ങൾ ഈ സമയത്ത് ഒഴിവാക്കുന്നത് ഉചിതം.`
                },
                {
                    question: "2026-ലെ വിഷു എന്ന്?",
                    answer: "2026-ലെ വിഷു ഏപ്രിൽ 14 ചൊവ്വാഴ്ചയാണ്."
                },
                {
                    question: "വിവാഹ മുഹൂർത്തം എങ്ങനെ നോക്കാം?",
                    answer: "വരന്റെയും വധുവിന്റെയും നക്ഷത്രപ്പൊരുത്തം നോക്കിയാണ് മുഹൂർത്തം നിശ്ചയിക്കുന്നത്. ഞങ്ങളുടെ കലണ്ടറിൽ ഓരോ ദിവസത്തെയും ശുഭസമയങ്ങൾ നൽകിയിട്ടുണ്ട്."
                }
            ]} />

            <AdSlot slotId="mid-content" />
        </div>
    );
}
