import type { Metadata } from 'next';
import GoldCalculator from '@/components/GoldCalculator';
import Link from 'next/link';
import AdSlot from '@/components/AdSlot';

async function getGoldRate() {
    const data = await import('@/data/gold-rate.json');
    return data.default;
}

export const metadata: Metadata = {
    title: 'Kerala Gold Rate Today - 1 Gram & 1 Pavan Gold Price',
    description: 'Check today\'s Gold Rate in Kerala for 1 Gram, 1 Pavan (8 Grams), and 10 Grams. Live 22 Carat (916) and 24 Carat gold prices with Gold Loan Calculator.',
    keywords: ['Kerala Gold Rate Today', '1 Gram Gold Price in Kerala', 'Today Gold Rate 22k', '1 Pavan Gold Rate Today', '24 Carat Gold Rate Kerala'],
};

export default async function GoldRatePage() {
    const rate = await getGoldRate();

    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl">
            <div className="flex flex-col items-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 text-center mb-2">
                    Kerala Gold Rate Today
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Live Market Price • {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
            </div>

            <div className="grid gap-8">
                {/* Main Calculator */}
                <GoldCalculator rate={rate} />

                <AdSlot slotId="mid-content" />

                {/* Quick Reference Table for SEO */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                    <div className="bg-gray-50 dark:bg-gray-900/50 px-6 py-4 border-b border-gray-100 dark:border-gray-800">
                        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                            Gold Price in Kerala (Quick Chart)
                        </h2>
                    </div>
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-gray-100 dark:border-gray-800">
                                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Weight</th>
                                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">22 Carat (916)</th>
                                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">24 Carat (999)</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            <tr>
                                <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">1 Gram</td>
                                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">₹{rate.gram22.toLocaleString()}</td>
                                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">₹{rate.gram24.toLocaleString()}</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">8 Grams (1 Pavan)</td>
                                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">₹{rate.pavan22.toLocaleString()}</td>
                                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">₹{(rate.gram24 * 8).toLocaleString()}</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">10 Grams</td>
                                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">₹{(rate.gram22 * 10).toLocaleString()}</td>
                                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">₹{(rate.gram24 * 10).toLocaleString()}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Informational Content */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 prose prose-yellow dark:prose-invert max-w-none">
                    <h3>Today's Gold Rate in Kerala</h3>
                    <p>
                        Searching for the **1 gram gold price in Kerala** or the **current rate for 1 Pavan**?
                        Gold holds significant cultural and financial value in Kerala. The daily gold rate is decided by the
                        <strong> All Kerala Gold and Silver Merchants Association (AKGSMA)</strong> based on international market trends.
                    </p>
                    <ul>
                        <li><strong>22 Carat (916)</strong>: Provides durability, best for jewelry and ornaments.</li>
                        <li><strong>24 Carat (999)</strong>: Purest form, mostly used for coins and bars.</li>
                    </ul>
                    <p>
                        Our calculator helps you estimate the cost of jewelry or the value for Gold Loans.
                        Note that jewellers add <strong>Making Charges (VA)</strong> ranging from 10-20% and GST (3%) on top of this rate.
                    </p>
                </div>

                <div className="text-center mt-8">
                    <Link href="/" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">
                        ← Back to Malayalam Calendar
                    </Link>
                </div>
            </div>
        </div>
    );
}
