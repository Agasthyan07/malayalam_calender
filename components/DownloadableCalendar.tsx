'use client';

import { useState } from 'react';
import Image from 'next/image';

type Props = {
    year: string;
    monthName: string;
};

export default function DownloadableCalendar({ year, monthName }: Props) {
    const [imageError, setImageError] = useState(false);

    // Construct filename: malayalam-calendar-2026-january.png
    const fileName = `malayalam-calendar-${year}-${monthName.toLowerCase()}.png`;
    const imagePath = `/calendar-images/${year}/${fileName}`;

    if (imageError) return null;

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = imagePath;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="my-8 bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 text-center border border-gray-100 dark:border-gray-700 shadow-lg">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white mb-4">
                Download {monthName} {year} Malayalam Calendar Image
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-3xl mx-auto text-lg leading-relaxed">
                Get the high-quality <strong>{monthName} {year} Malayalam Calendar</strong> for free.
                Perfect for printing, setting as mobile wallpaper, or sharing on WhatsApp status.
                This HD image includes accurate <strong>Nakshatram</strong>, <strong>Tithi</strong>, <strong>Rahu Kalam</strong>, and festival dates for {monthName} {year}.
            </p>

            <div className="relative max-w-4xl mx-auto mb-8 shadow-2xl rounded-xl overflow-hidden border-4 border-white dark:border-gray-600 bg-gray-100">
                <Image
                    src={imagePath}
                    alt={`Download Malayalam Calendar ${monthName} ${year} Image - High Quality Printable Monthly Planner with Nakshatram, Tithi, Rahu Kalam & Festivals for Kerala`}
                    width={1200}
                    height={850}
                    className="w-full h-auto object-contain"
                    onError={() => setImageError(true)}
                    priority={false}
                    title={`Download ${monthName} ${year} Malayalam Calendar Image (HD)`}
                />
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button
                    onClick={handleDownload}
                    className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-bold rounded-full shadow-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all transform hover:-translate-y-1"
                >
                    <span className="mr-2 text-2xl">⬇️</span> Download HD Image
                </button>
            </div>
            <p className="text-xs text-gray-400 mt-4">
                *Copyright © MalayalamCalendar.site - Free for personal use.
            </p>
        </div>
    );
}
