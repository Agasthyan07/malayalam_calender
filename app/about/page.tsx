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
                <p className="lead text-lg">
                    Welcome to <strong>Malayalam Calendar</strong>, your comprehensive digital guide to the traditional Kerala way of timekeeping.
                </p>

                <h3>Our Mission</h3>
                <p>
                    In an increasingly digital world, staying connected to our roots is essential.
                    Our mission is to simplify the complex calculations of the <strong>Kollavarsham</strong> (Malayalam Era)
                    and present them in an easy-to-use, modern format for Malayalis worldwide.
                </p>

                <h3>What We Offer</h3>
                <ul>
                    <li><strong>Daily Panchangam:</strong> Accurate Nakshatram, Tithi, and Nalla Samayam calculations.</li>
                    <li><strong>Festival Dates:</strong> Precise dates for Onam, Vishu, and temple festivals.</li>
                    <li><strong>Cultural Tools:</strong> Utilities like Rahu Kalam finder and Gold Rate calculators tailored for Kerala.</li>
                </ul>

                <h3>Why Trust Us?</h3>
                <p>
                    Our algorithm is designed to align with the standard calendars followed in Kerala (Mathrubhumi / Manorama styles).
                    We ensure high accuracy by calculating planetary positions specifically for the Kerala region (IST).
                </p>

                <p>
                    Thank you for making us a part of your daily routine.
                </p>
            </div>

            <AdSlot slotId="mid-content" />
        </div>
    );
}
