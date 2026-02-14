import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import AdSlot from '@/components/AdSlot';
import FAQ from '@/components/FAQ';

export const metadata: Metadata = {
    title: 'Vishu 2026 Date Kerala – Vishukkani Muhurat & Malayalam New Year',
    description: 'When is Vishu 2026 in Kerala? Check exact date, Vishukkani Muhurat time, and significance. വിഷു 2026 തീയതിയും കണികാണൽ സമയവും.',
    keywords: [
        'Vishu 2026 Date',
        'Vishu 2026 Kerala',
        'Vishukkani Muhurat 2026',
        'Malayalam New Year 2026',
        'വിഷു 2026',
        'വിഷുക്കണി സമയം',
        'When is Vishu 2026'
    ],
    alternates: {
        canonical: 'https://malayalamcalendar.site/vishu-2026-date-kerala',
    },
    openGraph: {
        title: 'Vishu 2026 Date Kerala – Vishukkani Muhurat',
        description: 'Celebrating the Malayali New Year. Check Vishu 2026 date and auspicious times.',
        url: 'https://malayalamcalendar.site/vishu-2026-date-kerala',
        type: 'article',
        publishedTime: '2026-04-14T00:00:00+05:30',
    }
};

export default function VishuPage() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Event',
        name: 'Vishu 2026',
        startDate: '2026-04-14',
        endDate: '2026-04-14',
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
        description: 'Vishu is the traditional Malayali New Year festival celebrated in Kerala.',
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
                <span className="text-gray-900 font-medium mx-1">Vishu 2026</span>
            </nav>

            <article>
                <header className="mb-8 text-center">
                    <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight leading-tight">
                        Vishu 2026 Date Kerala
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300">
                        Malayalam New Year & The Festival of Lights
                    </p>
                    <div className="mt-6 inline-block bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-100 dark:border-yellow-800 rounded-xl p-4">
                        <p className="text-sm uppercase tracking-wide text-yellow-800 dark:text-yellow-500 font-bold mb-1">
                            Vishu 2026 Date
                        </p>
                        <p className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white">
                            April 14, 2026 <span className="text-lg font-medium text-gray-500">(Tuesday)</span>
                        </p>
                    </div>
                </header>

                <AdSlot slotId="top-banner" />

                <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
                    <p className="lead text-xl text-gray-800 dark:text-gray-200 font-medium">
                        <strong>Vishu</strong> (വിഷു) signifies the sun's transit into the Zodiac sign of Aries (Medam Rashi). It is celebrated as the astronomical New Year in Kerala and marks the beginning of the agricultural year.
                        The word 'Vishu' in Sanskrit means 'equal', symbolizing the vernal equinox where day and night are roughly equal.
                    </p>

                    <h2>The Tradition of Vishukkani</h2>
                    <p>
                        The most important ritual of the day is <strong>Vishukkani</strong>—literally meaning "the first thing seen on Vishu".
                        The belief is that seeing auspicious items as soon as one wakes up on Vishu morning determines the prosperity of the coming year.
                    </p>
                    <p>
                        The <em>Kani</em> is arranged the previous night in an <em>Uruli</em> (bell metal vessel) and typically includes:
                    </p>
                    <ul>
                        <li><strong>Kanikonna:</strong> Golden shower flowers (Cassia fistula), symbolizing wealth.</li>
                        <li><strong>Raw rice and paddy:</strong> Representing food security.</li>
                        <li><strong>Gold coins and currency:</strong> Signifying prosperity.</li>
                        <li><strong>Cucumber, Jackfruit, Mango:</strong> Seasonal fruits representing abundance.</li>
                        <li><strong>Valkannadi:</strong> A mirror to see oneself amidst this abundance, realizing that divinity is within.</li>
                    </ul>

                    <h2>Vishu Kaineettam and Other Customs</h2>
                    <p>
                        After viewing the Kani, the elders of the family give small amounts of money to younger members, known as <strong>Vishu Kaineettam</strong>.
                        This tradition symbolizes the sharing of wealth and blessings.
                        The day is also celebrated with a grand feast (Sadhya) utilizing seasonal produce like mangoes (Mambazha Pulissery) and jackfruit (Chakka Pradhaman).
                        In northern Kerala, fireworks (Vishu Padakkam) are an integral part of the celebration.
                    </p>

                    <h3>Astronomical Significance</h3>
                    <p>
                        Vishu is not just a cultural festival but an astronomical event. It marks the sun's entry into the first zodiac sign, Mesha (Aries).
                        While the official Malayalam Era new year starts in Chingam (August/September), Vishu represents the solar new year and is celebrated with similar significance across India (Baisakhi in Punjab, Puthandu in Tamil Nadu, Bihu in Assam).
                    </p>
                    <div className="bg-indigo-50 dark:bg-gray-800 p-6 rounded-xl border-l-4 border-indigo-500 my-6">
                        <h3 className="text-lg font-bold text-indigo-900 dark:text-indigo-300 mb-2">Best Time for Vishukkani</h3>
                        <p className="mb-0">
                            The auspicious time (Brahma Muhurtham) to view Vishukkani on **April 14, 2026**, is typically between **4:00 AM and 6:00 AM**.
                        </p>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Celebrations & Traditions</h2>
                    <ul className="list-disc pl-5 space-y-2">
                        <li><strong>Vishukkani:</strong> An arrangement of auspicious items like rice, golden cucumber, coins, and Konnappoo (Cassia fistula) before Lord Krishna.</li>
                        <li><strong>Vishu Kaineettam:</strong> Elders gift money to younger members of the family as a blessing.</li>
                        <li><strong>Vishu Sadya:</strong> A traditional feast that includes dishes with equal proportions of salty, sweet, sour, and bitter flavors (e.g., Veppampoorasam and Mampazhappulissery).</li>
                        <li><strong>Padakkam (Firecrackers):</strong> Children and adults celebrate by bursting crackers.</li>
                    </ul>

                    <hr className="my-10 border-gray-200 dark:border-gray-700" />

                    {/* MALAYALAM SECTION */}
                    <section lang="ml">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">വിഷു 2026 - തീയതിയും പ്രാധാന്യവും</h2>
                        <p>
                            കേരളീയരുടെ കാർഷിക ഉത്സവവും മലയാള വർഷാരംഭവുമാണ് **വിഷു**. 2026-ലെ വിഷു **ഏപ്രിൽ 14 ചൊവ്വാഴ്ച** ആണ് ആഘോഷിക്കുന്നത്. സൂര്യൻ മീനം രാശിയിൽ നിന്ന് മേടം രാശിയിലേക്ക് മാറുന്ന സംക്രമസമയമാണ് വിഷുവായി കണക്കാക്കുന്നത്.
                        </p>

                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-6 mb-3">വിഷുക്കണി</h3>
                        <p>
                            വിഷു ദിവസത്തെ പ്രധാന ചടങ്ങ് **വിഷുക്കണി** ആണ്. ഓട്ടുരുളിയിൽ അരി, നെല്ല്, അലക്കിയ വസ്ത്രം, ഗ്രന്ഥം, വാൽക്കണ്ണാടി, കണിവെള്ളരി, കണിക്കൊന്ന, സ്വർണം, നാണയം എന്നിവ കൃഷ്ണവിഗ്രഹത്തിന് മുന്നിൽ വെക്കുന്നു. വിഷുദിനത്തിൽ പുലർച്ചെ എഴുന്നേറ്റ് കണി കാണുന്നത് ഐശ്വര്യദായകമാണ്.
                        </p>

                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-6 mb-3">വിഷു കൈനീട്ടം</h3>
                        <p>
                            കുടുംബത്തിലെ മുതിർന്നവർ കുട്ടികൾക്കും മറ്റുള്ളവർക്കും നൽകുന്ന സമ്മാനമാണ് **വിഷു കൈനീട്ടം**. ഇത് വരാനിരിക്കുന്ന വർഷത്തെ സമ്പൽസമൃദ്ധിയെ സൂചിപ്പിക്കുന്നു.
                        </p>
                    </section>
                </div>
            </article>

            <AdSlot slotId="mid-content" />

            <FAQ items={[
                {
                    question: "When is Vishu in 2026?",
                    answer: "Vishu 2026 will be celebrated on Tuesday, April 14, 2026."
                },
                {
                    question: "What is the auspicious time for Vishukkani 2026?",
                    answer: "The best time for Vishukkani is usually during the Brahma Muhurtham, between 4:00 AM and 6:00 AM on April 14, 2026."
                },
                {
                    question: "Is Vishu the Malayalam New Year?",
                    answer: "Astronomically, yes. Vishu marks the sun's transit into Medam (Aries), which is considered the astrological New Year, though the official Kollavarsham year changes in Chingam (August/September)."
                },
                {
                    question: "2026-ലെ വിഷു എപ്പോഴാണ്?",
                    answer: "2026-ലെ വിഷു ഏപ്രിൽ 14 ചൊവ്വാഴ്ചയാണ്."
                }
            ]} />

            <div className="mt-10 pt-6 border-t border-gray-100 dark:border-gray-800 text-center">
                <p className="text-gray-600 dark:text-gray-400">
                    Check other major festivals: <Link href="/onam-2026-date" className="text-indigo-600 font-medium hover:underline">Onam 2026</Link> • <Link href="/festivals" className="text-indigo-600 font-medium hover:underline">All Festivals</Link>
                </p>
            </div>
        </div>
    );
}
