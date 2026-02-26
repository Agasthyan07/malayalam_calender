import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import FAQ from '@/components/FAQ';
import AdSlot from '@/components/AdSlot';

export const revalidate = 86400; // Rebuild once per day so Event schema dates stay current

export const metadata: Metadata = {
    title: 'Namaz Times Kerala 2026 – Daily Prayer Times (Salah Timings)',
    description: 'Accurate Namaz (Salah) prayer times for Kerala 2026. Check Fajr, Dhuhr, Asr, Maghrib & Isha timings for Kozhikode, Malappuram, Thrissur, Kochi, Thiruvananthapuram.',
    keywords: [
        'Namaz Times Kerala', 'Prayer Times Kerala 2026', 'Salah Timings Kerala',
        'Fajr Time Kerala', 'Maghrib Time Kerala', 'Isha Time Kerala',
        'Namaz Time Kozhikode', 'Namaz Time Malappuram', 'Prayer Time Calicut',
        'Muslim Prayer Times Kerala', 'Islamic Prayer Times India',
        'Kerala Namaz timings', 'Today Namaz Time Kerala',
        'نماز وقت كيرالا'
    ],
    alternates: {
        canonical: 'https://malayalamcalendar.site/namaz-times-kerala',
    },
    openGraph: {
        title: 'Namaz Times Kerala – Daily Prayer Times 2026',
        description: 'Check accurate Fajr, Dhuhr, Asr, Maghrib & Isha prayer timings for all districts of Kerala.',
        type: 'website',
        url: 'https://malayalamcalendar.site/namaz-times-kerala',
    },
};

// Complete monthly prayer timetable for Kerala (approx. lat 10.5°N lon 76.2°E, IST)
const MONTHLY_TIMES = [
    { month: 'January', fajr: '05:44', sunrise: '07:02', dhuhr: '12:45', asr: '16:12', sunset: '18:25', maghrib: '18:28', isha: '19:42' },
    { month: 'February', fajr: '05:31', sunrise: '06:49', dhuhr: '12:39', asr: '16:08', sunset: '18:25', maghrib: '18:28', isha: '19:40' },
    { month: 'March', fajr: '05:12', sunrise: '06:29', dhuhr: '12:28', asr: '16:00', sunset: '18:24', maghrib: '18:27', isha: '19:39' },
    { month: 'April', fajr: '04:52', sunrise: '06:08', dhuhr: '12:16', asr: '15:51', sunset: '18:21', maghrib: '18:24', isha: '19:36' },
    { month: 'May', fajr: '04:38', sunrise: '05:54', dhuhr: '12:09', asr: '15:46', sunset: '18:21', maghrib: '18:24', isha: '19:36' },
    { month: 'June', fajr: '04:33', sunrise: '05:49', dhuhr: '12:11', asr: '15:48', sunset: '18:30', maghrib: '18:33', isha: '19:45' },
    { month: 'July', fajr: '04:37', sunrise: '05:53', dhuhr: '12:20', asr: '15:54', sunset: '18:41', maghrib: '18:44', isha: '19:56' },
    { month: 'August', fajr: '04:44', sunrise: '06:02', dhuhr: '12:27', asr: '15:58', sunset: '18:49', maghrib: '18:52', isha: '20:04' },
    { month: 'September', fajr: '04:51', sunrise: '06:10', dhuhr: '12:28', asr: '15:59', sunset: '18:45', maghrib: '18:48', isha: '20:01' },
    { month: 'October', fajr: '04:57', sunrise: '06:16', dhuhr: '12:25', asr: '15:57', sunset: '18:38', maghrib: '18:41', isha: '19:54' },
    { month: 'November', fajr: '05:09', sunrise: '06:28', dhuhr: '12:23', asr: '15:54', sunset: '18:33', maghrib: '18:36', isha: '19:49' },
    { month: 'December', fajr: '05:29', sunrise: '06:48', dhuhr: '12:30', asr: '15:58', sunset: '18:29', maghrib: '18:32', isha: '19:46' },
];

const PRAYERS_META: { key: string; label: string; arabic: string; note: string; dim?: boolean }[] = [
    { key: 'fajr', label: 'Fajr', arabic: 'الفجر', note: 'Before sunrise — dawn prayer' },
    { key: 'sunrise', label: 'Sunrise', arabic: 'الشروق', note: 'End of Fajr time', dim: true },
    { key: 'dhuhr', label: 'Dhuhr', arabic: 'الظهر', note: 'Midday — after sun peaks' },
    { key: 'asr', label: 'Asr', arabic: 'العصر', note: 'Afternoon prayer' },
    { key: 'maghrib', label: 'Maghrib', arabic: 'المغرب', note: 'Just after sunset' },
    { key: 'isha', label: 'Isha', arabic: 'العشاء', note: 'Night prayer' },
];

function to12h(t: string) {
    const [h, m] = t.split(':').map(Number);
    return `${h % 12 || 12}:${m.toString().padStart(2, '0')} ${h >= 12 ? 'PM' : 'AM'}`;
}

// ── JSON-LD builders ──────────────────────────────────────────────────────────

const KERALA_LOCATION = {
    '@type': 'Place',
    name: 'Mosques in Kerala',
    address: {
        '@type': 'PostalAddress',
        addressRegion: 'Kerala',
        addressCountry: 'India'
    },
    geo: { '@type': 'GeoCoordinates', latitude: 10.5, longitude: 76.2 },
};

const PRAYER_DETAILS: { key: keyof typeof MONTHLY_TIMES[number]; name: string; description: string }[] = [
    { key: 'fajr', name: 'Fajr (Subh) Prayer', description: 'Pre-dawn Islamic prayer (الفجر) performed before sunrise. One of the five obligatory daily prayers.' },
    { key: 'dhuhr', name: 'Dhuhr (Zuhr) Prayer', description: 'Midday Islamic prayer (الظهر) performed after the sun has passed its zenith.' },
    { key: 'asr', name: 'Asr Prayer', description: 'Afternoon Islamic prayer (العصر) performed in the late afternoon.' },
    { key: 'maghrib', name: 'Maghrib Prayer', description: 'Sunset Islamic prayer (المغرب) performed just after sunset.' },
    { key: 'isha', name: 'Isha Prayer', description: 'Night Islamic prayer (العشاء) performed after the twilight disappears.' },
];

function buildEventSchemas(todayISO: string, times: typeof MONTHLY_TIMES[number]) {
    return PRAYER_DETAILS.map(({ key, name, description }) => {
        const [startH, startM] = times[key].split(':').map(Number);
        // Each prayer lasts approx 15 minutes
        const endH = startM + 15 >= 60 ? startH + 1 : startH;
        const endM = (startM + 15) % 60;
        const pad = (n: number) => n.toString().padStart(2, '0');
        return {
            '@type': 'Event',
            '@id': `https://malayalamcalendar.site/namaz-times-kerala#${key}-${todayISO}`,
            name: `${name} – Kerala ${todayISO}`,
            description,
            startDate: `${todayISO}T${times[key]}:00+05:30`,
            endDate: `${todayISO}T${pad(endH)}:${pad(endM)}:00+05:30`,
            eventStatus: 'https://schema.org/EventScheduled',
            eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
            isAccessibleForFree: true,
            image: [
                'https://malayalamcalendar.site/icon-192x192.png',
                'https://malayalamcalendar.site/icon-512x512.png'
            ],
            location: KERALA_LOCATION,
            offers: {
                '@type': 'Offer',
                price: 0,
                priceCurrency: 'INR',
                availability: 'https://schema.org/InStock',
                url: 'https://malayalamcalendar.site/namaz-times-kerala'
            },
            organizer: {
                '@type': 'Organization',
                name: 'Malayalam Calendar',
                url: 'https://malayalamcalendar.site',
            },
            url: 'https://malayalamcalendar.site/namaz-times-kerala',
            inLanguage: 'en-IN',
            audience: { '@type': 'Audience', audienceType: 'Muslim community in Kerala' },
        };
    });
}

const datasetSchema = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: 'Kerala Namaz (Prayer) Times 2026',
    description: 'Monthly Islamic prayer times (Salah timings) for Kerala, India covering Fajr, Dhuhr, Asr, Maghrib, and Isha.',
    url: 'https://malayalamcalendar.site/namaz-times-kerala',
    temporalCoverage: '2026',
    spatialCoverage: KERALA_LOCATION,
};

const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        { '@type': 'Question', name: 'What time is Fajr prayer in Kerala today?', acceptedAnswer: { '@type': 'Answer', text: 'Fajr time in Kerala ranges from approximately 4:33 AM (June) to 5:44 AM (January). Check the monthly timetable on this page and adjust for your district.' } },
        { '@type': 'Question', name: 'What time is Maghrib in Kerala today?', acceptedAnswer: { '@type': 'Answer', text: 'Maghrib in Kerala ranges from approximately 6:24 PM (April/May) to 8:04 PM (August). It is observed immediately after sunset.' } },
        { '@type': 'Question', name: 'How do Kerala namaz times differ by district?', acceptedAnswer: { '@type': 'Answer', text: 'Kerala spans 4° of longitude. Kasaragod is ~4 minutes ahead of Thrissur (base), while Thiruvananthapuram is ~5 minutes behind. Kozhikode/Calicut add +2 minutes and Malappuram +1 minute.' } },
        { '@type': 'Question', name: 'What is Jumu\'ah (Friday prayer) time in Kerala?', acceptedAnswer: { '@type': 'Answer', text: 'Jumu\'ah (Friday Prayer) is held around Dhuhr time, typically between 1:00 PM and 2:00 PM in Kerala. Confirm with your local mosque.' } },
        { '@type': 'Question', name: 'Which calculation method is used for Kerala prayer times?', acceptedAnswer: { '@type': 'Answer', text: 'Kerala Muslim communities generally follow the Umm al-Qura (Makkah) calculation standard. Fajr begins when the sun is 18° below the horizon and Isha at 17° below the horizon.' } },
    ],
};

// ── Page component ────────────────────────────────────────────────────────────

export default async function NamazTimesPage() {
    // Compute today's date in IST at render/revalidation time
    const now = new Date();
    const istFormatter = new Intl.DateTimeFormat('en-CA', {
        timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit',
    });
    const todayISO = istFormatter.format(now);           // e.g. "2026-02-26"
    const monthIdx = new Date(todayISO).getMonth();       // 0-based
    const todayTimes = MONTHLY_TIMES[monthIdx];

    const eventSchemas = buildEventSchemas(todayISO, todayTimes);

    const graphSchema = {
        '@context': 'https://schema.org',
        '@graph': [
            datasetSchema,
            faqSchema,
            ...eventSchemas,
        ],
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graphSchema) }} />

            <Breadcrumbs items={[{ label: 'Namaz Times Kerala', href: '/namaz-times-kerala' }]} />

            {/* Hero */}
            <div className="text-center mb-10">
                <div className="inline-flex items-center gap-3 mb-4">
                    <span className="text-4xl">🕌</span>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
                        Namaz Times Kerala 2026
                    </h1>
                </div>
                <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-2">
                    Accurate <strong>Islamic prayer timings</strong> (Salah / Namaz) for all districts of Kerala including
                    Kozhikode, Malappuram, Thrissur, Kochi, and Thiruvananthapuram.
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400" dir="rtl">
                    مواقيت الصلاة في كيرالا – الهند
                </p>
            </div>

            <AdSlot slotId="prayer-top" />

            {/* Prayer Name Reference */}
            <section className="mb-8 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4">
                    <h2 className="text-lg font-bold text-white">The 5 Daily Prayers – الصلوات الخمس</h2>
                    <p className="text-emerald-100 text-sm">Each prayer and its significance</p>
                </div>
                <div className="divide-y divide-gray-100 dark:divide-gray-700">
                    {PRAYERS_META.map(({ key, label, arabic, note, dim }) => (
                        <div key={key} className={`flex items-center justify-between px-6 py-3 ${dim ? 'opacity-60' : ''}`}>
                            <div>
                                <span className="font-bold text-gray-800 dark:text-gray-200 text-sm">{label}</span>
                                <span className="text-xs text-gray-400 dark:text-gray-500 ml-2">– {note}</span>
                            </div>
                            <span className="text-lg font-semibold text-emerald-700 dark:text-emerald-400" dir="rtl" style={{ fontFamily: 'serif' }}>
                                {arabic}
                            </span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Monthly Timetable */}
            <section className="mb-10">
                <div className="flex items-center gap-3 mb-4">
                    <span className="w-1 h-8 bg-emerald-600 rounded-full"></span>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                        Monthly Prayer Timetable 2026
                    </h2>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-5 ml-4">
                    Times are approximate for central Kerala (IST). Adjust ±5 mins for northern / southern districts.
                </p>

                <div className="overflow-x-auto rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
                    <table className="w-full text-sm bg-white dark:bg-gray-800">
                        <thead className="bg-emerald-700 text-white">
                            <tr>
                                <th className="px-3 py-3 text-left font-semibold">Month</th>
                                <th className="px-3 py-3 text-center font-semibold">
                                    Fajr<br /><span className="text-emerald-200 text-xs" dir="rtl">الفجر</span>
                                </th>
                                <th className="px-3 py-3 text-center font-semibold hidden sm:table-cell">
                                    Sunrise<br /><span className="text-emerald-200 text-xs" dir="rtl">الشروق</span>
                                </th>
                                <th className="px-3 py-3 text-center font-semibold">
                                    Dhuhr<br /><span className="text-emerald-200 text-xs" dir="rtl">الظهر</span>
                                </th>
                                <th className="px-3 py-3 text-center font-semibold">
                                    Asr<br /><span className="text-emerald-200 text-xs" dir="rtl">العصر</span>
                                </th>
                                <th className="px-3 py-3 text-center font-semibold">
                                    Maghrib<br /><span className="text-emerald-200 text-xs" dir="rtl">المغرب</span>
                                </th>
                                <th className="px-3 py-3 text-center font-semibold">
                                    Isha<br /><span className="text-emerald-200 text-xs" dir="rtl">العشاء</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {MONTHLY_TIMES.map((row, i) => (
                                <tr key={row.month} className={i % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-800/60'}>
                                    <td className="px-3 py-2.5 font-semibold text-gray-800 dark:text-gray-200">{row.month}</td>
                                    <td className="px-3 py-2.5 text-center font-mono text-indigo-700 dark:text-indigo-400">{to12h(row.fajr)}</td>
                                    <td className="px-3 py-2.5 text-center font-mono text-gray-400 dark:text-gray-500 hidden sm:table-cell">{to12h(row.sunrise)}</td>
                                    <td className="px-3 py-2.5 text-center font-mono text-amber-700 dark:text-amber-400">{to12h(row.dhuhr)}</td>
                                    <td className="px-3 py-2.5 text-center font-mono text-orange-700 dark:text-orange-400">{to12h(row.asr)}</td>
                                    <td className="px-3 py-2.5 text-center font-mono text-rose-700 dark:text-rose-400">{to12h(row.maghrib)}</td>
                                    <td className="px-3 py-2.5 text-center font-mono text-violet-700 dark:text-violet-400">{to12h(row.isha)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            <AdSlot slotId="prayer-mid" />

            {/* District Adjustments */}
            <section className="mb-10 bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    District-wise Time Adjustments
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-5">
                    Kerala spans approximately 4° of longitude, causing a difference of up to 12 minutes across districts.
                    Add or subtract the values below from the central Kerala timings:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
                    {[
                        { name: 'Kozhikode / Calicut', adj: '+2 min' },
                        { name: 'Malappuram', adj: '+1 min' },
                        { name: 'Thrissur', adj: '0 min (Base)' },
                        { name: 'Ernakulam / Kochi', adj: '−1 min' },
                        { name: 'Kollam', adj: '−3 min' },
                        { name: 'Thiruvananthapuram', adj: '−5 min' },
                        { name: 'Kasaragod', adj: '+4 min' },
                        { name: 'Palakkad', adj: '+3 min' },
                        { name: 'Kannur', adj: '+3 min' },
                    ].map(d => (
                        <div key={d.name} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700/40 rounded-lg px-3 py-2">
                            <span className="text-gray-700 dark:text-gray-300">{d.name}</span>
                            <span className="font-bold text-emerald-600 dark:text-emerald-400">{d.adj}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* About Namaz */}
            <section className="mb-10 prose prose-lg dark:prose-invert max-w-none bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 shadow-sm">
                <h2>About the Five Daily Prayers (Salah)</h2>
                <p>
                    The <strong>five daily prayers</strong> (Arabic: الصلوات الخمس, <em>as-ṣalawāt al-khamsa</em>) are the
                    second pillar of Islam and are obligatory for every Muslim. The timings are determined by the position of
                    the sun and vary each day throughout the year.
                </p>
                <ul>
                    <li><strong>Fajr (الفجر)</strong> – The pre-dawn prayer, performed before sunrise. This is one of the most blessed times in Islamic tradition.</li>
                    <li><strong>Dhuhr (الظهر)</strong> – The midday prayer, performed after the sun has passed its zenith and begun to decline.</li>
                    <li><strong>Asr (العصر)</strong> – The afternoon prayer. Its time begins when the shadow of an object equals its length (Hanafi) or twice its length, until sunset.</li>
                    <li><strong>Maghrib (المغرب)</strong> – The sunset prayer, performed immediately after the sun sets. This is the shortest window of all five prayers.</li>
                    <li><strong>Isha (العشاء)</strong> – The night prayer, performed after the red twilight disappears and continues until midnight.</li>
                </ul>
                <h3>How are prayer times calculated?</h3>
                <p>
                    Prayer times are calculated using astronomical parameters including the observer&apos;s latitude, longitude, and altitude.
                    The standard calculation method used by Muslim communities in Kerala follows the <strong>Umm al-Qura University (Makkah) standard</strong>.
                    Fajr begins when the sun is 18° below the horizon (astronomical dawn) and Isha begins when the sun is 17° below the horizon.
                </p>
            </section>

            <FAQ items={[
                {
                    question: 'What time is Fajr prayer in Kerala today?',
                    answer: 'Fajr time in Kerala varies by month — ranging from approximately 4:33 AM (June) to 5:44 AM (January). Check the monthly timetable above for exact times. Add location adjustments based on your district.'
                },
                {
                    question: 'What time is Maghrib in Kerala today?',
                    answer: 'Maghrib in Kerala ranges from approximately 6:24 PM (April/May) to 8:04 PM (August). It is observed immediately after sunset.'
                },
                {
                    question: 'How do Kerala prayer times differ by district?',
                    answer: 'Kerala is spread over about 4° of longitude. Kasaragod in the north is about 4 minutes ahead of Thrissur, while Thiruvananthapuram in the south is about 5 minutes behind. Adjust the table times accordingly.'
                },
                {
                    question: 'Are these timings accurate for Malappuram and Kozhikode?',
                    answer: 'The timetable is based on central Kerala coordinates. For Malappuram add +1 min and for Kozhikode/Calicut add +2 min to all times listed in the table.'
                },
                {
                    question: 'What is the Jumu\'ah (Friday prayer) time in Kerala?',
                    answer: 'Jumu\'ah (Friday Prayer) is typically held around Dhuhr time — between 1:00 PM and 2:00 PM in Kerala. Your local mosque will confirm the exact time.'
                },
            ]} />

            {/* Related links */}
            <section className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Related Pages</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    {[
                        { href: '/', label: 'Today\'s Malayalam Calendar & Panchangam' },
                        { href: '/rahu-kalam-today', label: 'Rahu Kalam Today – Timings' },
                        { href: '/innathe-nakshatram', label: 'Innathe Nakshatram (Today\'s Star)' },
                        { href: '/festivals', label: 'Kerala Festivals 2026' },
                        { href: '/malayalam-calendar/2026', label: 'Malayalam Calendar 2026' },
                    ].map(l => (
                        <li key={l.href}>
                            <Link href={l.href} className="text-indigo-600 dark:text-indigo-400 hover:underline">
                                {l.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
}
