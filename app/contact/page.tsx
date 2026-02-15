import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact Us - Malayalam Calendar',
    description: 'Contact us for any queries regarding Malayalam Calendar 2026.',
    alternates: {
        canonical: 'https://malayalamcalendar.site/contact',
    },
};

export default function ContactPage() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl">
            <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Contact Us</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
                        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 font-medium">
                            We value your feedback, suggestions, and queries. Whether you spotted a bug, have a feature request, or just want to say hello, we are here to listen.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-full text-red-600 dark:text-red-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Email Us</h3>
                                    <p className="text-gray-600 dark:text-gray-400 mb-2">For general inquiries, partnerships, or corrections:</p>
                                    <a href="mailto:agasthyan2002@gmail.com" className="text-red-600 dark:text-red-400 font-semibold hover:underline text-lg">agasthyan2002@gmail.com</a>
                                    <p className="text-xs text-gray-400 mt-2">Expected response time: 24-48 Hours</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-700">
                            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Connect on Social Issues</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                                If you are reporting a mismatch in festival dates or Nakshatram timings, please kindly verify with your local location time, as our calendar is based on standard Kerala Time (IST).
                            </p>
                        </div>
                    </div>
                </div>

                {/* FAQ Section to increase content and utility */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow-sm border border-gray-100 dark:border-gray-700">
                            <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-2">How accurate is the Nakshatram timing?</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Our Nakshatram timings are calculated using high-precision astronomical algorithms based on the Lahiri Ayanamsa. We update our data daily to ensure synchronization with standard Kerala panchangams.
                            </p>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow-sm border border-gray-100 dark:border-gray-700">
                            <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-2">Why do dates differ from my wall calendar?</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Printed wall calendars are often printed months in advance and may have minor discrepancies. Additionally, star timings depend on your exact longitude and latitude. Our calendar uses central Kerala coordinates for standardization.
                            </p>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow-sm border border-gray-100 dark:border-gray-700">
                            <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-2">Can I download the calendar as a PDF?</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Currently, we do not offer a downloadable PDF version. However, our website is fully responsive and works offline on many mobile devices if added to the home screen.
                            </p>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow-sm border border-gray-100 dark:border-gray-700">
                            <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-2">Do you have a mobile app?</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                We are working on a dedicated mobile application for iOS and Android. Stay tuned for updates! For now, you can experience the full app-like feel directly in your mobile browser.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
