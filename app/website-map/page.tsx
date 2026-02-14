import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Sitemap - Malayalam Calendar',
    description: 'Browse all pages on Malayalam Calendar including 2026-2027 calendars, festivals, and tools.',
};

export default function SitemapPage() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100">Sitemap</h1>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Main Calendars */}
                <div>
                    <h2 className="text-xl font-bold mb-4 text-red-700">Calendars</h2>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                        <li><Link href="/" className="hover:text-red-600 hover:underline">Today</Link></li>
                        <li><Link href="/malayalam-calendar/2026" className="hover:text-red-600 hover:underline">Malayalam Calendar 2026</Link></li>
                        <li><Link href="/malayalam-calendar/2027" className="hover:text-red-600 hover:underline">2027 Calendar</Link></li>
                    </ul>
                </div>

                {/* Important Dates */}
                <div>
                    <h2 className="text-xl font-bold mb-4 text-red-700">Events & Festivals</h2>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                        <li><Link href="/festivals" className="hover:text-red-600 hover:underline">All Kerala Festivals</Link></li>
                        <li><Link href="/onam-2026-date" className="hover:text-red-600 hover:underline">Onam 2026 Date</Link></li>
                        <li><Link href="/vishu-2026-date-kerala" className="hover:text-red-600 hover:underline">Vishu 2026 Date</Link></li>
                    </ul>
                </div>

                {/* Tools */}
                <div>
                    <h2 className="text-xl font-bold mb-4 text-red-700">Tools</h2>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-300">

                        <li><Link href="/rahu-kalam-today" className="hover:text-red-600 hover:underline">Rahu Kalam Today</Link></li>
                        <li><Link href="/inathe-nakshatram" className="hover:text-red-600 hover:underline">Today's Nakshatram</Link></li>
                    </ul>
                </div>

                {/* Informational */}
                <div>
                    <h2 className="text-xl font-bold mb-4 text-red-700">Information</h2>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                        <li><Link href="/about" className="hover:text-red-600 hover:underline">About Us</Link></li>
                        <li><Link href="/contact" className="hover:text-red-600 hover:underline">Contact Us</Link></li>
                        <li><Link href="/privacy-policy" className="hover:text-red-600 hover:underline">Privacy Policy</Link></li>
                        <li><Link href="/terms" className="hover:text-red-600 hover:underline">Terms of Service</Link></li>
                        <li><Link href="/disclaimer" className="hover:text-red-600 hover:underline">Disclaimer</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
