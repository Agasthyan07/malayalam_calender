import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import AdSlot from '@/components/AdSlot';
import FAQ from '@/components/FAQ';

export const metadata: Metadata = {
    title: 'Onam 2026 Date – Thiruvonam Date in Kerala & 10 Days Celebration',
    description: 'When is Onam 2026? Check Thiruvonam date, 10 days of Onam list, Sadhya details and significance. ഓണം 2026 തിരുവോണം തീയതി.',
    keywords: [
        'Onam 2026 Date',
        'Thiruvonam 2026',
        'When is Onam 2026',
        '10 Days of Onam 2026',
        'Kerala Harvest Festival',
        'ഓണം 2026',
        'തിരുവോണം തീയതി'
    ],
    alternates: {
        canonical: 'https://malayalamcalendar.site/onam-2026-date',
    },
    openGraph: {
        title: 'Onam 2026 Date – Thiruvonam Festival Kerala',
        description: 'Celebrate the harvest festival of Kerala. Check Onam 2026 dates.',
        url: 'https://malayalamcalendar.site/onam-2026-date',
        type: 'article',
        publishedTime: '2026-08-26T00:00:00+05:30',
    }
};

export default function OnamPage() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Event',
        name: 'Onam 2026 (Thiruvonam)',
        startDate: '2026-08-26',
        endDate: '2026-08-26',
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        eventStatus: 'https://schema.org/EventScheduled',
        location: {
            '@type': 'Place',
            name: 'Kerala, India',
            address: {
                '@type': 'PostalAddress',
                addressRegion: 'Kerala',
                addressCountry: 'IN'
            }
        },
        description: 'Onam is the harvest festival of Kerala celebrating the return of King Mahabali.',
        organizer: {
            '@type': 'Organization',
            name: 'Malayalam Calendar',
            url: 'https://malayalamcalendar.site'
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl">
            <JsonLd data={jsonLd} />

            <nav className="text-sm mb-6 text-gray-500">
                <Link href="/" className="hover:text-indigo-600">Home</Link> &gt;
                <Link href="/festivals" className="hover:text-indigo-600 mx-1">Festivals</Link> &gt;
                <span className="text-gray-900 font-medium mx-1">Onam 2026</span>
            </nav>

            <article>
                <header className="mb-8 text-center">
                    <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight leading-tight">
                        Onam 2026 Date Kerala
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300">
                        Thiruvonam & The Grand Harvest Festival
                    </p>
                    <div className="mt-6 inline-block bg-orange-50 dark:bg-orange-900/30 border border-orange-100 dark:border-orange-800 rounded-xl p-4">
                        <p className="text-sm uppercase tracking-wide text-orange-800 dark:text-orange-500 font-bold mb-1">
                            Thiruvonam 2026
                        </p>
                        <p className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white">
                            August 26, 2026 <span className="text-lg font-medium text-gray-500">(Wednesday)</span>
                        </p>
                    </div>
                </header>

                <AdSlot slotId="top-banner" />

                <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
                    <p>
                        **Onam** (ഓണം) is the biggest festival of Kerala, celebrated with immense joy and enthusiasm. It marks the season of plenty and is dedicated to the memory of the legendary King Mahabali. The celebrations typically last for 10 days, starting from **Atham** and culminating in **Thiruvonam**.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">10 Days of Onam 2026</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Day</th>
                                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nakshatram</th>
                                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700 text-sm">
                                <tr>
                                    <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">Day 1</td>
                                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">Atham</td>
                                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">August 17, 2026</td>
                                </tr>
                                <tr>
                                    <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">Day 2</td>
                                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">Chithira</td>
                                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">August 18, 2026</td>
                                </tr>
                                <tr>
                                    <td className="py-3 px-4 font-medium text-gray-900 dark:text-white text-center" colSpan={3}>... celebration continues ...</td>
                                </tr>
                                <tr className="bg-orange-50 dark:bg-orange-900/10">
                                    <td className="py-3 px-4 font-bold text-indigo-900 dark:text-indigo-300">Day 10</td>
                                    <td className="py-3 px-4 font-bold text-indigo-900 dark:text-indigo-300">Thiruvonam</td>
                                    <td className="py-3 px-4 font-bold text-indigo-900 dark:text-indigo-300">August 26, 2026</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">key Traditions</h2>
                    <ul className="list-disc pl-5 space-y-2">
                        <li><strong>Pookkalam:</strong> intricate floral carpets laid in front of houses to welcome King Mahabali.</li>
                        <li><strong>Onasadya:</strong> The grand vegetarian feast served on banana leaves, featuring over 20 dishes like Sambar, Avial, and Payasam.</li>
                        <li><strong>Vallam Kali:</strong> The famous snake boat races held in the Pamba river and other backwaters.</li>
                        <li><strong>Pulikali:</strong> The 'Tiger Dance' performed by painted artists.</li>
                    </ul>

                    <hr className="my-10 border-gray-200 dark:border-gray-700" />

                    {/* MALAYALAM SECTION */}
                    <section lang="ml">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">ഓണം 2026 - തിരുവോണം തീയതിയും ആഘോഷങ്ങളും</h2>
                        <p>
                            കേരളത്തിന്റെ ദേശീയ ഉത്സവമാണ് **ഓണം**. മലയാളികൾ ജാതിമതഭേദമന്യേ ആഘോഷിക്കുന്ന ഈ ഉത്സവം കാർഷിക സമൃദ്ധിയുടെയും ഐശ്വര്യത്തിന്റെയും പ്രതീകമാണ്. മഹാബലി തമ്പുരാൻ തന്റെ പ്രജകളെ കാണാൻ എത്തുന്ന ദിവസമാണ് തിരുവോണം എന്നാണ് ഐതിഹ്യം.
                        </p>

                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-6 mb-3">2026-ലെ തിരുവോണം</h3>
                        <p>
                            2026-ലെ തിരുവോണം **ഓഗസ്റ്റ് 26 ബുധനാഴ്ച** ആണ്. അത്തം നാളിൽ (ഓഗസ്റ്റ് 17) തുടങ്ങുന്ന ആഘോഷങ്ങൾ പത്താം നാളായ തിരുവോണത്തോടെ പൂർണ്ണമാകുന്നു.
                        </p>

                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-6 mb-3">പ്രധാന ചടങ്ങുകൾ</h3>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>**അത്തപ്പൂക്കളം:** തൃക്കാക്കരയപ്പനെ വരവേൽക്കാൻ മുറ്റത്ത് പൂക്കളം ഒരുക്കുന്നു.</li>
                            <li>**ഓണസദ്യ:** ഏത്തക്കായ വറുത്തത്, ശർക്കരവരട്ടി, സാമ്പാർ, അവിയൽ, പായസം തുടങ്ങി വിഭവസമൃദ്ധമായ സദ്യ.</li>
                            <li>**ഓണക്കളികൾ:** വള്ളംകളി, പുലികളി, തിരുവാതിരക്കളി തുടങ്ങിയവ.</li>
                        </ul>
                    </section>
                </div>
            </article>

            <AdSlot slotId="mid-content" />

            <FAQ items={[
                {
                    question: "When is Thiruvonam in 2026?",
                    answer: "Thiruvonam 2026 is on Wednesday, August 26, 2026."
                },
                {
                    question: "When does Onam 2026 start?",
                    answer: "Onam celebrations start with Atham on August 17, 2026."
                },
                {
                    question: "How many days is Onam celebrated?",
                    answer: "Onam is traditionally celebrated for 10 days, starting from Atham star to Thiruvonam star."
                },
                {
                    question: "2026-ലെ ഓണം എപ്പോഴാണ്?",
                    answer: "2026-ലെ തിരുവോണം ഓഗസ്റ്റ് 26-നാണ്. അത്തം തുടങ്ങുന്നത് ഓഗസ്റ്റ് 17-നാണ്."
                }
            ]} />

            <div className="mt-10 pt-6 border-t border-gray-100 dark:border-gray-800 text-center">
                <p className="text-gray-600 dark:text-gray-400">
                    Check other major festivals: <Link href="/vishu-2026-date-kerala" className="text-indigo-600 font-medium hover:underline">Vishu 2026</Link> • <Link href="/festivals" className="text-indigo-600 font-medium hover:underline">All Festivals</Link>
                </p>
            </div>
        </div>
    );
}
