'use client';

interface Month {
    name: string;
}

interface MonthJumpProps {
    months: Month[];
}

export default function MonthJump({ months }: MonthJumpProps) {
    const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            const top = el.getBoundingClientRect().top + window.scrollY - 96;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    };

    return (
        <ul className="space-y-1 text-sm">
            {months.map((m) => (
                <li key={m.name}>
                    <button
                        onClick={() => scrollTo(m.name.toLowerCase())}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 font-medium transition-colors text-left"
                    >
                        <span>{m.name}</span>
                        <span className="text-xs text-gray-400 dark:text-gray-500">2027</span>
                    </button>
                </li>
            ))}
        </ul>
    );
}
