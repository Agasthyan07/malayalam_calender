import { Metadata } from 'next';
import Link from 'next/link';
import { getDailyData, formatDate } from '@/lib/dateUtils';
import AdSlot from '@/components/AdSlot';
import FAQ from '@/components/FAQ';
import Breadcrumbs from '@/components/Breadcrumbs';

export const revalidate = 3600; // Hourly revalidation

export const metadata: Metadata = {
    title: 'Innathe Nakshatram – Today\'s Star in Malayalam Calendar | 27 Stars List',
    description: 'Check Innathe Nakshatram (Today\'s Star). Read detailed predictions and characteristics of the 27 birth stars (Ashwathi to Revathi) in Malayalam astrology.',
    alternates: {
        canonical: 'https://www.malayalamcalendar.site/innathe-nakshatram',
    },
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
            <Breadcrumbs items={[{ label: 'Innathe Nakshatram', href: '/innathe-nakshatram' }]} />

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
                        <p className="text-sm">The first star, representing speed and vitality. Symbolized by a horse's head. Ruled by Ketu and deity Ashwini Kumaras. People born here are energetic, pioneers, and swift in action.</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
                        <h4 className="font-bold text-lg text-indigo-600 dark:text-indigo-400 mb-3">2. Bharani</h4>
                        <p className="text-sm">Symbolized by the Yoni. Ruled by Venus and deity Yama. It represents fertility, struggle, and eventual creation. It is considered an Ugra (fierce) star, suitable for bold actions.</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
                        <h4 className="font-bold text-lg text-indigo-600 dark:text-indigo-400 mb-3">3. Karthika (Krittika)</h4>
                        <p className="text-sm">The star of fire, ruled by the Sun. Deity is Agni. It represents purification, cutting ties with the old, and is symbolized by a knife or flame. Strong willpower and determination.</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
                        <h4 className="font-bold text-lg text-indigo-600 dark:text-indigo-400 mb-3">4. Rohini</h4>
                        <p className="text-sm">The red star, ruled by the Moon. Deity is Brahma. Associated with growth, beauty, and creativity. Lord Krishna was born in this star. Very auspicious for agriculture and new beginnings.</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
                        <h4 className="font-bold text-lg text-indigo-600 dark:text-indigo-400 mb-3">5. Makayiram (Mrigashira)</h4>
                        <p className="text-sm">Symbolized by a deer's head. Ruled by Mars, deity is Soma (Moon God). It represents searching, curiosity, and gentleness. Good for travel, research, and exploration.</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
                        <h4 className="font-bold text-lg text-indigo-600 dark:text-indigo-400 mb-3">6. Thiruvathira (Ardra)</h4>
                        <p className="text-sm">Ruled by Rahu, deity is Rudra (Shiva). It signifies storms, transformation, and intellectual depth. The star of Lord Shiva, celebrated with Thiruvathira festival in the month of Dhanu.</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
                        <h4 className="font-bold text-lg text-indigo-600 dark:text-indigo-400 mb-3">7. Punartham (Punarvasu)</h4>
                        <p className="text-sm">Symbolized by a quiver of arrows. Ruled by Jupiter, deity is Aditi (mother of gods). Represents renewal, return to origin, and restoration. Lord Rama was born under this star.</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
                        <h4 className="font-bold text-lg text-indigo-600 dark:text-indigo-400 mb-3">8. Pooyam (Pushya)</h4>
                        <p className="text-sm">Considered the most auspicious of all 27 stars. Ruled by Saturn, deity is Brihaspati. Symbolized by a flower and a cow's udder. Represents nourishment, prosperity, and spiritual growth.</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
                        <h4 className="font-bold text-lg text-indigo-600 dark:text-indigo-400 mb-3">9. Ayilyam (Ashlesha)</h4>
                        <p className="text-sm">Symbolized by a coiled serpent. Ruled by Mercury, deity is Nagas (serpent gods). Represents mysticism, intuition, and hidden wisdom. People born here are deeply perceptive and strategic.</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
                        <h4 className="font-bold text-lg text-indigo-600 dark:text-indigo-400 mb-3">10. Makam (Magha)</h4>
                        <p className="text-sm">Symbolized by a royal throne. Ruled by Ketu, deity is Pitris (ancestors). Represents power, authority, and ancestral heritage. People born here are natural leaders with a regal bearing.</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
                        <h4 className="font-bold text-lg text-indigo-600 dark:text-indigo-400 mb-3">11. Pooram (Purva Phalguni)</h4>
                        <p className="text-sm">Symbolized by a hammock or bed. Ruled by Venus, deity is Bhaga. Represents relaxation, enjoyment, love, and creative expression. Excellent for marriage and partnerships.</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
                        <h4 className="font-bold text-lg text-indigo-600 dark:text-indigo-400 mb-3">12. Uthram (Uttara Phalguni)</h4>
                        <p className="text-sm">Symbolized by a bed or fig tree. Ruled by the Sun, deity is Aryaman. Represents generosity, patronage, and friendship. One of the most favorable stars for weddings in Kerala tradition.</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
                        <h4 className="font-bold text-lg text-indigo-600 dark:text-indigo-400 mb-3">13. Atham (Hasta)</h4>
                        <p className="text-sm">Symbolized by a hand or fist. Ruled by the Moon, deity is Savitar (Sun God). Represents skill, craftsmanship, and dexterity. The famous Onam festival begins on Atham day.</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
                        <h4 className="font-bold text-lg text-indigo-600 dark:text-indigo-400 mb-3">14. Chithira (Chitra)</h4>
                        <p className="text-sm">Symbolized by a bright jewel or pearl. Ruled by Mars, deity is Vishwakarma (divine architect). Represents beauty, elegance, and artistic creation. People born here have excellent aesthetic sense.</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
                        <h4 className="font-bold text-lg text-indigo-600 dark:text-indigo-400 mb-3">15. Chothi (Swati)</h4>
                        <p className="text-sm">Symbolized by a young plant swaying in the wind. Ruled by Rahu, deity is Vayu (wind god). Represents independence, flexibility, and self-starting ability. Known for creating great entrepreneurs.</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
                        <h4 className="font-bold text-lg text-indigo-600 dark:text-indigo-400 mb-3">16. Vishakam (Vishakha)</h4>
                        <p className="text-sm">Symbolized by a triumphal arch or potter's wheel. Ruled by Jupiter, deities are Indra and Agni. Represents determination, goal-setting, and single-minded pursuit. Excellent for overcoming obstacles.</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
                        <h4 className="font-bold text-lg text-indigo-600 dark:text-indigo-400 mb-3">17. Anizham (Anuradha)</h4>
                        <p className="text-sm">Symbolized by a lotus flower. Ruled by Saturn, deity is Mitra (god of friendship). Represents devotion, success in foreign lands, and deep friendships. Very favorable for spiritual pursuits.</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
                        <h4 className="font-bold text-lg text-indigo-600 dark:text-indigo-400 mb-3">18. Thrikketta (Jyeshtha)</h4>
                        <p className="text-sm">Symbolized by an earring or umbrella. Ruled by Mercury, deity is Indra. Represents seniority, protection, and authority. The eldest or chief star, associated with responsibility and protective nature.</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
                        <h4 className="font-bold text-lg text-indigo-600 dark:text-indigo-400 mb-3">19. Moolam (Moola)</h4>
                        <p className="text-sm">Symbolized by a tied bunch of roots. Ruled by Ketu, deity is Nirriti (goddess of dissolution). Represents getting to the root of things, research, and investigation. A powerful star for transformation.</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
                        <h4 className="font-bold text-lg text-indigo-600 dark:text-indigo-400 mb-3">20. Pooradam (Purva Ashadha)</h4>
                        <p className="text-sm">Symbolized by an elephant tusk or fan. Ruled by Venus, deity is Apah (water deity). Represents invincibility, early victory, and purification. People born here are charismatic and persuasive.</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
                        <h4 className="font-bold text-lg text-indigo-600 dark:text-indigo-400 mb-3">21. Uthradam (Uttara Ashadha)</h4>
                        <p className="text-sm">Symbolized by an elephant tusk or small bed. Ruled by the Sun, deities are Vishvadevas. Represents final victory that cannot be reversed. Known for producing patient, enduring leaders.</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
                        <h4 className="font-bold text-lg text-indigo-600 dark:text-indigo-400 mb-3">22. Thiruvonam (Shravana)</h4>
                        <p className="text-sm">Symbolized by three footprints or an ear. Ruled by the Moon, deity is Vishnu. Represents listening, learning, and connection. The most celebrated star in Kerala — Onam's culmination day, Thiruvonam.</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
                        <h4 className="font-bold text-lg text-indigo-600 dark:text-indigo-400 mb-3">23. Avittam (Dhanishta)</h4>
                        <p className="text-sm">Symbolized by a drum (Mridanga). Ruled by Mars, deity is Ashta Vasus. Represents wealth, music, and symphony. People born here are often talented in music and enjoy material prosperity.</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
                        <h4 className="font-bold text-lg text-indigo-600 dark:text-indigo-400 mb-3">24. Chathayam (Shatabhisha)</h4>
                        <p className="text-sm">Symbolized by an empty circle or 100 physicians. Ruled by Rahu, deity is Varuna (god of oceans). Represents healing, secrecy, and mystery. Known as the healer's star, excellent for medical professionals.</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
                        <h4 className="font-bold text-lg text-indigo-600 dark:text-indigo-400 mb-3">25. Pooruruttathi (Purva Bhadrapada)</h4>
                        <p className="text-sm">Symbolized by the front legs of a funeral cot or a sword. Ruled by Jupiter, deity is Aja Ekapada. Represents intensity, penance, and purification through fire. A transformative and spiritually powerful star.</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
                        <h4 className="font-bold text-lg text-indigo-600 dark:text-indigo-400 mb-3">26. Uthrattathi (Uttara Bhadrapada)</h4>
                        <p className="text-sm">Symbolized by the back legs of a funeral cot or a twin. Ruled by Saturn, deity is Ahir Budhnya (serpent of the deep). Represents depth, wisdom, and cosmic consciousness. Very auspicious for spiritual growth.</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
                        <h4 className="font-bold text-lg text-indigo-600 dark:text-indigo-400 mb-3">27. Revathi</h4>
                        <p className="text-sm">The final star, symbolized by a fish or a drum. Ruled by Mercury, deity is Pushan (nurturer). Represents completion, journey's end, and safe passage. Known for producing compassionate, nurturing individuals.</p>
                    </div>
                </div>

                <p>
                    Each of the 27 Nakshatras has its own presiding deity, ruling planet, and specific animal totem (Yoni) used for compatibility matching in Kerala marriage traditions.
                    Understanding these stars is fundamental to Malayalam astrology and daily Panchangam reading.
                </p>

                <h3>How We Validated Today's Star</h3>
                <p>
                    Our calculation for <strong>{nakshatram}</strong> today is based on the position of the Moon at sunrise in Kerala.
                    However, stars change during the day. If the star changes after, say, 2:00 PM, a child born after that time will belong to the next Nakshatra.
                    Always check the exact ending time of the star in our <Link prefetch={false} href={`/date/${todayStr}`} className="text-indigo-600 underline">Daily View</Link>.
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
