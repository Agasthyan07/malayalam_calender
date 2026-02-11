import Link from 'next/link';

type Props = {
    currentDate: string; // YYYY-MM-DD
    lang?: string;
};

export default function DateNavigation({ currentDate, lang = 'en' }: Props) {
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

    // Helper to check if a date string is effectively "Today" in IST
    const getTodayIST = () => {
        const now = new Date();
        const options = { timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit' } as const;
        const formatter = new Intl.DateTimeFormat('en-CA', options); // YYYY-MM-DD
        return formatter.format(now);
    };

    const realTodayStr = getTodayIST();
    const isCurrentPageToday = currentDate === realTodayStr;

    // Determine URL for "Yesterday" button
    // If prevDate matches realToday, go to / (or /ml), else /date/... (or /ml/date/...)
    // Simplification: /date/ links for now.
    // Ideally we'd respect the 'lang' for the destination path, but for now assuming 'en' paths for buttons to keep it simple or user stays in 'ml' if we construct it properly.
    // Actually, we must link to /ml if lang is ml
    const basePath = lang === 'ml' ? '/ml' : '';

    // Logic: if date is today, go to base root. else base/date/dd-mm-yyyy
    const getLink = (date: Date) => {
        const dateStr = toUrlFormat(date).split('-').reverse().join('-'); // YYYY-MM-DD
        if (dateStr === realTodayStr) return `${basePath === '' ? '/' : basePath}`;
        return `${basePath}/date/${toUrlFormat(date)}`;
    };

    const yesterdayUrl = getLink(prevDate);
    const tomorrowUrl = getLink(nextDate);
    const todayUrl = basePath === '' ? '/' : basePath;

    const labels = lang === 'ml' ? {
        yesterday: 'ഇന്നലെ',
        tomorrow: 'നാളെ',
        today: 'ഇന്ന്',
        gotoToday: 'ഇന്നത്തേക്ക് പോവുക',
        selected: 'തിരഞ്ഞെടുത്ത ദിവസം'
    } : {
        yesterday: 'Yesterday',
        tomorrow: 'Tomorrow',
        today: 'Today',
        gotoToday: 'Go to Today',
        selected: 'Selected'
    };

    return (
        <div className="flex flex-col items-center gap-4">
            <nav aria-label="Day navigation" className="flex items-center justify-center gap-4 md:gap-6 py-6 text-center w-full">
                {/* Yesterday Link */}
                <Link
                    href={yesterdayUrl}
                    className="group flex flex-col items-center text-gray-600 dark:text-gray-300 hover:text-red-700 dark:hover:text-red-400 transition-colors flex-1"
                    aria-label={`${labels.yesterday} ${toDisplayFormat(prevDate)}`}
                >
                    <span className="text-sm md:text-base font-medium mb-1">← {labels.yesterday}</span>
                    <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400 group-hover:text-red-600 dark:group-hover:text-red-300 font-mono">
                        {toDisplayFormat(prevDate)}
                    </span>
                </Link>

                {/* Separator */}
                <div className="h-8 w-px bg-gray-300 dark:bg-gray-600 mx-2" aria-hidden="true" />

                {/* Current Page Indicator (Middle) */}
                <div className="flex flex-col items-center flex-1">
                    <span className={`text-sm md:text-base mb-1 ${isCurrentPageToday ? 'font-bold text-red-800' : 'font-medium text-gray-800'}`}>
                        {isCurrentPageToday ? labels.today : toDisplayFormat(dateObj)}
                    </span>
                    {!isCurrentPageToday && (
                        <span className="text-xs md:text-sm text-gray-500 font-mono">
                            {labels.selected}
                        </span>
                    )}
                    {isCurrentPageToday && (
                        <span className="text-xs md:text-sm text-red-700 font-mono">
                            {toDisplayFormat(dateObj)}
                        </span>
                    )}
                </div>

                {/* Separator */}
                <div className="h-8 w-px bg-gray-300 dark:bg-gray-600 mx-2" aria-hidden="true" />

                {/* Tomorrow Link */}
                <Link
                    href={tomorrowUrl}
                    className="group flex flex-col items-center text-gray-600 dark:text-gray-300 hover:text-red-700 dark:hover:text-red-400 transition-colors flex-1"
                    aria-label={`${labels.tomorrow} ${toDisplayFormat(nextDate)}`}
                >
                    <span className="text-sm md:text-base font-medium mb-1">{labels.tomorrow} →</span>
                    <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400 group-hover:text-red-600 dark:group-hover:text-red-300 font-mono">
                        {toDisplayFormat(nextDate)}
                    </span>
                </Link>
            </nav>

            {/* "Go to Today" Button (only if not on Today's page) */}
            {!isCurrentPageToday && (
                <Link
                    href={todayUrl}
                    className="inline-flex items-center justify-center px-6 py-2 border border-transparent text-sm font-medium rounded-full text-white bg-red-600 hover:bg-red-700 shadow-sm transition-colors"
                >
                    {labels.gotoToday}
                </Link>
            )}
        </div>
    );
}
