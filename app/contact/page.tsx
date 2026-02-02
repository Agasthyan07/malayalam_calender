import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact Us - Malayalam Calendar',
    description: 'Contact us for any queries regarding Malayalam Calendar 2026.',
};

export default function ContactPage() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl">
            <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Contact Us</h1>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                    We value your feedback and suggestions. If you have any questions about the Malayalam Calendar 2026,
                    please feel free to reach out to us.
                </p>

                <div className="mt-6">
                    <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Email Us</h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        For general inquiries: <a href="mailto:contact@malayalamcalendar.site" className="text-red-600 hover:underline">contact@malayalamcalendar.site</a>
                    </p>
                </div>

                <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Note: We usually respond within 24-48 hours.
                    </p>
                </div>
            </div>
        </div>
    );
}
