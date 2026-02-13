import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Page Not Found | Malayalam Calendar',
    description: 'The page you are looking for could not be found.',
    robots: {
        index: false,
        follow: false,
    },
};

export default function NotFound() {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
            <h1 className="text-6xl font-extrabold text-red-600 mb-4">404</h1>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Page Not Found</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
                Sorry, we couldn't find the page you're looking for. It might have been removed or doesn't exist yet.
            </p>
            <Link
                href="/"
                className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors shadow-lg"
            >
                Back to Home
            </Link>
        </div>
    );
}
