'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const MONTHLY_PRAYER_TIMES: Record<number, {
    fajr: string; dhuhr: string; asr: string; maghrib: string; isha: string;
}> = {
    1: { fajr: '05:44', dhuhr: '12:45', asr: '16:12', maghrib: '18:28', isha: '19:42' },
    2: { fajr: '05:31', dhuhr: '12:39', asr: '16:08', maghrib: '18:28', isha: '19:40' },
    3: { fajr: '05:12', dhuhr: '12:28', asr: '16:00', maghrib: '18:27', isha: '19:39' },
    4: { fajr: '04:52', dhuhr: '12:16', asr: '15:51', maghrib: '18:24', isha: '19:36' },
    5: { fajr: '04:38', dhuhr: '12:09', asr: '15:46', maghrib: '18:24', isha: '19:36' },
    6: { fajr: '04:33', dhuhr: '12:11', asr: '15:48', maghrib: '18:33', isha: '19:45' },
    7: { fajr: '04:37', dhuhr: '12:20', asr: '15:54', maghrib: '18:44', isha: '19:56' },
    8: { fajr: '04:44', dhuhr: '12:27', asr: '15:58', maghrib: '18:52', isha: '20:04' },
    9: { fajr: '04:51', dhuhr: '12:28', asr: '15:59', maghrib: '18:48', isha: '20:01' },
    10: { fajr: '04:57', dhuhr: '12:25', asr: '15:57', maghrib: '18:41', isha: '19:54' },
    11: { fajr: '05:09', dhuhr: '12:23', asr: '15:54', maghrib: '18:36', isha: '19:49' },
    12: { fajr: '05:29', dhuhr: '12:30', asr: '15:58', maghrib: '18:32', isha: '19:46' },
};

const PRAYERS: { key: keyof typeof MONTHLY_PRAYER_TIMES[1]; label: string; arabic: string; icon: string; color: string }[] = [
    { key: 'fajr', label: 'Fajr', arabic: 'الفجر', icon: '🌙', color: 'text-indigo-600 dark:text-indigo-400' },
    { key: 'dhuhr', label: 'Dhuhr', arabic: 'الظهر', icon: '☀️', color: 'text-amber-600 dark:text-amber-400' },
    { key: 'asr', label: 'Asr', arabic: 'العصر', icon: '🌤️', color: 'text-orange-600 dark:text-orange-400' },
    { key: 'maghrib', label: 'Maghrib', arabic: 'المغرب', icon: '🌇', color: 'text-rose-600 dark:text-rose-400' },
    { key: 'isha', label: 'Isha', arabic: 'العشاء', icon: '🌙', color: 'text-violet-600 dark:text-violet-400' },
];

function to12h(t: string) {
    const [h, m] = t.split(':').map(Number);
    return `${h % 12 || 12}:${m.toString().padStart(2, '0')} ${h >= 12 ? 'PM' : 'AM'}`;
}

function getNextPrayer(times: typeof MONTHLY_PRAYER_TIMES[1], nowMins: number): string {
    for (const p of PRAYERS) {
        const [h, m] = times[p.key].split(':').map(Number);
        if (nowMins < h * 60 + m) return p.key;
    }
    return 'fajr';
}

export default function IslamicPrayerTimes() {
    const [month, setMonth] = useState(0);
    const [nowMins, setNowMins] = useState<number | null>(null);
    const [hijriDate, setHijriDate] = useState('');

    useEffect(() => {
        const ist = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
        setMonth(ist.getMonth() + 1);
        setNowMins(ist.getHours() * 60 + ist.getMinutes());
        try {
            setHijriDate(new Intl.DateTimeFormat('en-u-ca-islamic', {
                day: 'numeric', month: 'long', year: 'numeric'
            }).format(ist));
        } catch { /* fallback */ }
    }, []);

    if (!month) return null;

    const times = MONTHLY_PRAYER_TIMES[month] || MONTHLY_PRAYER_TIMES[2];
    const next = nowMins !== null ? getNextPrayer(times, nowMins) : null;

    return (
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-emerald-600 to-teal-600">
                <div className="flex items-center gap-2.5">
                    <span className="text-2xl">🕌</span>
                    <div>
                        <p className="font-bold text-white text-sm leading-tight">Namaz Times – Kerala</p>
                        <p className="text-emerald-100 text-xs" dir="rtl">مواقيت الصلاة – كيرالا</p>
                    </div>
                </div>
                <div className="text-right">
                    {hijriDate && <p className="text-white text-xs font-medium">{hijriDate}</p>}
                    <Link href="/namaz-times-kerala" className="text-emerald-200 text-[10px] hover:text-white underline">
                        Full details →
                    </Link>
                </div>
            </div>

            {/* Prayer rows */}
            <div className="divide-y divide-gray-100 dark:divide-gray-700/60">
                {PRAYERS.map(({ key, label, arabic, icon, color }) => {
                    const isNext = next === key;
                    return (
                        <div key={key} className={`flex items-center px-4 py-2.5 transition-colors ${isNext ? 'bg-emerald-50 dark:bg-emerald-900/20' : 'hover:bg-gray-50 dark:hover:bg-gray-700/40'}`}>
                            {/* Icon */}
                            <span className="text-base w-6 text-center flex-shrink-0">{icon}</span>

                            {/* Names */}
                            <div className="flex-1 ml-2.5">
                                <div className="flex items-center gap-2">
                                    <span className={`text-sm font-bold ${isNext ? 'text-emerald-700 dark:text-emerald-400' : 'text-gray-800 dark:text-gray-200'}`}>
                                        {label}
                                    </span>
                                    {isNext && (
                                        <span className="text-[9px] bg-emerald-500 text-white font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wide">
                                            Next
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Arabic name */}
                            <span className={`text-sm font-semibold mr-3 ${color}`} dir="rtl" style={{ fontFamily: 'serif' }}>
                                {arabic}
                            </span>

                            {/* Time */}
                            <span className={`font-mono text-sm font-bold tabular-nums ${isNext ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-700 dark:text-gray-200'}`}>
                                {to12h(times[key])}
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* Footer */}
            <div className="px-4 py-2 bg-gray-50 dark:bg-gray-900/30 flex items-center justify-between">
                <p className="text-[10px] text-gray-400 dark:text-gray-500">
                    ⚠️ Approx. times for central Kerala
                </p>
                <Link href="/namaz-times-kerala" className="text-[10px] text-emerald-600 dark:text-emerald-400 hover:underline font-medium">
                    Monthly schedule →
                </Link>
            </div>
        </div>
    );
}
