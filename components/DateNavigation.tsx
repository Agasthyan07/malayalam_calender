import Link from 'next/link';

type Props = {
    currentDate: string; // YYYY-MM-DD
};

export default function DateNavigation({ currentDate }: Props) {
    // Parse input date (YYYY-MM-DD)
    const [year, month, day] = currentDate.split('-').map(Number);
    const dateObj = new Date(year, month - 1, day);

    // Calculate Yesterday
    const prevDate = new Date(dateObj);
    prevDate.setDate(dateObj.getDate() - 1);

    // Calculate Tomorrow
    const nextDate = new Date(dateObj);
    nextDate.setDate(dateObj.getDate() + 1);

    // Helper to format as DD-MM-YYYY for URL
    const toUrlFormat = (date: Date) => {
        const d = String(date.getDate()).padStart(2, '0');
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const y = date.getFullYear();
        return `${d}-${m}-${y}`;
    };

    // Helper to format as DD MM YYYY for Display
    const toDisplayFormat = (date: Date) => {
        const d = String(date.getDate()).padStart(2, '0');
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const y = date.getFullYear();
        return `${d} ${m} ${y}`;
    };

    const yesterdayUrl = `/date/${toUrlFormat(prevDate)}`;
    const tomorrowUrl = `/date/${toUrlFormat(nextDate)}`;
    const todayUrl = '/today';

    const isToday = currentDate === new Date().toISOString().split('T')[0];

    return (
        <nav aria-label="Day navigation" className="flex items-center justify-center gap-6 py-8 text-center">
            {/* Yesterday Link */}
            <Link
                href={yesterdayUrl}
                className="group flex flex-col items-center text-gray-600 dark:text-gray-300 hover:text-red-700 dark:hover:text-red-400 transition-colors"
                aria-label={`Yesterday Malayalam Date ${toDisplayFormat(prevDate)}`}
            >
                <span className="text-sm md:text-base font-medium mb-1">← Yesterday</span>
                <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400 group-hover:text-red-600 dark:group-hover:text-red-300 font-mono">
                    {toDisplayFormat(prevDate)}
                </span>
            </Link>

            {/* Separator */}
            <div className="h-8 w-px bg-gray-300 dark:bg-gray-600 mx-2" aria-hidden="true" />

            {/* Today Link */}
            <Link
                href={todayUrl}
                className={`group flex flex-col items-center transition-colors ${isToday
                        ? 'text-red-800 dark:text-red-400 font-bold'
                        : 'text-gray-600 dark:text-gray-300 hover:text-red-700 dark:hover:text-red-400'
                    }`}
                aria-label={`Today Malayalam Date ${toDisplayFormat(dateObj)}`}
                aria-current={isToday ? 'page' : undefined}
            >
                <span className={`text-sm md:text-base mb-1 ${isToday ? 'underline decoration-2 underline-offset-4' : 'font-medium'}`}>
                    Today
                </span>
                <span className={`text-xs md:text-sm font-mono ${isToday
                        ? 'text-red-700 dark:text-red-300'
                        : 'text-gray-500 dark:text-gray-400 group-hover:text-red-600 dark:group-hover:text-red-300'
                    }`}>
                    {toDisplayFormat(dateObj)}
                </span>
            </Link>

            {/* Separator */}
            <div className="h-8 w-px bg-gray-300 dark:bg-gray-600 mx-2" aria-hidden="true" />

            {/* Tomorrow Link */}
            <Link
                href={tomorrowUrl}
                className="group flex flex-col items-center text-gray-600 dark:text-gray-300 hover:text-red-700 dark:hover:text-red-400 transition-colors"
                aria-label={`Tomorrow Malayalam Date ${toDisplayFormat(nextDate)}`}
            >
                <span className="text-sm md:text-base font-medium mb-1">Tomorrow →</span>
                <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400 group-hover:text-red-600 dark:group-hover:text-red-300 font-mono">
                    {toDisplayFormat(nextDate)}
                </span>
            </Link>
        </nav>
    );
}
