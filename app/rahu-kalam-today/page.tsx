import { Metadata } from 'next';
import Link from 'next/link';
import { getDailyData, formatDate } from '@/lib/dateUtils';
import AdSlot from '@/components/AdSlot';
import FAQ from '@/components/FAQ';

export const revalidate = 3600; // Hourly revalidation

export const metadata: Metadata = {
    title: 'Rahu Kalam Today – Daily Timings (Monday to Sunday) | 2026 Chart',
    description: 'Check accurate Rahu Kalam timings for today. Find daily schedules including Friday Rahukalam, Tuesday Rahukalam, and Sunday Rahukalam times for 2026.',
    keywords: [
        'Rahu Kalam Today', 'Rahu Kalam Timings', 'Friday Rahukalam', 'Tuesday Rahukalam',
        'Sunday Rahukalam', 'Monday Rahukalam', 'Daily Rahu Kalam', 'Rahukalam Chart 2026'
    ],
    openGraph: {
        title: 'Rahu Kalam Today – Daily Timings (Monday to Sunday)',
        description: 'Avoid inauspicious times. Check exact Rahu Kalam timings for Friday, Tuesday, Sunday, and all days.',
        type: 'article',
    },
};

export default async function RahuKalamPage() {
    // 1. Get Today's Data
    const now = new Date();
    const options = { timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit' } as const;
    const formatter = new Intl.DateTimeFormat('en-CA', options);
    const todayStr = formatter.format(now); // YYYY-MM-DD

    const data = await getDailyData(todayStr);

    // Fallback if data is missing (unlikely unless file missing)
    const rahuKalam = data?.rahukalam || "Unavailable";
    const displayDate = data ? formatDate(data.date) : "Today";
    const weekday = data?.weekday || "";

    // Static Weekly Chart Data
    const weeklySchedule = [
        { day: "Sunday", time: "04:30 PM - 06:00 PM" },
        { day: "Monday", time: "07:30 AM - 09:00 AM" },
        { day: "Tuesday", time: "03:00 PM - 04:30 PM" },
        { day: "Wednesday", time: "12:00 PM - 01:30 PM" },
        { day: "Thursday", time: "01:30 PM - 03:00 PM" },
        { day: "Friday", time: "10:30 AM - 12:00 PM" },
        { day: "Saturday", time: "09:00 AM - 10:30 AM" },
    ];

    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl">
            {/* Breadcrumb / Navigation helper */}
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                <Link href="/" className="hover:underline">Home</Link> &gt; <span>Rahu Kalam Today</span>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Rahu Kalam Today – Timings, Meaning & Day-Wise Schedule
            </h1>

            <AdSlot slotId="rahukalam-top" />

            {/* ABOVE THE FOLD: Hero Section */}
            <section className="bg-red-50 dark:bg-gray-800 border border-red-100 dark:border-gray-700 rounded-xl p-6 mb-8 text-center shadow-sm">
                <p className="text-gray-600 dark:text-gray-300 font-medium mb-1">{displayDate} | {weekday}</p>

                <div className="my-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-widest font-semibold">TODAY'S RAHU KALAM</p>
                    <p className="text-3xl md:text-4xl font-bold text-red-700 dark:text-red-400 mt-2">{rahuKalam}</p>
                </div>

                <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                    <p>Location: India</p>
                    <p>Last Updated: Today</p>
                </div>
            </section>

            {/* Explanation Section */}
            <section className="prose prose-gray dark:prose-invert max-w-none mb-8">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">What is Rahu Kalam?</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    Rahu Kalam (or Rahu Kaalam) is a period of about 90 minutes every day that is considered inauspicious in Vedic astrology.
                    It is strictly avoided for starting new ventures, buying property, or auspicious ceremonies like marriages.
                    The timing changes every day based on the weekday and sunrise/sunset times.
                </p>
            </section>

            {/* Daily SEO Section */}
            <section className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-8 border border-gray-100 dark:border-gray-700 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Daily Rahu Kalam Timings 2026</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-300">
                    <p className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg"><span className="font-semibold text-red-700 dark:text-red-400">Monday Rahukalam:</span> 07:30 AM - 09:00 AM</p>
                    <p className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg"><span className="font-semibold text-red-700 dark:text-red-400">Tuesday Rahukalam:</span> 03:00 PM - 04:30 PM</p>
                    <p className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg"><span className="font-semibold text-red-700 dark:text-red-400">Wednesday Rahukalam:</span> 12:00 PM - 01:30 PM</p>
                    <p className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg"><span className="font-semibold text-red-700 dark:text-red-400">Thursday Rahukalam:</span> 01:30 PM - 03:00 PM</p>
                    <p className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg"><span className="font-semibold text-red-700 dark:text-red-400">Friday Rahukalam:</span> 10:30 AM - 12:00 PM</p>
                    <p className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg"><span className="font-semibold text-red-700 dark:text-red-400">Saturday Rahukalam:</span> 09:00 AM - 10:30 AM</p>
                    <p className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg"><span className="font-semibold text-red-700 dark:text-red-400">Sunday Rahukalam:</span> 04:30 PM - 06:00 PM</p>
                </div>
            </section>

            {/* Weekly Table Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Rahu Kalam Weekly Schedule</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
                        <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                            <tr>
                                <th className="px-6 py-3 font-semibold text-sm uppercase">Weekday</th>
                                <th className="px-6 py-3 font-semibold text-sm uppercase">Standard Time</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {weeklySchedule.map((row) => (
                                <tr key={row.day} className={row.day === weekday ? "bg-red-50 dark:bg-gray-700" : "hover:bg-gray-50 dark:hover:bg-gray-700"}>
                                    <td className={`px-6 py-4 text-sm font-medium ${row.day === weekday ? "text-red-700 dark:text-red-400" : "text-gray-900 dark:text-white"}`}>
                                        {row.day} {row.day === weekday && <span className="ml-2 text-xs bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-2 py-0.5 rounded-full">Today</span>}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300 font-mono">
                                        {row.time}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-3 italic">
                    Timings are indicative and calculated based on a standard 6:00 AM sunrise. Actual times may vary slightly by location.
                </p>
            </section>

            <FAQ items={[
                {
                    question: "What is Rahu Kalam? (രാഹുകാലം എന്നാൽ എന്താണ്?)",
                    answer: "Rahu Kalam is an inauspicious period of about 90 minutes every day in Vedic astrology. It is believed to be under the influence of the shadow planet Rahu. \n\nരാഹുകാലം എന്നത് ദിവസവും ഏകദേശം 90 മിനിറ്റ് നീണ്ടുനിൽക്കുന്ന ഒരു അശുഭ സമയമാണ്. ഈ സമയത്ത് ശുഭകാര്യങ്ങൾ തുടങ്ങുന്നത് ഒഴിവാക്കണം. \n\nराहु काल (Rahu Kalam) एक अशुभ समय है जो हर दिन लगभग 90 मिनट होता है। इस वेला कोई भी शुभ काम नहीं करना चाहिए।"
                },
                {
                    question: "Is Rahu Kalam good or bad? (രാഹുകാലം നല്ലതാണോ ചീത്തയാണോ?)",
                    answer: "Rahu Kalam is considered bad or inauspicious for starting new ventures, marriages, or buying property. However, it is okay for continuing existing work or daily routine activities. \n\nരാഹുകാലം പുതിയ കാര്യങ്ങൾ തുടങ്ങാൻ നല്ലതല്ല. എന്നാൽ നിത്യേനയുള്ള ജോലികൾ ചെയ്യുന്നതിന് തടസ്സമില്ല. \n\nराहु काल नए काम शुरू करने के लिए अच्छा नहीं माना जाता है।"
                },
                {
                    question: "Can we travel during Rahu Kalam? (രാഹുകാലത്തിൽ യാത്ര ചെയ്യാമോ?)",
                    answer: "It is strictly advised to avoid starting a journey during Rahu Kalam. If you must travel, start before Rahu Kalam begins. \n\nരാഹുകാലത്തിൽ യാത്ര തുടങ്ങുന്നത് ഒഴിവാക്കണം. രാഹുകാലത്തിന് മുൻപ് യാത്ര ആരംഭിക്കുന്നതാണ് ഉചിതം. \n\nराहु काल में यात्रा शुरू करना मना है। आपको इस समय से पहले यात्रा शुरू करनी चाहिए।"
                },
                {
                    question: "How is Rahu Kalam calculated? (എങ്ങനെയാണ് രാഹുകാലം കണക്കാക്കുന്നത്?)",
                    answer: "Rahu Kalam is calculated based on sunrise and sunset times. The day (sunrise to sunset) is divided into 8 equal parts, and one specific part is assigned to Rahu depending on the weekday. \n\nസൂര്യോദയവും സൂര്യാസ്തമയവും അടിസ്ഥാനമാക്കിയാണ് രാഹുകാലം കണക്കാക്കുന്നത്. പകലിനെ 8 തുല്യ ഭാഗങ്ങളായി തിരിക്കുന്നു. \n\nसूर्यास्त और सूर्योदय के आधार पर राहु काल की गणना की जाती है।"
                },
                {
                    question: "When is Rahu Kalam on Sunday? (ഞായറാഴ്ച രാഹുകാലം എപ്പോഴാണ്?)",
                    answer: "On Sundays, Rahu Kalam is usually from 4:30 PM to 6:00 PM. \n\nഞായറാഴ്ച രാഹുകാലം സാധാരണയായി വൈകിട്ട് 4:30 മുതൽ 6:00 വരെയാണ്. \n\nरविवार (Sunday) को राहु काल शाम 4:30 से 6:00 तक होता है।"
                },
                {
                    question: "When is Rahu Kalam on Friday? (വെള്ളിയാഴ്ച രാഹുകാലം എപ്പോഴാണ്?)",
                    answer: "On Fridays, Rahu Kalam is usually from 10:30 AM to 12:00 PM. \n\nവെള്ളിയാഴ്ചകളിൽ രാഹുകാലം രാവിലെ 10:30 മുതൽ 12:00 വരെയാണ്. \n\nशुक्रवार (Friday) को राहु काल सुबह 10:30 से 12:00 तक होता है।"
                },
                {
                    question: "Can we do Puja during Rahu Kalam? (രാഹുകാലത്തിൽ പൂജ ചെയ്യാമോ?)",
                    answer: "Rahu Kalam is generally reserved for Durga Puja or worship of Goddess Kali to mitigate the negative effects of Rahu. Other auspicious Pujas are avoided. \n\nരാഹുദോഷം അകറ്റാൻ ദുർഗ്ഗാ പൂജയോ കാളി പൂജയോ രാഹുകാലത്തിൽ ചെയ്യാറുണ്ട്. മറ്റ് ശുഭകരമായ പൂജകൾ ഒഴിവാക്കാറാണ് പതിവ്. \n\nराहु काल में दुर्गा पूजा या काली पूजा कर सकते हैं, लेकिन अन्य शुभ पूजा नहीं।"
                },
                {
                    question: "Does Rahu Kalam change every day? (രാഹുകാലം ദിവസവും മാറുമോ?)",
                    answer: "Yes, the exact time varies slightly depending on the exact time of sunrise and sunset in your location, but the 90-minute slot remains roughly fixed for each weekday. \n\nഅതെ, സൂര്യോദയ സമയം മാറുന്നതനുസരിച്ച് രാഹുകാലത്തിലും ചെറിയ മാറ്റങ്ങൾ വരാം. \n\nहाँ, सूर्योदय के समय के अनुसार इसमें थोड़ा बदलाव आता है।"
                },
                {
                    question: "Is Rahu Kalam applicable at night? (രാത്രിയിൽ രാഹുകാലം ഉണ്ടോ?)",
                    answer: "No, Rahu Kalam is calculated only for the daytime (sunrise to sunset). There is a similar inauspicious time at night but it is rarely followed daily. \n\nഅല്ല, രാഹുകാലം പകൽ സമയത്ത് മാത്രമേ കണക്കാക്കൂ. \n\nनहीं, राहु काल सिर्फ दिन के समय लागू होता है।"
                },
                {
                    question: "What to do if work started before Rahu Kalam? (രാഹുകാലത്തിന് മുൻപ് തുടങ്ങിയ ജോലി തുടരാമോ?)",
                    answer: "Yes, acts started before Rahu Kalam can be continued during the period. The restriction applies only to STARTING new activities. \n\nഅതെ, രാഹുകാലത്തിന് മുൻപ് തുടങ്ങിയ കാര്യങ്ങൾ തുടരുന്നതിന് തടസ്സമില്ല. പുതിയ കാര്യങ്ങൾ തുടങ്ങുന്നത് മാത്രമാണ് ഒഴിവാക്കേണ്ടത്. \n\nहाँ, राहु काल से पहले शुरू किया गया काम जारी रख सकते हैं।"
                }
            ]} />

            <AdSlot slotId="rahukalam-bottom" />

            {/* Internal Linking / Related Section */}
            <section className="mt-8 border-t border-gray-100 dark:border-gray-800 pt-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Related Daily Timings</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <li>
                        <Link href="/today" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 hover:underline">
                            Today Malayalam Calendar
                        </Link>
                    </li>
                    <li>
                        <Link href="/innathe-nakshatram" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 hover:underline">
                            Innathe Nakshatram (Today's Star)
                        </Link>
                    </li>
                    <li>
                        {/* Placeholder for future pages if needed */}
                        <span className="text-gray-400 dark:text-gray-500">Yamagandam Today (Coming Soon)</span>
                    </li>
                    <li>
                        <Link href="/festivals" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 hover:underline">
                            Upcoming Festivals
                        </Link>
                    </li>
                </ul>
            </section>
        </div >
    );
}
