import type { Metadata } from 'next';
import GoldCalculator from '@/components/GoldCalculator';
import Link from 'next/link';
import AdSlot from '@/components/AdSlot';

async function getGoldRate() {
    const data = await import('@/data/gold-rate.json');
    return data.default;
}

export const metadata: Metadata = {
    title: 'Kerala Gold Rate Today | Live 22ct & 24ct Gold Price Calculator',
    description: 'Check today\'s Gold Rate in Kerala (22 Carat & 24 Carat). Use our Gold Loan Calculator to find the value of your ornaments in grams and pavans.',
    keywords: ['Kerala Gold Rate Today', 'Gold price in Kerala', 'Today Gold Rate 22k', 'Gold Calculator Kerala', '1 Pavan Gold Rate'],
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

                {/* Informational Content */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 prose prose-yellow dark:prose-invert max-w-none">
                    <h3>About Gold Rates in Kerala</h3>
                    <p>
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
