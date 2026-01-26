import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-gray-100 mt-12 py-8 border-t border-gray-200">
            <div className="container mx-auto px-4 text-center text-gray-600">
                <div className="flex justify-center gap-6 mb-4 flex-wrap text-sm">
                    <Link href="/privacy-policy" className="hover:text-red-700">Privacy Policy</Link>
                    <Link href="/terms" className="hover:text-red-700">Terms of Service</Link>
                    <Link href="/rahu-kalam-today" className="hover:text-red-700">Rahu Kalam</Link>
                    <Link href="/disclaimer" className="hover:text-red-700">Disclaimer</Link>
                </div>
                <p className="text-sm">© {new Date().getFullYear()} Malayalam Calendar. All rights reserved.</p>
            </div>
        </footer>
    );
}
