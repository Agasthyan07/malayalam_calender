'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface TOCItem {
    id: string;
    label: string;
    emoji?: string;
}

const tocItems: TOCItem[] = [
    { id: 'months-grid', label: 'Monthly Calendars', emoji: '🗓️' },
    { id: 'about-2027', label: 'About 2027 Calendar', emoji: '📖' },
    { id: 'festivals-2027', label: 'Key Festivals & Holidays', emoji: '🎊' },
    { id: 'kollavarsham-1202', label: 'Kollavarsham 1202–1203', emoji: '🌙' },
    { id: 'panchangam-guide', label: 'Daily Panchangam Guide', emoji: '🔯' },
    { id: 'comparison-table', label: 'Calendar Comparison', emoji: '📊' },
    { id: 'download-section', label: 'Download PDF', emoji: '📥' },
    { id: 'faq-2027', label: 'FAQs', emoji: '❓' },
];

export default function TableOfContents() {
    const [activeId, setActiveId] = useState<string>('months-grid');

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
                if (visible.length > 0) {
                    setActiveId(visible[0].target.id);
                }
            },
            {
                rootMargin: '-80px 0px -60% 0px',
                threshold: 0,
            }
        );

        tocItems.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    const handleClick = (id: string, e: React.MouseEvent) => {
        e.preventDefault();
        const el = document.getElementById(id);
        if (el) {
            const offset = 96; // account for sticky header
            const top = el.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
            setActiveId(id);
        }
    };

    return (
        <nav aria-label="Table of contents">
            <ul className="space-y-1 text-sm">
                {tocItems.map(({ id, label, emoji }) => {
                    const isActive = activeId === id;
                    return (
                        <li key={id}>
                            <a
                                href={`#${id}`}
                                onClick={(e) => handleClick(id, e)}
                                className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all duration-200 ${isActive
                                        ? 'bg-indigo-600 text-white shadow-sm'
                                        : 'text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20'
                                    }`}
                            >
                                {emoji && <span className="text-base leading-none">{emoji}</span>}
                                <span>{label}</span>
                                {isActive && (
                                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white/80 flex-shrink-0" />
                                )}
                            </a>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
