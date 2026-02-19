import { Metadata } from 'next';
import Link from 'next/link';
import { getDailyData, formatDate } from '@/lib/dateUtils';
import AdSlot from '@/components/AdSlot';
import FAQ from '@/components/FAQ';

export const revalidate = 3600; // Hourly revalidation

export const metadata: Metadata = {
    title: 'Innathe Nakshatram – Today\'s Star in Malayalam Calendar | 27 Stars List',
    description: 'Check Innathe Nakshatram (Today\'s Star). Read detailed predictions and characteristics of the 27 birth stars (Ashwathi to Revathi) in Malayalam astrology.',
    keywords: [
        'Innathe Nakshatram', 'Today Nakshatra Malayalam', 'Today Star',
        'Ashwathi', 'Bharani', 'Karthika', 'Rohini', 'Makayiram', 'Thiruvathira',
        'Punartham', 'Pooyam', 'Ayilyam', 'Makam', 'Pooram', 'Uthram',
        'Atham', 'Chithira', 'Chothi', 'Vishakam', 'Anizham', 'Thrikketta',
        'Moolam', 'Pooradam', 'Uthradam', 'Thiruvonam', 'Avittam', 'Chathayam',
        'Pooruruttathi', 'Uthrattathi', 'Revathi',
        'Download Nakshatra Finder', 'Malayalam Calendar Download'
    ]
};

export default async function InnatheNakshatramPage() {
    // 1. Get Today's Data
    const now = new Date();
    const options = { timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit' } as const;
    const formatter = new Intl.DateTimeFormat('en-CA', options);
    const todayStr = formatter.format(now); // YYYY-MM-DD

    const data = await getDailyData(todayStr);

    // Fallback
    const nakshatram = data?.nakshatram || "Unavailable";
    const displayDate = data ? formatDate(data.date) : "Today";
    const weekday = data?.weekday || "";

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                <Link href="/" className="hover:underline">Home</Link> &gt; <span>Innathe Nakshatram</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-6">
                Innathe Nakshatram – Today's Star & Complete Guide
            </h1>

            <AdSlot slotId="nakshatra-top" />

            {/* HERO CARD */}
            <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-8 text-white shadow-xl mb-12 flex flex-col items-center text-center">
                <p className="text-indigo-100 font-medium tracking-wide uppercase text-sm mb-2">{displayDate} | {weekday}</p>
                <h2 className="text-xl md:text-2xl font-light mb-4 text-indigo-100">Innathe Nakshatram (Today's Star)</h2>
                <div className="bg-white/10 backdrop-blur-md rounded-xl px-8 py-4 border border-white/20">
                    <p className="text-4xl md:text-6xl font-bold text-white drop-shadow-md">{nakshatram}</p>
                </div>
                <p className="mt-6 text-indigo-200 max-w-lg">
                    The Nakshatra prevailing today determines the nature of activities that can be performed.
                    {nakshatram !== "Unavailable" && ` Those born under ${nakshatram} are known for their unique traits.`}
                </p>
            </div>

            {/* LONG FORM CONTENT */}
            <article className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
                <h2>The Significance of Nakshatram in Malayalam Astrology</h2>
                <p>
                    In the Hindu predictive astrology system used in Kerala, the <strong>Nakshatram</strong> (Birth Star) is considered more important than the Zodiac sign (Rashi).
                    While the Zodiac divides the sky into 12 parts of 30 degrees each, the Nakshatra system divides it into 27 sectors of 13.20 degrees each.
                    The moon travels through one Nakshatra in approximately one day.
                </p>
                <p>
                    "Innathe Nakshatram" simply means "Today's Star". Knowing the star of the day is essential for:
                </p>
                <ul>
                    <li><strong>Daily Rituals:</strong> Certain stars are fierce (Ugra) and good for competitive actions, while others are gentle (Mridu) and good for learning or romance.</li>
                    <li><strong>Naming Ceremonies (Namakaranam):</strong> A child is often named based on the syllable associated with their birth star.</li>
                    <li><strong>Marriage Compatibility (Porutham):</strong> The matching of stars between a bride and groom is the first step in arranging a marriage in Kerala.</li>
                </ul>

                <h3>The 27 Nakshatras: A Quick Guide</h3>
                <p>
                    The 27 stars are grouped into three sets of nine. Here is a brief overview of each, which you can use to understand the characteristics of people born today or on these star days.
                </p>

                <div className="grid md:grid-cols-2 gap-6 not-prose my-8">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
                        <h4 className="font-bold text-lg text-indigo-600 dark:text-indigo-400 mb-3">1. Ashwathi (Ashwini)</h4>
                        <p className="text-sm">The first star, representing speed and vitality. Symbolized by a horse's head. People born here are energetic, pioneers, and swift in action.</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
                        <h4 className="font-bold text-lg text-indigo-600 dark:text-indigo-400 mb-3">2. Bharani</h4>
                        <p className="text-sm">Symbolized by the Yoni. It represents fertility, struggle, and eventual creation. It is considered an Ugra (fierce) star.</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
                        <h4 className="font-bold text-lg text-indigo-600 dark:text-indigo-400 mb-3">3. Karthika (Krittika)</h4>
                        <p className="text-sm">The star of fire, ruled by the Sun. It represents purification, cutting ties with the old, and is symbolized by a knife or flame.</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
                        <h4 className="font-bold text-lg text-indigo-600 dark:text-indigo-400 mb-3">4. Rohini</h4>
                        <p className="text-sm">The red star, associated with growth and creativity. Lord Krishna was born in this star. It is considered very auspicious for agriculture.</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
                        <h4 className="font-bold text-lg text-indigo-600 dark:text-indigo-400 mb-3">5. Makayiram (Mrigashira)</h4>
                        <p className="text-sm">Symbolized by a deer's head. It represents searching, curiosity, and gentleness. Good for travel and research.</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
                        <h4 className="font-bold text-lg text-indigo-600 dark:text-indigo-400 mb-3">6. Thiruvathira (Ardra)</h4>
                        <p className="text-sm">Ruled by Rudra (Shiva). It signifies storms and transformation. It is the star of Lord Shiva and is celebrated in the month of Dhanu.</p>
                    </div>
                </div>

                <p>
                    <strong>...and the list continues through Punartham to Revathi.</strong>
                    Each star has its own presiding deity, ruling planet, and specific animal totem (Yoni) used for compatibility matching.
                </p>

                <h3>How We Validated Today's Star</h3>
                <p>
                    Our calculation for <strong>{nakshatram}</strong> today is based on the position of the Moon at sunrise in Kerala.
                    However, stars change during the day. If the star changes after, say, 2:00 PM, a child born after that time will belong to the next Nakshatra.
                    Always check the exact ending time of the star in our <Link href={`/date/${todayStr}`} className="text-indigo-600 underline">Daily View</Link>.
                </p>
            </article>

            <AdSlot slotId="nakshatra-bottom" />

            <FAQ items={[
                {
                    question: "What is Innathe Nakshatram? (ഇന്നത്തെ നക്ഷത്രം ഏതാണ്?)",
                    answer: `Today's nakshatram is ${nakshatram}. It is calculated based on the moon's position today.`
                },
                {
                    question: "How do I know my birth star?",
                    answer: "Your birth star is determined by the position of the moon at the exact time and place of your birth. You need to consult a Janma Kundali (Horoscope) tool."
                },
                {
                    question: "Which stars are good for marriage?",
                    answer: "Gentle stars like Rohini, Mrigashira, and Uthram are generally considered good. However, compatibility depends on the combination of the bride and groom's stars."
                }
            ]} />
        </div>
    );
}
