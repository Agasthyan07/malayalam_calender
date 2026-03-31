import { Metadata } from 'next';
import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import FAQ from '@/components/FAQ';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
    title: 'Kollavarsham Explained: The Malayalam Era & Calendar History',
    description: 'Learn about Kollavarsham, the traditional Malayalam Era. Discover its history, origin in 825 AD, how Malayalam months map to the Gregorian calendar, and Kollavarsham 1201.',
    keywords: [
        'Kollavarsham', 'Malayalam Era', 'Malayalam Calendar History',
        'Kollavarsham 1201', 'Kollavarsham 1202', 'Origin of Malayalam Calendar',
        'Chingam', 'Kanni', 'Thulam', 'Vrischikam', 'Dhanu', 'Makaram', 'Kumbham', 'Meenam', 'Medam', 'Edavam', 'Mithunam', 'Karkidakam'
    ],
    alternates: {
        canonical: 'https://www.malayalamcalendar.site/kollavarsham-malayalam-era',
    },
};

export default function KollavarshamPage() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <Breadcrumbs items={[{ label: 'Kollavarsham Explained', href: '/kollavarsham-malayalam-era' }]} />

            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-6">
                Kollavarsham: The Malayalam Era & Calendar History
            </h1>

            <AdSlot slotId="kollavarsham-top" />

            {/* HERO CARD */}
            <div className="bg-gradient-to-br from-indigo-700 to-blue-800 rounded-2xl p-8 text-white shadow-xl mb-12">
                <h2 className="text-xl md:text-2xl font-light mb-4 text-indigo-100">The 2026 Calendar corresponds to:</h2>
                <div className="bg-white/10 backdrop-blur-md rounded-xl px-8 py-6 border border-white/20 text-center">
                    <p className="text-3xl md:text-5xl font-bold text-white drop-shadow-md">Kollavarsham 1201 - 1202</p>
                    <p className="mt-3 text-indigo-200">The current Malayalam year transitioned in August 2025 and will flip to 1202 in August 2026.</p>
                </div>
            </div>

            {/* LONG FORM CONTENT */}
            <article className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
                <h2>What is Kollavarsham?</h2>
                <p>
                    <strong>Kollavarsham</strong> (Malayalam Era) is a solar and sidereal Hindu calendar used primarily in Kerala, India. Unlike the Gregorian calendar, which is strictly solar, the Malayalam calendar calculates its months based on the position of the sun in the 12 constellations (Zodiac signs or <em>Rasis</em>), making it a fascinating blend of astronomy and astrology.
                </p>

                <h2>Origin & History (825 CE)</h2>
                <p>
                    The Malayalam Era originated in the city of Kollam (Quilon) in Kerala. It officially began in the year <strong>825 CE (AD)</strong>.
                    There are several theories regarding its inception:
                </p>
                <ul>
                    <li><strong>Founding of Kollam:</strong> Some historians believe King Udaya Marthanda Varma initiated the era to commemorate the founding of the port city of Kollam.</li>
                    <li><strong>Onam Legend:</strong> Another belief ties it to the traditional harvest festival, although the scholarly consensus strongly links it to astronomical and trade alignments of the 9th century.</li>
                    <li><strong>Shankaracharya:</strong> A popular but historically debated legend suggests it memorializes the philosophical contributions of Adi Shankaracharya.</li>
                </ul>
                <p>
                    To calculate the corresponding Gregorian year for a given Kollavarsham year, you generally add 825. For example, 1201 + 825 = 2026.
                </p>

                <h3>How the Months Work (The 12 Rasis)</h3>
                <p>
                    The 12 months of the Malayalam calendar correspond directly to the 12 signs of the zodiac. A new month begins when the sun transitions from one zodiac sign to the next.
                </p>
                <div className="overflow-x-auto my-8">
                    <table className="min-w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-indigo-50 dark:bg-gray-800 text-indigo-900 dark:text-gray-200">
                                <th className="p-3 border">Malayalam Month</th>
                                <th className="p-3 border">Zodiac (Rasi)</th>
                                <th className="p-3 border">Gregorian Equivalent</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td className="p-3 border">Chingam (ചിങ്ങം)</td><td className="p-3 border">Leo</td><td className="p-3 border">Mid-Aug to Mid-Sep</td></tr>
                            <tr><td className="p-3 border">Kanni (കന്നി)</td><td className="p-3 border">Virgo</td><td className="p-3 border">Mid-Sep to Mid-Oct</td></tr>
                            <tr><td className="p-3 border">Thulam (തുലാം)</td><td className="p-3 border">Libra</td><td className="p-3 border">Mid-Oct to Mid-Nov</td></tr>
                            <tr><td className="p-3 border">Vrischikam (വൃശ്ചികം)</td><td className="p-3 border">Scorpio</td><td className="p-3 border">Mid-Nov to Mid-Dec</td></tr>
                            <tr><td className="p-3 border">Dhanu (ധനു)</td><td className="p-3 border">Sagittarius</td><td className="p-3 border">Mid-Dec to Mid-Jan</td></tr>
                            <tr><td className="p-3 border">Makaram (മകരം)</td><td className="p-3 border">Capricorn</td><td className="p-3 border">Mid-Jan to Mid-Feb</td></tr>
                            <tr><td className="p-3 border">Kumbham (കുംഭം)</td><td className="p-3 border">Aquarius</td><td className="p-3 border">Mid-Feb to Mid-Mar</td></tr>
                            <tr><td className="p-3 border">Meenam (മീനം)</td><td className="p-3 border">Pisces</td><td className="p-3 border">Mid-Mar to Mid-Apr</td></tr>
                            <tr><td className="p-3 border">Medam (മേടം)</td><td className="p-3 border">Aries</td><td className="p-3 border">Mid-Apr to Mid-May</td></tr>
                            <tr><td className="p-3 border">Edavam (ഇടവം)</td><td className="p-3 border">Taurus</td><td className="p-3 border">Mid-May to Mid-Jun</td></tr>
                            <tr><td className="p-3 border">Mithunam (മിഥുനം)</td><td className="p-3 border">Gemini</td><td className="p-3 border">Mid-Jun to Mid-Jul</td></tr>
                            <tr><td className="p-3 border">Karkidakam (കർക്കിടകം)</td><td className="p-3 border">Cancer</td><td className="p-3 border">Mid-Jul to Mid-Aug</td></tr>
                        </tbody>
                    </table>
                </div>

                <h3>Chingam vs. Medam: The "New Year" Confusion</h3>
                <p>
                    There is often confusion around the Malayalam New Year.
                    Astronomically, the sun enters Aries (Medam) in mid-April, which is celebrated as <strong>Vishu</strong>. For centuries, Vishu was treated as the astrological New Year.
                    However, the official administrative New Year for <strong>Kollavarsham starts in Chingam</strong> (Aug-Sep), coinciding with the harvest season and the festival of Onam.
                </p>

                <h2>Why the Malayalam Calendar Matters Today</h2>
                <p>
                    Even with the widespread adoption of the Gregorian calendar, Kolla Varsham remains an integral part of life in Kerala. It dictates:
                </p>
                <ul>
                    <li><Link prefetch={false} href="/festivals" className="text-indigo-600 dark:text-indigo-400">Festival Dates:</Link> Onam, Vishu, and temple Ulsavams.</li>
                    <li><Link prefetch={false} href="/marriage-muhurtham-2026" className="text-indigo-600 dark:text-indigo-400">Muhurthams:</Link> Auspicious times for weddings and house-warmings.</li>
                    <li><Link prefetch={false} href="/innathe-nakshatram" className="text-indigo-600 dark:text-indigo-400">Astrology:</Link> Casting horoscopes (Jathakam) and identifying birth stars.</li>
                </ul>
            </article>

            <AdSlot slotId="kollavarsham-bottom" />

            <FAQ items={[
                {
                    question: "What is the current Malayalam year?",
                    answer: "For most of the Gregorian year 2026, the Malayalam year is 1201. It changes to 1202 on the first day of the month of Chingam (August 2026)."
                },
                {
                    question: "How do you calculate Kollavarsham from the Gregorian Calendar?",
                    answer: "You subtract 825 from the Gregorian year for the period before Chingam 1st, and subtract 824 for the period after. For example, July 2026 relates to (2026 - 825) = 1201. September 2026 relates to (2026 - 824) = 1202."
                },
                {
                    question: "Which is the first month in the Malayalam Calendar?",
                    answer: "Chingam is considered the first month of the Kollam Era (Kollavarsham), usually beginning in mid-August. However, astrologically, Medam (mid-April) marks the start of the zodiac cycle."
                }
            ]} />
        </div>
    );
}
