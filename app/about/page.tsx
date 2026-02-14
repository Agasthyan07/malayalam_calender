import type { Metadata } from 'next';
import AdSlot from '@/components/AdSlot';

export const metadata: Metadata = {
    title: 'About Us - Malayalam Calendar 2026',
    description: 'Learn more about Malayalam Calendar, our mission to preserve Kerala culture through technology, and the team behind this digital panchangam.',
};

export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl">
            <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">About Us</h1>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 prose prose-red dark:prose-invert max-w-none">
                <p className="lead text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                    <strong>Malayalam Calendar</strong> is your definitive digital companion for navigating the rich tapestry of Kerala's timekeeping traditions.
                    We bridge the gap between ancient astronomical wisdom and modern digital convenience, offering a precise, user-friendly platform for millions of Malayalis worldwide.
                </p>

                <h2>Our Mission</h2>
                <p>
                    In a fast-paced world where dates are mere numbers, our mission is to preserve the cultural and spiritual significance of the <strong>Kollavarsham</strong> (Malayalam Era).
                    We aim to empower every Malayali—whether in Kerala, the Gulf, Europe, or the Americas—to stay connected with their roots.
                    By simplifying complex Panchangam calculations into an accessible interface, we ensure that you never miss a festival, a muhurtham, or an auspicious moment.
                </p>

                <h2>The Story Behind Kollavarsham</h2>
                <p>
                    The Malayalam Calendar, or <em>Kollavarsham</em>, is a solar calendar system that originated in 825 AD. Unlike the Gregorian calendar which is purely solar, or other Indian calendars which are often luni-solar, the Malayalam system is unique in its calculation methods and month names.
                    It is deeply intertwined with agriculture, temple rituals, and the daily life of Keralites.
                </p>
                <p>
                    Dates are calculated based on the Sun's transit (Sankramam) into the 12 Zodiac signs (Rashi).
                    For instance, the year begins with the month of <strong>Chingam</strong> (Leo) and ends with <strong>Karkidakam</strong> (Cancer).
                    Our platform meticulously tracks these solar transitions to provide you with the most accurate dates possible.
                </p>

                <h2>What Sets Us Apart?</h2>
                <p>We believe that tradition should not be static; it should evolve. Here is how we are modernizing the Malayalam Calendar:</p>
                <ul>
                    <li><strong>Algorithmic Precision:</strong> Our backend is powered by advanced algorithms that calculate planetary positions (Ephemeris) in real-time. We don't just copy-paste data; we compute it based on the specific coordinates of Kerala (IST).</li>
                    <li><strong>Comprehensive Panchangam:</strong> Beyond just dates, we provide deep insights into <em>Nakshatram</em> (Star), <em>Tithi</em> (Lunar Day), <em>Nithya Yoga</em>, and <em>Karana</em>.</li>
                    <li><strong>Linguistic Inclusivity:</strong> We recognize that many in the younger generation may not read Malayalam fluently but still value the tradition. Our bilingual approach ensures accessibility for everyone.</li>
                    <li><strong>Privacy First:</strong> We respect your data. Unlike many free tools that harvest user data, our business model relies on non-intrusive advertising, ensuring your personal details remain private.</li>
                </ul>

                <h2>Our Commitment to Accuracy</h2>
                <p>
                    Accuracy is the cornerstone of trust. Our team regularly cross-verifies our data with standard printed almanacs like the <em>Mathrubhumi</em> and <em>Manorama</em> calendars to ensure consistency with what your family elders use.
                    However, we also provide the scientific basis for our calculations where slight differences may arise due to exact location coordinates (e.g., sunrise times differ between Trivandrum and Kasaragod).
                </p>

                <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg my-8 not-prose border-l-4 border-red-500">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Did You Know?</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                        The Malayalam Era (ME) is calculated by subtracting 825 from the Gregorian year.
                        However, the new year starts in Chingam (August/September), so for the first part of the year, the difference is 824 years!
                    </p>
                </div>

                <h2>Join Our Community</h2>
                <p>
                    We are more than just a website; we are a community of culture enthusiasts.
                    We welcome feedback, corrections, and suggestions from our users.
                    If you find a discrepancy or have a feature request, please do not hesitate to reach out to us.
                </p>

                <p className="font-medium mt-8">
                    Thank you for choosing Malayalam Calendar as your trusted guide to time and tradition.
                </p>
            </div>

            <AdSlot slotId="mid-content" />
        </div>
    );
}
