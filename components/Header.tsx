'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import GoogleTranslate from './GoogleTranslate';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between relative">
                <div className="flex flex-col justify-center">
                    <Link href="/" className="text-xl md:text-2xl font-bold text-red-700 leading-none">
                        Malayalam Calendar
                    </Link>
                    <span className="hidden md:block text-[10px] text-gray-500 font-medium tracking-wide mt-1">
                        Kerala Time (IST) • Malayalam Calendar
                    </span>
                </div>

                {/* Desktop Nav */}
                <nav className="hidden xl:flex gap-2 items-center">
                    <Link href="/" className="text-gray-700 hover:text-red-700 hover:bg-red-50 font-medium px-3 py-2 rounded-lg transition-colors">
                        Today
                    </Link>
                    <Link href="/calendar/2026" className="text-gray-700 hover:text-red-700 hover:bg-red-50 font-medium px-3 py-2 rounded-lg transition-colors">Malayalam Calendar 2026</Link>
                    <Link href="/calendar/2027" className="text-gray-700 hover:text-red-700 hover:bg-red-50 font-medium px-3 py-2 rounded-lg transition-colors">2027 Calendar</Link>
                    <Link href="/rahu-kalam-today" className="text-gray-700 hover:text-red-700 hover:bg-red-50 font-medium px-3 py-2 rounded-lg transition-colors">Rahu Kalam</Link>
                    <Link href="/festivals" className="text-gray-700 hover:text-red-700 hover:bg-red-50 font-medium px-3 py-2 rounded-lg transition-colors">Festivals</Link>
                    <Link href="/gold-rate" className="text-yellow-700 hover:text-yellow-800 font-bold bg-yellow-50 hover:bg-yellow-100 px-4 py-2 rounded-full text-sm flex items-center gap-2 border border-yellow-200 transition-colors ml-2">
                        <span>💰</span> Rate
                    </Link>
                    <div className="ml-2 pl-2 border-l border-gray-200">
                        <GoogleTranslate />
                    </div>
                </nav>

                {/* Mobile Actions (Language + Menu) */}
                <div className="flex items-center gap-2 xl:hidden">
                    <GoogleTranslate />
                    <button
                        className="p-2 text-gray-700 hover:bg-gray-100 rounded-md"
                        onClick={toggleMenu}
                        aria-label="Toggle Menu"
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav Dropdown */}
            {isMenuOpen && (
                <div className="xl:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg h-screen md:h-auto overflow-y-auto pb-20">
                    <nav className="flex flex-col p-4 space-y-2">
                        <Link
                            href="/"
                            className="text-gray-700 hover:text-red-700 font-medium px-4 py-3 rounded-lg hover:bg-red-50 bg-gray-50/50"
                            onClick={closeMenu}
                        >
                            Today
                        </Link>
                        <Link
                            href="/calendar/2026"
                            className="text-gray-700 hover:text-red-700 font-medium px-4 py-3 rounded-lg hover:bg-red-50"
                            onClick={closeMenu}
                        >
                            Malayalam Calendar 2026
                        </Link>
                        <Link
                            href="/calendar/2027"
                            className="text-gray-700 hover:text-red-700 font-medium px-4 py-3 rounded-lg hover:bg-red-50"
                            onClick={closeMenu}
                        >
                            2027 Calendar
                        </Link>
                        <Link
                            href="/rahu-kalam-today"
                            className="text-gray-700 hover:text-red-700 font-medium px-4 py-3 rounded-lg hover:bg-red-50"
                            onClick={closeMenu}
                        >
                            Rahu Kalam
                        </Link>
                        <Link
                            href="/festivals"
                            className="text-gray-700 hover:text-red-700 font-medium px-4 py-3 rounded-lg hover:bg-red-50"
                            onClick={closeMenu}
                        >
                            Festivals
                        </Link>
                        <Link
                            href="/gold-rate"
                            className="text-yellow-800 font-medium px-4 py-3 rounded-lg hover:bg-yellow-50 flex items-center gap-2 bg-yellow-50/50"
                            onClick={closeMenu}
                        >
                            <span className="text-lg">💰</span> Gold Rate
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
}
