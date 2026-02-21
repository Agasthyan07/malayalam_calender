import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-gray-100 mt-12 pt-12 pb-8 border-t border-gray-200">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-center md:text-left">
                    <div>
                        <h3 className="font-bold text-gray-900 mb-4">Quick Links</h3>
                        <div className="flex flex-col gap-2 text-sm text-gray-600">
                            <Link href="/" className="hover:text-red-700">Today's Calendar</Link>
                            <Link href="/malayalam-calendar/2026" className="hover:text-red-700">Malayalam Calendar 2026</Link>
                            <Link href="/malayalam-calendar/2027" className="hover:text-red-700">2027 Calendar</Link>
                            <Link href="/festivals" className="hover:text-red-700">Kerala Festivals</Link>

                            <Link href="/rahu-kalam-today" className="hover:text-red-700">Rahu Kalam Times</Link>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900 mb-4">About</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            Malayalam Calendar 2026 provides accurate daily Panchangam, Nakshatram, Tithi, and festival details for Malayalis worldwide.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900 mb-4">Legal</h3>
                        <div className="flex flex-col gap-2 text-sm text-gray-600">
                            <Link href="/privacy-policy" className="hover:text-red-700">Privacy Policy</Link>
                            <Link href="/terms" className="hover:text-red-700">Terms of Service</Link>
                            <Link href="/disclaimer" className="hover:text-red-700">Disclaimer</Link>
                            <Link href="/contact" className="hover:text-red-700">Contact Us</Link>
                            <Link href="/website-map" className="hover:text-red-700">Sitemap</Link>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-200 pt-8 text-center text-gray-600 text-sm">
                    <p>© {new Date().getFullYear()} Malayalam Calendar. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
